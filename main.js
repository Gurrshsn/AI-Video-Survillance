video = "";
status= "";
object= [];

function setup(){
    canvas = createCanvas(650, 400);
    canvas.center();
    video.hide();
}

function preload(){
    video = createVideo('video.mp4');
}

function draw(){
    image(video, 0, 0, 650, 400);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Objects are being detected...";
            document.getElementById("number_objects").innerHTML = "Number of objects detected are "+ object.length;

            fill("#ff1900");
            percent = floor(object[i].confidence * 100);
            text(object[i].label +  " " + percent + "%", object[i].x + 20, object[i].y + 20);

            noFill();
            stroke("#ff1900");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    
}

function gotResult(error, result){
    if (error){
        console.log(error);
    }
    console.log(result);
    object = result;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.volume(1);
    video.speed(1);        
}
