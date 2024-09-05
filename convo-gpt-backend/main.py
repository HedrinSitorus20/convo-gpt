from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from service_dialogue import api_call_dialogue

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DialogueInput(BaseModel):
    language: str
    num_person: int
    theme: str

@app.post("/generate-dialogue")
async def generate_dialogue(input: DialogueInput):
    result = api_call_dialogue(input.model_dump())
    return {"dialogue": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)