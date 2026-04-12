import whisper
import ffmpeg
import librosa
import numpy as np
import os

model = whisper.load_model("tiny")


def convert_to_wav(input_path):

    output_path = input_path.replace(".webm", ".wav")

    (
        ffmpeg
        .input(input_path)
        .output(output_path, ac=1, ar=16000)
        .run(quiet=True, overwrite_output=True)
    )

    return output_path


def is_silent(audio_path, threshold=0.005):

    y, sr = librosa.load(audio_path, sr=16000)

    if len(y) < 16000:
        return True

    energy = np.mean(np.abs(y))
    print("Energy:", energy)

    return energy < threshold


def transcribe_audio(audio_path):

    # 🔥 Convert to wav first
    wav_path = convert_to_wav(audio_path)

    # 🔥 Now check silence
    if is_silent(wav_path):
        return ""

    result = model.transcribe(wav_path, language="en")

    return result["text"]