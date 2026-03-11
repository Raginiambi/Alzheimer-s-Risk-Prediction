import os
import sys
import pandas as pd
import joblib

from flask import Flask, request, jsonify
from flask_cors import CORS

# allow importing utils
sys.path.append("../")

from utils.extract_features import extract_features
from utils.parse_transcripts import extract_participant_text
from transcription.whisper_transcribe import transcribe_audio

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# load ML model
model = joblib.load("model/alzheimer_model.pkl")

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



@app.route("/analyze", methods=["POST"])
def analyze():

    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio = request.files["audio"]
    filepath = os.path.join(UPLOAD_FOLDER, audio.filename)
    audio.save(filepath)

    # prevent empty audio
    if os.path.getsize(filepath) < 2000:
        return jsonify({
            "error": "Audio too short. Please speak for a few seconds."
        }), 400

    transcript = transcribe_audio(filepath)

    # remove extra whitespace
    transcript = transcript.strip()

    # detect empty or hallucinated speech
    if len(transcript) < 3:
        return jsonify({
            "error": "No speech detected. Please answer the question."
        }), 400

    features = extract_features(transcript)

    df = pd.DataFrame([features], columns=columns)

    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]

    confidence = float(max(probabilities) * 100)

    label = "No Risk" if prediction == 0 else "Alzheimer Risk"

    return jsonify({
        "transcript": transcript,
        "prediction": label,
        "confidence": confidence,
        "features" : dict(zip(columns,features))
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)