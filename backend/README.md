# BlackDots backend

FastAPI + SQLAlchemy 2 + SQLite backend for the static BlackDots website.

## Local run

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python -m app.seed
uvicorn app.main:app --reload
```

The API is available at `http://127.0.0.1:8000/api`, health is
`http://127.0.0.1:8000/api/health`, and Swagger UI is `/docs`.

The frontend login stores the returned JWT as `adminToken` and sends it as
`Authorization: <token>`. The API accepts that form and standard
`Authorization: Bearer <token>` headers.

## Backend structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── seed.py
│   └── routers/
│       ├── __init__.py
│       ├── crud.py
│       ├── auth.py
│       ├── upload.py
│       ├── phases.py
│       ├── partners.py
│       ├── services.py
│       ├── team.py
│       ├── industries.py
│       ├── apps.py
│       ├── testimonials.py
│       ├── blogs.py
│       ├── faqs.py
│       ├── messages.py
│       ├── vacancies.py
│       └── applications.py
├── uploads/
│   └── .gitkeep
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
└── blackdots.db                 # создаётся после запуска/seed
```

### Корневые файлы

- `requirements.txt` — зависимости Python: FastAPI, Uvicorn, SQLAlchemy,
  Pydantic Settings, JWT и обработка multipart-файлов.
- `.env.example` — шаблон переменных окружения. Скопируйте его в `.env` и
  замените секреты перед запуском.
- `.gitignore` — не позволяет добавить в git `.env`, SQLite-базу, временные
  файлы Python и загруженные файлы.
- `README.md` — команды запуска, описание структуры и инструкции деплоя.
- `blackdots.db` — локальная SQLite-база. Файл создаётся автоматически и не
  хранится в репозитории.
- `uploads/` — каталог загруженных изображений и видео. `.gitkeep` сохраняет
  пустой каталог в git.

### Файлы внутри `app/`

- `__init__.py` — отмечает `app` как Python-пакет.
- `main.py` — создаёт FastAPI-приложение, подключает CORS, все роутеры,
  Swagger, статические загрузки, `/api/health` и общий обработчик ошибок.
- `config.py` — читает настройки из `.env`: URL базы, JWT-секрет, логин,
  пароль администратора и разрешённые origins.
- `database.py` — создаёт SQLAlchemy engine, базовый класс моделей,
  `SessionLocal` и dependency `get_db` для подключения к базе в endpoint-ах.
- `models.py` — SQLAlchemy-модели таблиц `phases`, `partners`, `services`,
  `team`, `industries`, `apps`, `testimonials`, `blogs`, `faqs`, `messages`,
  `vacancies` и `applications`.
- `schemas.py` — Pydantic-схемы входных данных. Они проверяют JSON-запросы,
  email, числовые значения, статусы и обязательные поля.
- `auth.py` — хэширование пароля PBKDF2, проверка логина, создание JWT и
  dependency `require_admin`, защищающая административные операции.
- `seed.py` — создаёт таблицы и добавляет демонстрационные записи на
  азербайджанском языке. Повторный запуск не перезаписывает непустую базу.

### Папка `app/routers/`

- `crud.py` — общий фабричный CRUD для простых сущностей. Он реализует
  получение списка, получение по ID, создание, изменение и удаление.
- `auth.py` — `POST /api/login` и `POST /api/admin/change-password`.
- `upload.py` — `POST /api/upload`, проверяет расширение файла и сохраняет
  изображение или видео в `uploads/`.
- `phases.py` — CRUD методологических фаз.
- `partners.py` — CRUD партнёров и клиентов.
- `services.py` — CRUD услуг.
- `team.py` — CRUD участников команды.
- `industries.py` — CRUD отраслей.
- `apps.py` — CRUD Odoo-приложений.
- `testimonials.py` — CRUD отзывов клиентов.
- `blogs.py` — CRUD публикаций блога.
- `faqs.py` — CRUD часто задаваемых вопросов.
- `messages.py` — публичная отправка контактного сообщения и защищённые
  просмотр, отметка прочитанным и удаление.
- `vacancies.py` — CRUD вакансий; список вакансий публичен.
- `applications.py` — публичная отправка заявки на вакансию и защищённые
  просмотр, изменение статуса и удаление.

### Как проходит запрос

1. Браузер отправляет запрос на `/api/...`.
2. FastAPI выбирает нужный router из `app/routers/`.
3. Pydantic-схема из `schemas.py` проверяет тело запроса.
4. Для защищённой операции `auth.py` проверяет JWT.
5. Router получает SQLAlchemy-сессию через `database.py`.
6. Модель из `models.py` читает или изменяет SQLite.
7. Результат возвращается фронтенду в JSON.

Публичные GET-запросы контента, а также отправка контактной формы и заявки на
вакансию не требуют регистрации. Авторизация нужна только для админки.

## Render

Build command: `pip install -r backend/requirements.txt`

Start command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

Configure `DATABASE_URL`, `SECRET_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and
`ALLOWED_ORIGINS` in Render environment variables. Render's local filesystem is
ephemeral, so SQLite data and uploaded files are lost after a restart. For
production, use a managed PostgreSQL `DATABASE_URL`; SQLAlchemy will use it
without changing the models.

Before production: change the admin password and secret key, keep `.env` out of
git, configure backups, and replace the frontend API URL with the deployed URL.
