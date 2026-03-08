from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.put("/me", response_model=schemas.User)
def update_user_me(user_update: schemas.UserCreate, db: Session = Depends(get_db)):
    # Since we don't have auth yet, we'll just update the first user or create one
    db_user = db.query(models.User).first()
    if not db_user:
        db_user = models.User(
            email=user_update.email,
            full_name=user_update.full_name,
            description=user_update.description,
            hashed_password="hashed_password", # Placeholder
            is_active=True
        )
        db.add(db_user)
    else:
        db_user.email = user_update.email
        db_user.full_name = user_update.full_name
        db_user.description = user_update.description
    
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/me", response_model=schemas.User)
def get_user_me(db: Session = Depends(get_db)):
    db_user = db.query(models.User).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
