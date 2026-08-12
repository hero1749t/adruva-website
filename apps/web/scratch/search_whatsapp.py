import os

def search_text_in_files(directory, search_terms):
    results = []
    for root, dirs, files in os.walk(directory):
        if "node_modules" in root or ".next" in root or ".git" in root:
            continue
        for file in files:
            if not file.endswith(('.ts', '.tsx', '.json', '.js', '.css', '.md')):
                continue
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    for term in search_terms:
                        if term.lower() in content.lower():
                            results.append((path, term))
            except Exception as e:
                pass
    return results

terms = ["whatsapp", "phone", "wa.me", "838"]
found = search_text_in_files("D:/adruva-website/apps/web", terms)
for path, term in found:
    print(f"Found '{term}' in: {path}")
