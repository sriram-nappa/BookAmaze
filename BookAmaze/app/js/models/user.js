define(['jquery', 'backbone'], function($, Backbone) {

    var users = Backbone.Model.extend({
        defaults: {
            'uname': 'admin',
            'password': '123',
            'fav': []
        },
        initialize: function() {

        }
    });


    return users;
});