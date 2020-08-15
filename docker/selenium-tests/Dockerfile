FROM ubuntu:18.04
USER root

ENV BUNDLE_SILENCE_ROOT_WARNING=1

RUN apt-get update && apt-get -y install curl gnupg unzip wget

# Set the Chrome repo.
RUN wget -qO - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

# Install python3.6
RUN apt-get install -y python python-dev python3.6 python3.6-dev python3.6-distutils
RUN curl -sL https://bootstrap.pypa.io/get-pip.py |  python3.6
RUN pip -V

# Chrome Driver
RUN mkdir -p /opt/selenium \
    && wget -q http://chromedriver.storage.googleapis.com/84.0.4147.30/chromedriver_linux64.zip -O /opt/selenium/chromedriver_linux64.zip \
    && cd /opt/selenium; unzip /opt/selenium/chromedriver_linux64.zip; rm -rf chromedriver_linux64.zip; ln -fs /opt/selenium/chromedriver /usr/local/bin/chromedriver;

# Install python dependencies
RUN mkdir /tests
COPY ./selenium-tests/ /tests
WORKDIR /tests
RUN pip install setuptools pip --upgrade --force-reinstall
RUN pip install -r requirements.txt

CMD [ "pytest", "-s", "--url", "http://localhost:3000" ]
