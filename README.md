# React Routes Music (pnpm + Vite)

Учебный проект по маршрутизации в React (тема: музыка).
Реализовано:
- Главная, About, Tracks (поиск по ?q=), Track Detail, Subscribe (форма).
- Мок-данные + задержки (setTimeout).
- Навигация и маршруты на React Router.

Особенность окружения: из-за ограничений сети используется UMD-подключение React/ReactDOM/React Router из папки `public/`,
поэтому проект запускается офлайн без npm-реестра.

## Запуск
```bash
pnpm run dev
```

Открой http://localhost:5173

Структура:

src/utils/api.js — мок-API c задержками.
src/main.jsx — маршрутизация и страницы.
public/*.umd.js — UMD-бандлы React/Router (локально).
