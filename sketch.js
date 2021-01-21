var bullet, enemy;
var score = 0;
var gameState = "serve";
var Level = 1;
var visibility = 0;
var lives = 3;

function preload() {
    spaceRangerImg = loadImage("spaceranger.png");
    spaceBackgroundImg = loadImage("Space.jpg");
    enemyImg = loadImage("enemy.png");
    specialEnemyImg = loadImage("specialEnemy.png");
    asteroidImg = loadImage("asteroid.png");
    wowtextImg = loadImage("wowtext.gif");
    wonderfultextImg = loadImage("wonderfultext.jpg");
    awesometextImg = loadImage("unnamed.png");
    enemyGroup = new Group();
    bulletGroup = new Group();
    bullet1Group = new Group();
    specialEnemyGroup = new Group();
    asteroidGroup = new Group();
    levelupSound = loadSound("levelup.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight - 5);

    spaceRanger = createSprite(windowWidth / 2, 550, 50, 50);
    spaceRanger.addImage(spaceRangerImg);
    spaceRanger.scale = 0.2;
}

function draw() {
    background(spaceBackgroundImg);
    drawSprites();
    if (score < 50) {
        Level = 1;
    }
    if (score > 50 && score < 100) {
        Level = 2;
    }
    if (score > 150) {
        Level = 3;
    }
    if (gameState === "serve") {
        textSize(40);
        fill(255);
        textFont('AgencyFB');
        text("Press S to  Start The Game", windowWidth / 3, 100);
        textFont('Tahoma');
        text("=> Press 'UP_ARROW' to shoot !!", windowWidth / 3, 200);
        text("=> Be Aware of enemies !!", windowWidth / 3, 250);
        text("=> Be Aware of Special enemies !!", windowWidth / 3, 300);
        text("=> And also be aware of asteroid !!", windowWidth / 3, 350);
        text("=> When you touch them the lives will lost !!", windowWidth / 3, 400);
        text("=> All The Best From Us !!", windowWidth / 3, 450);
    }
    if (keyDown("S") && gameState === "serve") {
        gameState = "play";
    }
    if (gameState === "play") {
        black = createSprite(windowWidth / 2.1 + 30, 100, 200, 200);
        black.shapeColor = "black";

        background.velocityY = 2;
        if (background.y > 700) {
            background.y = background.height / 2;
        }
        if (Level === 1) {
            textSize(40);
            text("LEVEL: 1", windowWidth / 2.3, 100);
            enemyship();
        }
        if (Level === 2) {
            textSize(40);
            text("LEVEL: 2", windowWidth / 2.3, 100);
            enemyship();
            specialenemyship();
        }
        if (Level === 3) {
            textSize(40);
            text("LEVEL: 3", windowWidth / 2.3, 100);
            enemyship();
            specialenemyship();
            asteroidStone();
        }
        if (keyDown("LEFT_ARROW")) {
            spaceRanger.x -= 20;
        }
        if (keyDown("RIGHT_ARROW")) {
            spaceRanger.x += 20;
        }
        if (keyDown("UP_ARROW")) {
            bullet();
        }
        for (var i = 0; i < enemyGroup.length; i++) {
            if (enemyGroup.get(i).isTouching(bulletGroup) || enemyGroup.get(i).isTouching(bullet1Group)) {
                enemyGroup.get(i).destroy();
                bulletGroup.get(i).destroy();
                bullet1Group.get(i).destroy();
                score = score + 1;
            }
        }
        for (var k = 0; k < specialEnemyGroup.length; k++) {
            if (specialEnemyGroup.get(k).isTouching(bulletGroup) || specialEnemyGroup.get(k).isTouching(bullet1Group)) {
                specialEnemyGroup.get(k).destroy();
                bulletGroup.get(k).destroy();
                bullet1Group.get(k).destroy();
                score = score + 1;
            }
        }
        for (var d = 0; d < asteroidGroup.length; d++) {
            if (asteroidGroup.get(d).isTouching(bulletGroup) || asteroidGroup.get(d).isTouching(bullet1Group)) {
                asteroidGroup.get(d).destroy();
                bulletGroup.get(d).destroy();
                bullet1Group.get(d).destroy();
                score = score + 1;
            }
        }
        if (score === 50) {
            wowtext();
            levelupSound.play();
        }
        if (score === 100) {
            wonderfultext();
            levelupSound.play();
        }
        if (score === 150) {
            awesometext();
            levelupSound.play();
        }
        textSize(40);
        fill("white");
        text("Score: " + score, windowWidth / 2.3, 50);
        text("Lives: " + lives, windowWidth / 2.3, 150);

        if (spaceRanger.isTouching(enemyGroup)) {
            enemyGroup.destroyEach();
            lives = lives - 1;
        } else if (spaceRanger.isTouching(specialEnemyGroup)) {
            specialEnemyGroup.destroyEach();
            lives = lives - 1;
        } else if (spaceRanger.isTouching(asteroidGroup)) {
            asteroidGroup.destroyEach();
            lives = lives - 1;
        }
        if (lives === 0) {
            gameState = "end";
        }
    } else if (gameState === "end") {
        asteroidGroup.destroyEach();
        specialEnemyGroup.destroyEach();
        enemyGroup.destroyEach();
        bullet1Group.destroyEach();
        bulletGroup.destroyEach();
        background.velocityY = 0;
        textSize(40);
        fill("#FFFF00");
        textFont('Loopiejuice Regular');
        text("GAME OVER!!", windowWidth / 2.5, windowHeight / 3);
        text("Press R to Replay", windowWidth / 2.5, windowHeight / 2);
    }
    if (keyDown("R") && gameState === "end") {
        score = 0;
        lives = 3;
        gameState = "serve";
    }
}

function bullet() {
    if (frameCount % 5 === 0) {
        var bullet = createSprite(spaceRanger.x - 30, spaceRanger.y, 10, 30);
        bullet.velocityY = -6;
        bullet.shapeColor = "yellow";
        bullet.lifetime = 116.67;
        bulletGroup.add(bullet);

        var bullet1 = createSprite(spaceRanger.x + 30, spaceRanger.y, 10, 30);
        bullet1.velocityY = -6;
        bullet1.shapeColor = "yellow";
        bullet1.lifetime = 116.67;
        bullet1Group.add(bullet1)
    }
}

function enemyship() {
    if (frameCount % 20 === 0) {
        enemy = createSprite(Math.round(random(10, windowWidth - 10)), 0, 50, 50);
        enemy.addImage(enemyImg);
        enemy.scale = 0.5;
        enemy.velocityY = 4;
        enemy.lifetime = 175;
        enemyGroup.add(enemy);
    }
}

function specialenemyship() {
    if (frameCount % 40 === 0) {
        specialEnemy = createSprite(Math.round(random(10, windowWidth - 10)), 0, 50, 50);
        specialEnemy.addImage(specialEnemyImg);
        specialEnemy.scale = 0.5;
        specialEnemy.velocityY = 3;
        specialEnemy.lifetime = 175;
        specialEnemyGroup.add(specialEnemy);
    }
}

function asteroidStone() {
    if (frameCount % 60 === 0) {
        asteroid = createSprite(Math.round(random(10, windowWidth - 10)), 0, 50, 50);
        asteroid.addImage(asteroidImg);
        asteroid.scale = 0.1;
        asteroid.velocityY = 6;
        asteroid.lifetime = 116;
        asteroidGroup.add(asteroid);
    }
}

function wowtext() {
    wow = createSprite(windowWidth / 2, 200, 50, 50);
    wow.addImage(wowtextImg);
    wow.scale = 0.5;
    wow.lifetime = 20;
}

function wonderfultext() {
    wonderful = createSprite(windowWidth / 2, 200, 50, 50);
    wonderful.addImage(wonderfultextImg);
    wonderful.scale = 0.5;
    wonderful.lifetime = 20;
}

function awesometext() {
    awesome = createSprite(windowWidth / 2, 200, 50, 50);
    awesome.addImage(awesometextImg);
    awesome.scale = 0.5;
    awesome.lifetime = 20;
}