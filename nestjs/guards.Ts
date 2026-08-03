/**
 * ============================================================================
 * CHEAT SHEET: NestJS Guards & Route Protection
 * ============================================================================
 *
 * 🎯 ONE-LINE INTERVIEW ANSWER:
 * "A Guard in NestJS is an @Injectable() class implementing the CanActivate interface
 *  that determines whether an incoming request should be allowed or denied access
 *  to a route handler based on runtime conditions like Auth, Roles, or Permissions."
 *
 * 💡 KEY DIFFERENCE:
 * Unlike Express middleware, NestJS Guards have access to the `ExecutionContext` instance,
 * knowing EXACTLY which controller handler and class will be executed next.
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';


/* ============================================================================
 * 1. IMPLEMENTING A CUSTOM GUARD (JWT & ROLES AUTH)
 * ============================================================================
 * Problem Statement: Guard extracts JWT from Auth headers, verifies identity,
 * and checks if the user's role matches route metadata.
 */

// Custom Decorator for Role Metadata
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector allows us to read custom metadata attached via decorators (@Roles)
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Step 1: Extract allowed roles metadata from Handler or Controller Class
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are defined on the route, allow access by default
    if (!requiredRoles) {
      return true;
    }

    // Step 2: Switch execution context to HTTP Request
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user']; // Assuming AuthGuard set `user` on request

    if (!user) {
      throw new UnauthorizedException('User identity not found on request context');
    }

    // Step 3: Check if user has required role permissions
    return requiredRoles.includes(user.role);
  }
}


/* ============================================================================
 * 2. APPLYING GUARDS (SCOPES & DECORATORS)
 * ============================================================================
 */

@Controller('admin')
// Apply Guard at Controller Level (Applies to ALL routes inside AdminController)
@UseGuards(RolesGuard)
export class AdminController {

  @Get('dashboard')
  @Roles('admin') // Attach required metadata
  getDashboard() {
    return { status: 'Success', data: 'Sensitive Admin Dashboard' };
  }
}

/*
 * 🛠️ GUARD SCOPE LEVELS:
 * 1. Method Scope:     @UseGuards(JwtAuthGuard) on a controller handler method.
 * 2. Controller Scope: @UseGuards(JwtAuthGuard) on the controller class.
 * 3. Global Scope:     app.useGlobalGuards(new JwtAuthGuard()) in main.ts OR
 *                      { provide: APP_GUARD, useClass: JwtAuthGuard } in AppModule.
 */


/* ============================================================================
 * 3. NESTJS REQUEST LIFECYCLE & EXECUTION ORDER
 * ============================================================================
 *
 * When a request hits a NestJS application, components execute in this EXACT order:
 *
 *  1. Incoming Request ──> Global Middleware ──> Module Middleware
 *                             │
 *                             ▼
 *  2. Guards ─────────────> Global Guards ──> Controller Guards ──> Route Guards
 *                             │ (If any guard returns false -> 403 Forbidden)
 *                             ▼
 *  3. Interceptors ───────> Global Interceptors ──> Route Interceptors (Pre-handler)
 *                             │
 *                             ▼
 *  4. Pipes ──────────────> Global Pipes ──> Controller Pipes ──> Route Pipes (Validation)
 *                             │
 *                             ▼
 *  5. Controller Method ──> Route Handler Execution
 *                             │
 *                             ▼
 *  6. Response ───────────> Interceptors (Post-handler) ──> Exception Filters ──> Client
 */


/* ============================================================================
 * 4. COMPARISON: MIDDLEWARE vs GUARDS vs INTERCEPTORS vs PIPES
 * ============================================================================
 *
 * ┌──────────────┬───────────────────────────────┬──────────────────────────────────┐
 * │ Feature      │ When it Executes              │ Primary Use Case                 │
 * ├──────────────┼───────────────────────────────┼──────────────────────────────────┤
 * │ Middleware   │ Before Guards                 │ Request logging, CORS, raw body  │
 * │              │ (No ExecutionContext)         │ parsing (Express/Fastify level). │
 * │              │                               │                                  │
 * │ Guards       │ After Middleware,             │ Authentication, Authorization,   │
 * │              │ before Interceptors/Pipes     │ Role & IP validation checks.     │
 * │              │                               │                                  │
 * │ Interceptors │ Before & After Route Handler  │ Response transformation, caching,│
 * │              │                               │ logging execution time, timeout. │
 * │              │                               │                                  │
 * │ Pipes        │ Right before Route Handler    │ Input data validation (class-   │
 * │              │                               │ validator) & type transformation.│
 * └──────────────┴───────────────────────────────┴──────────────────────────────────┘
 */


/* ============================================================================
 * 5. QUICK INTERVIEW Q&A
 * ============================================================================
 *
 * Q1: Why should you use a Guard instead of Express Middleware for authorization?
 * A: Middleware does not know which handler will be executed after calling `next()`.
 *    Guards have access to the `ExecutionContext` and `Reflector`, allowing access to
 *    metadata (like `@Roles('admin')`) attached to specific route handlers.
 *
 * Q2: What happens when a Guard returns `false` vs throwing an Exception?
 * A: If a Guard returns `false`, NestJS automatically throws a `ForbiddenException`
 *    (403 Forbidden). If you want a custom status code or message (e.g. 401 Unauthorized),
 *    throw a custom `HttpException` directly inside the guard.
 *
 * Q3: Can Guards be asynchronous?
 * A: Yes. A Guard's `canActivate` method can return a `boolean`, a `Promise<boolean>`,
 *    or an `Observable<boolean>` (RxJS).
 */
