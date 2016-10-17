var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf

function formatResponse(data){
  	var set = '';

	for(var i = 0; i < data.movements.length; i++){
		set += data.reps[i]+' '+data.movements[i] + '<br>';
	}
	console.log(set);
	wod = vsprintf("<b>%s Rounds:</b> <br><br> %s ", [data.rounds, set]);
	return wod;
}
module.exports.formatResponse = formatResponse;