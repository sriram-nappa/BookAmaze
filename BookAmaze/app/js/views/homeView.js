define(['jquery', 'backbone', 'underscore', 'modernizer', 'slider', 'text!templates/home.html'], function($, Backbone, _, m, Cslider, homeTpl) {


    var HomeView = Backbone.View.extend({


        className: "slider",
        templateFileName: "home.html",
        template: homeTpl,
        initialize: function() {
            $(function() {

                $('#da-slider').cslider({
                    autoplay: true,
                    bgincrement: 450
                });

            });
        },
        render: function() {
            console.log(this.$el);
            //this.$el.html("HELLOWORLD");
            this.$el.html(_.template(this.template));
            this.slider();


        },
        slider: function() {

            $(function() {

                $('#da-slider').cslider({
                    autoplay: true,
                    bgincrement: 450
                });

            });



        }
    });

    return HomeView;
});