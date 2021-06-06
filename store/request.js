const request = ({ getState }) => next => async ({ payload = {}, type }) => {
  const {
    baseUrl,
    body = null,
    fetch,
    headers = {},
    label,
    method,
    transformData = data => data,
    callBack,
    errorHandler,
    url,
  } = payload;

  next({ payload, type });

  if (type !== 'HTTP_REQUEST') {
    return;
  }

  next({
    type: `${label}_REQUEST`,
  });

  try {
    const res = await fetch(url, { baseUrl, method, headers, body });
    const contentType = res.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await res.json()
      : {};

    if (res.status >= 400) {
      throw { ...data, response: { status: res.status } };
    }

    next({
      type: `${label}_SUCCESS`,
      payload: transformData(data),
    });

    if (data?.cod !== 200) {
      throw { ...data, response: { status: res.status } };
    }

    if (typeof callBack === 'function') {
      callBack(data);
    }
  } catch (error) {

    const enhancedError = {
      ...error,
      messages: error?.messages,
    };

    if (typeof errorHandler === 'function') {
      errorHandler(enhancedError);
    }

    console.log('error in request.js', error);
    return next({
      type: `${label}_FAILURE`,
      payload: enhancedError,
    });
  }
};

export default request
