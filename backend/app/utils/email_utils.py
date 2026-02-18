import smtplib
from email.mime.text import MIMEText
from app.core.config import settings
import asyncio

def send_email(to_email: str, subject: str, html_content: str):
    msg = MIMEText(html_content, "html")
    msg['Subject'] = subject
    msg['From'] = settings.EMAIL_USER
    msg['To'] = to_email

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(settings.EMAIL_USER, settings.EMAIL_PASS)
        server.send_message(msg)


async def send_otp_email(email: str, first_name: str, otp_code: str, template: str = "signup_otp.html"):
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, _send_otp_email_sync, email, first_name, otp_code, template)

def _send_otp_email_sync(email, first_name, otp_code, template):
    template_path = f"app/templates/{template}"
    try:
        with open(template_path, "r") as f:
            html = f.read()
    except FileNotFoundError:
        raise Exception(f"Email template not found: {template_path}")

    html = html.replace("{{ first_name }}", first_name).replace("{{ otp_code }}", otp_code)
    send_email(email, "Your OTP Code", html)
