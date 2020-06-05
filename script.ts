//spiral
function printMatrix(m: Array<number>, n: number): Array<number> {
    let matrix: Array<Array<number>> = []
    let result: Array<any> = []
    while (m.length) matrix.push(m.splice(0, n)) //add from n to n
    while (matrix.length) {
        result = [...result, ...matrix.map(line => line.shift())] // left side...down
        if (matrix.length) {
            let tmp: Array<number> = []
            matrix.pop()?.forEach(i => tmp.push(i)) // bottom side...to the right
            result = [...result, ...tmp]
        }
        if (matrix.length) result = [...result, ...matrix.map(line => line.pop()).reverse()] //left side...upwards
        if (matrix.length) {
            let tmp: Array<any> = []
            matrix.shift()?.forEach(i => tmp.push(i)) //top side...to the left
            result = [...result, ...tmp.reverse()]
        }
        //...and repeats in the sub square
    }
    return result
}

//prime numbers
function printNPrimes(n: number): Array<number> {
    let result: Array<number> = [2] // 2 is always prime :)
    let val: number = result[result.length - 1] + 1 // last + 1
    let verify = true // typing like boolean is not necessary
    while (result.length < n) {
        verify = true
        result.some(i => {
            if (val % i === 0) { // optimized to divide only by prime numbers found
                verify = false
                return true
            }
        }) // fermat method
        if (verify) result.push(val)
        val++
    }
    return result
}

//findCircleCollisions
function findCircleCollisions(circles: Array<Circle> = []): Array<CirclesCollision> {
    let collisions: Array<CirclesCollision> = []
    for (let i = 0; i < circles.length - 1; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            console.log('i=' + i + ', j=' + j)
            collisions.push(new CirclesCollision(circles[i], circles[j]))
        }
    }
    return collisions
}

function collision(c1: Circle, c2: Circle) {
    // return (c1.r + c2.r) > Math.sqrt(c1.x * c2.x + c1.y * c2.y) // optimized removing sqrt
    return ((c1.r + c2.r) ** 2) > (c1.x * c2.x + c1.y * c2.y) // distance between centers and sum of radios
}

class CirclesCollision {
    c1: Circle
    c2: Circle
    collision: boolean
    constructor(c1: Circle, c2: Circle) {
        this.c1 = c1
        this.c2 = c2
        this.collision = collision(c1, c2)
    }
}

class Circle {
    x: number // x position
    y: number // y position
    r: number // radio
    constructor(x: number, y: number, r: number) {
        this.x = x
        this.y = y
        this.r = Math.abs(r)
    }
}

function calculateSpiral() {
    const spiralInputMEl = <HTMLInputElement>document.getElementById('spiral-input-m')
    const spiralInputNEl = <HTMLInputElement>document.getElementById('spiral-input-n')

    const spiralResult = printMatrix(JSON.parse(spiralInputMEl.value), JSON.parse(spiralInputNEl.value))

    const spiralResultEl = document.getElementById('spiral-result')
    if (spiralResultEl) spiralResultEl.innerText = JSON.stringify(spiralResult)
}

function calculatePrime() {

    const primeInputEl = <HTMLInputElement>document.getElementById('prime-input')

    const primeResult = printNPrimes(JSON.parse(primeInputEl.value))

    const primeResultEl = document.getElementById('prime-result')
    if (primeResultEl) primeResultEl.innerText = JSON.stringify(primeResult)

}

function calculateCollisions() {

    const circlesInputEl = <HTMLInputElement>document.getElementById('circles-input')

    const collisions = findCircleCollisions(<Array<Circle>>JSON.parse(circlesInputEl.value))

    let text = ''
    collisions.forEach((c, i) => {
        text += '<p>' + (i + 1) + ') ' +
            'c1: ' + JSON.stringify(c.c1).replace('"', '') + ' - ' +
            'c2: ' + JSON.stringify(c.c2).replace('"', '') + ' - ' +
            'collision: ' + c.collision + '</p>'
    });
    const circlesResultEl = document.getElementById('circles-result')
    if (circlesResultEl) circlesResultEl.innerHTML = text
}

window.onload = () => {

    //spiral

    let m: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    let n: number = 4

    const spiralInputMEl = <HTMLInputElement>document.getElementById('spiral-input-m')
    if (spiralInputMEl) spiralInputMEl.value = JSON.stringify(m)
    const spiralInputNEl = <HTMLInputElement>document.getElementById('spiral-input-n')
    if (spiralInputNEl) spiralInputNEl.value = JSON.stringify(n)

    const spiralResult = printMatrix(m, n)

    const spiralResultEl = document.getElementById('spiral-result')
    if (spiralResultEl) spiralResultEl.innerText = JSON.stringify(spiralResult)

    //primes
    const p: number = 30

    const primeInputEl = <HTMLInputElement>document.getElementById('prime-input')
    if (primeInputEl) primeInputEl.value = JSON.stringify(p)

    const primeResult = printNPrimes(30)

    const primeResultEl = document.getElementById('prime-result')
    if (primeResultEl) primeResultEl.innerText = JSON.stringify(primeResult)

    //circles
    const cs: Array<Circle> = [
        { x: 400, y: 15, r: 400 },
        { x: 13, y: 140, r: 300 }]

    const circlesInputEl = <HTMLInputElement>document.getElementById('circles-input')
    if (circlesInputEl) circlesInputEl.value = JSON.stringify(cs)

    const collisions = findCircleCollisions(cs)

    let text = ''
    collisions.forEach((c, i) => {
        text += '<p>' + (i + 1) + ') ' +
            'c1: ' + JSON.stringify(c.c1).replace('"', '') + ' - ' +
            'c2: ' + JSON.stringify(c.c2).replace('"', '') + ' - ' +
            'collision: ' + c.collision + '</p>'
    });
    const circlesResultEl = document.getElementById('circles-result')
    if (circlesResultEl) circlesResultEl.innerHTML = text

}