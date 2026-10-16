from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db


router = APIRouter(prefix="/api/products", tags=["Productos"])


@router.get("", response_model=list[schemas.ProductRead])
def list_products(
    search: str = Query(default="", max_length=120),
    low_stock_only: bool = False,
    db: Session = Depends(get_db),
):
    query = select(models.Product).order_by(models.Product.name)
    if search.strip():
        query = query.where(models.Product.name.ilike(f"%{search.strip()}%"))
    if low_stock_only:
        query = query.where(models.Product.quantity <= models.Product.min_quantity)
    return db.scalars(query).all()


@router.post("", response_model=schemas.ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductInput, db: Session = Depends(get_db)):
    item = models.Product(**product.model_dump())
    db.add(item)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Ya existe un producto con ese código SKU") from exc
    db.refresh(item)
    return item


@router.put("/{product_id}", response_model=schemas.ProductRead)
def update_product(product_id: int, product: schemas.ProductInput, db: Session = Depends(get_db)):
    item = db.get(models.Product, product_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    for key, value in product.model_dump().items():
        setattr(item, key, value)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Ya existe un producto con ese código SKU") from exc
    db.refresh(item)
    return item


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    item = db.get(models.Product, product_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db.delete(item)
    db.commit()
