from pydantic import BaseModel, ConfigDict, Field


class ProductInput(BaseModel):
    sku: str = Field(min_length=1, max_length=40)
    name: str = Field(min_length=1, max_length=120)
    category: str = Field(default="General", min_length=1, max_length=80)
    quantity: int = Field(default=0, ge=0)
    min_quantity: int = Field(default=0, ge=0)
    unit_price: float = Field(default=0, ge=0)


class ProductRead(ProductInput):
    model_config = ConfigDict(from_attributes=True)
    id: int

