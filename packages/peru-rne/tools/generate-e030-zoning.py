from __future__ import annotations

import re
import sys
import unicodedata
from pathlib import Path

import pdfplumber


def normalize(value: str | None) -> str:
    text = unicodedata.normalize("NFD", value or "")
    text = "".join(character for character in text if unicodedata.category(character) != "Mn")
    text = text.replace("�", "")
    return " ".join(re.sub(r"[^A-Z0-9 ]", " ", text.upper()).split())


def row_fields(row: list[str | None]) -> tuple[str, str, str, str] | None:
    if len(row) == 7:
        department, province, district = row[:3]
        zone = " ".join(value or "" for value in row[3:6])
    elif len(row) == 6:
        department, province, district = row[:3]
        zone = " ".join(value or "" for value in row[3:5])
    elif len(row) == 5:
        department, province, district, zone = row[:4]
    else:
        return None
    if normalize(district) in {"", "DISTRITO"}:
        return None
    return normalize(department), normalize(province), normalize(district), normalize(zone)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: generate-e030-zoning.py INPUT.pdf OUTPUT.ts")
    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    current_department = ""
    current_province = ""
    current_zone = 0
    entries: dict[tuple[str, str, str], int] = {}

    with pdfplumber.open(source) as pdf:
        for page in pdf.pages[39:83]:
            for table in page.extract_tables():
                for row in table:
                    fields = row_fields(row)
                    if fields is None:
                        continue
                    department, province, district, raw_zone = fields
                    current_department = department or current_department
                    current_province = province or current_province
                    match = re.search(r"[1-4]", raw_zone)
                    if match:
                        current_zone = int(match.group())
                    if not current_department or not current_province or current_zone == 0:
                        raise ValueError(f"Incomplete row: {row}")
                    key = (current_department, current_province, district)
                    previous = entries.get(key)
                    if previous is not None and previous != current_zone:
                        raise ValueError(f"Conflicting zones for {key}: {previous} and {current_zone}")
                    entries[key] = current_zone

    lines = [
        "// Generated from Annex II of official RNE E.030:2026. Do not edit manually.",
        "import type { ZoningTuple } from './ZoningCatalog.js';",
        "",
        "export const E030_2026_ZONING = [",
    ]
    for (department, province, district), zone in sorted(entries.items()):
        lines.append(f"  [{department!r}, {province!r}, {district!r}, {zone}],")
    lines.extend(["] as const satisfies readonly ZoningTuple[];", ""])
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text("\n".join(lines), encoding="utf-8")
    print(f"Generated {len(entries)} zoning entries in {output}")


if __name__ == "__main__":
    main()
