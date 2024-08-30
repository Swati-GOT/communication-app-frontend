export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const handleErrorResponse = (response) => {
  const data = response;

  const error =
    (data && response.response.data.error.message) ||
    response.message ||
    response.statusText;
  return {
    message: error,
    status: 500
  };
}