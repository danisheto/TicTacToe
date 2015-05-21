var makeBoardModel=function(){
    var player="X";
    var grid = [];
    var marks=0;
    var winner=false;
    for(var i=0;i<3;i++){
        grid[i] = [];//columns
        for(var j=0;j<3;j++){
            grid[i][j]=undefined;//cell
        }
    }

    var oScore=0;
    var xScore=0;

    var observableSubject = makeObservableSubject();
    var notifyObservers = observableSubject.notifyObservers;

    var mark = function(x, y){
        addMark(x,y);
        checkForOutcome(x,y);
    }
    var addMark=function(x, y){
        if(grid[x][y]===undefined){
            grid[x][y] = player;
            player=(player=="X")?"O":"X";
            marks++;
        }
        notifyObservers();
    }
    //uses last added mark to determine a outcome
    var checkForOutcome=function(x,y){
        if(grid[x][0]==grid[x][1] && grid[x][1]==grid[x][2] && grid[x][y]!=undefined){
            //check for vertical win
            winner=[x,y,"vertical"];
            grid[x][y]=="X"?xScore++:oScore++;
            notifyObservers();
        }else if(grid[0][y]==grid[1][y] && grid[1][y]==grid[2][y] && grid[x][y]!=undefined){
            //check for horizontal win
            winner=[x,y,"horizontal"];
            grid[x][y]=="X"?xScore++:oScore++;
            notifyObservers();
        }else if(grid[0][0]==grid[1][1] && grid[1][1]==grid[2][2] && grid[1][1]!=undefined){
            //check for left-right diagonal win
            winner=[x,y,"rl-diag"];
            grid[x][y]=="X"?xScore++:oScore++;
            notifyObservers();
        }else if(grid[2][0]==grid[1][1] && grid[1][1]==grid[0][2] && grid[1][1]!=undefined){
            //check for right-left diagonal win
            winner=[x,y,"lr-diag"];
            grid[x][y]=="X"?xScore++:oScore++;
            notifyObservers();
        }
        if(marks==9){
            //draw
            winner=null;
            notifyObservers();
        }
    }
    var resetGame=function(){
        player="X";
        grid = [];
        marks=0;
        winner=false;
        for(var i=0;i<3;i++){
            grid[i] = [];//columns
            for(var j=0;j<3;j++){
                grid[i][j]=undefined;//cell
            }
        }
        notifyObservers();
    }

    var getBoard=function(){
        return grid;
    }
    var getWinner=function(){
        return winner;
    }
    var getXScore=function(){
        return xScore;
    }
    var getOScore=function(){
        return oScore;
    }

    return {
        addObserver:observableSubject.addObserver,
        removeObserver:observableSubject.removeObserver,
        mark:mark,
        getBoard:getBoard,
        getWinner:getWinner,
        resetGame:resetGame,
        getXScore:getXScore,
        getOScore:getOScore
    }
}