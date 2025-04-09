from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class EarthquakeFeatures(BaseModel):
    latitude: float
    longitude: float
    depth: float

@app.post("/predict")
async def predict(features: EarthquakeFeatures):
    return {"received": features.dict()}
