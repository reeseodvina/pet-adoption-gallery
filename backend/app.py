import os
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple

import requests
from flask import Flask, jsonify, send_from_directory, abort, request, Response

BASE_DIR = Path(__file__).resolve().parent
TEMPLATE_DIRS = [BASE_DIR, BASE_DIR / "templates"]

def _find_asset(relpath: str) -> Tuple[str, str]:
    relpath = relpath.lstrip("/\\")
    for d in TEMPLATE_DIRS:
        cand = d / relpath
        if cand.exists():
            return (str(d), relpath)
    raise FileNotFoundError(relpath)

app = Flask(__name__, static_folder=None)

API_BASE = "https://api.rescuegroups.org/v5"
DEFAULT_LIMIT = 24


def _rg_headers() -> Dict[str, str]:
    api_key = os.getenv("RESCUEGROUPS_API_KEY") or "xg6Fk3ul"
    return {
        "Content-Type": "application/vnd.api+json",
        "Authorization": api_key,
    }


def fetch_rescuegroups_pets(
    limit: int = DEFAULT_LIMIT,
    species_view: Optional[str] = None,
    need_pics: bool = True,
) -> List[Dict[str, Any]]:
    """
    Fetch pets from RescueGroups with optional species view.
    Returns a list of dicts with name, image, summary, age, sex, breed.
    """
    views: List[str] = ["available"]
    if need_pics:
        views.append("haspic")
    if species_view:
        views.append(species_view)

    url = f"{API_BASE}/public/animals/search/" + "/".join(views) + "/"
    params = {
        "limit": str(limit),
        "fields[animals]": ",".join(
            [
                "name",
                "ageGroup",
                "breedString",
                "sex",
                "summary",
                "pictureThumbnailUrl",
            ]
        ),
        "include": "pictures",
    }

    r = requests.get(url, headers=_rg_headers(), params=params, timeout=15)
    r.raise_for_status()
    payload = r.json()

    data = payload.get("data", [])
    included = payload.get("included") or []
    picmap = {
        str(inc.get("id")): (inc.get("attributes") or {})
        for inc in included
        if inc.get("type") == "pictures"
    }

    pets: List[Dict[str, Any]] = []
    for item in data:
        attrs = item.get("attributes") or {}
        rel = item.get("relationships") or {}

        name = attrs.get("name") or "Unnamed"
        age = attrs.get("ageGroup") or ""
        breed = attrs.get("breedString") or ""
        sex = attrs.get("sex") or ""
        img = attrs.get("pictureThumbnailUrl")

        if not img:
            pics = (rel.get("pictures") or {}).get("data") or []
            if pics:
                first = picmap.get(str(pics[0].get("id"))) or {}
                img = first.get("small") or first.get("large") or first.get("original")

        summary = attrs.get("summary") or " • ".join(
            [p for p in [breed, age, sex] if p]
        )

        pets.append(
            {
                "name": name,
                "image": img,
                "summary": summary,
                "age": age,
                "sex": sex,
                "breed": breed,
            }
        )

    return pets


def _build_cards_html(pets: List[Dict[str, Any]]) -> str:
    out = ['        <div class="gallery">\n']
    for pet in pets:
        name = pet.get("name") or "Unnamed"
        img = pet.get("image") or ""
        summary = pet.get("summary") or "Adopt me!"
        out += [
            '            <div class="gallery-item">\n',
            f'                <h3 class="pet-name">{name}</h3>\n',
            f'                <img class="pet-image" src="{img}" alt="{name}">\n',
            f'                <p class="pet-sum">{summary}</p>\n',
            '            </div>\n',
        ]
    out.append("        </div>\n")
    return "".join(out)

@app.route("/api/gallery-pets")
def api_gallery_pets():
    try:
        pets = fetch_rescuegroups_pets(limit=24, species_view=None, need_pics=True)
        return jsonify({"pets": pets}), 200
    except Exception as e:
        app.logger.error(f"Error fetching pets: {e}")
        return jsonify({"pets": [], "error": str(e)}), 502


@app.route("/api/quiz-pets")
def api_quiz_pets():
    """
    Query params:
      - species: dogs | cats | rabbits | smallfurry | birds | horses | ...
      - age: Baby | Young | Adult | Senior
      - sex: Male | Female
      - limit: default 12
    """
    species = request.args.get("species")  
    age = request.args.get("age")
    sex = request.args.get("sex")
    limit = int(request.args.get("limit", "12"))

    try:
        pets = fetch_rescuegroups_pets(
            limit=limit, species_view=species, need_pics=True
        )

        if age:
            pets = [p for p in pets if (p.get("age") or "").lower() == age.lower()]
        if sex:
            pets = [p for p in pets if (p.get("sex") or "").lower() == sex.lower()]

        return jsonify({"pets": pets}), 200
    except Exception as e:
        app.logger.error(f"Error in /api/quiz-pets: {e}")
        return jsonify({"pets": [], "error": str(e)}), 502


@app.route("/")
def root():
    d, f = _find_asset("home.html")
    return send_from_directory(d, f, mimetype="text/html")


@app.route("/home")
@app.route("/home.html")
def home_page():
    d, f = _find_asset("home.html")
    return send_from_directory(d, f, mimetype="text/html")


@app.route("/about")
@app.route("/about.html")
def about_page():
    d, f = _find_asset("about.html")
    return send_from_directory(d, f, mimetype="text/html")


@app.route("/quiz-intro")
@app.route("/quiz-intro.html")
def quiz_intro_page():
    """Route for the quiz intro page linked as 'quiz-intro' in nav."""
    d, f = _find_asset("quiz-intro.html")
    return send_from_directory(d, f, mimetype="text/html")


@app.route("/quiz")
@app.route("/quiz.html")
def quiz_page():
    d, f = _find_asset("quiz.html")
    return send_from_directory(d, f, mimetype="text/html")


@app.route("/results")
@app.route("/results.html")
def results_page():
    d, f = _find_asset("results.html")
    return send_from_directory(d, f, mimetype="text/html")


@app.route("/style.css")
def serve_css():
    d, f = _find_asset("style.css")
    return send_from_directory(d, f, mimetype="text/css")


@app.route("/gallery")
@app.route("/gallery.html")
def gallery_page():
    d, f = _find_asset("gallery.html")
    raw = Path(d, f).read_text(encoding="utf-8")

    pets = fetch_rescuegroups_pets(limit=24, species_view=None, need_pics=True)
    first = pets[:8]
    second = pets[8:16]

    initial_html = _build_cards_html(first)
    added_html = _build_cards_html(second)

    start_initial = raw.find('<div id="initial-list">')
    start_added = raw.find('<div id="added-list"', start_initial)
    end_added = raw.find("</div>\n    </div>\n    <button id=\"more-pets\"", start_added)

    if start_initial == -1 or start_added == -1 or end_added == -1:
        app.logger.warning(
            "Could not find injection points in gallery.html; serving original file."
        )
        return send_from_directory(d, f, mimetype="text/html")

    open_initial_end = raw.find(">", start_initial) + 1
    open_added_end = raw.find(">", start_added) + 1

    new_html = (
        raw[:open_initial_end]
        + "\n"
        + initial_html
        + "    "
        + raw[start_added:open_added_end]
        + "\n"
        + added_html
        + raw[end_added:]
    )

    return Response(new_html, mimetype="text/html")


ALLOWED_EXTS = {
    ".html",
    ".htm",
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".mp4",
    ".webm",
    ".mp3",
    ".wav",
    ".ico",
    ".json",
}


@app.route("/<path:filename>")
def serve_any(filename: str):
    p = Path(filename)
    if ".." in p.parts or p.suffix.lower() not in ALLOWED_EXTS:
        abort(404)
    try:
        d, f = _find_asset(filename)
        return send_from_directory(d, f)
    except FileNotFoundError:
        abort(404)


@app.errorhandler(404)
def not_found(e):
    app.logger.error(f"404: {request.path}")
    return ("Not Found", 404)


if __name__ == "__main__":
    app.run(debug=True)
