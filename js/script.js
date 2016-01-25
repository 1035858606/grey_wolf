/**
 * Created by a on 2015/11/2.
 */
var star = document.getElementById("startGame");
var con = document.getElementById("con");
var box = con.getElementsByTagName("div");
var gameover = false;
var score = document.getElementById("score");
var scoreNum = 0;
var time = document.getElementById("time");
//点击开始按钮开始游戏
star.onclick = function(){
    this.style.display="none";
    con.style.display="block";
    inti();
};

//游戏初始化
function inti(){
    gameTime();
    var timer = setInterval(function(){
        if(gameover==true){
            clearInterval(timer);
        }else{
            if(Math.random()-0.3>0){
                ranhold("h");
            }else{
                ranhold("x");
            }
        }
    },500)
}

//游戏时间
function gameTime(){
    var gameTime = 60;
    var oldgameTime = gameTime;
    var timer = setInterval(function(){
        var newgametime = oldgameTime-0.02;
        time.style.backgroundSize=newgametime/gameTime*100+"% 100%";
        oldgameTime = newgametime;
        if(oldgameTime <= 0){
            clearInterval(timer);
            time.style.backgroundSize="0% 100%";
            gameTime=0;
            gameover= true;
        }
    },20)
}

//随机一个洞
function ranhold(x){
    do{
        var ran = Math.floor(Math.random()*box.length);
    }while(box[ran].bol==true);
    box[ran].style.display = "block";
    moveUp(box[ran],x);
}

//狼出现
function moveUp(obj,x){
    var i = 0;
    obj.bol = true;
    var oImg = document.createElement("img");
    oImg.src = "img/"+x +i+".png";
    obj.appendChild(oImg);
    oImg.bingobol =true;
    oImg.onclick = function(){
        if(oImg.bingobol == false){
            return
        }
        clearInterval(obj.timer);
        clearTimeout(obj.timeout);
        bingo(obj,oImg,x);
    };
    obj.timer = setInterval(
        function(){
            if(i<=5){
                oImg.src = "img/"+x +i+".png";

                i++;

            }else{
                clearInterval(obj.timer);
                obj.timeout = setTimeout(function(){
                    moveDown(obj,oImg,x);
                },1000);
            }
        }
        ,50);
}

function moveDown(obj,oImg,x){
    var i = 4;
    obj.timer = setInterval(
        function(){
            if(i>=0){
                oImg.src = "img/"+x+i+".png";
                i--;
            }else{
                clearInterval(obj.timer);
                obj.removeChild(oImg);
                obj.bol=false;
                obj.style.display = "none";
            }
        }
        ,50);

}

function bingo(obj,oimg,x){
    if(x=="h"){
        scoreNum+=10;
    }else{
        scoreNum-=10;
    }
    score.innerHTML = scoreNum;
    var i = 5;
    obj.timer = setInterval(
        function(){
            if(i<=9){
                oimg.src = "img/"+x+i+".png";
                i++;
            }else{
                clearInterval(obj.timer);
                obj.removeChild(oimg);
                obj.bol=false;
                obj.style.display = "none";
            }
        },50);
    oimg.bingobol =false;
}