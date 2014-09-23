define(['jquery', 'backbone'], function($, Backbone) {

    var books = Backbone.Model.extend({
        defaults: {
            'title': 'nil',
            'author': 'src',
            'src': '../images/gr.jpg'
        },
        initialize: function() {

        }
    });


    return books;
});