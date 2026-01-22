export const httpStatusCodes = {
    OK: 200,                         // The request has succeeded
    CREATED: 201,                    // The request has succeeded and a new resource has been created
    ACCEPTED: 202,                   // The request has been accepted for processing, but the processing is not complete
    NO_CONTENT: 204,                 // Tnhe server successfully processed the request and is not returning any content
  
    BAD_REQUEST: 400,                // The server could ot understand the request due to invalid syntax
    UNAUTHORIZED: 401,               // The client must authenticate itself to get the requested response
    FORBIDDEN: 403,                  // The server understood the request, but it refuses to authorize it
    NOT_FOUND: 404,                  // The server can’t find the requested resource
    METHOD_NOT_ALLOWED: 405,         // The request method is not supported for the resource
    CONFLICT: 409,                   // The request conflicts with the current state of the server
    UNPROCESSABLE_ENTITY: 422,       // The server understands the content type of the request entity, and the syntax is correct, but it was unable to process the contained instructions
  
    INTERNAL_SERVER: 500,            // The server has encountered a situation it doesn't know how to handle
    NOT_IMPLEMENTED: 501,            // The request method is not supported by the server and cannot be handled
    SERVICE_UNAVAILABLE: 503,        // The server is not ready to handle the request, often due to maintenance
    GATEWAY_TIMEOUT: 504,            // The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server
    // Add additional status codes as needed
  };
  