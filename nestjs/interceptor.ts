/**
 * ============================================================================
 * CHEAT SHEET: NestJS Interceptors & Response Transformation
 * ============================================================================
 *
 * 🎯 ONE-LINE INTERVIEW ANSWER:
 * "A NestJS Interceptor is an @Injectable() class implementing the NestInterceptor
 *  interface inspired by Aspect-Oriented Programming (AOP) that wraps the request/response
 *  stream using RxJS Observables to execute logic both BEFORE and AFTER a route handler."
 *
 * 💡 KEY CONCEPT:
 * Calling `next.handle()` triggers the route handler and returns an RxJS Observable.
 * Code written BEFORE `next.handle()` runs on the incoming request, while RxJS operators
 * attached to `next.handle().pipe(...)` execute on the outgoing response.
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
  RequestTimeoutException,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError, of } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';


/* ============================================================================
 * 1. REAL-WORLD INTERCEPTOR PATTERNS & RxJS OPERATORS
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// PATTERN A: Response Transformation (Envelope Pattern using `map`)
// ----------------------------------------------------------------------------
export interface ResponseEnvelope<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseEnvelope<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseEnvelope<T>> {
    const response = context.switchToHttp().getResponse();

    // `map` mutates the returned payload from controller before sending to client
    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: response.statusCode,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}

// ----------------------------------------------------------------------------
// PATTERN B: Timeout Interceptor (Handling Long Requests using `timeout` & `catchError`)
// ----------------------------------------------------------------------------
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000), // Cancel request if handler takes longer than 5 seconds
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException('Request timed out'));
        }
        return throwError(() => err);
      }),
    );
  }
}

// ----------------------------------------------------------------------------
// PATTERN C: Short-Circuiting / In-Memory Cache Interceptor
// ----------------------------------------------------------------------------
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = false; // Simulated cache lookup logic
    if (isCached) {
      // By returning an Observable directly without calling `next.handle()`,
      // the controller execution is COMPLETELY BYPASSED!
      return of(['Cached Data']);
    }
    return next.handle();
  }
}


/* ============================================================================
 * 2. APPLYING INTERCEPTORS (SCOPES)
 * ============================================================================
 */

@Controller('products')
// Apply Interceptor at Controller Level
@UseInterceptors(TransformInterceptor)
export class ProductsController {

  @Get()
  // Apply Interceptor at Route Handler Level
  @UseInterceptors(TimeoutInterceptor)
  getProducts() {
    return [{ id: 1, name: 'Laptop' }];
  }
}

/*
 * 🛠️ INTERCEPTOR SCOPE LEVELS:
 * 1. Method Scope:     @UseInterceptors(LoggingInterceptor) on single route handler.
 * 2. Controller Scope: @UseInterceptors(LoggingInterceptor) on class.
 * 3. Global Scope:     app.useGlobalInterceptors(new LoggingInterceptor()) in main.ts OR
 *                      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor } in AppModule.
 */


/* ============================================================================
 * 3. EXECUTION ORDER MATRIX: MIDDLEWARE vs GUARD vs INTERCEPTOR vs PIPE
 * ============================================================================
 *
 * Request Execution Flow:
 *
 *  Incoming Request
 *        │
 *        ▼
 * ┌──────────────┐
 * │ Middleware   │ ──> Logging, body parsing, CORS (Runs before Nest DI tree fully resolves)
 * └──────────────┘
 *        │
 *        ▼
 * ┌──────────────┐
 * │ Guard        │ ──> Authentication & Authorization check (Returns true/false)
 * └──────────────┘
 *        │
 *        ▼
 * ┌──────────────┐
 * │ Interceptor  │ ──> [Pre-Handler Logic]: Start timer, check cache, log request start
 * └──────────────┘
 *        │
 *        ▼
 * ┌──────────────┐
 * │ Pipe         │ ──> Validation (class-validator) & Type Transformation
 * └──────────────┘
 *        │
 *        ▼
 * ┌──────────────┐
 * │ Controller   │ ──> Route handler method executes business logic
 * └──────────────┘
 *        │
 *        ▼
 * ┌──────────────┐
 * │ Interceptor  │ ──> [Post-Handler Logic]: Transform response body, log runtime, cache result
 * └──────────────┘
 *        │
 *        ▼
 *  Client Response
 */


/* ============================================================================
 * 4. QUICK INTERVIEW Q&A
 * ============================================================================
 *
 * Q1: What happens if you do NOT call `next.handle()` inside an Interceptor?
 * A: The controller route handler method will NEVER be executed. This technique
 *    is used deliberately in Caching Interceptors to short-circuit the request.
 *
 * Q2: How do Interceptors differ from Exception Filters?
 * A: Interceptors catch exceptions thrown by route handlers using RxJS `catchError`,
 *    allowing error transformation before it bubbles up. Exception Filters act as the
 *    final fallback mechanism in NestJS specifically dedicated to building HTTP error responses.
 *
 * Q3: Can an Interceptor inject services via Constructor Injection?
 * A: Yes! Interceptors are `@Injectable()` providers and participate fully in NestJS
 *    Dependency Injection, allowing you to inject services like `Reflector`, `ConfigService`,
 *    or custom cache drivers.
 */
