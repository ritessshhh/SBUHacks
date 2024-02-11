import json
import random
import requests as requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask import Flask, send_from_directory

app = Flask(__name__)
CORS(app)


api_key = "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"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}
url = "https://api.openai.com/v1/chat/completions"

def generate_policy_question_and_hint(policy_area):
    print("Generating policy question and hint for policy area:", policy_area)
    candidates = ["Donald Trump", "Joe Biden", "Nikki Haley", "Dean Phillips"]
    correct_candidate = random.choice(candidates)
    incorrect_candidates = [c for c in candidates if c != correct_candidate]
    incorrect_candidate = random.choice(incorrect_candidates)

    # Generating the policy question
    question_data = {
        "model": "gpt-4",
        "messages": [{
            "role": "system",
            "content": f"Generate a concise, simple and short policy statement related to a specific '{policy_area}' without revealing the candidate's identity which starts with 'I support'."
        }, {
            "role": "user",
            "content": f"Generate a policy question that {correct_candidate} might ask about {policy_area} and which starts with 'I support' and then the policy."
        }]
    }

    question_response = requests.post(url, headers=headers, data=json.dumps(question_data))
    if question_response.status_code == 200:
        question = question_response.json()['choices'][0]['message']['content'].strip()
        print("Question generated successfully.")
    else:
        print(f"Failed to generate question. Status code: {question_response.status_code}, Response: {question_response.text}")
        return {"error": "An error occurred. Unable to generate policy question."}

    # Correcting the hint generation request
    hint_data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "Generate a policy statement related to a specific area."},
            {"role": "user", "content": f"Generate a concise, simple, and short policy statement related to '{policy_area}' that {correct_candidate} supports, without revealing the candidate's identity, starting with 'I support'."}
        ]
    }

    hint_response = requests.post(url, headers=headers, data=json.dumps(hint_data))
    if hint_response.status_code == 200:
        hint = hint_response.json()['choices'][0]['message']['content'].strip()
        print("Hint generated successfully.")
    else:
        print(f"Failed to generate hint. Status code: {hint_response.status_code}, Response: {hint_response.text}")
        return {"error": "An error occurred. Unable to generate policy hint."}

    # Save the generated question and hint along with candidate names and policy area in a JSON file
    with open("generated_questions_and_hints.json", "a") as file:
        json.dump({
            "correct_candidate": correct_candidate,
            "incorrect_candidate": incorrect_candidate,
            "policy_area": policy_area,
            "question": question,
            "hint": hint
        }, file)
        file.write('\n')
    print("Question and hint saved to file.")

    return {
        "correct_candidate": correct_candidate,
        "incorrect_candidate": incorrect_candidate,
        "policy_area": policy_area,
        "question": question,
        "hint": hint
    }

@app.route('/')
def Home():
    return "Hello World"


def answer_policy_question(question):
    data = {
        "model": "gpt-4-turbo-preview",
        "messages": [{
            "role": "system",
            "content": "Answer policy-related questions accurately for major political candidates."
        }, {
            "role": "user",
            "content": question
        }]
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))
    if response.status_code == 200:
        answer_data = response.json()
        answer = answer_data['choices'][0]['message']['content'].strip()

        result_data = {
            "question": question,
            "answer": answer,
        }

        return result_data
    else:
        error_message = {
            "error": "I'm unable to fetch an answer for your question. Please try again.",
            "question": question,
        }
        return error_message


@app.route('/chatbot', methods=['POST'])
def get_policy_question_answer():
    question = request.data.decode('utf-8')
    if question:
        result = answer_policy_question(question)
        return jsonify(result)
    else:
        return jsonify({"error": "No question provided."}), 400


@app.route('/start', methods=['POST'])
def find_matches():
    data = request.data.decode('utf-8')
    print(data)
    data = generate_policy_question_and_hint(data)
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8000)