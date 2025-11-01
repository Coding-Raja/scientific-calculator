from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import random

app = Flask(__name__)
CORS(app)

# --- Degree/ Radian mode global flag ---
calc_mode = "deg"  # default mode


def make_safe_dict():
    """Return a safe evaluation environment according to current mode."""
    global calc_mode
    if calc_mode == "deg":
        # All trig functions expect degrees
        return {
            "sin": lambda x: math.sin(math.radians(x)),
            "cos": lambda x: math.cos(math.radians(x)),
            "tan": lambda x: math.tan(math.radians(x)),
            "asin": lambda x: math.degrees(math.asin(x)),
            "acos": lambda x: math.degrees(math.acos(x)),
            "atan": lambda x: math.degrees(math.atan(x)),
            "sqrt": math.sqrt,
            "log": math.log10,
            "ln": math.log,
            "pi": math.pi,
            "e": math.e,
            "abs": abs,
            "floor": math.floor,
            "ceil": math.ceil,
            "pow": math.pow,
            "rand": random.random,
            "round": round
        }
    else:
        # All trig functions use radians
        return {
            "sin": math.sin,
            "cos": math.cos,
            "tan": math.tan,
            "asin": math.asin,
            "acos": math.acos,
            "atan": math.atan,
            "sqrt": math.sqrt,
            "log": math.log10,
            "ln": math.log,
            "pi": math.pi,
            "e": math.e,
            "abs": abs,
            "floor": math.floor,
            "ceil": math.ceil,
            "pow": math.pow,
            "rand": random.random,
            "round": round
        }


# --- Route to evaluate expression ---
@app.route("/calc", methods=["POST"])
def calc():
    data = request.get_json()
    expr = data.get("expression", "")

    if not expr:
        return jsonify({"error": "No expression provided"}), 400

    safe_dict = make_safe_dict()

    # Replace common symbols
    expr = (
        expr.replace("^", "**")
            .replace("×", "*")
            .replace("÷", "/")
            .replace("√", "sqrt")
            .replace("π", "pi")
    )

    try:
        result = eval(expr, {"__builtins__": None}, safe_dict)
        if isinstance(result, float):
            result = round(result, 10)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# --- Toggle Degree/Radian Mode ---
@app.route("/mode", methods=["POST"])
def change_mode():
    global calc_mode
    data = request.get_json()
    mode = data.get("mode", "").lower()

    if mode not in ["deg", "rad"]:
        return jsonify({"error": "Invalid mode. Use 'deg' or 'rad'."}), 400

    calc_mode = mode
    return jsonify({"message": f"Mode changed to {calc_mode}"})


# --- Root Route ---
@app.route("/")
def home():
    return "✅ Scientific Calculator API Running"


if __name__ == "__main__":
    app.run(debug=True)
