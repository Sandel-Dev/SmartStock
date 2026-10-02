from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SmartStock API", version="0.1.0", description="API inicial para gestión inteligente de inventarios")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", tags=["Sistema"])
def health_check():
    return {"status": "ok", "service": "smartstock-api"}
