function request({
  method,
  url,
  headers = [],
  data = null,
  isJson = true,
} = {}) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach(k => xhr.setRequestHeader(k, headers[k]));
    xhr.send(data && isJson ? JSON.stringify(data) : data);

    xhr.addEventListener('readystatechange', _=> {
      if (xhr.readyState !== 4)
        return;

      if (Math.floor(xhr.status / 100) === 2) // 2XX
        resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText);
      else
        reject(xhr);
    });
  });
}

export function get(url, { headers, isJson = true } = {}) {
  return request({ method: 'GET', url, headers, isJson });
}

export function post(url, data, { headers, isJson = true } = {}) {
  return request({ method: 'POST', url, data, headers, isJson });
}

export function put(url, data, { headers, isJson = true } = {}) {
  return request({ method: 'PUT', url, data, headers, isJson });
}

export function patch(url, data, { headers, isJson = true } = {}) {
  return request({ method: 'PATCH', url, data, headers, isJson });
}

function del(url, { headers, isJson = true } = {}) {
  return request({ method: 'DELETE', url, headers, isJson });
}
export { del as delete };
export default request;
