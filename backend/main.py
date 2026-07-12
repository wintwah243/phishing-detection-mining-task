from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS so React frontend can access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class URLInput(BaseModel):
    url: str


@app.get("/")
def read_root():
    return {"message": "FastAPI server is running successfully!"}


@app.post("/predict")
def predict_scam(data: URLInput):
    incoming_url = data.url

    #  a mock prediction for now
    is_scam = True if "scam" in incoming_url.lower() or "phish" in incoming_url.lower() else False
    confidence = 0.94 if is_scam else 0.12
    # -----------------------------------------

    return {
        "url": incoming_url,
        "is_scam": is_scam,
        "confidence_score": confidence,
        "status": "success"
    }