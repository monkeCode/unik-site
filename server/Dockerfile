FROM python:3.11-alpine

#RUN apk update \
#   && apk add --virtual build-deps gcc python3-dev musl-dev \
#    && apk add --no-cache mariadb-dev
RUN apk update
# рабочая директория
WORKDIR /usr/src/app
RUN mkdir -p $WORKDIR/static
RUN mkdir -p $WORKDIR/media

# переменные окружения для python
#не создавать файлы кэша .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# не помещать в буфер потоки stdout и stderr
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

RUN pip install gunicorn

COPY ./requirements.txt .
RUN pip install -r requirements.txt

#RUN apk del build-deps
# копируем всё что осталось.
COPY . .

ENTRYPOINT [ "sh", "wsgi-entrypoint.sh" ]