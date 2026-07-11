import fitz


def extract_text(filepath):
    doc = fitz.open(filepath)

    pages = []

    total_text = ""

    for page_number, page in enumerate(doc, start=1):

        text = page.get_text()

        print(f"Page {page_number}: {len(text)} characters")

        pages.append(
            {
                "page_number": page_number,
                "text": text,
            }
        )

        total_text += text

    print(f"Total characters: {len(total_text)}")

    return pages