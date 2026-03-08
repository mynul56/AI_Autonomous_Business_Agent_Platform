from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/organizations",
    tags=["organizations"],
)

@router.post("/", response_model=schemas.Organization)
def create_organization(org: schemas.OrganizationCreate, db: Session = Depends(get_db)):
    # Mock user_id for now (should come from auth)
    # In a real app, we'd get the current user from a JWT
    # For now, let's assume we have a way to identify the owner
    
    # Check if a default user exists for testing, create one if not
    user = db.query(models.User).first()
    if not user:
        # Create a dummy user if none exists (just for development bootstrap)
        user = models.User(
            email="admin@example.com",
            full_name="Admin",
            hashed_password="hashed_password", # Satisfy non-nullable
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Simple slug generation
    slug = org.name.lower().replace(" ", "-")
    db_org = models.Organization(name=org.name, slug=slug, owner_id=user.id)
    db.add(db_org)
    db.commit()
    db.refresh(db_org)
    
    # Create membership for the owner
    db_membership = models.Membership(
        user_id=user.id, 
        organization_id=db_org.id, 
        role="owner"
    )
    db.add(db_membership)
    db.commit()
    
    return db_org

@router.get("/", response_model=List[schemas.Organization])
def list_organizations(db: Session = Depends(get_db)):
    return db.query(models.Organization).all()
