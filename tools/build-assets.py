from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
PAPER = "#f9f6f5"
INK = "#07111e"
ROUTE = "#05543d"
CORAL = "#d95036"
AMBER = "#c88612"


def render_avatar():
    source = Image.open(ASSETS / "avatar-vinicius.jpg").convert("RGB")
    source.resize((128, 128), Image.Resampling.LANCZOS).save(
        ASSETS / "avatar-vinicius-128.jpg",
        quality=88,
        optimize=True,
        progressive=True,
    )


def render_icon(size, filename, maskable=False):
    image = Image.new("RGB", (size, size), PAPER)
    draw = ImageDraw.Draw(image)
    inset = int(size * (0.1 if not maskable else 0.16))
    radius = int(size * 0.2)
    draw.rounded_rectangle((inset, inset, size - inset, size - inset), radius, fill=PAPER)
    scale = size / 512
    v_shape = [(76, 150), (164, 150), (256, 374), (348, 150), (436, 150), (293, 438), (219, 438)]
    draw.polygon([(int(x * scale), int(y * scale)) for x, y in v_shape], fill=ROUTE)
    draw.rectangle((int(134 * scale), int(74 * scale), int(378 * scale), int(138 * scale)), fill=INK)
    draw.rectangle((int(220 * scale), int(74 * scale), int(292 * scale), int(374 * scale)), fill=INK)
    image.save(ASSETS / filename, optimize=True)


def render_social_card():
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), PAPER)
    draw = ImageDraw.Draw(image)
    display = str(ASSETS / "fonts" / "archivo-variable.ttf")
    body = str(ASSETS / "fonts" / "manrope-variable.ttf")
    title_font = ImageFont.truetype(display, 74)
    body_font = ImageFont.truetype(body, 26)
    small_font = ImageFont.truetype(body, 19)
    name_font = ImageFont.truetype(display, 22)

    draw.text((64, 38), "VINÍCIUS TOGNOLI", fill=INK, font=name_font)
    draw.line((64, 78, 1136, 78), fill="#aab0ae", width=1)
    draw.multiline_text((64, 120), "Qualidade que conecta\ntodas as etapas.", fill=INK, font=title_font, spacing=-4)
    draw.text((68, 316), "QA Engineer  ·  Test Automation & AI", fill=ROUTE, font=body_font)

    route_y = 456
    draw.line((72, route_y, 920, route_y), fill=ROUTE, width=5)
    labels = ["Database", "Backend", "APIs", "Frontend"]
    positions = [310, 500, 680, 860]
    for x, label in zip(positions, labels):
        draw.ellipse((x - 22, route_y - 22, x + 22, route_y + 22), fill=PAPER, outline=ROUTE, width=4)
        text_box = draw.textbbox((0, 0), label, font=small_font)
        draw.text((x - (text_box[2] - text_box[0]) / 2, route_y + 36), label, fill=INK, font=small_font)

    draw.rounded_rectangle((72, route_y - 28, 242, route_y + 28), radius=28, fill=PAPER, outline=ROUTE, width=4)
    draw.text((102, route_y - 13), "QA Engineer", fill=ROUTE, font=small_font)
    draw.line((920, route_y, 976, route_y), fill=ROUTE, width=5)
    draw.line((976, route_y, 1014, 404), fill=ROUTE, width=5)
    draw.line((976, route_y, 1014, 510), fill=ROUTE, width=5)
    draw.rounded_rectangle((1004, 372, 1136, 430), radius=10, fill="#fffdfb", outline=CORAL, width=3)
    draw.rounded_rectangle((1004, 480, 1136, 538), radius=10, fill="#fffdfb", outline=AMBER, width=3)
    draw.text((1022, 388), "TX Raio-X", fill=INK, font=small_font)
    draw.text((1028, 496), "RDP Pro", fill=INK, font=small_font)
    image.save(ASSETS / "social-card.png", optimize=True)


def optimize_scroll_runner():
    path = ASSETS / "scroll-runner.png"
    if not path.exists():
        return

    source = Image.open(path).convert("RGBA")
    source.thumbnail((288, 192), Image.Resampling.LANCZOS)
    source.save(path, optimize=True)


render_avatar()
render_icon(192, "icon-192.png")
render_icon(512, "icon-512.png")
render_icon(512, "icon-maskable-512.png", maskable=True)
render_social_card()
optimize_scroll_runner()
