define([
    'jquery',
    'underscore',
    'backbone',
    'globals',
    'models/model',
    'collections/bookCollection',
    'collections/authorCollection',
    'text!templates/pageTwo.html'
], function($, _, Backbone, g, BookModel, BookCollection, AuthorCollection, pageTwoTpl) {


    var PageTwoView = Backbone.View.extend({
        className: "topTrends",
        templateFileName: "pageTwo.html",
        template: pageTwoTpl,
        flag: 0,
        topTrendImage: [],
        topTrendTitle: [],
        topTrendAuthor: [],
        topAuthorTitle: [],
        topAuthorName: [],
        topAuthorImage: [],
        authorFlag: 0,
        defaultFlag: 1,
        authorDefaultFlag: 1,

        initialize: function() {


            this.bookCollection = new BookCollection();

            this.bookCollection.fetch();
            this.bookCollection.bind('all', this.load, this);

            this.authorCollection = new AuthorCollection();
            this.authorCollection.fetch();
            this.authorCollection.bind('all', this.authorLoad, this)

            _.bindAll(this, "arrowClick", "arrowClickTwo");

        },
        render: function() {


            this.$el.html(_.template(this.template));

        },
        events: {
            "click #rightArrow,#leftArrow": "arrowClick",
            "click #rightArrowTwo,#leftArrowTwo": "arrowClickTwo",
            "click #goBack": "goBack",
            "click #goBack2": "goBack2",
            "click .topTrendList": "topTrendDisplay",
            "click .topAuthorList": "topAuthorDisplay"

        },
        load: function() {
            var j = 0;
            that = this;
            this.bookCollection.each(function(model) {
                that.topTrendTitle[j] = model.get('title');
                that.topTrendAuthor[j] = model.get('author');
                that.topTrendImage[j] = model.get('src');
                j++;
            });
            that.arrowClick();

        },
        authorLoad: function() {
            var j = 0;
            that = this;

            this.authorCollection.each(function(model) {
                that.topAuthorTitle[j] = model.get('title');
                that.topAuthorName[j] = model.get('author');
                that.topAuthorImage[j] = model.get('src');
                j++;
            });
            that.arrowClickTwo();
        },

        arrowClick: function(event) {
            var len = $(".topTrendList").length;

            if (this.flag == 1 || this.defaultFlag == 1) {

                $(".removeTT").remove();

                for (var j = 0; j < len; j++) {
                    $($(".topTrendList")[j]).append("<img class=\"removeTT\" src=\"" + this.topTrendImage[j] + "\"/>" + "<figcaption class=\"removeTT\" >" + this.topTrendTitle[j] + "</figcaption><h5 class=\"removeTT\">-" + this.topTrendAuthor[j] + "</h5>");

                }
                this.flag = 0;
                this.defaultFlag = 0;

            } else {

                $(".removeTT").remove();

                for (var j = 0; j < len; j++) {
                    $($(".topTrendList")[j]).append("<img class=\"removeTT\" src=\"" + this.topTrendImage[j + 5] + "\"/>" + "<figcaption class=\"removeTT\" >" + this.topTrendTitle[j + 5] + "</figcaption><h5 class=\"removeTT\">-" + this.topTrendAuthor[j + 5] + "</h5>");
                }
                this.flag = 1;

            }

        },
        arrowClickTwo: function(event) {


            var len = $(".topAuthorList").length;

            if (this.authorFlag == 1 || this.authorDefaultFlag == 1) {

                $(".removeTA").remove();

                for (var j = 0; j < len; j++) {
                    $($(".topAuthorList")[j]).append("<img class=\"removeTA\" src=\"" + this.topAuthorImage[j] + "\"/>" + "<figcaption class=\"removeTA\" >" + this.topAuthorTitle[j] + "</figcaption><h5 class=\"removeTA\">-" + this.topAuthorName[j] + "</h5>");

                }
                this.authorFlag = 0;
                this.authorDefaultFlag = 0;


            } else {

                $(".removeTA").remove();

                for (var j = 0; j < len; j++) {
                    $($(".topAuthorList")[j]).append("<img class=\"removeTA\" src=\"" + this.topAuthorImage[j + 5] + "\"/>" + "<figcaption class=\"removeTA\" >" + this.topAuthorTitle[j + 5] + "</figcaption><h5 class=\"removeTA\">-" + this.topAuthorName[j + 5] + "</h5>");
                }
                this.authorFlag = 1;

            }


        },
        goBack: function() {

            event.preventDefault();
            $("#bookDetails").fadeOut('slow', function() {
                $('#bookDetails').css('display', 'none');
                $('#goBack').css('display', 'none');

                $("#topTrendings").fadeIn('slow', function() {
                    $('#topTrendings').css('display', 'block');
                });
            });
        },
        goBack2: function() {

            event.preventDefault();
            $("#authorDetails").fadeOut('slow', function() {
                $('#authorDetails').css('display', 'none');
                $('#goBack2').css('display', 'none');

                $("#topAuthors").fadeIn('slow', function() {
                    $('#topAuthors').css('display', 'block');
                });
            });

        },
        topTrendDisplay: function() {
            var bName = $(event.target.parentNode.children[1]).text();
            bName = bName.initCap();



            this.getBookInformation(bName, 2, this);


        },
        topAuthorDisplay: function() {
            var bName = $(event.target.parentNode.children[1]).text();
            bName.initCap();
            this.getBookInformation(bName, 3, this);
        },
        getBookInformation: function(title, arg, that) {

            var url = "https://www.goodreads.com/book/title.xml?" + "key=nL1lYsEpnZeHT5EWPUelzg&title=" + encodeURIComponent(title);


            $.get("http://query.yahooapis.com/v1/public/yql", {
                    q: "select * from xml where url=\"" + url + "\"",
                    format: "xml"

                },
                function(xml) {
                    if (arg == 1) {
                        remOne = $(".remOne").attr('class');
                        that.displayMain(xml, mainBook, remOne);
                    } else if (arg == 2) {
                        remTwo = $(".remTwo").attr('class');
                        that.displayMain(xml, bookDetails, remTwo);

                        $("#topTrendings").fadeOut('slow', function() {
                            $('#topTrendings').css('display', 'none');
                            $('#bookDetails').fadeIn("slow", function() {

                                $('#bookDetails').css('display', 'block');
                                $('#goBack').css('display', 'block');
                            });
                        });
                    } else if (arg == 3) {

                        remThree = $(".remThree").attr('class');
                        that.displayMain(xml, authorDetails, remThree);

                        $("#topAuthors").fadeOut('slow', function() {
                            $('#topAuthors').css('display', 'none');
                            $('#authorDetails').fadeIn("slow", function() {

                                $('#authorDetails').css('display', 'block');
                                $('#goBack2').css('display', 'block');
                            });
                        });
                    }

                });

        },
        displayMain: function(xml, id, className) {

            xmlDoc = xml;
            err = $(xmlDoc).find('error');

            books = $(xmlDoc).find("book");
            simBooks = $($(books[0]).find('similar_books'));
            bookTitle = $($(books[0]).find('title')[0]);
            simImg = $(simBooks.find('image_url'));
            simTitle = $(simBooks.find('title'));

            var desc = $(books[0]).find('description').text();
            var imageUrl = $($(books[0]).find('image_url')[0]);
            var avgRating = $($(books[0]).find('average_rating')[0]);
            var rateCount = $($(books[0]).find('ratings_count')[0]);

            var dummyClassName = "." + className;
            $(dummyClassName).remove();

            if (err.text() == "book not found") {
                $(id).append("<h4 class=\"" + className + "\">SORRY, N0 Book Found..Please Try Again</h4>");
            } else {
                $(id).append("<figure class=\"" + className + "\"><img class=\"" + className + "\" src=\"" + imageUrl.text() + "\"/>" + "</figure>");
                $(id).append("<h4 class=\"" + className + "\">" + bookTitle.text() + "</h4>");
                $(id).append("<p class=\"" + className + " details\">" + desc + "</p>");
                $(id).append("<p  class=\"" + className + " rating\">Average Rating :&#160;" + avgRating.text() + "&#160;&#160;" + "  Total :" + " &#160;&#160; " + rateCount.text() + "&#160;  no. of ratings</p>");
                $(id).append('<div class="clear"></div>');

                if ($(id).attr('id') == "mainBook") {
                    $("#simBookDisp").append("<h4 class=\"" + className + "\">Some similar books are</h4>");
                    for (var j = 0; j < simImg.length; j++) {
                        $("#simBookDisp").append("<figure class=\"similar\"><img class=\"" + className + "\" src=\"" + $(simImg[j]).text() + "\"/>" + "<figcaption class=\"" + className + "\" >" + $(simTitle[j]).text() + "</figcaption></figure>");
                    }
                }
            }

        }
    });

    return PageTwoView;
});