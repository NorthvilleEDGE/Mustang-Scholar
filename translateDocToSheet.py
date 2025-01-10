import gspread
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import re

# Define the scope and credentials
SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
SERVICE_ACCOUNT_INFO = {
    "type": "service_account",
    "project_id": "mustang-scholar",
    "private_key_id": "d1c3279a71ac7f87b5b35ed34024ee1105afb0c7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRhPRvDk63+171\nFElg0eOA+K7lKC2Jw/yeBBZuHE7UBgr7xJ+AHTe4OOH1xH2fq8BMagQAEvN4FO9L\njel19YnIEzaToosh96gdZPp250/8sIlStUCwWgd360kYe+47xnc/N08ArkFJqRKz\n3y+L9eRRO9J5qFUjkQoh+kgw8UPaOArL0DB/v2tyXc7Lfo+D5FUNVKeaQciZ4m08\nm/uARjEAjEXIPs2RK+Hrj7CtN4QWF44aK6OXqlJd7SAavAOnGDMx/8TWuSXPcmmS\n43hPdxtJAJaCQ3jDtvL9LJdbsW7eBeoJzzrbtHZdvO0YGBS18sJRugqte75ixL10\nxyrksgNpAgMBAAECggEATGKRju+DaXX+f5E+00qSC9IeSTNlrsVCEwXge5JcdtYh\nKPrdP6LnToWGc8iIGC9Qs0svXCuMkenn9/6r77Jt4gCHNDndSav1oYnP+ouIUNK3\nreygweqAsIqaIpAEIczQar6qUdA1wzodtHAY8IjcDXWm3W2uZIIbVJnfueAr4aFF\n6Mj3VpKlRjLlGrISbEpKGAYT6LszWBoRlRiHRftUCoda3z3tdHPh/2fIWh6+FwTm\nMCVsiIuIY6Vx3i5+2BpGPpZX/YjbDk3VtKrEawA58dWxkLFjaNrdImcD50JyQCbL\nzgtcby+6pJ3uQNrgOabh5yBw/a6T1fN8BAwuiPCElQKBgQDwghB2mf+klIkKe/oO\nfGqfaYxqrfI2m8Lj5oY77zKfq4vamJNUQwxQiPthMHqbNjOG+qQV9K5fItvjNwaT\nNWI8S8M4KIvP9CUnhlAX9Uv064C+5l/LyCcPS56wc9duoi7hkKMfTk7829G7ukP2\n1G2XKqfJ/pAe23pCDJw0TV2RgwKBgQDfA+Rjv2RBeTXFp4CtfX99v/sRZzGJczTD\n4NB0P92DXKiAoU8sF8atFuqV8kj0rzcVeuKLLvI2HnjnvDNjG+iIaeDkXl3uArir\njH2B3pTTsSaea/8PisoqVLvJ41ZIa9RVYhzxCtQaXs0mpMc3NwUtvtOt2fGIL9Cb\nD/boAeqfowKBgQDdPsjmUcRaIknu2x2tNcbf3rjNajbnBWLDQ804VVK8j5KYBMOD\nQCqT629UeMRRBAtioC9SA0RlQCwHWRczVGiKDygHAUWch3umYGhNodm99Ob6tfJq\nBDXqXCYfLHGB1LBL0EI/CkqfUZgembrr1X77EMJJj2QE/uH44KDRfFoXAQKBgQCx\nZkMzJXf2rRidFdVCLGZR/XkWKuQ41i/O8PJgxrzKVdakG60DAhbEcUpB5O0r1oUW\nzR2QYdPCQRMkI40s9XJPsQl4H6jQP9HuhF8CA7CXhH+X3YiTMHAIpEaNHg3wpfXN\nxbIH+/kk0OyYJNNjlJzF+tofnRKIpqBl+JkLjRq5yQKBgH+mytLBHky/hRT6ZfRO\n6U33sO3HUYkqqS9l8bBO2REOU/Hu0hB4lJOpzkhWlK7mLhLMItax5At0W2CFGBdA\nseED7ihFXtN1DysTpUToSE1lNtQPwiP56fYMFu1OLAajuwG//R1CEd4Uxy8tKEq6\n+1dxBiWXQ5ZRNIrydtYCMoUn\n-----END PRIVATE KEY-----\n",
    "client_email": "mustang-scholar@mustang-scholar.iam.gserviceaccount.com",
    "client_id": "114887963102038178028",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mustang-scholar%40mustang-scholar.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

credentials = Credentials.from_service_account_info(SERVICE_ACCOUNT_INFO, scopes=SCOPES)
gc = gspread.authorize(credentials)

# Google Doc ID and Google Sheet ID
DOCUMENT_ID = '1sueQd1FoWbbv5_Q8WJzvzTlrCphgaTiHoVsrg45jV6o'
SPREADSHEET_ID = '1fRWT2nK9a3K8ppVfnqG0n1hzFowjWw-KVanTMBF34mo'

def extract_course_info(doc_content):
    courses = []
    lines = doc_content.split('\n')
    course = {}
    for i, line in enumerate(lines):
        if "COURSE #:" in line:
            if course:
                courses.append(course)
                course = {}
            course['title'] = lines[i-1].strip()
            course['course_number'] = line.split("COURSE #: ")[1].strip()
        elif "prerequisites:" in line.lower():
            course['prerequisites'] = line.split("prerequisites:")[1].strip()
        elif "recommend" in line.lower():
            course['recommend'] = line.split("recommend")[1].strip()
        elif "semesters" in line.lower() or "credits" in line.lower():
            course['duration'] = line.strip()
        elif "APPROVED FOR CREDIT" in line:
            course['approved_for_credit'] = True
        elif line.strip() and not any(keyword in line.lower() for keyword in ["prerequisites", "recommend", "semesters", "credits", "approved for credit"]):
            course['description'] = line.strip()
    if course:
        courses.append(course)
    return courses

def read_google_doc(doc_id):
    docs_service = build('docs', 'v1', credentials=credentials)
    document = docs_service.documents().get(documentId=doc_id).execute()
    content = document.get('body').get('content')
    text = ''
    for element in content:
        if 'paragraph' in element:
            for text_run in element.get('paragraph').get('elements'):
                if 'textRun' in text_run:
                    text += text_run.get('textRun').get('content')
    return text

def write_to_google_sheet(sheet_id, data):
    sh = gc.open_by_key(sheet_id)
    worksheet = sh.sheet1
    worksheet.clear()  # Clear existing content

    # Prepare the header
    header = ["Title", "Course Number", "Prerequisites", "Recommend", "Duration", "Approved for Credit", "Description"]
    worksheet.append_row(header)

    # Write the data
    for course in data:
        row = [
            course.get('title', ''),
            course.get('course_number', ''),
            course.get('prerequisites', ''),
            course.get('recommend', ''),
            course.get('duration', ''),
            'Yes' if course.get('approved_for_credit') else 'No',
            course.get('description', '')
        ]
        worksheet.append_row(row)

def main():
    doc_content = read_google_doc(DOCUMENT_ID)
    courses = extract_course_info(doc_content)
    write_to_google_sheet(SPREADSHEET_ID, courses)

if __name__ == '__main__':
    main()
