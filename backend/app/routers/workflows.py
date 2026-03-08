from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/workflows",
    tags=["workflows"],
)

@router.post("/", response_model=schemas.Workflow)
def create_workflow(workflow: schemas.WorkflowCreate, db: Session = Depends(get_db)):
    db_workflow = models.Workflow(**workflow.dict())
    db.add(db_workflow)
    db.commit()
    db.refresh(db_workflow)
    return db_workflow

@router.get("/{organization_id}", response_model=List[schemas.Workflow])
def list_workflows(organization_id: str, db: Session = Depends(get_db)):
    return db.query(models.Workflow).filter(models.Workflow.organization_id == organization_id).all()

@router.delete("/{workflow_id}")
def delete_workflow(workflow_id: str, db: Session = Depends(get_db)):
    db_workflow = db.query(models.Workflow).filter(models.Workflow.id == workflow_id).first()
    if not db_workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    db.delete(db_workflow)
    db.commit()
    return {"message": "Workflow deleted"}
