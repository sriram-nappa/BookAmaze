'use strict';


require(["config"], function() {
    require(['backbone',
            'views/homeView',
            'router/router'
        ],
        function(Backbone, HomeView, AppRouter) {
            new AppRouter(HomeView);
            Backbone.history.start();
        });
});
