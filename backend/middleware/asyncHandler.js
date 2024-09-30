const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
/*
This code defines a higher-order function asyncHandler that wraps an asynchronous function fn to catch and handle any errors that occur during its execution. If an error occurs, it passes the error to the next function, typically an error-handling middleware in an Express.js application.

In simpler terms, it ensures that asynchronous functions are properly error-handled, preventing crashes and allowing for more robust error management.
*/
