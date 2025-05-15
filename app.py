from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    query = data.get("prompt")
    content_type = data.get("type")

    if content_type == "book":
        return jsonify({
            "title": f"The Tale of {query}",
            "pages": [
                {"chapter": "1", "text": f"Once upon a time in the world of {query}..."},
                {"chapter": "2", "text": f"The journey through {query} continued..."},
                {"chapter": "3", "text": f"And finally, {query} found its peace."}
            ]
        })
    elif content_type in ["comic", "manga"]:
        return jsonify({
            "title": f"{query} Adventures",
            "images": [
                f"https://placehold.co/400x600?text={query}+1",
                f"https://placehold.co/400x600?text={query}+2",
                f"https://placehold.co/400x600?text={query}+3"
            ]
        })
    elif content_type == "video":
        return jsonify({
            "title": f"{query} Explained",
            "video_url": "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            "duration": "5s",
            "captions": {
                "en": "https://example.com/captions/en.vtt",
                "es": "https://example.com/captions/es.vtt"
            }
        })

    return jsonify({"error": "Unsupported type"}), 400

if __name__ == "__main__":
    app.run(debug=True)
