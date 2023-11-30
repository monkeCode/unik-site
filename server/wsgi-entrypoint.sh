#!/bin/sh
until cd /usr/src/app
do
    echo "cd"
done

python manage.py makemigrations

until python manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

python manage.py collectstatic --noinput

#gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 1 --log-level debug

python manage.py runserver 0.0.0.0:8000