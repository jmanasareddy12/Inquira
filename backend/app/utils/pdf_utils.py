import fitz


def extract_text(pdf_path: str):

    doc = fitz.open(pdf_path)

    text = ""

    for i, page in enumerate(doc):

        page_text = page.get_text()

        print(f"Page {i+1}: {len(page_text)} characters")

        text += page_text

    doc.close()

    print("Total characters:", len(text))

    return text