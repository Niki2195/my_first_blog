# Load-test NestJS + Vue + PostgreSQL (docker-compose)

## Описание проекта
Простой сервис с API на NestJS и фронтендом на Vue 3 для нагрузочного тестирования.  
Позволяет отправлять множество запросов к `GET /items` и отображать результаты в реальном времени.

### Стек:
- Backend: NestJS + TypeORM (PostgreSQL)
- Frontend: Vue 3 + Vite
- База: PostgreSQL (через Docker)
- Контейнеризация: Docker / docker-compose

---

## Установка и запуск

1. Склонируй репозиторий:
```bash
git clone <https://github.com/Niki2195/loadtest-project>
cd loadtest-project