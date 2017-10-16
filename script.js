

/*


SC.initialize({
 client_id: "AKm0rmaY0ScS4y0FyUdvWMyfmtMdUYh6",
  redirect_uri: 'index.html'
});

// initiate auth popup
SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});




*/



var canvas = document.getElementById('visualizer-bars');
var canvas_waves = document.getElementById('visualizer-waves');



var canvasCtx = canvas.getContext("2d");
var canvasCtx2 = canvas_waves.getContext("2d");


//gets height and width of canvas from attributes of canvas in html file
WIDTH = canvas.width;
HEIGHT = canvas.height;


 //canvasCtx.fillStyle = 'rgb(0, 0, 0)';
   //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);


//create analyser
 
var audio = document.getElementById("audio");
var audiosrc = ['audio2', 'audio4', 'audio7', 'audio8', 'audio9', 'audio10', 'audio11', 'audio12', 'audio13'];
var i = 0;

 var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
 var audioSrc = audioCtx.createMediaElementSource(audio);
 var analyser = audioCtx.createAnalyser();

//connect to audio file then connect audioSource to analyser
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
 
  // frequencyBinCount tells you how many values you'll receive from the analyser

//will give number of data values we'll have to use -> analyser.frequencyBinCount



    


    var bufferLength = analyser.frequencyBinCount;
    console.log("bufferLength: " + bufferLength)
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
 
 


function nextTrack()
{
    audio.src =audiosrc[i] + ".mp3";
   (audio.load());
    audio.play();
     console.log("playing file: " + audiosrc[i])
    i++;
   
    
    if(i==audiosrc.length)
        {
            i=0;
        }
    
    
}

    
    visualizer();
    visualizer2();


    







function visualizer()
{// analyser.smoothingTimeConstant = 0.9;
    
     drawVisual = requestAnimationFrame(visualizer);

      analyser.getByteFrequencyData(frequencyData);
    
    //  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                        //x,y,width,height
    
     canvasCtx.clearRect(0,0,WIDTH,HEIGHT);
    
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
    
    for(var i = 0; i < bufferLength; i++) {
        barHeight = frequencyData[i]/2;

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',150,250)';
       // canvasCtx.fillStyle = 'rgb(215, 107, 44)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);
        
        
        //update starting position of bar for next bar
        x += barWidth + 1;
      }
    
}



function visualizer2()
{
    
  
     
    bufferLength = analyser.fftSize;
    
    var frequencyData = new Uint8Array(bufferLength);
    
    drawVisual = requestAnimationFrame(visualizer2);
   
    analyser.getByteTimeDomainData(frequencyData);
    
    // canvasCtx2.fillStyle = 'rgb(255, 200, 200)';
     canvasCtx2.fillRect(0, 0, WIDTH, HEIGHT);
    
    canvasCtx2.clearRect(0,0,WIDTH,HEIGHT);
    
    
    canvasCtx2.lineWidth = 3;
    canvasCtx2.strokeStyle = 'rgb(106, 96, 192  )';

    canvasCtx2.beginPath();
    
      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {
   
        var v = frequencyData[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx2.moveTo(x, y);
        } else {
          canvasCtx2.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx2.lineTo(canvas.width, canvas.height/2);
      canvasCtx2.stroke();
    };
    
    
    




