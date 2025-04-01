# server/analyse_earthquake.py

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
import keras
from keras import layers
from keras.layers import Input, Dense
from keras.models import Model
from keras.losses import MeanSquaredError, BinaryCrossentropy
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from joblib import dump

# --------------------------
# Load & Inspect Data
#---------------------------
df = pd.read_csv("../data/earthquake_1995-2023.csv")

print("🔍 Data Preview:")
print(df.head())

# Basic information
print("\n📊 Dataset Information:")
print(df.info())

# --------------------------
# Clean & Filter Data
#---------------------------
# Rename columns to lowercase for consistency
df.rename(columns=lambda col: col.lower(), inplace=True)
# Make sure column names match your CSV exactly (case-sensitive)
required_columns = ['latitude', 'longitude', 'depth', 'magnitude']
# Drop rows with missing values in key columns
df.dropna(subset=required_columns, inplace=True)


# --------------------------
# Visualisations
#---------------------------
# Magnitude distribution
plt.figure(figsize=(10, 6))
sns.histplot(df['magnitude'], bins=30, kde=True)
plt.title("Magnitude Distribution")
plt.xlabel("Magnitude")
plt.ylabel("Frequency")
plt.show()

# Earthquake locations
plt.figure(figsize=(12, 6))
plt.scatter(df['longitude'], df['latitude'], c=df['magnitude'], cmap='hot', alpha=0.6)
plt.colorbar(label='Magnitude')
plt.title('Earthquake Locations')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.grid(True)
plt.show()

# --------------------------
# Preprocessing
#---------------------------

scaler = MinMaxScaler()


targets = df[['magnitude', 'tsunami', 'mmi', 'cdi', 'depth']].dropna()
features = df[['latitude', 'longitude', 'depth']].loc[targets.index]
X = scaler.fit_transform(features)
y = targets.values

X = X[:len(y)]

# ✅ Save the fitted scaler to use in the API
dump(scaler, "scaler.pkl")
print("✅ Scaler saved as scaler.pkl")

X_train, X_test, y_train,y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"✅ Training data shape: {X_train.shape}, Test data shape: {X_test.shape}")

# --------------------------
# Build & Train ANN
#---------------------------

# Input layer (3 features: latitude, longitude, depth)
input_layer = Input(shape=(3,))
x = Dense(64, activation='relu')(input_layer)
x = Dense(64, activation='relu')(x)

# Output layers for each prediction target
magnitude_out = Dense(1, name='magnitude')(x)
tsunami_out = Dense(1, activation='sigmoid', name='tsunami')(x)
mmi_out = Dense(1, name='mmi')(x)
cdi_out = Dense(1, name='cdi')(x)
depth_out = Dense(1, name='depth')(x)

# Combine into a model
model = Model(inputs=input_layer, outputs=[magnitude_out, tsunami_out, mmi_out, cdi_out, depth_out])

model.compile(
    optimizer='adam',
    loss={
        'magnitude': MeanSquaredError(),
        'tsunami': BinaryCrossentropy(),
        'mmi': MeanSquaredError(),
        'cdi': MeanSquaredError(),
        'depth': MeanSquaredError()
    },
    metrics={
        'magnitude': ['mae'],
        'tsunami': ['accuracy'],
        'mmi': ['mae'],
        'cdi': ['mae'],
        'depth': ['mae']
    }
)

model.summary()

# Train the model
history = model.fit(
    X_train,
    {
        'magnitude': y_train[:, 0],
        'tsunami': y_train[:, 1],
        'mmi': y_train[:, 2],
        'cdi': y_train[:, 3],
        'depth': y_train[:, 4]
    },
    epochs=50,
    validation_split=0.2,
    verbose=1
)


# --------------------------
# Evaluate & Save Model
#---------------------------
loss = model.evaluate(
    X_test, 
    {
        'magnitude': y_test[:, 0],
        'tsunami': y_test[:, 1],
        'mmi': y_test[:, 2],
        'cdi': y_test[:, 3],
        'depth': y_test[:, 4]
    }, 
    verbose=1
)
print(f"📉 Test Loss: {loss}")

model.save("earthquake_predictor.h5")
print("✅ Model saved as earthquake_predictor.h5")
