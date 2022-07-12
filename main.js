x = 0;
y = 0;

//screen_width and screen_height and initialize them to 0.
var screen_height = 0;
var screen_width = 0;

draw_apple = "";

//Define a variable as apple to hold the image of apple and set it to empty.
var apple ="";
//Define a variable speak_data to hold the speech which we want the system to speak and set it to empty.
  var speak_data = "";
//Then define a variable to_number to hold the number said by the user and set it to 0
var to_number = 0;


function preload()
{
  //load apple.png inside loadImage()
  apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    if(Number.isInteger(to_number))
    {
      document.getElementById("status").innerHTML = "Started drawing apple "; 
      draw_apple = "set";
    }
    else
    {
      document.getElementById("status").innerHTML = "The speech has not recognized a number "; 
    }

}

function setup() {

  //set screen_width = window.innerWidth
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  //set screen_height = window.innerHeight
  

  canvas = createCanvas(screen_width, screen_height-150);
  canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    for(var i = 1; i <= to_number; i++)
    {

      //create random location using Math.floor() and Math.random() for x and y
     
      x = Math.floor(Math.random() * 150);
      y = Math.floor(Math.random() * 150);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
