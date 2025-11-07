#using JSON for time being
import json
from pathlib import Path
from flask import Flask, render_template, jsonify, redirect, url_for

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

def load_pets():
    pets_file = DATA_DIR / "pets.json"
    if pets_file.exists():
        with pets_file.open("r", encoding="utf-8") as f:
            return json.load(f)
    return []


# routes for pages
@app.route("/")
def root():
    return redirect(url_for("home_page"))

@app.route("/home")
@app.route("/home.html")
def home_page():
    return render_template("home.html")

@app.route("/about")
@app.route("/about.html")
def about_page():
    return render_template("about.html")

@app.route("/gallery")
@app.route("/gallery.html")
def gallery_page():
    import re, html, json
    from pathlib import Path

    # 1) Load pets
    pets_path = DATA_DIR / "pets.json"
    pets = []
    if pets_path.exists():
        pets = json.loads(pets_path.read_text(encoding="utf-8"))

    pets_first = pets[:8]
    pets_rest  = pets[8:]

    #loads gallery
    gallery_path = BASE_DIR / "templates" / "gallery.html"
    raw = gallery_path.read_text(encoding="utf-8")

    def card_html(p):
        name = html.escape(p.get("name", "Unnamed"))
        img  = html.escape(p.get("image_url", ""))
        desc = html.escape(p.get("description", ""))
        return (
            '<div class="gallery-item">\n'
            f'  <h3 class="pet-name">{name}</h3>\n'
            f'  <img class="pet-image" src="{img}" alt="{name}">\n'
            f'  <p class="pet-sum">{desc}</p>\n'
            '</div>\n'
        )

    cards_first = "".join(card_html(p) for p in pets_first)
    cards_rest  = "".join(card_html(p) for p in pets_rest)

    def replace_section(html_text, section_id, new_inner):
        pattern = re.compile(
            rf'(<div id="{section_id}"[^>]*>\s*<div class="gallery">)(.*?)(</div>\s*</div>)',
            re.IGNORECASE | re.DOTALL
        )
        return pattern.sub(rf'\1{new_inner}\3', html_text, count=1)

    out = replace_section(raw, "initial-list", cards_first)
    out = replace_section(out, "added-list",  cards_rest)

    return out


@app.route("/quiz")
@app.route("/quiz.html")
def quiz_page():
    return render_template("quiz.html")


@app.route("/api/gallery-pets")
def api_gallery_pets():
    pets = load_pets()
    return jsonify({"pets": pets}), 200


if __name__ == "__main__":
    print(
        "\nPURRFECT PALS "
        "data/pets.json only.\n"
    )
    app.run(debug=True)
