let container = document.querySelector(".container");
let gameOverDiv = document.querySelector(".gameOverDiv")
let mineSweeper = [[], [], [], [], [], [], [], [], [], []];

for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
        mineSweeper[row][column] = 0;
    }
}
function genRandom(n) {
    return Math.floor(Math.random() * n);
}
//Create The Random Bombs
for (let i = 0; i < 10; i++) {
    mineSweeper[genRandom(10)][genRandom(10)] = "Bomb";
}

function findBomb() {
    for (let i = 0; i < mineSweeper.length; i++) {
        for (let j = 0; j < mineSweeper[i].length; j++) {
            if (mineSweeper[i][j] !== "Bomb") {
                mineSweeper[i][j] = bombCounting(i, j);
            }
            let cell = document.createElement("div");
            let text = document.createElement("p")
            text.setAttribute("class", "text")
            cell.appendChild(text)
            container.appendChild(cell);
            cell.addEventListener("click", () => {
                text.style.visibility = "visible"
                cell.style.backgroundColor = "white"
                if (mineSweeper[i][j] === "Bomb") {
                    gameOverDiv.style.display = "block"
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000)
                }
            })
            cell.setAttribute("class", "cell");
            text.innerText = mineSweeper[i][j];
        }
    }
}
findBomb();

function bombCounting(r, c) {
    let condArr = [
        [r - 1, c - 1],
        [r - 1, c],
        [r - 1, c + 1],
        [r, c - 1],
        [r, c + 1],
        [r + 1, c - 1],
        [r + 1, c],
        [r + 1, c + 1],
    ];
    let count = 0;
    let newConArr = condArr.filter(
        (e) => e[0] >= 0 && e[0] < 10 && e[1] >= 0 && e[1] < 10
    );
    newConArr.map((ele) => {
        if (mineSweeper[ele[0]][ele[1]] === "Bomb") {
            count++;
        }

    });
    return count;
}