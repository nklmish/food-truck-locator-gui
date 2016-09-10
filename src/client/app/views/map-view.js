var map;
var userLocation;
var markerView;
var MapView = Backbone.View.extend({
    initialize : function (options) {
        this.bus = options.bus;
        this.collection.on("add remove reset change", _.debounce(this.onModified, 0 ), this);
    },
    onModified : function () {
        var self = this;
        if(map){
            markerView.deleteMarkers();
            _.chain(self.collection.models)
                .map(function (model) {
                    var locationDescription = model.get("locationDescription") == null ? "sorry not available" : model.get("locationDescription");
                    var info = "<div>" + model.get("applicant") + "<br/>" + model.get("daysHours") +
                            "<br/>" + "Location description: " + locationDescription +
                            "</div>";
                    return markerView.createMarker({
                    position: {lat: model.get("location").y, lng: model.get("location").x},
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: '/images/food-truck.png'

                }, info);
            }).each(function (marker) {
                markerView.addMarker(map, marker);
            });

            markerView.addUserLocationMarker(map, userLocation);
            markerView.showMarkers(map);
        }
    },

    findCurrentLocation : function (successCallback, erroCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, erroCallback);
        }
    },
    getUserLocation : function () {
      return userLocation;
    },
    initMap : function() {
        var onSuccess = function (position) {
            var location = {};
            location.lat = position.coords.latitude;
            location.lng = position.coords.longitude;
            constructMap(location);
        };

        var onError =  function () {
            var defaultLocation = new DefaultSearchLocation();
            var p = defaultLocation.fetch();
            p.done(function (result) {
                var location = {lat : 0, lng : 0};
                var lat = _.find(result, function (item) {
                    return item.name == "lat";
                });
                if (lat) {
                    location.lat = lat.value;
                }
                var lng =  _.find(result, function (item) {
                    return item.name == "lng";
                });
                if (lng) {
                    location.lng = lng.value;
                }
                constructMap(location);
            })
        };

        this.findCurrentLocation(onSuccess, onError);
        var self = this;
        var constructMap =  function (location) {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                center: {lat: location.lat, lng: location.lng},
                zoom: 13
            });
            userLocation = location;
            markerView = new MarkerView();
            this.bus.trigger("mapLoaded", location);
            markerView.addUserLocationMarker(map, userLocation);
        }
    }

});