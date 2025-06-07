const bird = document.querySelector("#bird")
const game = document.querySelector("#game")
const score = document.querySelector("#score")
const pointSFX = document.querySelector("#pointSFX")
const deathSFX = document.querySelector("#deathSFX")

let birdY = 200
let velocity = -2
const gravity = 0.17
const flapStrength = -5

let pipes = []
let pipeGap = 150
let pipeWidth = 60
let gameSpeed = 2

let scorePrev = 0
let scoreCurr = 0
let soundInterval = 0

// JUMP!
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        velocity = flapStrength
    }
})

function createPipe() {
    const gapY = Math.floor(Math.random() * 300) + 20
    const topPipe = document.createElement("div")
    topPipe.classList.add("pipe", "top-pipe")
    topPipe.style.height = gapY + "px"
    topPipe.style.left = "400px"

    const bottomPipe = document.createElement("div")
    bottomPipe.classList.add("pipe", "bottom-pipe")
    bottomPipe.style.height = (600 - gapY - pipeGap) + "px"
    bottomPipe.style.left = "400px"

    game.appendChild(topPipe)
    game.appendChild(bottomPipe)

    pipes.push({ top: topPipe, bottom: bottomPipe, x: 800 })
}

function gameLoop() {
    velocity += gravity
    birdY += velocity
    bird.style.top = birdY + "px"

    if (frames > 10) {
        if (frames % 200 === 0) {
            createPipe()
        }

        pipes.forEach((pipe, index) => {
            pipe.x -= gameSpeed
            pipe.top.style.left = pipe.x + "px"
            pipe.bottom.style.left = pipe.x + "px"

            if (pipe.x < 140 && pipe.x + pipeWidth > 100 &&
                (birdY < pipe.top.offsetHeight || birdY + 40 > 600 - pipe.bottom.offsetHeight)) {
                deathSFX.play()
                alert("Game Over!")
                window.location.reload()
            }

            if (pipe.x + pipeWidth < 0) {
                pipe.top.remove()
                pipe.bottom.remove()
                pipes.splice(index, 1)
            }

            if (pipe.x + gameSpeed < 150 && pipe.x + gameSpeed >= 150 - gameSpeed) {
                scoreCurr++
                score.textContent = scoreCurr
            }
        })

        if (birdY > 560 || birdY < 0) {
            deathSFX.play()
            alert("Game Over!")
            window.location.reload()
        }
    }

    frames++
    requestAnimationFrame(gameLoop)
}

let frames = 0
gameLoop() 
