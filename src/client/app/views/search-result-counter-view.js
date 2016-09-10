var SearchResultsCounterView = Backbone.View.extend({
    initialize : function () {
        this.collection.on("add remove reset change", _.debounce(this.onModified, 0 ), this);
    },

    onModified : function () {
        this.render();
    },

    render: function() {
        var source = $('#SearchResultsCounterTemplate').html();
        var template = Handlebars.compile(source);
        var html = template({"total" : this.collection.models.length});
        this.$el.html(html);
    }
});