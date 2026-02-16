from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load trained model and vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "Empty input"}), 400

    # Transform text using TF-IDF
    text_vec = vectorizer.transform([text])

    # Predict using SVM
    prediction = model.predict(text_vec)[0]
    probability = model.predict_proba(text_vec)[0].max()

    result = "spam" if prediction == 1 else "ham"

    return jsonify({
        "prediction": result,
        "confidence": round(float(probability) * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
