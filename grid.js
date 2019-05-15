

onload = function () {
    draw1();
    draw2();
};

var w = 50;
var m = 10;

function draw1() {
    var canvas = document.getElementById("canvas0");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(240,240,240)";
    ctx.fillRect(0, 0, 800, 760);
};
function draw2() {
    var canvas = document.getElementById("canvas0");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 16; j++) {
            ctx.beginPath();
            ctx.arc(j * w + m, i * Math.sqrt(3) * w + m, 3, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(j * w + (w / 2) + m, (i + 0.5) * Math.sqrt(3) * w + m, 3, 0, 2 * Math.PI, true);
            ctx.stroke();
        }
    }
};