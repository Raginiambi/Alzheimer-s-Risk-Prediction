import re
import numpy as np

def extract_features(text):

    words = text.split()
    sentences = re.split(r'[.!?]+', text)

    total_words = len(words)
    unique_words = len(set(words))

    avg_word_length = np.mean([len(w) for w in words]) if words else 0

    lexical_diversity = unique_words / total_words if total_words else 0

    repetition_rate = 1 - lexical_diversity

    fillers = ["um", "uh", "like", "you know"]
    filler_count = sum(text.count(f) for f in fillers)

    avg_sentence_length = total_words / len(sentences) if sentences else 0

    pause_count = text.count("...")

    # 🔥 NEW FEATURES
    short_word_ratio = sum(1 for w in words if len(w) <= 3) / total_words if total_words else 0
    punctuation_count = len(re.findall(r'[.,!?]', text))

    return [
        total_words,
        unique_words,
        avg_word_length,
        lexical_diversity,
        repetition_rate,
        filler_count,
        avg_sentence_length,
        pause_count,
        short_word_ratio,
        punctuation_count
    ]