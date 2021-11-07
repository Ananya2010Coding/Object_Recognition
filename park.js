function navBack_park(){
    window.location.replace("main_page.html");
}

img = "";
Status = "";
array = [];

function setup(){
    canvas = createCanvas(640 , 460);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded)
    document.getElementById("status_park").innerHTML = "Status: Detecting Objects...";
}

function modelLoaded(){
    console.log("Model Loaded!!!");
    Status = true;
    objectDetector.detect(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    console.log(results);
}

function preload(){
    img = loadImage("Kids_park.jpg");
}

function draw(){
    image(img , 0 , 0 , 640 , 460);

    if(Status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        for(i=0 ; i < array.length ; i++){
            document.getElementById("status_park").innerHTML = "Status: Objects Detected!!";
            document.getElementById("no_of_objects(park)").innerHTML = "Number of objects detected are: "+array.length;
            fill(r,g,b);
            percent = floor(array[i].confidence * 100);
            text(array[i].label + " " + percent + "%" , array[i].x + 15 , array[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(array[i].x , array[i].y , array[i].width , array[i].height);
        }
    }
}
