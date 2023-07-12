
## Запуск проекта

Необходимы установленные приложения: npm node nx docker.
Разместите переменные окружения
в файле <b>./apps/app/.app.env</b>
Пример находиться в файле  <b>./apps/app/.env.example</b>
В корне проекта выполните:
<b>npm install</b>
<b>docker compose --file ./apps/app/docker-compose.yml --project-name "app" up -d</b>
<b>nx run app:serve</b> либо <b>npm start</b>

### Сценарии

<b>npm start</b> либо <b>npm run start</b> - Запуск сервиса app
<b>npm run lint</b> - Проверка кода программы с помощью 

### Начальное наполнение базы

Запустить наполнение базы можно с помощью запроса:
POST  http://localhost:3333/api/seed HTTP/1.1

### API

Описание API генерируется динамически по адресу:
http://localhost:3333/spec

### Переменные окружения

Формат описания: <b>PARAM</b>=value — описание.

<b>NODE_ENV</b>=development - режим приложения "development" , "production" или "test"
<b>PORT</b>=3333 - Порт по которому доступен сервис

<b>MONGO_DB</b>=fitfriends-app - Имя базы данных
<b>MONGO_HOST</b>=localhost - Хост базы данных
<b>MONGO_PORT</b>=27017 - Порт базы данных
<b>MONGO_USER</b>=admin - Логин для базы данных
<b>MONGO_PASSWORD</b>=test - Пароль для базы данных
<b>MONGO_AUTH_BASE</b>=admin - база данных, используемая при аутентификации

<b>JWT_AT_SECRET</b>=test_secret - Соль для генерации токенов
<b>JWT_AT_EXPIRES_IN</b>=7m - Время действия токена
<b>JW_RT_SECRET</b>=test_rt_secret - Соль для генерации рефреш токенов
<b>JW_RT_EXPIRES_IN</b>=7d - Время действия рефреш токена

<b>UPLOAD_DIRECTORY_PATH</b>=~/fit-friends-1/apps/app/uploads - Путь к папке для закачки файлов
<b>SERVE_ROOT</b>=/static - Путь к закаченым файлам

<b>MAIL_SMTP_HOST</b>=localhost - Хост почтового сервера
<b>MAIL_SMTP_PORT</b>=8025 -  Порт для отправки сообщений
<b>MAIL_USER_NAME</b>=admin - Логин для почтового сервера
<b>MAIL_USER_PASSWORD</b>=test - Пароль для почтового сервера
<b>MAIL_FROM</b>=<mail@mail.local> - Почтовый адресс
