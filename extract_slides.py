import os
import re
import json

slides_dir = "slides"
output_file = "slides_data.js"

slides_data = []

# Sort slides numerically
files = sorted([f for f in os.listdir(slides_dir) if f.startswith("slide-") and f.endswith(".html")], 
               key=lambda x: int(re.search(r"\d+", x).group()))

for filename in files:
    path = os.path.join(slides_dir, filename)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
        # Extract style
        style_match = re.search(r"<style>(.*?)</style>", content, re.DOTALL)
        style = style_match.group(1).strip() if style_match else ""
        
        # Extract body class/style if any, but slides seem to have body styles in <style>
        # Let's extract everything inside <body>...</body>
        body_match = re.search(r"<body>(.*?)</body>", content, re.DOTALL)
        if body_match:
            body_content = body_match.group(1).strip()
            # Remove comments to save space
            body_content = re.sub(r"<!--.*?-->", "", body_content, flags=re.DOTALL)
            # Normalize whitespace
            body_content = re.sub(r"\s+", " ", body_content).strip()
            
            # Find the background and padding from the body style in the <style> tag
            # Example style: body { width: 720pt; height: 405pt; ... background: ...; padding: ...; }
            bg_match = re.search(r"background:\s*([^;]+);", style)
            padding_match = re.search(r"padding:\s*([^;]+);", style)
            
            bg = bg_match.group(1).strip() if bg_match else ""
            padding = padding_match.group(1).strip() if padding_match else ""
            
            slides_data.append({
                "id": filename.replace(".html", ""),
                "content": body_content,
                "background": bg,
                "padding": padding
            })

with open(output_file, "w", encoding="utf-8") as f:
    f.write("const slidesData = " + json.dumps(slides_data, ensure_ascii=False, indent=2) + ";")

print(f"Processed {len(slides_data)} slides.")
