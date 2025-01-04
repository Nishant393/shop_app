// errorMiddleware.js

// General error-handling middleware
const errorMiddleware = (err, req, res, next) => {

    const statusCode = err.statusCode || 500; 
    const message = err.message || "Internal Server Error";
    console.error(` ${err}`);
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        statusCode,
        // Additional details (optional)
        
      },
    });
  };
  
  export {errorMiddleware} 
    
  