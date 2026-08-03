/**
 * ============================================================================
 * CHEAT SHEET: Inversion of Control (IoC) & Dependency Injection in NestJS
 * ============================================================================
 *
 * 🎯 ONE-LINE INTERVIEW ANSWER:
 * "Inversion of Control (IoC) is an architectural design principle where object
 *  creation, lifecycle management, and dependency binding are inverted from the
 *  class itself to a framework container (NestJS IoC Container)."
 *
 * 💡 IoC vs. DI (THE RELATIONSHIP):
 *  - IoC (Inversion of Control) is the OVERALL PRINCIPLE (the concept).
 *  - DI (Dependency Injection) is the SPECIFIC DESIGN PATTERN used to achieve IoC.
 */

import { Injectable, Module, Controller, Get } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';


/* ============================================================================
 * 1. ARCHITECTURAL COMPARISON: TRADITIONAL vs. IoC FLOW
 * ============================================================================
 *
 * TRADITIONAL CONTROL FLOW (Tight Coupling):
 *  [ UserService ] ──> `new DatabaseService()` ──> Creates concrete instance
 *  * Problem: Highly coupled, difficult to unit test, tight dependency management.
 *
 *
 * INVERSION OF CONTROL FLOW (Loose Coupling via NestJS Container):
 *  1. [ NestJS IoC Container ]
 *         │
 *         ├──> Creates `DatabaseService` instance (Provider)
 *         │
 *         └──> Injects instance into `UserService` via constructor
 *
 *  2. [ UserService ] ──> Receives `DatabaseService` automatically
 */


/* ============================================================================
 * 2. CODE COMPARISON: MANUAL CREATION vs. NESTJS IoC
 * ============================================================================
 */

// ❌ WITHOUT IoC (Tight Coupling):
class BadDatabaseService {
  connect() { return 'Connected'; }
}

class BadUserService {
  private db: BadDatabaseService;

  constructor() {
    // Bad: UserService manages the lifecycle of BadDatabaseService
    this.db = new BadDatabaseService();
  }
}


// ✅ WITH IoC IN NESTJS (Loose Coupling):

// Step 1: Decorate service so Nest registers it into IoC container
@Injectable()
export class DatabaseService {
  query(sql: string): string {
    return `Executed: ${sql}`;
  }
}

// Step 2: Inject via constructor; Nest's container handles resolution
@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  getUser(): string {
    return this.db.query('SELECT * FROM users');
  }
}

// Step 3: Register in Module so Nest knows which dependencies exist
@Module({
  providers: [DatabaseService, UserService],
  exports: [UserService],
})
export class UserModule {}


/* ============================================================================
 * 3. THE #1 BENEFIT OF IoC: UNIT TESTING & MOCKING
 * ============================================================================
 * Because control is inverted, unit tests can seamlessly swap real database
 * providers with mock implementations without altering production service code.
 */

describe('UserService (Unit Test with IoC)', () => {
  let userService: UserService;
  let mockDbService: Partial<DatabaseService>;

  beforeEach(async () => {
    // Create a mock instance
    mockDbService = {
      query: (sql: string) => `Mocked Result for: ${sql}`,
    };

    // Construct a lightweight testing module (Nest's test IoC container)
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: mockDbService, // Override real DatabaseService with mock!
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should use mocked database service', () => {
    const result = userService.getUser();
    expect(result).toBe('Mocked Result for: SELECT * FROM users');
  });
});


/* ============================================================================
 * 4. SUMMARY TABLE: TRADITIONAL vs. IoC ARCHITECTURE
 * ============================================================================
 *
 * ┌──────────────────────┬───────────────────────────┬──────────────────────────────────┐
 * │ Metric               │ Traditional (No IoC)      │ NestJS IoC Container             │
 * ├──────────────────────┼───────────────────────────┼──────────────────────────────────┤
 * │ Object Instantiation │ Manual (`new ClassName()`)│ Automated by Nest IoC container  │
 * │ Coupling             │ Tightly coupled           │ Loosely coupled via abstractions │
 * │ Testing Ease         │ Complex (hard to mock)    │ Simple (swap with `useValue`)    │
 * │ Lifecycle Management │ Developer responsibility │ Managed by Nest (Singleton, etc) │
 * └──────────────────────┴───────────────────────────┴──────────────────────────────────┘
 */


/* ============================================================================
 * 5. QUICK INTERVIEW Q&A
 * ============================================================================
 *
 * Q1: What is the main difference between IoC and DI?
 * A: IoC is a broad architectural principle where control of program flow and object
 *    creation is delegated to an external entity. DI is a concrete design pattern used
 *    to implement IoC by passing dependencies into a class via constructors, setters, or properties.
 *
 * Q2: How does NestJS identify which classes to instantiate and inject?
 * A: NestJS uses TypeScript decorators (`@Injectable()`, `@Controller()`) and runtime
 *    type reflection (`reflect-metadata`) to build a dependency graph when bootstrapping modules.
 *
 * Q3: Can you invert control without using frameworks like NestJS?
 * A: Yes. You can implement manual Dependency Injection by passing initialized instances
 *    into class constructors at the application entry point (`main.ts`), but IoC containers
 *    like NestJS automate dependency graph resolution and lifecycle management.
 */
