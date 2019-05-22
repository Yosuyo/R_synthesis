

var canvas = document.getElementById("canvas2");
canvas.oncontextmenu = function () {
    //テキストボックスを開き元素記号を入力する処理
    console.log("右");
    return false;
};
var ctx = canvas.getContext("2d");

var w = 50;
var m = 10;

var mouseX, mouseY;
var downX, downY;
var drag = false;

var list = [];

var mode = 0;

function def() {
    mode = 0;
}
function inp() {
    mode = 1;
}

canvas.onmousedown = function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    function begin(x, y) {
        if (mode == 0) {
            downX = x;
            downY = y;
            drag = true;
        } else if (mode == 1) {
            ctx.fillStyle = "rgb(240,240,240)";
            ctx.fillRect(x - 10, y - 10, 20, 20);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.font = "20px serif";
            ctx.fillText("X", x - 7, y + 8);
        }
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 16; j++) {
            if (j * w + m - 5 <= mouseX && mouseX <= j * w + m + 5 && i * Math.sqrt(3) * w + m - 5 <= mouseY && mouseY <= i * Math.sqrt(3) * w + m + 5) {
                begin(j * w + m, i * Math.sqrt(3) * w + m);
                return;
            }
            if (j * w + (w / 2) + m - 5 <= mouseX && mouseX <= j * w + (w / 2) + m + 5 && (i + 0.5) * Math.sqrt(3) * w + m - 5 <= mouseY && mouseY <= (i + 0.5) * Math.sqrt(3) * w + m + 5) {
                begin((j + 0.5) * w + m, (i + 0.5) * Math.sqrt(3) * w + m);
                return;
            };
        }
    }
};
canvas.onmouseup = function (e) {
    var flug = 0;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    function line(x, y) {
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(downX, downY);
        ctx.lineTo(x, y);
        ctx.stroke();
        drag = false;
        list.push([Math.round(downX), Math.round(downY), Math.round(x), Math.round(y), 1]);
        console.log(list);
    }
    function double(x, y) {
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(downX, downY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "rgb(240,240,240)";
        ctx.lineWidth = 3;
        ctx.moveTo(downX, downY);
        ctx.lineTo(x, y);
        ctx.stroke();
        drag = false;
        list.push([Math.round(downX), Math.round(downY), Math.round(x), Math.round(y), 2]);
        flug = 0;
    }
    function triple(x, y) {
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.moveTo(downX, downY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "rgb(240,240,240)";
        ctx.lineWidth = 9;
        ctx.moveTo(downX, downY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 3;
        ctx.moveTo(downX, downY);
        ctx.lineTo(x, y);
        ctx.stroke();
        drag = false;
        list.push([Math.round(downX), Math.round(downY), Math.round(x), Math.round(y), 3]);
        flug = 0;
    }
    function check(x, y) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][0] == Math.round(downX) && list[i][1] == Math.round(downY) && list[i][2] == Math.round(x) && list[i][3] == Math.round(y) && list[i][4] == 1) {
                flug = 1;
                break;
            } else if (list[i][0] == Math.round(x) && list[i][1] == Math.round(y) && list[i][2] == Math.round(downX) && list[i][3] == Math.round(downY) && list[i][4] == 1) {
                flug = 1;
                break;
            }
        };
        for (var i = 0; i < list.length; i++) {
            if (list[i][0] == Math.round(downX) && list[i][1] == Math.round(downY) && list[i][2] == Math.round(x) && list[i][3] == Math.round(y) && list[i][4] == 2) {
                flug = 2;
                break;
            } else if (list[i][0] == Math.round(x) && list[i][1] == Math.round(y) && list[i][2] == Math.round(downX) && list[i][3] == Math.round(downY) && list[i][4] == 2) {
                flug = 2;
                break;
            }
        };
    }
    function draw() {
        check(x, y);
        if (flug == 1) {
            double(x, y);
        } else if (flug == 2) {
            triple(x, y);
        } else {
            line(x, y);
        }
    }
    if (drag == true) {
        if (mouseX < downX) {
            if ((mouseY - downY) / (mouseX - downX) < (-1 / Math.sqrt(3))) {
                var x = downX - (0.5 * w);
                var y = downY + (0.5 * Math.sqrt(3) * w);
                draw()
                return;
            } else if ((mouseY - downY) / (mouseX - downX) > 1 / Math.sqrt(3)) {
                var x = downX - (0.5 * w);
                var y = downY - (0.5 * Math.sqrt(3) * w);
                var flug = 0;
                draw();
                return;
            } else {
                var x = downX - w;
                var y = downY;
                draw();
                return;
            }
        } else {
            if ((mouseY - downY) / (mouseX - downX) < (-1 / Math.sqrt(3))) {
                var x = downX + (0.5 * w);
                var y = downY - (0.5 * Math.sqrt(3) * w);
                draw();
                return;
            } else if ((mouseY - downY) / (mouseX - downX) > 1 / Math.sqrt(3)) {
                var x = downX + (0.5 * w);
                var y = downY + (0.5 * Math.sqrt(3) * w);
                draw();
                return;
            } else {
                var x = downX + w;
                var y = downY;
                draw();
                return;
            }
        }
    }
};