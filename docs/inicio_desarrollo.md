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

## 7. Primer avance funcional: módulo Productos
Como primer módulo conectado, se implementó el catálogo de productos. Desde la pantalla se pueden registrar, consultar, buscar, editar y eliminar productos. La vista también muestra el total de productos visibles, las existencias por debajo del mínimo y el valor estimado de esas existencias. Se valida que cantidades y precios no sean negativos y que el código SKU no se repita.

### Backend
- `app/main.py`: crea la aplicación FastAPI, configura CORS y registra las rutas.
- `app/routes/products.py`: controlador HTTP del recurso de productos; procesa las solicitudes y devuelve códigos de estado y respuestas.
- `app/models.py`: modelo SQLAlchemy que representa la tabla `products` y sus restricciones.
- `app/schemas.py`: esquemas Pydantic para validar la entrada y dar formato a la salida de la API.
- `app/database.py`: motor, sesiones y dependencia de base de datos por solicitud.

En esta primera iteración la lógica se mantiene dentro de las rutas y todavía no hay una capa de servicios separada. Esa separación puede añadirse cuando aumente la lógica de negocio.

### Rutas implementadas

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/health` | Comprueba que la API esté disponible. |
| GET | `/api/products` | Lista productos; acepta `search` y `low_stock_only`. |
| POST | `/api/products` | Registra un producto; responde `409` si el SKU ya existe. |
| PUT | `/api/products/{id}` | Actualiza un producto; responde `404` si no existe. |
| DELETE | `/api/products/{id}` | Elimina un producto; responde `204` si la operación termina correctamente. |

La validación de campos inválidos responde `422`. FastAPI publica el explorador de endpoints en `/docs`.

### Entorno y observaciones técnicas
Para que el primer avance se pueda ejecutar sin instalar un servidor de base de datos, se utilizó SQLite local en `backend/smartstock.db`. SQLAlchemy permite configurar PostgreSQL mediante `DATABASE_URL`; la conexión PostgreSQL se mantiene para una próxima configuración con credenciales y base de datos de desarrollo. No se implementaron todavía autenticación, roles, historial de movimientos ni endpoints separados para categorías y proveedores.

La interfaz necesita que el backend esté iniciado en `http://localhost:8000`. Si la API no está disponible, el módulo Productos muestra un mensaje para iniciar el backend.

### Pruebas básicas
Se añadieron pruebas automatizadas para el flujo de crear, listar, editar y eliminar productos; filtro de bajo inventario; SKU duplicado; y rechazo de cantidades negativas. Se ejecutaron desde `backend` con `pytest`: **2 pruebas aprobadas**. El entorno reportó una advertencia de obsolescencia de Starlette en `TestClient`; no afectó el resultado.

### Evidencia
Agregar las capturas de la pantalla del Dashboard y del módulo Productos cuando ambas estén funcionando con el backend.
