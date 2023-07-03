const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest(); // Создание объекта XMLHttpRequest
  xhr.open(options.method, options.url, true); // Открытие соединения и инициализация запроса, установка флага асинхронности
  xhr.responseType = "json"; // Задание типа ответа, парсинг преобразует ответ в объект

  let formData = new FormData(); // Создание объекта FormData для хранения данных запроса

  if (options.method == "GET") {
    // Если метод GET, формируем URL с параметрами
    options.url += "?"; // Добавляем в URL символ "?"
    for (let key in options.data) {
      options.url += key + "=" + options.data[key] + "&"; // Добавляем параметры в URL в формате "ключ=значение&"
    }
    options.url = options.url.slice(0, -1); // Удаляем последний символ "&" из URL
  } else {
    // Если не метод GET, добавляем данные в объект FormData
    for (let key in options.data) {
      formData.append(key, options.data[key]); // Добавляем ключ и значение в объект FormData
    }
  }

  xhr.open(options.method, options.url); // Открытие соединения с указанным методом и URL
  xhr.send(options.method === "GET" ? null : formData); // Отправка данных в зависимости от метода запроса

  try {
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState == xhr.DONE && xhr.status === 200) {
        options.callback(xhr.response.error, xhr.response); // Вызов колбэка с ошибкой и ответом сервера
      }
    });
  } catch (error) {
    options.callback(error); // Обработка ошибок
  }
};
