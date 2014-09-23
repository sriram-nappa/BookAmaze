define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search.html'
], function($,_,Backbone,searchTpl) {

	var SearchView = Backbone.View.extend({
        className: "search",
        templateFileName: "search.html",
        template: searchTpl,

        initialize: function() {
        },
        render: function() {
            this.$el.html(_.template(this.template));
        },
        events: {
            "click #searchButton": "searchBook",
            "click .similar":"similarDisp"
        },
        similarDisp:function(){
            var title=$(event.target.parentNode.children[1]).text();
           this.getBookInformation(title, this); 
        },
        searchBook: function() {
            var searchText = $("#searchBox").val();
           this.getBookInformation(searchText, this);
        },
        getBookInformation: function(title, that) {

            var url = "https://www.goodreads.com/book/title.xml?" + "key=nL1lYsEpnZeHT5EWPUelzg&title=" + encodeURIComponent(title);


            $.get("http://query.yahooapis.com/v1/public/yql", {
                    q: "select * from xml where url=\"" + url + "\"",
                    format: "xml"

                },
                function(xml) {
                   
                        remOne = $(".remOne").attr('class');
                        that.displayMain(xml, mainBook, remOne);
                   
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
                $(id).append("<p class=\"" + className + "\">" + desc + "</p>");
                $(id).append("<h5 class=\"" + className + "\">Average Rating :&#160;" + avgRating.text() + "&#160;&#160;" + "  Total :" + " &#160;&#160; " + rateCount.text() + "&#160;  no. of ratings</h5>");
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
	
	return SearchView;
});