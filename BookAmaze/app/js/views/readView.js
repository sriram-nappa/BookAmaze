define(['jquery', 'underscore', 'backbone', 'text!templates/read.html'], function($, _, Backbone, readTpl) {
    var ReadView = Backbone.View.extend({
        className: "read",
        templateFileName: "read.html",
        template: readTpl,
        imgcollection: [],
        input: [{
            "image": "http://docs.google.com/gview?url=http%3A%2F%2Fwww.13shared.net%2Fdirectdownload%2Fb6d77579e231707624d9c2059022d25bb2%2FSuzanne+Collins+-+Hunger+Games+02+-+Catching+Fire.pdf&embedded=true"
        }, {
            "image": "http://docs.google.com/gview?url=http%3A%2F%2Fwww.13shared.net%2Fdirectdownload%2Fb0504305c885eb2f22c08412f57e0bf4a8%2FDivergent+-+Veronica+Roth.pdf&embedded=true"
        }, {
            "image": "http://docs.google.com/gview?url=http%3A%2F%2Fwww.13shared.net%2Fdirectdownload%2F21a9d34f2a0cf30726aee35452ac13ed5d%2FFifty+Shades+of+Grey+-+E+L+James.pdf&embedded=true"
        }, {
            "image": "http://docs.google.com/gview?url=http%3A%2F%2Fwww.13shared.net%2Fdirectdownload%2F817662b54fff1b2029cdffe85d341e65bb%2FJ.K.+Rowling+-+HP+6+-+Harry+Potter+and+the+Half-Blood+Prince.pdf&embedded=true"
        }, {
            "image": "http://docs.google.com/gview?url=http%3A%2F%2Fwww.13shared.net%2Fdirectdownload%2Fc04483e9cb81c72f215437307255b4c914%2FThe+Hobbit+-+J.+R.+R.+Tolkien+%5BPDF%5D+%5Bnikz%5D.pdf&embedded=true"
        }],
        initialize: function() {
            console.log("readView");
            this.imgcollection = document.getElementsByName('read');
        },
        render: function() {
            _.bindAll(this, "show");
            this.$el.html(_.template(this.template));

        },
        events: {
            "click .readBooks": "show"
        },
        show: function() {
            console.log("CLICKEDD" + this.imgcollection);
            for (i = 0; i < this.imgcollection.length; i++) {
                if (this.imgcollection[i] == event.target) {
                    $('#book').css({
                        "display": "block"
                    }).attr('src', this.input[i].image);
                }
            }
        }
    });
    return ReadView;
});