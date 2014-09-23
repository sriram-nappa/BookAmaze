define(['jquery', 'backbone', 'models/model'], function($, Backbone, BookModel) {

    var BookCollection = Backbone.Collection.extend({

        model: BookModel,
        url: 'app/data/topTrending.json',
        parse: function(data) {

            return data.books;
        }
    });

    return BookCollection;
});