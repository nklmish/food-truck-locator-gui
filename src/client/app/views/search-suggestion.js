var SearchSuggestionView = Backbone.View.extend({
    initialize: function () {
        var currentText;
        var Extended = Backbone.Typeahead.extend({
            template: '<input type="text" class="form-control input-lg" placeholder="Food type (Hot dogs, Chips, Burritos)"><ul class="dropdown-menu"></ul>'
        });
        var typeahead = new Extended({collection: this.collection});
        typeahead.on('selected', function(model) {
            currentText = model;
        });

        this.getTypeAhead = function () {
            return typeahead;
        };
        getTypedText = function () {
            return currentText;
        }
    },
    getSelected : function () {
        return getTypedText();
    },
    render : function () {
        this.getTypeAhead().setElement(this.el).render();
    }
});