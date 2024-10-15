
// In NestJS, guards are a fundamental building block for handling authorization and validation within your application. They are used to control the access to specific routes or handlers by determining whether a request should be allowed to proceed based on certain conditions.




// Key Features of Guards in NestJS:

// Purpose:
// Guards are primarily used for authentication and authorization. They help determine if a user is allowed to access a specific resource or endpoint based on predefined rules.

// Implementation:
// Guards are implemented as classes that implement the CanActivate interface. This interface requires a single method, canActivate, which contains the logic to determine if the route should be activated.

// Usage:
// You can apply guards at the controller level (to guard all routes in a controller) or at the route handler level (to guard specific routes).


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user info is added to the request

    // Check if user is authenticated
    return !!user; // Returns true if user exists, false otherwise
  }
}
