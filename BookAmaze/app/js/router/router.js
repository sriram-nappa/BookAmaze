define([

    'jquery',
    'backbone',
    'views/homeView',
    'views/pageTwoView',
    'views/searchView',
    'views/readView',
    'views/loginView'
], function($, Backbone, HomeView, PageTwoView, SearchView, ReadView, LoginView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "home": "home",
            "pageTwo": "pageTwo",
            "search": "search",
            "read": "read",
            "login": "login",
            "*actions": "home"
        },
        initialize: function(HomeView) {
            this.homeView = new HomeView();
            this.homeView.render();
            console.log(this.homeView.el);
            $('#mainContent').html(this.homeView.el);
        },
        home: function() {
            this.homeView = new HomeView();
            this.homeView.render();
            $('#mainContent').html(this.homeView.el);
        },
        pageTwo: function() {
            this.pageTwoView = new PageTwoView(this);
            this.pageTwoView.render();
            // console.log(this.pageTwoView.el);
            $('#mainContent').html(this.pageTwoView.el);
        },
        search: function() {
            this.searchView = new SearchView(this);
            this.searchView.render();
            $('#mainContent').html(this.searchView.el);
        },
        read: function() {
            this.readView = new ReadView(this);
            this.readView.render();
            $('#mainContent').html(this.readView.el);
        },
        login: function() {
            this.loginView = new LoginView(this);
            this.loginView.render();
            $('#mainContent').html(this.loginView.el);
        }
    });


    return AppRouter;

});