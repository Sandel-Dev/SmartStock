# Inicio del desarrollo y estructura del proyecto

**Proyecto:** SmartStock - Sistema Inteligente de Gestión de Inventarios y Demanda  
**Responsable:** Sandel Arache (2023-1070)  
**Estado:** base técnica inicial preparada; funcionalidades de negocio pendientes.

## 1. Configuración del repositorio
Se preparó un repositorio Git local con rama principal `main` y archivos iniciales. No se configuró un remoto porque la propuesta no identifica una URL de GitHub/GitLab ni se proporcionó un repositorio existente. Cuando se cree el remoto, enlazarlo con `git remote add origin <URL>` y publicar la rama con `git push -u origin main`.

El `.gitignore` excluye dependencias, entornos virtuales, cachés, secretos y archivos locales. Se incluye `.env.example`; los secretos reales deben mantenerse fuera del control de versiones.

## 2. Estructura y tecnologías

```text
SmartStock/
├── backend/
│   ├── app/
│   │   └── main.py          # API FastAPI y endpoint de salud
│   ├── tests/               # reservado para pruebas futuras
│   └── requirements.txt
├── docs/
│   └── inicio_desarrollo.md
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx          # navegación y pantallas iniciales
│       ├── main.jsx
│       └── styles.css
├── .env.example
├── .gitignore
├── docker-compose.yml       # PostgreSQL para desarrollo local
└── README.md
```

Se conserva la propuesta tecnológica original: React y JavaScript para frontend; Python y FastAPI para backend; PostgreSQL como base de datos. Pandas, NumPy y Scikit-learn se incorporarán cuando se desarrolle análisis y predicción. Recharts queda previsto para la visualización.

## 3. Pantallas y módulos preparados
La interfaz inicial incluye navegación y vistas vacías para Dashboard, Productos, Categorías, Proveedores, Movimientos, Análisis de demanda, Predicciones y Alertas. Son placeholders de estructura: aún no tienen formularios, datos, permisos ni lógica conectada.

El backend incluye `GET /api/health` para comprobar que la API inicia. No se implementaron todavía endpoints de inventario ni conexión a PostgreSQL.

## 4. Entorno de desarrollo
- Node.js 20+ y npm para instalar/ejecutar el frontend.
- Python 3.11+ y `venv` para aislar dependencias del backend.
- Docker Desktop opcional para levantar PostgreSQL con `docker compose up -d db`.
- API interactiva en `/docs`; frontend Vite en `localhost:5173`.
- Variables de conexión de ejemplo en `.env.example`; no contienen credenciales reales.

## 5. Roadmap técnico

| Etapa | Resultado esperado |
|---|---|
| 1. Fundamentos | Crear remoto, acordar flujo de ramas y configurar variables por entorno. |
| 2. Diseño de datos | Definir entidades, relaciones, reglas y migraciones PostgreSQL. |
| 3. Inventario | CRUD de productos, categorías y proveedores; entradas, salidas e historial. |
| 4. API y persistencia | Conectar FastAPI a PostgreSQL, validar datos y documentar endpoints. |
| 5. Análisis | Cargar datos históricos y calcular rotación, tendencias y períodos de consumo. |
| 6. Predicción | Establecer datos mínimos, línea base de predicción y evaluación del error. |
| 7. Alertas/recomendaciones | Definir umbrales y reglas explicables de reposición y riesgo de agotamiento. |
| 8. Dashboard | Integrar indicadores, gráficos, estados y recomendaciones con datos reales. |
| 9. Verificación y entrega | Pruebas funcionales, correcciones, documentación de usuario y demostración. |

El orden es incremental: primero inventario confiable e historial; luego análisis y predicción. Las integraciones contables, facturación, comercio electrónico y automatización física quedan fuera del alcance inicial según la propuesta.

## 6. Próximo avance recomendado
Conectar el repositorio remoto, definir el modelo de datos mínimo (`Producto`, `Categoría`, `Proveedor`, `Movimiento`) y completar el CRUD de productos antes de iniciar el componente predictivo.
