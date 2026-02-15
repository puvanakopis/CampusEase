import smtplib
from email.mime.text import MIMEText
from app.core.config import settings

def send_email(to_email: str, subject: str, html_content: str):
    msg = MIMEText(html_content, "html")
    msg['Subject'] = subject
    msg['From'] = settings.EMAIL_USER
    msg['To'] = to_email

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(settings.EMAIL_USER, settings.EMAIL_PASS)
        server.send_message(msg)
