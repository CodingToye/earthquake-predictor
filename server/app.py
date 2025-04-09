# server/app.py

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import Query
from pydantic import BaseModel
from geopy.distance import geodesic
import numpy as np
import tensorflow as tf
import pandas as pd
import requests
from fastapi import HTTPException
from tensorflow.keras.models import load_model
from joblib import load
from fastapi.middleware.cors import CORSMiddleware

# Load scaler
scaler = load("scaler.pkl")

# Load model
model = load_model("earthquake_predictor.h5")

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Request schema
class EarthquakeFeatures(BaseModel):
    latitude: float
    longitude: float
    depth: float

# Dummy scale - in real usage, load from file (eg with joblib)
scaler.fit([[0,0,0], [90, 180, 700]]) # very rough global bounds

@app.get("/")
def root():
    return {"message": "🌍 Earthquake Prediction API is running!"}

@app.get("/geocode")
def geocode(query: str):
    try:
        response = requests.get(
            "https://nominatim.openstreetmap.org/search",
            params={"format": "json", "q": query},
            headers={"User-Agent": "earthquake-app"}
        )
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict(features: EarthquakeFeatures):
    input_data = np.array([[features.latitude, features.longitude, features.depth]])
    scaled_data = scaler.transform(input_data)
    mag, tsu, mmi, cdi, dep = model.predict(scaled_data)
    return {
        "predicted_magnitude": round(float(mag[0][0]), 2),
        "predicted_tsunami": int(tsu[0][0] > 0.5),
        "predicted_mmi": round(float(mmi[0][0]), 1),
        "predicted_cdi": round(float(cdi[0][0]), 1),
        "predicted_depth": round(float(dep[0][0]), 1),
    }

df = pd.read_csv("earthquake_1995-2023.csv")
df["date_time"] = pd.to_datetime(df['date_time'])

@app.get("/latest")
def get_latest_earthquake():
    latest = df.sort_values("date_time", ascending=False).iloc[0]

    result = {
        "title": latest["title"],
        "magnitude": latest["magnitude"],
        "date_time": latest["date_time"].isoformat(),
        "latitude": latest["latitude"],
        "longitude": latest["longitude"],
        "depth": latest["depth"],
        "location": latest.get("location", "Unknown"),
        "country": latest.get("country", "Unknown"),
        "tsunami": int(latest["tsunami"]) if not pd.isna(latest["tsunami"]) else 0,
        "cdi": float(latest["cdi"]) if not pd.isna(latest["cdi"]) else None,
        "mmi": float(latest["mmi"]) if not pd.isna(latest["mmi"]) else None,
        "alert": str(latest["alert"]) if not pd.isna(latest["alert"]) else None
    }

    return JSONResponse(content=result)

@app.get("/latest-by-location")
def get_latest_earthquake_by_location(query: str = Query(...)):
    matches = df[
        df['location'].fillna('').str.contains(query, case=False) |
        df['country'].fillna('').str.contains(query, case=False)
    ]

    if matches.empty:
        return JSONResponse(content={"error": "No matching earthquakes found."}, status_code=404)

    latest = matches.sort_values("date_time", ascending=False).iloc[0]

    result = {
        "title": latest["title"],
        "magnitude": latest["magnitude"],
        "date_time": latest["date_time"].isoformat(),
        "latitude": latest["latitude"],
        "longitude": latest["longitude"],
        "depth": latest["depth"],
        "location": str(latest["location"]) if not pd.isna(latest["location"]) else "Unknown",
        "country": str(latest["country"]) if not pd.isna(latest["country"]) else "Unknown",
        "tsunami": int(latest["tsunami"]) if not pd.isna(latest["tsunami"]) else 0,
        "cdi": float(latest["cdi"]) if not pd.isna(latest["cdi"]) else None,
        "mmi": float(latest["mmi"]) if not pd.isna(latest["mmi"]) else None,
        "alert": str(latest["alert"]) if not pd.isna(latest["alert"]) else None
    }

    return JSONResponse(content=result)

@app.get("/nearest")
def get_nearest_earthquake(lat: float, lon: float):
    df_with_distance = df.copy()
    df_with_distance["distance_km"] = df.apply(
        lambda row: geodesic((lat, lon), (row["latitude"], row["longitude"])).kilometers,
        axis=1
    )

    closest = df_with_distance.sort_values("distance_km").iloc[0]

    result = {
        "title": closest["title"],
        "magnitude": closest["magnitude"],
        "date_time": closest["date_time"].isoformat(),
        "latitude": closest["latitude"],
        "longitude": closest["longitude"],
        "depth": closest["depth"],
        "location": str(closest["location"]) if not pd.isna(closest["location"]) else "Unknown",
        "country": str(closest["country"]) if not pd.isna(closest["country"]) else "Unknown",
        "tsunami": int(closest["tsunami"]) if not pd.isna(closest["tsunami"]) else 0,
        "cdi": float(closest["cdi"]) if not pd.isna(closest["cdi"]) else None,
        "mmi": float(closest["mmi"]) if not pd.isna(closest["mmi"]) else None,
        "distance_km": round(closest["distance_km"], 1),
        "alert": str(closest["alert"]) if not pd.isna(closest["alert"]) else None
    }

    return JSONResponse(content=result)

@app.get("/nearby")
def get_earthquakes_nearby(lat: float, lon: float, radius_km: float = 50, mag_min: float = None, mag_max: float = None, year_min: int = None, year_max: int = None):
    df_with_distance = df.copy()
    df_with_distance["distance_km"] = df.apply(
        lambda row: geodesic((lat, lon), (row["latitude"], row["longitude"])).kilometers,
        axis=1
    )

    nearby = df_with_distance[df_with_distance["distance_km"] <= radius_km]

    if mag_min is not None:
        nearby = nearby[nearby["magnitude"] >= mag_min]
    if mag_max is not None:
        nearby = nearby[nearby["magnitude"] <= mag_max]
    
    if year_min is not None:
        nearby = nearby[nearby["date_time"].dt.year >= year_min]
    if year_max is not None:
        nearby = nearby[nearby["date_time"].dt.year <= year_max]

    nearby_sorted = nearby.sort_values("date_time", ascending=False)

    results = []
    for _, row in nearby_sorted.iterrows():
        results.append({
            "title": row["title"],
            "magnitude": row["magnitude"],
            "date_time": row["date_time"].isoformat(),
            "latitude": row["latitude"],
            "longitude": row["longitude"],
            "depth": row["depth"],
            "location": str(row["location"]) if not pd.isna(row["location"]) else "Unknown",
            "country": str(row["country"]) if not pd.isna(row["country"]) else "Unknown",
            "tsunami": int(row["tsunami"]) if not pd.isna(row["tsunami"]) else 0,
            "cdi": float(row["cdi"]) if not pd.isna(row["cdi"]) else None,
            "mmi": float(row["mmi"]) if not pd.isna(row["mmi"]) else None,
            "distance_km": round(row.get("distance_km", 0), 1),
            "alert": str(row["alert"]) if not pd.isna(row["alert"]) else None
        })

    return JSONResponse(content=results)