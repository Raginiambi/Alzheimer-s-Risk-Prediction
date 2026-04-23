import pandas as pd

df = pd.read_csv("model_training/features/dataset.csv")

print(df["label"].value_counts())