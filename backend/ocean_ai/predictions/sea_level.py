import os
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'sea_level.csv')

df = pd.read_csv(DATA_PATH)
X = df['Year'].values.reshape(-1, 1)
y = df['SeaLevel_mm'].values

model = LinearRegression()
model.fit(X, y)

def predict_sea_level(year: int) -> float:
    prediction = model.predict(np.array([[year]]))[0]
    return float(prediction)
