# food-truck-locator-gui
A sample app developed to play with backbone for consuming food truck api. Currently support only USA

##Docker :
You can either fetch pre-build image from docker hub via 

```docker pull nklmish/food-truck-locator-gui-localhost```

Or build docker image locally (useful for development purpose)

```docker build -t nklmish/food-truck-locator-gui-localhost .```

Once docker image is installed locally, we need to execute

```docker run -it -p 3000:3000 nklmish/food-truck-locator-gui-localhost```

Depending on docker installation, we can find **dockerIpAddress** using one of the following commands:

1. Linux : ```docker inspect <containerId>```
2. Boot2docker : ```boot2docker ip```
3. Docker Toolbox : ```docker-machine ip <machine>```

Open browser and type **dockerIpAddress:3000** (Note: replace dockerIpAddress with actual IP address allocated to docker) 

## Manual Installation:

- Install Node
	- on OSX install [home brew](http://brew.sh/) and type `brew install node`
	- on Windows install [chocolatey](https://chocolatey.org/)

- Install gulp-cli
npm install --global gulp-cli

## Launch
Run
```
npm install
gulp
```

##Tech stack and familarity

- Backbone js (first time user)
- Bootstrap
- Gulp (for build automation)
- Wiredep (for dependency injection)
- Bower (package manager)
- Docker
- npm (for installing necessary dependencies)
- Google maps API
- selyria-bootstrap-slider
- backbone typeahead
- handlebars (first time user)

# Note
I also experimented in configuring and consuming HATEOS based API's with backbone.paginator and backbone.hateos (http://gomoob.github.io/backbone.hateoas/).
It worked really well but in order to learn a bit more about how backbone works, I had created backend API  that returns all data (please note it's only for demonstration purposes)
and the application parses and uses this data. Lastly, in order to make code readable via page source , I haven't uglified and compress javascript, so you can read code page source easily.

# Improvements
- Incorporate karma and Jasmine for unit testing
- GUI (fix css styling)
- Use paginated data for map api
- create gulp tasks for preparing production build
