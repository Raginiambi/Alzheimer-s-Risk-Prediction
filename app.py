import streamlit as st
import joblib
import pandas as pd

from parse_transcripts import extract_participant_text
from extract_features import extract_features

model = joblib.load("model/alzheimer_model.pkl")

st.title("Speech-Based Alzheimer Risk Classification")

uploaded_file = st.file_uploader("Upload Transcript (.cha)", type="cha")

if uploaded_file is not None:

    with open("temp.cha", "wb") as f:
        f.write(uploaded_file.getbuffer())

    text = extract_participant_text("temp.cha")

    features = extract_features(text)

    columns = [
        "total_words",
        "unique_words",
        "avg_word_length",
        "lexical_diversity",
        "repetition_rate",
        "filler_count",
        "avg_sentence_length"
    ]

    features_df = pd.DataFrame([features], columns=columns)

    prediction = model.predict(features_df)[0]
    probabilities = model.predict_proba(features_df)[0]
    confidence = max(probabilities) * 100

    if prediction == 0:
        st.success("Prediction: Control (No Alzheimer Risk)")
    else:
        st.error("Prediction: Alzheimer Risk Detected")

    st.write(f"Confidence: {confidence:.2f}%")