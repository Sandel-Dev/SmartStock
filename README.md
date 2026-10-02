# SmartStock

Sistema inteligente de gestión de inventarios y demanda.

## Tecnologías iniciales
- Frontend: React + Vite (JavaScript)
- API: Python + FastAPI
- Persistencia prevista: PostgreSQL
- Análisis y predicción: Pandas, NumPy y Scikit-learn (etapas posteriores)
- Control de versiones: Git

## Estructura
- `frontend/`: interfaz web y módulos de usuario.
- `backend/`: API y lógica de negocio.
- `docs/`: documentación, decisiones y roadmap técnico.
- `docker-compose.yml`: PostgreSQL local para desarrollo.

## Requisitos
Node.js 20+ y npm; Python 3.11+; Docker Desktop (opcional, para PostgreSQL); Git.

## Inicio rápido
1. Base de datos opcional: `docker compose up -d db`
2. API: `cd backend`, crear entorno virtual (`python -m venv .venv`), activarlo, instalar `pip install -r requirements.txt` y ejecutar `uvicorn app.main:app --reload`.
3. Interfaz: `cd frontend`, ejecutar `npm install` y `npm run dev`.
4. API docs: <http://127.0.0.1:8000/docs>; frontend: <http://localhost:5173>.

En este punto se entrega el esqueleto de inicio. Los módulos funcionales y la conexión real con PostgreSQL son trabajo de las siguientes etapas.

## Git remoto
El repositorio local está inicializado. Para enlazarlo a GitHub/GitLab cuando esté creado:
`git remote add origin <URL_DEL_REPOSITORIO>`
`git push -u origin main`

Consulta `docs/inicio_desarrollo.md` para decisiones, pantallas iniciales y roadmap.
