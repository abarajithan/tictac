/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let value = 1;
let xcol = [];
let xrow = [];
let ycol = [];
let yrow = [];
let count = 0;
const testCondition = "0,1,2";

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getUniqueValues(array){
    return array.filter(function(obj, index, arg)
    { 
        return arg.indexOf(obj) === index; 
    });
}

function diagonalCheck(gridValue){
    let diagonal = true;
    for(let i=0;i<GRID_LENGTH;i++){
        if(grid[i][i] != gridValue){
            diagonal = false;
            break;
        }
    }
    if(!diagonal){
        diagonal = true;
        for(let i=0,j= GRID_LENGTH -1;i<GRID_LENGTH,j >=0;i++, j--){
            if(grid[i][j] != gridValue){
                diagonal = false;
                break;
            }
        }
    }
    return diagonal;   
}

function showMessage(message){
    document.getElementById("message").innerHTML = message;
    document.getElementById("message").classList.add("show");
    document.getElementById("refresh-btn").classList.add("show");
    document.getElementsByClassName("parentTop")[0].classList.add('opaque');
}


function findWinner(colIdx,rowIdx,gridValue, count){
    let winnerDisplay = false;
    if(gridValue === 1){
        xcol.push(colIdx);
        xrow.push(rowIdx);
        if(xcol.length >= 3 || xrow.length >= 3){
           let  uniqueCol = getUniqueValues(xcol);
           let  uniqueRow = getUniqueValues(xrow);
            if(
                (
                    uniqueCol.sort().join().includes(testCondition) && 
                    (
                        xrow.sort().join().includes("0,0,0")||
                        xrow.sort().join().includes("1,1,1")||
                        xrow.sort().join().includes("2,2,2")
                    )
                )
                || 
                ( 
                    uniqueRow.sort().join().includes(testCondition) &&
                    (
                        xcol.sort().join().includes("0,0,0")||
                        xcol.sort().join().includes("1,1,1")||
                        xcol.sort().join().includes("2,2,2")
                    )
                )
            )
            {
                showMessage("X is the Winner");
                winnerDisplay = true;
            }
            else{
                if(diagonalCheck(gridValue)){
                    showMessage("X is the Winner");
                    winnerDisplay = true;
                }
            }
        }
    }
    else{
        ycol.push(colIdx);
        yrow.push(rowIdx);
        if(ycol.length >= 3 || yrow.length >= 3){
            let  uniqueCol = getUniqueValues(ycol);
            let  uniqueRow = getUniqueValues(yrow);
            if(
                (
                    uniqueCol.sort().join().includes(testCondition) && 
                    (
                        yrow.sort().join().includes("0,0,0")||
                        yrow.sort().join().includes("1,1,1")||
                        yrow.sort().join().includes("2,2,2")
                    )
                )
                || 
                ( 
                    uniqueRow.sort().join().includes(testCondition) &&
                    (
                        ycol.sort().join().includes("0,0,0")||
                        ycol.sort().join().includes("1,1,1")||
                        ycol.sort().join().includes("2,2,2")
                    )
                )
            )
            {
                showMessage("O is the Winner");
                winnerDisplay = true;
            }
            else{
                if(diagonalCheck(gridValue)){
                    showMessage("O is the Winner");
                    winnerDisplay = true;
                }
            }
        }
    }
    if(count == 9 && !winnerDisplay){
        showMessage("Winner can't be determined");
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = value;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    count++;
    findWinner(colIdx,rowIdx,newValue,count);
    if(value == 1){
        value = 2;
    }
    else{
        value = 1;
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
