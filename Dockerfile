FROM node:0.10.42
MAINTAINER nklmish
RUN npm install -g gulp-cli

# Bundle app source
COPY . /food-truck-locator-gui

#RUN cd /food-truck-locator-gui;npm install bower; npm install gulp;npm install
RUN cd /food-truck-locator-gui;npm install bower gulp -g; bower install -y --allow-root; npm install;
EXPOSE 3000
EXPOSE 3001
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
WORKDIR "/food-truck-locator-gui"
CMD ["gulp", "default"]