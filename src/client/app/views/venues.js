var VenuesView = Backbone.View.extend({
    initialize : function () {
        this.collection.on("add remove reset change", _.debounce(this.onModified, 0 ), this);
    },

    onModified : function () {
        this.render();
    },

    render: function() {
        var source = $('#VenuesTemplate').html();
        var template = Handlebars.compile(source);
        var html = template(this.collection.toJSON());
        this.$el.html(html);
    }
});