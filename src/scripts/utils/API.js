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
    },

    post : function(apiUrl , postData , successCb){
		$.ajax({
			url : apiUrl,
			type : 'POST',
			data : postData,
			success : function(data , status){
				successCb(data);
			},
			error : function(){
				console.log('POST Error');
			}
		});
	},
};

module.exports  = API;
