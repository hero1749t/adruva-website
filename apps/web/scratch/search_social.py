import os

def search_text_in_all_files(directory, search_terms):
    results = []
    for root, dirs, files in os.walk(directory):
        if "node_modules" in root or ".next" in root or ".git" in root or "dist" in root or "scratch" in root:
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

terms = ["facebook.com", "instagram.com", "linkedin.com", "youtube.com", "twitter.com"]
found = search_text_in_all_files("D:/adruva-website/apps/web", terms)
for path, term in found:
    print(f"Found '{term}' in: {path}")
