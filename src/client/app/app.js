var oldSync = Backbone.sync;

Backbone.sync = function (method, model, options) {
    var url = _.isFunction(model.url) ? model.url() : model.url;

    if (url) {
        options = options || {};
        options.url = "http://localhost:8080/api/" + url;
    }

    return oldSync.call(this, method, model, options);
};

var bus = _.extend({}, Backbone.Events);

var venues = new Venues([], {bus : bus});

var searchView = new SearchResultsCounterView({el: "#total-search-results", collection: venues});
searchView.render();

var foodItems = new FoodItems();
foodItems.fetch();

var searchTypeAhead = new SearchSuggestionView({collection: foodItems, el: "#basic"});
searchTypeAhead.render();


var venuesView = new VenuesView({el : "#venues-info", collection : venues});
venuesView.render();


var defaultUserLocation = new DefaultSearchLocation();
var promise = defaultUserLocation.fetch();

var mapView = new MapView({collection : venues, bus: bus});


var searchFoodTrucks = function () {
    var searchOptions = {
        lng :mapView.getUserLocation().lng,
        lat : mapView.getUserLocation().lat,
        dist :  distanceSlider.slider('getValue')
    };
    if (searchTypeAhead.getSelected()) {
        searchOptions.items = searchTypeAhead.getSelected().get('name');
    }
    venues.fetch({data: $.param(searchOptions)});
};

var distanceSlider = $('#distance-slider').slider({
    tooltip_position : 'bottom',
    formatter: function(value) {
        return 'within in : ' + value + " miles";
    }
}).on('slideStop', function () {
    searchFoodTrucks();
});
