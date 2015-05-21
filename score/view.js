var makeScoreView=function(initialScoreModel){
	var scoreModel;

	var rootElement = document.createElement("div");
	var xScoreElement = document.createElement("p");
	var oScoreElement = document.createElement("p");
	rootElement.appendChild(xScore);
	rootElement.appendChild(oScore)

	var updateScore=function(xScore, oScore){
		xScoreElement.innerText = "X Score: " + xScore;
		oScoreElement.innerText = "O Score: " + oScore;
	}

	var scoreObserver=function(){
		updateScore(scoreModel.getXScore(), scoreModel.getOScore());
	}

	var setScoreModel=function(model){
		if(!model){
			throw new Error("must supply a model")
		}
		if(scoreModel){
			scoreModel.removeObserver(scoreObserver);
		}
		scoreModel = model;
		scoreModel.addObserver(scoreObserver);
	}
}