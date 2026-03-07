import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=True) # Could be NULL if using Auth0/Firebase
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    memberships = relationship("Membership", back_populates="user")

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    memberships = relationship("Membership", back_populates="organization")

class Membership(Base):
    __tablename__ = "memberships"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), primary_key=True)
    role = Column(String, default="member") # owner, admin, member
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="memberships")
    organization = relationship("Organization", back_populates="memberships")
