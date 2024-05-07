const headersApi = {
  'Content-Type': 'application/json',
};

export const fetchApi = async ({ url, method, body = null }) => {
  const requestOptions = {
    method: method,
    headers: headersApi,
    body: body ? JSON.stringify({ data: body }) : null,
  };

  const response = await fetch(url, requestOptions);
  const responseData = await response.json();

  return responseData;
};
