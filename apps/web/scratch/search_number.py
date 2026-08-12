import os

def search_text_in_all_files(directory, search_terms):
    results = []
    for root, dirs, files in os.walk(directory):
        if "node_modules" in root or ".next" in root or ".git" in root or "dist" in root:
            continue
        for file in files:
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    for term in search_terms:
                        if term in content:
                            results.append((path, term))
            except Exception as e:
                pass
    return results

terms = ["9876543210", "98765", "9198765"]
found = search_text_in_all_files("D:/adruva-website", terms)
for path, term in found:
    print(f"Found '{term}' in: {path}")
