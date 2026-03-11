import re

def extract_features(text):

    # words
    words = re.findall(r'\b\w+\b', text.lower())

    total_words = len(words)
    unique_words = len(set(words))

    avg_word_length = sum(len(w) for w in words) / total_words if total_words else 0
    lexical_diversity = unique_words / total_words if total_words else 0

    # repetition rate
    repetition_rate = (total_words - unique_words) / total_words if total_words else 0

    # filler words
    filler_words = ["uh", "um", "erm", "hmm"]
    filler_count = sum(words.count(f) for f in filler_words)

    pause_rate = filler_count / total_words if total_words else 0

    # sentence length
    sentences = re.split(r'[.!?]', text)
    sentence_lengths = [len(re.findall(r'\b\w+\b', s)) for s in sentences if s.strip()]
    avg_sentence_length = sum(sentence_lengths) / len(sentence_lengths) if sentence_lengths else 0

    return [
        total_words,
        unique_words,
        avg_word_length,
        lexical_diversity,
        repetition_rate,
        filler_count,
        avg_sentence_length,
        pause_rate
    ]