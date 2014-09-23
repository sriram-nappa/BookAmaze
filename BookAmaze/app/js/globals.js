define(function(){
	String.prototype.initCap = function() {
        return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function(m) {
            return m.toUpperCase();
        });
    };
});