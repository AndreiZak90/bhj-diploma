/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, true);
  xhr.responseType = "json";

  let formData = new FormData();
  if (options.method == "GET") {
    options.url += "?";
    for (let key in options.data) {
      options.url += key + "=" + options.data[key] + "&";
    }
    options.url = options.url.slice(0, -1);
  } else {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  }
  xhr.open(options.data, options.url);
  xhr.send(options.method === "GET" ? null : formData);
  try {
    xhr.addEventListener("readystatechange", () => {
      if (this.readyState == xhr.DONE && xhr.status === 200) {
        options.callback(xhr.response.error, xhr.response);
      }
    });
  } catch (error) {
    options.callback(error);
  }
};
