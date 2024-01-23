FROM python:3.11-alpine

WORKDIR /auth

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 50051
