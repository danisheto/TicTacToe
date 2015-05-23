var makeScoreView=function(initialBoardModel){
	var boardModel;

	var rootElement = document.createElement("div");
	var xScoreElement = document.createElement("div");
	var oScoreElement = document.createElement("div");
	rootElement.appendChild(xScoreElement);
	rootElement.appendChild(oScoreElement);

	var updateScore=function(xScore, oScore){
		xScoreElement.innerText = "X Score: " + xScore;
		oScoreElement.innerText = "O Score: " + oScore;
	}

	var scoreObserver=function(){
		updateScore(boardModel.getXScore(), boardModel.getOScore());
	}

	var setBoardModel=function(model){
		if(!model){
			throw new Error("must supply a model")
		}
		if(boardModel){
			boardModel.removeObserver(scoreObserver);
		}
		boardModel = model;
		boardModel.addObserver(scoreObserver);
	}
	setBoardModel(initialBoardModel);

	updateScore(0,0);
	
	return {
		getElement:function(){
			return rootElement;
		}
	}
}