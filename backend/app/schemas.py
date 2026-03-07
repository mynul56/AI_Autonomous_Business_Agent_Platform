from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class OrganizationBase(BaseModel):
    name: str

class OrganizationCreate(OrganizationBase):
    pass

class Organization(OrganizationBase):
    id: UUID
    owner_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class Membership(BaseModel):
    user_id: UUID
    organization_id: UUID
    role: str
    created_at: datetime

    class Config:
        from_attributes = True
