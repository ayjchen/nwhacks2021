<template>
<div id="avatar">
<img style="display: none;" id="front" src="../assets/avatar1_front.png">
<img style="display: none;" id="left" src="../assets/avatar1_leftstill.png">
<img style="display: none;" id="right" src="../assets/avatar1_rightstill.png">
<img style="display: none;" id="left2" src="../assets/avatar1_leftwalk.png">
<img style="display: none;" id="right2" src="../assets/avatar1_rightwalk.png">
<img style="display: none;" id="back" src="../assets/avatar1_back.png">
<canvas id="myCanvas" width="840" height="480" style="position:absolute; left:200px; top:25px;">
Your browser does not support the HTML5 canvas tag.
</canvas>
</div>
</template>

<script>
const box1 = {x: 0, y:0 }
const box2 = {x: 500, y:500}
const box3 = {x: 1000,y:1000}
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("front");
        
            

        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;
        var speed = 3;
        var KeyboardHelper = { left: 37, up: 38, right: 39, down: 40 };
        var walk_ani = 1;
        var walk_count = 0;
export default {
    name: 'Avatar',
    data() {
        return {
            playerX: 0,
            playerY: 0,
        }
    },
    watch: {
        currentBox: function(newval, oldval) {
            if (newval != oldval) {
                this.$emit("room-change", newval)
            }
        },
    },
    computed: {
        currentBox() {
            let x = this.playerX
            let y = this.playerY
            if (x <= box1.x && y <= box1.y) {
                return 1
            } else if (box1.x < x <= box2.x && y <= box1.y) {
                return 2
            } else if (box2.x < x <= box3.x && y <= box1.y) {
                return 3
            }
            if (x <= box1.x && box1.y < y <= box2.y) {
                return 4
            } else if (box1.x < x <= box2.x && y <= box1.y) {
                return 5
            } else if (box2.x < x <= box3.x && y <= box1.y) {
                return 6
            }
            if (x <= box1.x && box2.y< y <= box3.y) {
                return 7
            } else if (box1.x < x <= box2.x && y <= box1.y) {
                return 8
            } else if (box2.x < x <= box3.x && y <= box1.y) {
                return 9
            }
            return null
        }
    },
    mounted() {


        window.requestAnimationFrame(this.draw); 


        document.addEventListener('keydown', this.keyDownHandler, false);
        document.addEventListener('keyup', this.keyUpHandler, false);

    }, 
    methods: {

        keyDownHandler(event) {
            if(event.keyCode == KeyboardHelper.left) {
                leftPressed = true;
            }
            else if(event.keyCode == KeyboardHelper.right) {
                rightPressed = true;
            }
            if(event.keyCode == KeyboardHelper.down) {
                downPressed = true;
            }
            else if(event.keyCode == KeyboardHelper.up) {
                upPressed = true;
            }
        }

        ,keyUpHandler(event) {
            if(event.keyCode == KeyboardHelper.left) {
                leftPressed = false;
            }
            else if(event.keyCode == KeyboardHelper.right) {
                rightPressed = false;
            }
            if(event.keyCode == KeyboardHelper.down) {
                downPressed = false;
            }
            else if(event.keyCode == KeyboardHelper.up) {
                upPressed = false;
            }
        }

        ,draw() {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.canvas.width  = window.innerWidth - 400;
            ctx.canvas.height = window.innerHeight - 50;
            if(rightPressed) {
                this.playerX += speed;
                if (walk_count < 10) {
                    walk_count += 1;
                }   else {
                    walk_count = 0;
                    walk_ani *= -1;
                }
                if (walk_ani == 1) {
                    img = document.getElementById("right");
                }   else {
                    img = document.getElementById("right2");
                }
            }
            else if(leftPressed) {
                this.playerX -= speed;
                if (walk_count < 10) {
                    walk_count += 1;
                }   else {
                    walk_count = 0;
                    walk_ani *= -1;
                }
                if (walk_ani == 1) {
                    img = document.getElementById("left");
                }   else {
                    img = document.getElementById("left2");
                }
            }
            if(downPressed) {
                this.playerY += speed;
                img = document.getElementById("front");
            }
            else if(upPressed) {
                this.playerY -= speed;
                img = document.getElementById("back");
            }
            ctx.drawImage(img, this.playerX, this.playerY, 60, 80);
            requestAnimationFrame(this.draw);
        }
            }
            
        }





</script>

<style>
#avatar{
    pointer-events: none;
}
</style>