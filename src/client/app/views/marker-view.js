var markers = [];
var MarkerView = Backbone.View.extend({
    addMarker : function (map, marker) {
        if (map) {
            markers.push(marker);
        }
    },
    createMarker : function (options, info) {
        var marker = new google.maps.Marker(options);
        if (info) {
            var infowindow = new google.maps.InfoWindow({
                content: info
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }
        return marker;
    },
    showMarkers : function (map) {
        this.setMapOnAll(map)
    },
    setMapOnAll: function (map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    },
    clearMarkers : function () {
        this.setMapOnAll(null);
    },
    deleteMarkers : function() {
        this.clearMarkers();
        markers = [];
    },
    addUserLocationMarker: function (map, location) {
        var marker = this.createMarker({
            position: {lat: location.lat, lng: location.lng},
            map: map,
            animation: google.maps.Animation.DROP
        });
        this.addMarker(map, marker);
    }
});