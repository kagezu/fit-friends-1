
## Запуск проекта

Необходимы установленные приложения: npm node nx docker.<br/>
Разместите переменные окружения<br/>
в файле <b>./apps/app/.app.env</b><br/>
Пример находиться в файле  <b>./apps/app/.app/env.example</b><br/>
В корне проекта выполните:<br/>
<b>npm install</b><br/>
<b>docker compose --file ./apps/app/docker-compose.yml --project-name "app" up -d</b><br/>
<b>nx run app:serve</b> либо <b>npm start</b>

### Сценарии

<b>npm start</b> либо <b>npm run start</b> - Запуск сервиса app<br/>
<b>npm run lint</b> - Проверка кода программы с помощью линтера<br/>
<b>nx run app:build</b> - Сборка программы<br/>
<b>nx run app:buildImage</b> - Сборка программы и создание образа для docker

### Начальное наполнение базы

Запустить наполнение базы можно с помощью запроса:<br/>
POST  http://localhost:3333/api/seed HTTP/1.1

### API

Описание API генерируется динамически по адресу:<br/>
http://localhost:3333/spec

### Переменные окружения

Формат описания: <b>PARAM</b>=value — описание.<br/>

#### Файл .app.env

<b>NODE_ENV</b>=development - режим приложения "development" , "production" или "test"<br/>
<b>PORT</b>=3333 - Порт по которому доступен сервис<br/>

<b>MONGO_DB</b>=fitfriends-app - Имя базы данных<br/>
<b>MONGO_HOST</b>=localhost - Хост базы данных<br/>
<b>MONGO_PORT</b>=27017 - Порт базы данных<br/>
<b>MONGO_USER</b>=admin - Логин для базы данных<br/>
<b>MONGO_PASSWORD</b>=test - Пароль для базы данных<br/>
<b>MONGO_AUTH_BASE</b>=admin - база данных, используемая при аутентификации<br/>

<b>JWT_AT_SECRET</b>=test_secret - Соль для генерации токенов<br/>
<b>JWT_AT_EXPIRES_IN</b>=7m - Время действия токена<br/>
<b>JW_RT_SECRET</b>=test_rt_secret - Соль для генерации рефреш токенов<br/>
<b>JW_RT_EXPIRES_IN</b>=7d - Время действия рефреш токена<br/>

<b>UPLOAD_DIRECTORY_PATH</b>=~/fit-friends-1/apps/app/uploads - Путь к папке для закачки файлов<br/>
<b>SERVE_ROOT</b>=/static - Путь к закаченым файлам<br/>

<b>MAIL_SMTP_HOST</b>=localhost - Хост почтового сервера<br/>
<b>MAIL_SMTP_PORT</b>=8025 -  Порт для отправки сообщений<br/>
<b>MAIL_USER_NAME</b>=admin - Логин для почтового сервера<br/>
<b>MAIL_USER_PASSWORD</b>=test - Пароль для почтового сервера<br/>
<b>MAIL_FROM</b>=<mail@mail.local> - Почтовый адресс

#### Файл .fit.mongo.env

<b>MONGO_INITDB_ROOT_USERNAME</b>=admin - Логин для базы данных<br/>
<b>MONGO_INITDB_ROOT_PASSWORD</b>=test - Пароль для базы данных<br/>
<b>MONGO_INITDB_DATABASE</b>=fitfriends-app - Имя базы данных<br/>
