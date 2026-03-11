# from parse_transcripts import extract_participant_text

# text = extract_participant_text("data/Rose.cha")

# print(text)

from parse_transcripts import extract_participant_text
from extract_features import extract_features

text = extract_participant_text("data/Rose.cha")

print(text)

features = extract_features(text)

print(features)