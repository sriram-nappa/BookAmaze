define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.html'
], function($, _, Backbone, headerTpl) {


    var HeaderView = Backbone.View.extend({
        tagName: "header",
        templateFileName: "header.html",
        template: headerTpl,

        initialize: function() {},
        render: function() {
            this.$el.html(_.template(this.template));
        }
    });

    return HeaderView;
});