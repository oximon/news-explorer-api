# news-explorer - backend
Актуальная версия проекта - v1.0.0.  
## [http://84.201.145.241/](84.201.145.241) [http://news-expl0rer.tk/](news-expl0rer.tk)

В проекте можно зарегистрироваться, авторизоваться, добавить/удалить статью.  
Здесь используются следующие техногологии: GIT, nodeJS, express.

## Функционал:
| Запрос                            | Ответ                         |
| -------------                     |-------------                |
| GET localhost:3000/users/me          | вернёт данные о текущем пользователе |
| POST localhost:3000/users/signup   | Зарегистрироваться в базе;|
| POST localhost:3000/users/signip   | авторизоваться в базе;|
| GET localhost:3000/articles          | вернёт все статьи пользователя; |
| POST localhost:3000/articles          | создаст статью; |
| DELETE localhost:3000/articles/{id}         | Удалит статью с переданным после /articles идентификатором;|

### Установка и запуск

```bash
# Устанавливаем зависимости
npm install

# Запускаем приложение для разработки.
npm run dev

# Запускаем приложение в production-режиме.
npm run start
```
