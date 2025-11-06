export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  const response = {
    success: true,
    message: data.message || message,
    ...data
  };
  
  if (data.message) {
    delete response.data?.message;
  }
  
  res.status(statusCode).json(response);
};