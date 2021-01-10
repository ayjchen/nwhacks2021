<template>
<div>
<img style="display: none;" id="front" src="../assets/avatar1_front.png">
<img style="display: none;" id="left" src="../assets/avatar1_leftstill.png">
<img style="display: none;" id="right" src="../assets/avatar1_rightstill.png">
<img style="display: none;" id="left2" src="../assets/avatar1_leftwalk.png">
<img style="display: none;" id="right2" src="../assets/avatar1_rightwalk.png">
<img style="display: none;" id="back" src="../assets/avatar1_back.png">
<canvas id="myCanvas" width="1540" height="720" style="position:absolute; left:200px; top:200px;">
Your browser does not support the HTML5 canvas tag.
</canvas>
</div>
</template>

<script>

export default {
    name: 'Avatar',
    mounted() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("front");
        

        window.requestAnimationFrame(draw); 


        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

            

        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;
        var playerX = 0;
        var playerY = 0;
        var speed = 3;
        var KeyboardHelper = { left: 37, up: 38, right: 39, down: 40 };
        var walk_ani = 1;
        var walk_count = 0;

        function keyDownHandler(event) {
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

        function keyUpHandler(event) {
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

        function draw() {
            ctx.clearRect(0, 0, c.width, c.height);
            if(rightPressed) {
                playerX += speed;
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
                playerX -= speed;
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
                playerY += speed;
                img = document.getElementById("front");
            }
            else if(upPressed) {
                playerY -= speed;
                img = document.getElementById("back");
            }
            ctx.drawImage(img, playerX, playerY, 60, 80);
            requestAnimationFrame(draw);
        }
            }
            
        }





</script>

<style>

</style>