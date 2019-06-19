var targetFlag = false;

var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");

function onMouseOver(e) {
    rect = e.target.getBoundingClientRect();
    canvas.addEventListener("mousemove", onMouseMove, false);
}
function onMouseOut() {
    canvas.removeEventListener("mousemove", onMouseMove, false);
}
function onMouseMove(e) {
    mouseActions.updateTargetFlag(e);
}

function onConnect(x, y, v) {
    if () {

    }
}

function listCheck(x, y) {
    if (list.length == 0) {
        //falseを出力
    } else {
        for (let v of list) {
            //各々のリスト要素に対する対応
        }
    }
}

var mouseActions = {
    updateTargetFlag: function (e) {
        var mx = e.offsetX;
        var my = e.offsetY;
    }
};