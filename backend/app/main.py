from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import Base, engine
from .routes.products import router as products_router

app = FastAPI(title="SmartStock API", version="0.1.0", description="API inicial para gestión inteligente de inventarios")
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)


@app.get("/api/health", tags=["Sistema"])
def health_check():
    return {"status": "ok", "service": "smartstock-api"}
