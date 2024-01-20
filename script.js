const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 800;
let gameSpeed = 5;

const backgroundlayer1 = new Image();
backgroundlayer1.src = 'images/1_1.png';
const backgroundlayer2 = new Image();
backgroundlayer2.src = 'images/1_2.png';
const backgroundlayer3 = new Image();
backgroundlayer3.src = 'images/1_3.png';
const backgroundlayer4 = new Image();
backgroundlayer4.src = 'images/1_4.png';
const backgroundlayer5 = new Image();
backgroundlayer5.src = 'images/1_5.png';
const slider = document.getElementById('slider')
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change',function(e){
    gameSpeed=e.target.value
    showGameSpeed.innerHTML=e.target.value
})
class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 800;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundlayer1, 0.2);
const layer2 = new Layer(backgroundlayer2, 0.4);
const layer3 = new Layer(backgroundlayer3, 0.6);
const layer4 = new Layer(backgroundlayer4, 0.8);
const layer5 = new Layer(backgroundlayer5, 0.99);
const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
}

animate();
