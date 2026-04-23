import joblib
import pandas as pd
from utils.parse_transcripts import extract_participant_text
from utils.extract_features import extract_features

# load trained model
model = joblib.load("Backend/model/alzheimer_model.pkl")

file_path = input("Enter transcript file path: ")

# extract speech text
text = extract_participant_text(file_path)

# extract linguistic features
features = extract_features(text)

columns = [
    "total_words",
    "unique_words",
    "avg_word_length",
    "lexical_diversity",
    "repetition_rate",
    "filler_count",
    "avg_sentence_length",
    "pause_count"
]

features_df = pd.DataFrame([features], columns=columns)

# prediction
prediction = model.predict(features_df)[0]

# prediction probability
probabilities = model.predict_proba(features_df)[0]
confidence = max(probabilities) * 100

# output result
if prediction == 0:
    print("Prediction: Control (No Alzheimer Risk)")
else:
    print("Prediction: Alzheimer Risk Detected")

print(f"Confidence: {confidence:.2f}%")