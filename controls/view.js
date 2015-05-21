var makeControlsView=function(initialBoardModel, initialControlsController){
	var boardModel;
	var controlsController;

	var element=document.createElement("div");
	var button=document.createElement("a");
	button.href="javascript:void(0)";
	button.classList.add("btn");
	button.style.display="none";
	button.innerText="New Game";
	element.appendChild(button);

	button.addEventListener("mousedown",function(){
		controlsController.handleNewGameClick(boardModel);
	},false)

	var boardObserver=function(){
		if(typeof boardModel.getWinner()=="object"){
			console.log('lkj')
			button.style.display="";
		}
	}

	var setBoardModel=function(model){
		if(!model){
			throw new Error("must supply a model")
		}
		if(boardModel){
			boardModel.removeObserver(boardObserver);
		}
		boardModel = model;
		boardModel.addObserver(boardObserver);
	}

	var setControlsController=function(controller){
		if(!controller){
			throw new Error("must supply a controller");
		}
		controlsController = controller;
	}

	setBoardModel(initialBoardModel);
	setControlsController(initialControlsController);

	return {
		getElement:function(){
			return element;
		},
		hideButton:hideButton
	}
}