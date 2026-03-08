from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/knowledge",
    tags=["knowledge"],
)

@router.post("/", response_model=schemas.KnowledgeItem)
def create_knowledge_item(item: schemas.KnowledgeItemCreate, db: Session = Depends(get_db)):
    db_item = models.KnowledgeItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/{organization_id}", response_model=List[schemas.KnowledgeItem])
def list_knowledge_items(organization_id: str, db: Session = Depends(get_db)):
    return db.query(models.KnowledgeItem).filter(models.KnowledgeItem.organization_id == organization_id).all()

@router.delete("/{item_id}")
def delete_knowledge_item(item_id: str, db: Session = Depends(get_db)):
    db_item = db.query(models.KnowledgeItem).filter(models.KnowledgeItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}
