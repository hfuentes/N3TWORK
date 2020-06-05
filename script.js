"use strict";
//spiral
function printMatrix(m, n) {
    var _a, _b;
    let matrix = [];
    let result = [];
    while (m.length)
        matrix.push(m.splice(0, n)); //add from n to n
    while (matrix.length) {
        result = [...result, ...matrix.map(line => line.shift())]; // left side...down
        if (matrix.length) {
            let tmp = [];
            (_a = matrix.pop()) === null || _a === void 0 ? void 0 : _a.forEach(i => tmp.push(i)); // bottom side...to the right
            result = [...result, ...tmp];
        }
        if (matrix.length)
            result = [...result, ...matrix.map(line => line.pop()).reverse()]; //left side...upwards
        if (matrix.length) {
            let tmp = [];
            (_b = matrix.shift()) === null || _b === void 0 ? void 0 : _b.forEach(i => tmp.push(i)); //top side...to the left
            result = [...result, ...tmp.reverse()];
        }
        //...and repeats in the sub square
    }
    return result;
}
//prime numbers
function printNPrimes(n) {
    let result = [2]; // 2 is always prime :)
    let val = result[result.length - 1] + 1; // last + 1
    let verify = true; // typing like boolean is not necessary
    while (result.length < n) {
        verify = true;
        result.some(i => {
            if (val % i === 0) { // optimized to divide only by prime numbers found
                verify = false;
                return true;
            }
        }); // fermat method
        if (verify)
            result.push(val);
        val++;
    }
    return result;
}
//findCircleCollisions
function findCircleCollisions(circles = []) {
    let collisions = [];
    for (let i = 0; i < circles.length - 1; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            console.log('i=' + i + ', j=' + j);
            collisions.push(new CirclesCollision(circles[i], circles[j]));
        }
    }
    return collisions;
}
function collision(c1, c2) {
    // return (c1.r + c2.r) > Math.sqrt(c1.x * c2.x + c1.y * c2.y) // optimized removing sqrt
    return (Math.pow((c1.r + c2.r), 2)) > (c1.x * c2.x + c1.y * c2.y); // distance between centers and sum of radios
}
class CirclesCollision {
    constructor(c1, c2) {
        this.c1 = c1;
        this.c2 = c2;
        this.collision = collision(c1, c2);
    }
}
class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = Math.abs(r);
    }
}
function calculateSpiral() {
    const spiralInputMEl = document.getElementById('spiral-input-m');
    const spiralInputNEl = document.getElementById('spiral-input-n');
    const spiralResult = printMatrix(JSON.parse(spiralInputMEl.value), JSON.parse(spiralInputNEl.value));
    const spiralResultEl = document.getElementById('spiral-result');
    if (spiralResultEl)
        spiralResultEl.innerText = JSON.stringify(spiralResult);
}
function calculatePrime() {
    const primeInputEl = document.getElementById('prime-input');
    const primeResult = printNPrimes(JSON.parse(primeInputEl.value));
    const primeResultEl = document.getElementById('prime-result');
    if (primeResultEl)
        primeResultEl.innerText = JSON.stringify(primeResult);
}
function calculateCollisions() {
    const circlesInputEl = document.getElementById('circles-input');
    const collisions = findCircleCollisions(JSON.parse(circlesInputEl.value));
    let text = '';
    collisions.forEach((c, i) => {
        text += '<p>' + (i + 1) + ') ' +
            'c1: ' + JSON.stringify(c.c1).replace('"', '') + ' - ' +
            'c2: ' + JSON.stringify(c.c2).replace('"', '') + ' - ' +
            'collision: ' + c.collision + '</p>';
    });
    const circlesResultEl = document.getElementById('circles-result');
    if (circlesResultEl)
        circlesResultEl.innerHTML = text;
}
window.onload = () => {
    //spiral
    let m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let n = 4;
    const spiralInputMEl = document.getElementById('spiral-input-m');
    if (spiralInputMEl)
        spiralInputMEl.value = JSON.stringify(m);
    const spiralInputNEl = document.getElementById('spiral-input-n');
    if (spiralInputNEl)
        spiralInputNEl.value = JSON.stringify(n);
    const spiralResult = printMatrix(m, n);
    const spiralResultEl = document.getElementById('spiral-result');
    if (spiralResultEl)
        spiralResultEl.innerText = JSON.stringify(spiralResult);
    //primes
    const p = 30;
    const primeInputEl = document.getElementById('prime-input');
    if (primeInputEl)
        primeInputEl.value = JSON.stringify(p);
    const primeResult = printNPrimes(30);
    const primeResultEl = document.getElementById('prime-result');
    if (primeResultEl)
        primeResultEl.innerText = JSON.stringify(primeResult);
    //circles
    const cs = [
        { x: 400, y: 15, r: 400 },
        { x: 13, y: 140, r: 300 }
    ];
    const circlesInputEl = document.getElementById('circles-input');
    if (circlesInputEl)
        circlesInputEl.value = JSON.stringify(cs);
    const collisions = findCircleCollisions(cs);
    let text = '';
    collisions.forEach((c, i) => {
        text += '<p>' + (i + 1) + ') ' +
            'c1: ' + JSON.stringify(c.c1).replace('"', '') + ' - ' +
            'c2: ' + JSON.stringify(c.c2).replace('"', '') + ' - ' +
            'collision: ' + c.collision + '</p>';
    });
    const circlesResultEl = document.getElementById('circles-result');
    if (circlesResultEl)
        circlesResultEl.innerHTML = text;
};
//# sourceMappingURL=script.js.map