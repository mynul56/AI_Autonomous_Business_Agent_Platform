from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/members",
    tags=["members"],
)

@router.get("/{organization_id}", response_model=List[schemas.Membership])
def list_members(organization_id: UUID, db: Session = Depends(get_db)):
    return db.query(models.Membership).filter(models.Membership.organization_id == organization_id).all()

@router.put("/{organization_id}/{user_id}")
def update_member_role(organization_id: UUID, user_id: UUID, role: str, db: Session = Depends(get_db)):
    db_membership = db.query(models.Membership).filter(
        models.Membership.organization_id == organization_id,
        models.Membership.user_id == user_id
    ).first()
    if not db_membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    db_membership.role = role
    db.commit()
    return {"message": "Role updated"}

@router.delete("/{organization_id}/{user_id}")
def remove_member(organization_id: UUID, user_id: UUID, db: Session = Depends(get_db)):
    db_membership = db.query(models.Membership).filter(
        models.Membership.organization_id == organization_id,
        models.Membership.user_id == user_id
    ).first()
    if not db_membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    db.delete(db_membership)
    db.commit()
    return {"message": "Member removed"}
