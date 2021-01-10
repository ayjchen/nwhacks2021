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
const box4 = {x: 1500,y:1500}
        
export default {
    name: 'Avatar',
    data() {
        return {
            playerX: 0,
            playerY: 0,
            c: null,
            ctx: null,
            img: null,
            rightPressed: false,
            leftPressed: false,
            upPressed: false,
            downPressed: false,
            speed: 3,
            KeyboardHelper: { left: 37, up: 38, right: 39, down: 40 },
            walk_ani: 1,
            walk_count: 0,
 roomsList : ["NEST","IKB","LIFE","NEST","IKB","LIFE","NEST","IKB","LIFE","NEST","IKB","LIFE"]

        }
    },
    watch: {
        currentBox: function(newval, oldval) {
            if (newval != oldval) {
                console.log(newval)
                this.$emit("room-change", newval)
            }
        },
    },
    computed: {
        currentBox() {
            let x = this.playerX
            let y = this.playerY
            if (y <= box1.y) {
                if (x <= box1.x ) {
                    return this.roomsList[1]
                } else if (x <= box2.x) {
                    return this.roomsList[2]
                } else if (x <= box3.x) {
                    return this.roomsList[3]
                } else if (x <= box4.x) {
                    return this.roomsList[4]
                }
            }


            else if (y <= box2.y) {
                if (x <= box1.x ) {
                    return this.roomsList[5]
                } else if (x <= box2.x) {
                    return this.roomsList[6]
                } else if (x <= box3.x) {
                    return this.roomsList[7]
                } else if (x <= box4.x) {
                    return this.roomsList[8]
                }
            }


            else if (y <= box3.y) {
                if (x <= box1.x ) {
                    return this.roomsList[9]
                } else if (x <= box2.x) {
                    return this.roomsList[10]
                } else if (x <= box3.x) {
                    return this.roomsList[11]
                } else if (x <= box4.x) {
                    return this.roomsList[12]
                }
            }
            return null
        }
    },
    mounted() {

        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
        this.img = document.getElementById("front");


        window.requestAnimationFrame(this.draw); 


        document.addEventListener('keydown', this.keyDownHandler, false);
        document.addEventListener('keyup', this.keyUpHandler, false);

    }, 
    methods: {

        keyDownHandler(event) {
            if(event.keyCode == this.KeyboardHelper.left) {
                this.leftPressed = true;
            }
            else if(event.keyCode == this.KeyboardHelper.right) {
                this.rightPressed = true;
            }
            if(event.keyCode == this.KeyboardHelper.down) {
                this.downPressed = true;
            }
            else if(event.keyCode == this.KeyboardHelper.up) {
                this.upPressed = true;
            }
        }

        ,keyUpHandler(event) {
            if(event.keyCode == this.KeyboardHelper.left) {
                this.leftPressed = false;
            }
            else if(event.keyCode == this.KeyboardHelper.right) {
                this.rightPressed = false;
            }
            if(event.keyCode == this.KeyboardHelper.down) {
                this.downPressed = false;
            }
            else if(event.keyCode == this.KeyboardHelper.up) {
                this.upPressed = false;
            }
        }

        ,draw() {
            this.ctx.clearRect(0, 0, this.c.width, this.c.height);
            this.ctx.canvas.width  = window.innerWidth - 400;
            this.ctx.canvas.height = window.innerHeight - 50;
            if(this.rightPressed) {
                this.playerX += this.speed;
                if (this.walk_count < 10) {
                    this.walk_count += 1;
                }   else {
                    this.walk_count = 0;
                    this.walk_ani *= -1;
                }
                if (this.walk_ani == 1) {
                    this.img = document.getElementById("right");
                }   else {
                    this.img = document.getElementById("right2");
                }
            }
            else if(this.leftPressed) {
                this.playerX -= this.speed;
                if (this.walk_count < 10) {
                    this.walk_count += 1;
                }   else {
                    this.walk_count = 0;
                    this.walk_ani *= -1;
                }
                if (this.walk_ani == 1) {
                    this.img = document.getElementById("left");
                }   else {
                    this.img = document.getElementById("left2");
                }
            }
            if(this.downPressed) {
                this.playerY += this.speed;
                this.img = document.getElementById("front");
            }
            else if(this.upPressed) {
                this.playerY -= this.speed;
                this.img = document.getElementById("back");
            }
            this.ctx.drawImage(this.img, this.playerX, this.playerY, 60, 80);
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