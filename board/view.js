var makeBoardView=function(initialBoardModel, initalBoardController){
    var boardModel;
    var boardController;

    var canvas = document.createElement("canvas");

    canvas.style.width="150px";
    canvas.style.height="150px";
    canvas.width=300;
    canvas.height=300;
    
    var context=canvas.getContext("2d");

    canvas.addEventListener("mousedown",function(e){
        var x = Math.floor(((e.clientX-canvas.offsetLeft)*2)/(canvas.width/3));
        var y = Math.floor(((e.clientY-canvas.offsetTop)*2)/(canvas.height/3));

        boardController.handleClick(e, boardModel, x, y);
    },false)

    var renderBoard=function(grid){
        context.clearRect(0,0,canvas.width,canvas.height);

        context.lineWidth = 1.0;
        for(var i=0;i<3;i++){
            if(i>0){
                context.beginPath();
                context.moveTo(Math.floor(canvas.width/3)*i+0.5,0);
                context.lineTo(Math.floor(canvas.width/3)*i+0.5,canvas.height);

                context.moveTo(0,Math.floor(canvas.height/3)*i+0.5);
                context.lineTo(canvas.width,Math.floor(canvas.height/3)*i+0.5);
                context.stroke();
            }
            for(var j=0;j<3;j++){
                if(grid[i][j]=="X"){
                    context.beginPath();
                    context.moveTo(Math.floor(canvas.width/3)*i,Math.floor(canvas.height/3)*j)
                    context.lineTo(Math.floor(canvas.width/3)*(i+1),Math.floor(canvas.height/3)*(j+1))
                    context.moveTo(Math.floor(canvas.width/3)*(i+1),Math.floor(canvas.height/3)*j)
                    context.lineTo(Math.floor(canvas.width/3)*i,Math.floor(canvas.height/3)*(j+1))
                    context.stroke();
                }else if(grid[i][j]=="O"){
                    context.beginPath();
                    context.arc(Math.floor(canvas.width/3)*(i+0.5), Math.floor(canvas.height/3)*(j+0.5), Math.floor(canvas.width/6), 0, Math.PI*2);
                    context.stroke();
                }
            }
        }
    }
    var endGame=function(grid, winner){
        if(typeof winner=="object"){
            context.lineWidth=2.0;
            if(winner[2]=="vertical"){
                context.beginPath();
                context.moveTo(Math.floor(canvas.width/3)*winner[0]+Math.floor(canvas.width/6),0);
                context.lineTo(Math.floor(canvas.width/3)*winner[0]+Math.floor(canvas.width/6),canvas.height);
                context.stroke();
            }else if(winner[2]=="horizontal"){
                context.beginPath();
                context.moveTo(0,Math.floor(canvas.height/3)*winner[1]+Math.floor(canvas.height/6));
                context.lineTo(canvas.width,Math.floor(canvas.height/3)*winner[1]+Math.floor(canvas.height/6))
                context.stroke();
            }else if(winner[2]=="rl-diag"){
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(canvas.width, canvas.height);
                context.stroke();
            }else if(winner[2]=="lr-diag"){
                context.beginPath();
                context.moveTo(canvas.width,0);
                context.lineTo(0,canvas.height);
                context.stroke();
            }
        }else if(winner==null){
            renderBoard(grid);
        }
    }
    var boardObserver = function(){
        renderBoard(boardModel.getBoard());
        endGame(boardModel.getBoard(),boardModel.getWinner());
    }

    var setBoardModel = function(model){
        if(!model){
            throw new Error("Must supply a tic tac toe board model");
        }
        if(boardModel){
            boardModel.removeObserver(boardObserver);
        }
        boardModel = model;
        boardModel.addObserver(boardObserver);
        renderBoard(boardModel.getBoard());
    }

    var setBoardController = function(controller){
        if(!controller){
            throw new Error("Must supply a tic tac toe board controller");
        }
        boardController = controller;
    }

    setBoardModel(initialBoardModel)
    setBoardController(initalBoardController)

    return {
        getCanvas:function(){
            return canvas;
        }
    }
}