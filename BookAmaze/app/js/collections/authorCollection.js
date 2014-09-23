define(['jquery', 'backbone', 'models/model'], function($, Backbone, BookModel) {

    var AuthorCollection = Backbone.Collection.extend({

        model: BookModel,
        url: 'app/data/topAuthor.json',
        parse: function(data) {
            console.log(data.books);
            return data.books;
        }
    });

    return AuthorCollection;
});