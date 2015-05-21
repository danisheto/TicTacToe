window.addEventListener("load",function(){
    var boardModel=makeBoardModel();
    var boardController=makeBoardController();
    var boardView=makeBoardView(boardModel,boardController);
    var controlsController=makeControlsController();
    var controlsView=makeControlsView(boardModel, controlsController);

    document.getElementById("content").appendChild(boardView.getCanvas());
    
    document.getElementById("content").appendChild(controlsView.getElement());
}, false);