define(['jquery', 'backbone', 'models/user'], function($, Backbone, UserModel) {

    var UserCollection = Backbone.Collection.extend({

        model: UserModel,
        url: 'app/data/users.json',
        parse: function(data) {

            return data.users;
        }
    });

    return UserCollection;
});