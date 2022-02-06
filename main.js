function setup(){
    canvas= createCanvas(675,425);
    canvas.position(400,300);
    video= createCapture(VIDEO); 
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);

}

music=""; 
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0; 
rightWristkey= 0; 


function preload(){
    music= loadSound("Rarin_YESSIR_.mp3");
}

function playMusic(){
    music.play();
    music.setVolume(1); 
    music.rate(1);
}

function draw(){
image(video, 0,0, 675, 425);

fill("#FF0000");
stroke("#FF0000");

if(rightWristkey>0.2 ){
    circle(rightWristX, rightWristY, 20); 
    if(rightWristY > 0 && rightWristY <=85){
        document.getElementById("speed").innerHTML= "speed= 0.5x"; 
        music.rate(0.5);
    }
    else if(rightWristY > 85 && rightWristY <=170){
        document.getElementById("speed").innerHTML= "speed= 1x";
        music.rate(1);
    }

    else if(rightWristY > 170 && rightWristY <=255){
        document.getElementById("speed").innerHTML= "speed= 1.5x";
        music.rate(1.5);
    }

    else if(rightWristY > 255 && rightWrist <= 340){
        document.getElementById("speed").innerHTML= "speed = 2x";
        music.rate(2);
    }

    else if(rightWristY > 340 && rightWristY <= 425){
        document.getElementById("speed").innerHTML= "speed= 2.5x";
        music.rate(2.5);
    }
    
}


if(leftWristYkey > 0.2){
    circle(leftWristX, leftWristY, 20);
    number_format= Number(leftWristY);
    remove_decimal= floor(number_format);
    volume= remove_decimal/425; 
    document.getElementById("volume1").innerHTML= "Volume:" + volume; 
    music.setVolume(volume); 

}

}
leftWristYkey= 0; 

function modelLoaded(){
    console.log("Model Initialized!");
}

function gotResult(results){
    if(results.length > 0){
        console.log(results)
        leftWristYkey= results[0].pose.keypoints[9].score; 
        rightWristkey= results[0].pose.keypoints[10].score; 
        console.log(leftWristYkey);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("left wrist X = " + leftWristX + " left wrist Y = " + leftWristY);
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("right wrist X = " + rightWristX + " right wrist Y = " + rightWristY);
    }
}
   




