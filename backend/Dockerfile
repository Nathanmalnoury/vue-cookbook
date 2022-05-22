FROM python:3.8-slim-buster
COPY requirements.txt .
RUN pip install -r requirements.txt;\
    pip install gunicorn[gthread];

WORKDIR /app

ENTRYPOINT ["gunicorn"]
