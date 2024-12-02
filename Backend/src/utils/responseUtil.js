const createResponse = (status, success, message, data = null) => {
    return {
      status,
      success,
      message,
      data,
    };
  };
  
  export const successResponse = (res, message, data, status = 200) => {
    res.status(200).json(createResponse(status, true, message, data));
  };
  
  export const errorResponse = (res, message, status = 400, data = null) => {
    res.status(200).json(createResponse(status, false, message, data));
  };
  