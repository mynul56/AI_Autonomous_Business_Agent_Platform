from app.database import engine, Base
from app.models import User, Organization, Membership, Agent, KnowledgeItem, Conversation

def init_db():
    print("Dropping existing tables...")
    Base.metadata.drop_all(bind=engine)
    print("Initializing database...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")

if __name__ == "__main__":
    init_db()
