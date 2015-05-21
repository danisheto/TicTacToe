var makeBoardController=function(){
    var handleClick = function(e, boardModel, x, y){
        boardModel.mark(x, y);
    }
    return {
        handleClick:handleClick
    }
}