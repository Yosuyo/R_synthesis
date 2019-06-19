

onload = function () {
    draw1();
    draw2();
};

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
    for (var j = 0; j < 18; j++) {
        for (var i = 0; i < 16; i++) {
            if (j % 2 == 0) {
                ctx.beginPath();
                ctx.arc(i * w + m, j * Math.sqrt(3) * w / 2 + m, 1, 0, 2 * Math.PI, true);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(i * w + m + 1 / 2 * w, j * Math.sqrt(3) * w / 2 + m, 1, 0, 2 * Math.PI, true);
                ctx.stroke();
            }
        }
    }
};