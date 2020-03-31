### JetBrains Conference REST API  [![Build Status](https://travis-ci.com/daukadolt/jetbrains-yeti-api.svg?token=BqcJ6Le3YTsBB3wA8uhH&branch=master)](https://travis-ci.com/daukadolt/jetbrains-yeti-api) [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f2d4bdb57b86242517db)
---
Данный репозиторий содержит Express.js REST API для JetBrains Conf Yeti.
    
##### Структура проекта:

    .
    ├── docker_startup_scripts  # запускаются при старте docker контейнера базы
    ├── manual_population       # вручную заполнить базу, детали ниже
    ├── src                     # express.js приложение
    ├── .env                    # env varibles
    ├── .eslintrc.js            # конфиг файл ESlint, за основу взяты настройки Airbnb
    ├── .gitignore              # .gitignore для node.js + jetbrains
    ├── .travis.yml             # конфиг файл для Travis CI
    ├── database.env            # env variables для mongo, см docker-compose.yml
    ├── docker-compose.yml      # конфиг файл для docker-compose
    ├── jest.config.js          # конфиг файл для Jest
    ├── package.json
    ├── package-lock.json
    ├── README.md               # <-- вы здесь
    └── server.js               # непосредственно сам сервер, подключается к mongo и запускает express
    

##### Как запускать проект?

Очень просто:

1. Устанавливаем пакеты: `npm install`
2. Запускаем базу: `docker-compose up -d` или `docker-compose up` в другом окне терминала, как вам удобно
3. Запускаем проект: `npm start`
4. Проект запущен! По умолчанию, на порту 8888. По умолчанию уже имеет данные из предоставленного conferences.json. Это можно убрать при желании, инструкции в самом низу.


##### Что есть в проекте?

В проекте есть следующие функции:
1. Получить список всех имеющихся конференций

    * **Адрес**: http://localhost:8888/api/conference/all
    * **Метод**: GET
    * **Параметры**: не принимает
    * **Возвращает**: массив документов модели [Conference](./src/models/conference.js)
    * HTTP статус коды:
        * 200, работает как надо
        * 500, произошла ошибка в conference-service.js, но судя по [документации](https://github.com/Automattic/mongoose/blob/4cbabb6bf5ba3bed7633f0171b6f436f7a126eb0/lib/model.js#L2046) (отсутствуют @throws что в методе find, что Query) таковых не должно быть

2. Поиск по конференциям

    * **Адрес**: http://localhost:8888/api/conference/search
    * **Метод**: POST
    * **Параметры**: Может принять любое из полей модели Conference, а также _id документа. В случае string полей, возможен поиск по любой подстроке (regex) оригинального текста, case insensitive. Обязательные поля: _title, location.city, location.country, dateStart, dateFinish, status_
    * **Возвращает**: массив документов модели Conference, подходящих под запрос
    * HTTP статус коды:
        * 200, работает как надо
        * 500, произошла непредвиденная ошибка (так же как и в предыдущем случае)
   
3. Создание новой конференции

    * **Адрес**: http://localhost:8888/api/conference/new
    * **Метод**: POST
    * **Параметры**: поля модели Conference, можно указать _id. Обязательные поля: _title, location.city, location.country, dateStart, dateFinish, status_
    * **Возвращает**: HTTP статус 200 если прошло успешно, или 400, 500 в противном случае.
    * HTTP статус коды:
        * 200, работает как надо
        * 400, ошибка пользователя. Возвращает текст с описанием ошибки
        * 500, произошла непредвиденная ошибка (так же как и в предыдущем случае)


##### Как запустить базу без никаких данных?

Изменить расширение [скрипта](./docker_startup_scripts/002-populate-production.sh) `./docker_startup_scripts/002-populate-production.sh` с `.sh` на любой, кроме `.js`. Таким образом docker не распознает его и не запустит. Теперь остается перезапустить docker базы по новой если он уже был запущен.

##### Для чего нужна папка manual_population?

В случае, если будет необходимость загрузить в уже запущенную базу conferences.json. 


Для этого необходимо при запущенном контейнере с базой сделать:

`node manual_population/001_initial.js`

Обратите внимание что все существующие документы удалятся
