var httpRequest = new XMLHttpRequest();

var API = {
    get: function(url, callback) {
        httpRequest.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback(JSON.parse(this.response));
            }
        }
        httpRequest.open('GET', url);
        httpRequest.send();
    }
};

module.exports  = API;
