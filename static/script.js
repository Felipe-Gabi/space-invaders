const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
let bullets = [];
let aliens = [];
let alienDirection = 1; // 1 = right, -1 = left
let score = 0;

// Player Movement
document.addEventListener("keydown", (e) => {
    const playerPos = player.offsetLeft;
    if (e.key === "ArrowLeft" && playerPos > 0) {
        player.style.left = playerPos - 20 + "px";
    } else if (e.key === "ArrowRight" && playerPos < 740) {
        player.style.left = playerPos + 20 + "px";
    } else if (e.key === " ") {
        shoot();
    }
});

// Shooting bullets
function shoot() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = player.offsetLeft + 27.5 + "px";
    bullet.style.bottom = "50px";
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}

// Move bullets
function moveBullets() {
    bullets.forEach((bullet, index) => {
        const bulletPos = parseInt(bullet.style.bottom);
        if (bulletPos > 600) {
            bullet.remove();
            bullets.splice(index, 1);
        } else {
            bullet.style.bottom = bulletPos + 10 + "px";
            checkCollision(bullet, index);
        }
    });
}

// Spawn aliens
function spawnAliens() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
            const alien = document.createElement("div");
            alien.classList.add("alien");
            alien.style.left = 50 + j * 60 + "px";
            alien.style.top = 50 + i * 40 + "px";
            gameArea.appendChild(alien);
            aliens.push(alien);
        }
    }
}

// Move aliens
function moveAliens() {
    let reverse = false;
    aliens.forEach((alien) => {
        const alienPos = alien.offsetLeft + alienDirection * 2;
        alien.style.left = alienPos + "px";
        if (alienPos <= 0 || alienPos >= 760) reverse = true;
    });

    if (reverse) {
        alienDirection *= -1;
        aliens.forEach((alien) => {
            alien.style.top = alien.offsetTop + 10 + "px";
        });
    }
}

// Check collision
function checkCollision(bullet, bulletIndex) {
    aliens.forEach((alien, alienIndex) => {
        const bulletRect = bullet.getBoundingClientRect();
        const alienRect = alien.getBoundingClientRect();

        if (
            bulletRect.left < alienRect.right &&
            bulletRect.right > alienRect.left &&
            bulletRect.top < alienRect.bottom &&
            bulletRect.bottom > alienRect.top
        ) {
            bullet.remove();
            alien.remove();
            bullets.splice(bulletIndex, 1);
            aliens.splice(alienIndex, 1);
            score += 10;
        }
    });
}

// Game loop
function gameLoop() {
    moveBullets();
    moveAliens();

    if (aliens.some((alien) => alien.offsetTop > 550)) {
        alert("Game Over!");
        window.location.reload();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
spawnAliens();
gameLoop();
