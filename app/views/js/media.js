function renderVideos() {
	var index = 0;
	var video_sources = [];
	var url = 'https://wodx.herokuapp.com/api/v1/videos';

	$.ajax({
		url: url,
		dataType: 'jsonp',
		success: function(data){
			 for (var i = 0; i < data.videos.length; i++) {
	     		video_sources[i] = data.videos[i];
	     	}
		}
	})
	.fail(function() {
	   console.log("Something went wrong with videos ajax request!");
	 });

	setInterval(function () {
        
    	var video = document.getElementById('videos');
        video.setAttribute("src", video_sources[index]);
        
        if(index == video_sources.length -1){
        	index = 0;
        }

        index++;

	}, 21*1000);

}