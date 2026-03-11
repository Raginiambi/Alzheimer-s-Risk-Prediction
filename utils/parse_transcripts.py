def extract_participant_text(file_path):
    text = []

    with open(file_path,"r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("*PAR:"):
                cleaned = line.replace("*PAR:","").strip()
                text.append(cleaned)
        
    return " ".join(text)