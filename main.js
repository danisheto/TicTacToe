window.addEventListener("load",function(){
    var boardModel=makeBoardModel();
    var boardController=makeBoardController();
    var boardView=makeBoardView(boardModel,boardController);

    var controlsController=makeControlsController();
    var controlsView=makeControlsView(boardModel, controlsController);

    var scoreView=makeScoreView(boardModel);

    document.getElementById("content").appendChild(boardView.getCanvas());
    document.getElementById("content").appendChild(scoreView.getElement());
    document.getElementById("content").appendChild(controlsView.getElement());
}, false);