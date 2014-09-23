define(['jquery', 'underscore', 'backbone', 'models/user', 'collections/userCollection', 'views/homeView', 'text!templates/login.html'], function($, _, Backbone, UserModel, UserCollection, HomeView, loginTpl) {
    var LoginView = Backbone.View.extend({
        templateFileName: "login.html",
        template: loginTpl,
        initialize: function() {
            console.log('login');
            this.userCollection = new UserCollection();

            this.userCollection.fetch();
            this.userCollection.bind('all', this.loadUsers, this);

        },
        render: function() {
            this.$el.html(_.template(this.template));
        },
        events: {
            "click #loginButton": "checkUser",
            "click #cancelButton": "goHome",
            "click #signUp": "register",
            "click #save": "signUp"
        },
        checkUser: function() {
            var user = $("#userName").val();
            var pwd = $("#pwd").val();
            var count = 0;
            that = this;

            this.userCollection.each(function(model) {
                var name = model.get("uname");
                var pass = model.get("password");
                if (name == user) {
                    count = 0;
                    if (pass == pwd) {
                        this.goHome;
                    } else {
                        $('#invalid').html("Invalid password").css('display', 'block');
                    }

                } else {
                    count++;
                }


            });
            if (count != 0) {
                $('#invalid').html("UserName doesn't Exist").css('display', 'block');
            }

        },
        register: function() {
            $("#login").css('display', 'none');
            $("#register").css('display', 'block');
        },
        signUp: function() {
            var user = $("#newUser").val();
            var pwd = $("#newPwd").val();
            that = this;
            this.userCollection.push({
                'uname': user,
                'password': pwd
            });
            this.userCollection.each(function(model) {
                console.log(model.get("uname") + "," + model.get("password"));
            });

        },
        goHome: function() {
            var home = new HomeView();
            home.render();
            $('#mainContent').html(home.el);
        }
    });
    return LoginView;
});