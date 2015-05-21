var makeControlsController=function(){
	var handleNewGameClick=function(boardModel){
		boardModel.resetGame()
	}
	return {
		handleNewGameClick:handleNewGameClick
	}
}