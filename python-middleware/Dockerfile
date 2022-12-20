# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

COPY src /usr/src/app/src

COPY requirements.txt /usr/src/app
RUN pip3 install -r /usr/src/app/requirements.txt

CMD [ "python3", "/usr/src/app/src/app.py"]