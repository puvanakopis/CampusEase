from pydantic import BaseModel, Field

class Counter(BaseModel):
    _id: str 
    seq: int = 0 