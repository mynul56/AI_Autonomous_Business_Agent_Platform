from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    description: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class OrganizationBase(BaseModel):
    name: str
    slug: str

class OrganizationCreate(OrganizationBase):
    pass

class Organization(OrganizationBase):
    id: UUID
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

class AgentBase(BaseModel):
    name: str
    role: str
    prompt: str

class AgentCreate(AgentBase):
    organization_id: UUID

class Agent(AgentBase):
    id: UUID
    status: str
    organization_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class KnowledgeItemBase(BaseModel):
    name: str
    type: str
    size: Optional[str] = None

class KnowledgeItemCreate(KnowledgeItemBase):
    organization_id: UUID

class KnowledgeItem(KnowledgeItemBase):
    id: UUID
    organization_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationBase(BaseModel):
    visitor_id: str
    agent_id: UUID
    last_message: Optional[str] = None
    status: str

class ConversationCreate(ConversationBase):
    organization_id: UUID

class Conversation(ConversationBase):
    id: UUID
    organization_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class WorkflowBase(BaseModel):
    title: str
    trigger: str
    action: str
    color: str = "bg-blue-500"

class WorkflowCreate(WorkflowBase):
    organization_id: UUID

class Workflow(WorkflowBase):
    id: UUID
    last_triggered: Optional[str] = None
    organization_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
