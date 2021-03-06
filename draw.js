
canvas.oncontextmenu = function () {
    //テキストボックスを開き元素記号を入力する処理
    console.log("右");
    return false;
};


var mouseX, mouseY;
var downX, downY;
var drag = false;

var mode = 0;
var listNum = 0;

function def() {
    mode = 0;
    var status = document.getElementById("status");
    status.innerHTML = "デフォルト";
}
function inp() {
    mode = 1;
    var status = document.getElementById("status");
    status.innerHTML = "元素入力";
}
function reset() {
    list = [];
    ctx.clearRect(0, 0, 800, 760);
}
function cons() {
    console.log(list);
}
function getPosX(i, j) {
    if (j % 2 == 0) {
        var x = i * w / 2 + m;
    } else {
        var x = i * w / 2 + m + 1 / 2 * w;
    }
    return (x);
}
function getPosY(i, j) {
    var y = j * Math.sqrt(3) * w / 2 + m;
    return (y);
}
function getNumX(x, y) {
    var j = (y - m) * 2 / w / Math.sqrt(3);
    if (j % 2 == 0) {
        var i = (x - m) * 2 / w;
    } else {
        var i = (x - 1 / 2 * m) * 2 / w;
    }
    i = Math.round(i);
    return (i);
}
function getNumY(x, y) {
    var j = (y - m) * 2 / w / Math.sqrt(3);
    j = Math.round(j);
    return (j);
}
var nx, ny, mx, my;
function getNum(dx, dy, px, py) {
    nx = getNumX(dx, dy);
    ny = getNumY(dx, dy);
    mx = getNumX(px, py);
    my = getNumY(px, py);
}
var p, q, r, s;
function getPos(pi, pj, pk, pl) {
    p = getPosX(pi, pj);
    q = getPosY(pi, pj);
    r = getPosX(pk, pl);
    s = getPosY(pk, pl);
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
            if (j * w + m - 7 <= mouseX && mouseX <= j * w + m + 7 && i * Math.sqrt(3) * w + m - 7 <= mouseY && mouseY <= i * Math.sqrt(3) * w + m + 7) {
                begin(j * w + m, i * Math.sqrt(3) * w + m);
                return;
            }
            if (j * w + w / 2 + m - 7 <= mouseX && mouseX <= j * w + w / 2 + m + 7 && (i + 0.5) * Math.sqrt(3) * w + m - 7 <= mouseY && mouseY <= (i + 0.5) * Math.sqrt(3) * w + m + 7) {
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
        getNum(downX, downY, x, y);
        if (i < k) {
            list.push([nx, ny, mx, my, 1]);
        } else {
            list.push([mx, my, nx, ny, 1]);
        }
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
        list.splice(listNum, 1);
        getNum(downX, downY, x, y);
        if (i < k) {
            list.push([nx, ny, mx, my, 2]);
        } else {
            list.push([mx, my, nx, ny, 2]);
        }
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
        list.splice(listNum, 1);
        getNum(downX, downY, x, y);
        if (i < k) {
            list.push([nx, ny, mx, my, 3]);
        } else {
            list.push([mx, my, nx, ny, 3]);
        }
        flug = 0;
    }
    function clear(x, y) {
        ctx.strokeStyle = "rgb(240,240,240)";
        ctx.lineWidth = 17;
        ctx.beginPath();
        ctx.moveTo(downX, downY);
        ctx.lineTo(x, y);
        ctx.stroke();
        list.splice(listNum, 1);
        drag = false;
        flug = 0;
    }
    function check(x, y) {
        getNum(downX, downY, x, y);
        for (var i = 0; i < list.length; i++) {
            if (list[i][0] == nx && list[i][1] == ny && list[i][2] == mx && list[i][3] == my && list[i][4] == 1) {
                flug = 1;
                listNum = i;
                return;
            } else if (list[i][0] == mx && list[i][1] == my && list[i][2] == nx && list[i][3] == ny && list[i][4] == 1) {
                flug = 1;
                listNum = i;
                return;
            }
        };
        for (var i = 0; i < list.length; i++) {
            if (list[i][0] == i && list[i][1] == j && list[i][2] == k && list[i][3] == l && list[i][4] == 2) {
                flug = 2;
                listNum = i;
                return;
            } else if (list[i][0] == k && list[i][1] == l && list[i][2] == i && list[i][3] == j && list[i][4] == 2) {
                flug = 2;
                listNum = i;
                return;
            }
        };
        for (var i = 0; i < list.length; i++) {
            if (list[i][0] == i && list[i][1] == j && list[i][2] == k && list[i][3] == l && list[i][4] == 3) {
                flug = 3;
                listNum = i;
                return;
            } else if (list[i][0] == k && list[i][1] == l && list[i][2] == i && list[i][3] == j && list[i][4] == 3) {
                flug = 3;
                listNum = i;
                return;
            }
        };
    }
    function draw(x, y) {
        check(x, y);
        if (flug == 1) {
            double(x, y);
        } else if (flug == 2) {
            triple(x, y);
        } else if (flug == 3) {
            clear(x, y);
        } else {
            line(x, y);
        }
    }
    if (drag == true) {
        if (mouseX < downX) {
            if ((mouseY - downY) / (mouseX - downX) < (-1 / Math.sqrt(3))) {
                var x = downX - w / 2;
                var y = downY + (Math.sqrt(3) * w / 2);
                draw(x, y)
                return;
            } else if ((mouseY - downY) / (mouseX - downX) > 1 / Math.sqrt(3)) {
                var x = downX - w / 2;
                var y = downY - (Math.sqrt(3) * w / 2);
                var flug = 0;
                draw(x, y);
                return;
            } else {
                var x = downX - w;
                var y = downY;
                draw(x, y);
                return;
            }
        } else {
            if ((mouseY - downY) / (mouseX - downX) < (-1 / Math.sqrt(3))) {
                var x = downX + w / 2;
                var y = downY - (Math.sqrt(3) * w / 2);
                draw(x, y);
                return;
            } else if ((mouseY - downY) / (mouseX - downX) > 1 / Math.sqrt(3)) {
                var x = downX + w / 2;
                var y = downY + (Math.sqrt(3) * w / 2);
                draw(x, y);
                return;
            } else {
                var x = downX + w;
                var y = downY;
                draw(x, y);
                return;
            }
        }
    }
};