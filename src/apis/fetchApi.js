const headersApi = {
  'Content-Type': 'application/json',
};

export const fetchApi = async ({ url, method, body = null }) => {
  const requestBody = {
    text: body,
    ids: body,
  };
  const requestOptions = {
    method: method,
    headers: headersApi,
    body: body ? JSON.stringify(requestBody) : null,
  };

  const response = await fetch(url, requestOptions);
  const responseData = await response.json();

  return responseData;
};
