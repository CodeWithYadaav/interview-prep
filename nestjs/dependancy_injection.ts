/**
 * ============================================================================
 * CHEAT SHEET: NestJS Injector & Dependency Injection (DI) Container
 * ============================================================================
 *
 * 🎯 ONE-LINE INTERVIEW ANSWER:
 * "The NestJS Injector is the internal IoC (Inversion of Control) container
 *  that automatically instantiates, manages, and resolves class dependencies
 *  across the application lifecycle based on metadata."
 *
 * 💡 GOLDEN RULE:
 * Never use `new ServiceClass()` manually in NestJS. Let the Injector manage
 * object instantiation and scope lifecycles for you.
 */

/* ============================================================================
 * 1. CORE DEPENDENCY INJECTION PATTERN
 * ============================================================================
 */

// Step 1: Declare Provider (@Injectable registers class into Nest's DI container)
import { Injectable, Controller, Get, Module, Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string[] {
    return ['Alice', 'Bob'];
  }
}

// Step 2: Inject Provider into Controller via Constructor Injection
@Controller('users')
export class UsersController {
  // TypeScript type metadata (UsersService) tells the Nest Injector what to supply
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): string[] {
    return this.usersService.getUsers();
  }
}

// Step 3: Register Provider and Controller in Module Scope
@Module({
  controllers: [UsersController],
  providers: [UsersService], // Must be listed under providers to register with Injector
})
export class UsersModule {}


/* ============================================================================
 * 2. HOW THE NESTJS INJECTOR WORKS UNDER THE HOOD
 * ============================================================================
 *
 *  ┌────────────────────────┐
 *  │   1. @Injectable()     │ ──> Adds class to Nest Container Registry
 *  └────────────────────────┘
 *              │
 *              ▼
 *  ┌────────────────────────┐
 *  │ 2. Constructor Scan    │ ──> Nest inspects TypeScript metadata via Reflect-metadata
 *  └────────────────────────┘
 *              │
 *              ▼
 *  ┌────────────────────────┐
 *  │ 3. Dependency Resolve  │ ──> Injector checks if instance exists (Singleton)
 *  └────────────────────────┘     If NOT -> Creates instance and caches it
 *              │
 *              ▼
 *  ┌────────────────────────┐
 *  │ 4. Instantiation       │ ──> Injects resolved instance into controller constructor
 *  └────────────────────────┘
 */


/* ============================================================================
 * 3. ADVANCED INJECTION: CUSTOM TOKENS & @Inject()
 * ============================================================================
 * Used for non-class dependencies like string tokens, interfaces, configs,
 * or dynamic provider factories.
 */

// Module Registration with String Token
export const DATABASE_CONFIG = 'DATABASE_CONFIG';

@Module({
  providers: [
    {
      provide: DATABASE_CONFIG,
      useValue: { host: 'localhost', port: 5432 }, // Value Provider
    },
  ],
})
export class AppModule {}

// Consuming Custom String Token in a Service
@Injectable()
export class DbService {
  constructor(
    @Inject(DATABASE_CONFIG) private readonly config: { host: string; port: number }
  ) {}

  getDbHost(): string {
    return this.config.host;
  }
}


/* ============================================================================
 * 4. INJECTOR SCOPES (LIFECYCLE MANAGEMENT)
 * ============================================================================
 *
 * ┌─────────────────┬──────────────────────────────────────────────────────────┐
 * │ Scope           │ Behavior                                                 │
 * ├─────────────────┼──────────────────────────────────────────────────────────┤
 * │ DEFAULT         │ Singleton instance shared across the ENTIRE app.          │
 * │ (Recommended)   │ Created on app bootstrap. Best for performance & memory. │
 * │                 │                                                          │
 * │ REQUEST         │ A new instance is created for EVERY incoming request.    │
 * │                 │ Automatically garbage-collected after response finishes. │
 * │                 │                                                          │
 * │ TRANSIENT       │ A dedicated instance is created for EVERY consuming       │
 * │                 │ provider that injects it.                                │
 * └─────────────────┴──────────────────────────────────────────────────────────┘
 */

import { Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  // Fresh instance per HTTP request
}


/* ============================================================================
 * 5. QUICK INTERVIEW Q&A
 * ============================================================================
 *
 * Q1: How does NestJS know which dependency to inject without explicit configuration?
 * A: Nest uses TypeScript reflection metadata (`reflect-metadata`). During compilation,
 *    TypeScript emits design types into JS metadata, allowing Nest to inspect
 *    constructor parameter types at runtime.
 *
 * Q2: What happens if a provider is missing from the Module's `providers` array?
 * A: Nest throws a `UnknownElementException` during application bootstrap, stating
 *    that Nest cannot resolve the dependencies of the target controller/service.
 *
 * Q3: What is the performance impact of `Scope.REQUEST`?
 * A: Request-scoped providers degrade performance because Nest must instantiate a new
 *    object tree on every HTTP request instead of reusing cached singletons.
 */
