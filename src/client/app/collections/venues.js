var Venues = Backbone.Collection.extend({
    initialize : function(models, options) {
        this.bus = options.bus;
        this.bus.on("mapLoaded", this.onMapLoaded, this);
    },
    model : Venue,
    url : "/search/all",
    onMapLoaded : function (loc) {
        this.fetch({data: $.param({lat: loc.lat, lng : loc.lng})});
    }
});
