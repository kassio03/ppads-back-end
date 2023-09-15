export const successBody = (body?: any, statusCode = 200) => {
  return {
    statusCode,
    body,
  };
};
