from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/conversations",
    tags=["conversations"],
)

@router.get("/{organization_id}", response_model=List[schemas.Conversation])
def list_conversations(organization_id: str, db: Session = Depends(get_db)):
    return db.query(models.Conversation).filter(models.Conversation.organization_id == organization_id).all()
