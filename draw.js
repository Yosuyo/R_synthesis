

var canvas = document.getElementById("canvas2");
canvas.oncontextmenu = function () {
    //テキストボックスを開き元素記号を入力する処理
    return false;
};
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255,0,255,0.1)";
ctx.fillRect(0, 0, 800, 760);

var w = 50;
var m = 10;

var mouseX, mouseY;
var downX, downY;
var drag = false;

function line(x, y) {
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(downX, downY);
    ctx.lineTo(x, y);
    ctx.stroke();
    drag = false;
}

canvas.onmousedown = function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 16; j++) {
            if (j * w + m - 5 <= mouseX && mouseX <= j * w + m + 5 && i * Math.sqrt(3) * w + m - 5 <= mouseY && mouseY <= i * Math.sqrt(3) * w + m + 5) {
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.beginPath();
                ctx.arc(j * w + m, i * Math.sqrt(3) * w + m, 3, 0, 2 * Math.PI, true);
                ctx.fill();
                downX = j * w + m;
                downY = i * Math.sqrt(3) * w + m;
                drag = true;
                break;
            }
            if (j * w + (w / 2) + m - 5 <= mouseX && mouseX <= j * w + (w / 2) + m + 5 && (i + 0.5) * Math.sqrt(3) * w + m - 5 <= mouseY && mouseY <= (i + 0.5) * Math.sqrt(3) * w + m + 5) {
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.beginPath();
                ctx.arc(j * w + (w / 2) + m, (i + 0.5) * Math.sqrt(3) * w + m, 3, 0, 2 * Math.PI, true);
                ctx.fill();
                downX = (j + 0.5) * w + m;
                downY = (i + 0.5) * Math.sqrt(3) * w + m;
                drag = true;
                break;
            };
        }
    }
};
canvas.onmouseup = function (e) {
    console.log(1);
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    if (mouseX < downX) {
        if ((mouseY - downY) / (mouseX - downX) < (-1 / Math.sqrt(3))) {
            line(downX - (0.5 * w), downY + (0.5 * Math.sqrt(3) * w));
        } else if ((mouseY - downY) / (mouseX - downX) > 1 / Math.sqrt(3)) {
            line(downX - (0.5 * w), downY - (0.5 * Math.sqrt(3) * w));
        } else {
            line(downX - w, downY);
        }
    } else {
        if ((mouseY - downY) / (mouseX - downX) < (-1 / Math.sqrt(3))) {
            line(downX + (0.5 * w), downY - (0.5 * Math.sqrt(3) * w));
        } else if ((mouseY - downY) / (mouseX - downX) > 1 / Math.sqrt(3)) {
            line(downX + (0.5 * w), downY + (0.5 * Math.sqrt(3) * w));
        } else {
            line(downX + w, downY);
        }
    }
};