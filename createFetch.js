import { omit } from 'Utils';

function createFetch(fetch, { baseUrl }) {
  const defaults = {
    method: 'GET',
  };

  return (url, options = {}) =>
    fetch(`${options.baseUrl || baseUrl}${url}&appid=${process.env.apiKey}&units=metric`, {
      ...defaults,
      ...options,
      headers: {
        ...omit(
          defaults.headers,
          options.body instanceof FormData ? ['Content-Type'] : []
        ),
        ...options.headers,
      },
    });
}

export default createFetch;
