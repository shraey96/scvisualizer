var searchResults = {title:[],searchTracks_StreamURI:[],artwork_url:[]};
var queue = {title:[],searchTracks_StreamURI:[],artwork_url:[]};

var queue2 = {title:[],searchTracks_StreamURI:[],artwork_url:[]};
var queueIndex = [];
var alterQueueClicks = 0;
var playID;
    

var RGB  = 'rgb(106, 96, 192)';
var randomRGBInterval;

var drawVisual1;
var drawVisual2;


$(document).ready(function() {

  $('#modal1').modal();
  
  $('#visualizer-waves').hide();
  $('#visualizer-bars').hide();
    
    
        var ckbox = $('#switchRGB');
 var ckbox1 = $('#switchVisualizer1');
       var ckbox2 = $('#switchVisualizer2');
    

        
        
    
        
    var ckbox = $('#switchRGB');

    $('input').on('click',function () {
        if (ckbox.is(':checked')) {
           
            
        randomRGBInterval = setInterval(randomRGB,2500); 
            //alert('You have Checked it');
        } else {
            
            clearInterval(randomRGBInterval);
         //   RGB  = 'rgb(106, 96, 192)';
         //   alert('You Un-Checked it');
        }
        
        });
        
            var ckbox1 = $('#switchVisualizer1');
                    
    $('input').on('click',function () {
        if (ckbox1.is(':checked')) {
            
         //   cancelAnimationFrame(drawVisual2)
            
            visualizer();
            
            $('#visualizer-bars').show();  
           
        } else {
            
             $('#visualizer-bars').hide();
        }
    });
        
  
  
        
        
        var ckbox2 = $('#switchVisualizer2');
                    
    $('input').on('click',function () {
        if (ckbox2.is(':checked')) {
        
           //  cancelAnimationFrame(drawVisual1)
            
            $('#visualizer-waves').show(); 
            visualizer2();
            
        } else {
            
             $('#visualizer-waves').hide();
        }
        
        
       }); 
        
        
    
        
        
});
    
            
          
    
  

 var client_id = 'AKm0rmaY0ScS4y0FyUdvWMyfmtMdUYh6';
 SC.initialize({
 client_id: client_id,
 //   redirect_uri: "http://example.com/callback.html",
  });








function searchSC()
{
    searchResults.title.length=0;   
    searchResults.searchTracks_StreamURI.length=0;
    searchResults.artwork_url.length=0;
    
    
    var search = $('#search').val();
    var results_ul_collection = $('#results');
    var displayString;
    
    if(search.length!=0)
        {
              
            
                SC.get("/tracks/", {q: search, limit:50}, function(sound){
              //  console.log("Sound URI: "+sound.uri + "/stream?client_id=" + client_id);
                    console.log(sound)
             //   $("#audio-test").attr("src", sound.uri + "/stream?client_id=" + client_id);
                    displayString = '<ul class="collection">';
                    
                for(i=0; i<sound.length;i++)
                    {  
                       queueIndex.push(i);    
                       var pushVar = sound[i].uri + "/stream?client_id=" + client_id;
                       searchResults.searchTracks_StreamURI.push(pushVar)
                        
                        if(sound[i].artwork_url==null)
                            {
                           searchResults.artwork_url.push("https://cdn0.iconfinder.com/data/icons/Android-R2-png/512/Music-Android-R.png")    
                            }
                        else
                            {
                           searchResults.artwork_url.push(sound[i].artwork_url);    
                            }
                        
                        searchResults.title.push(sound[i].title);
                        /*
                       displayString += '<div id ="'+i+'" class="retrievedTracks" onclick="playRetreivedTrack(this.id)">' + sound[i].title + "(" + millisToMinutesAndSeconds(sound[i].duration )+ ")" + "</div>";  
                        */
                    displayString += '<li class="collection-item avatar"  id="li'+i+'"> <img src="'+ searchResults.artwork_url[i] +'" alt="" class="circle"> <span class="title" id ="'+i+'" onclick="playRetreivedTrack(this.id)">' + sound[i].title + '</span><br><button id="b'+i+'" onclick=alterQueue('+i+')>Add to next up </button>'    
                        
                    }
                      
                    displayString+='</ul>';
                    
                    results_ul_collection.html(displayString);
                    
                });
            
        }
}



function playRetreivedTrack(id)
{ 
    playID = id;    
                    alterQueueClicks = 0;
    
                    queue.title.length=0;
                    queue.artwork_url.length=0;
                    queue.searchTracks_StreamURI.length=0;
    
                    queue.title = searchResults.title.slice();
                    queue.artwork_url = searchResults.artwork_url.slice();
                    queue.searchTracks_StreamURI = searchResults.searchTracks_StreamURI.slice();
    playTrack();

}

function playTrack()
{   //var playIDNext = parseInt(playID) + 1;
    $("#currentTrackIMG").attr("src", queue.artwork_url[playID]); 
    $('#currentTrackMarquee').html(queue.title[playID])
    //$('#nextTrack').html(queue.title[playIDNext])

    console.log(queue.title)
    audio.crossOrigin = "anonymous";
    console.log("Now Playing: " + queue.title[playID])
    $("#audio-test").attr("src", queue.searchTracks_StreamURI[playID]); 
    $("#audio-test").get(0).play();
    playID++;
    
}

function alterQueue(id)
{   
    //var playIDNext = parseInt(playID) + 1;
    var title = searchResults.title[id];
    var artwork_url = searchResults.artwork_url[id];
    var searchTracks_StreamURI = searchResults.searchTracks_StreamURI[id];
   
    //$('#nextTrack').html(queue.title[playIDNext])
       
    queue.title.splice(playID  + alterQueueClicks, 0, title);
    queue.artwork_url.splice(playID  + alterQueueClicks, 0, artwork_url);
    queue.searchTracks_StreamURI.splice(playID  + alterQueueClicks, 0, searchTracks_StreamURI);
    
    console.log(title);
    console.log(queue.title)
  // console.log("Current queue is: " + queueIndex)
   alterQueueClicks++;
    
 /* "alterQueue(\''sound[i].title'\')"
   queueId = (id.replace("b", ""));
   queueIndex.splice(playID, alterQueue, queueId);
   console.log("Current queue is: " + queueIndex)
   alterQueueClicks++;
*/   
}

$("#audio-test").on('pause', function() {
    
  $('#visualizer-waves').hide();
  $('#visualizer-bars').hide();  
}) 



$("#audio-test").on('play', function() {
  
  $('#visualizer-waves').show();
  $('#visualizer-bars').show();  
   
}) 


function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}




function randomRGB()
{
var r = Math.floor(Math.random()*256);          // Random between 0-255
var g = Math.floor(Math.random()*256);          // Random between 0-255
var b = Math.floor(Math.random()*256);          // Random between 0-255
RGB = 'rgb(' + r + ',' + g + ',' + b + ')'; // Collect all to a string
}




/////////////////////////////////////   Visualizer Stuff   ////////////////////////////





//var canvas = $('#visualizer-bars');
var canvas = document.getElementById('visualizer-bars');
var canvas_waves = document.getElementById('visualizer-waves');



//var canvasCtx = canvas.getContext("2d");
var canvasCtx = canvas.getContext("2d")
var canvasCtx2 = canvas_waves.getContext("2d");


//gets height and width of canvas from attributes of canvas in html file
//WIDTH = canvas.width;
//HEIGHT = canvas.height;


 var audio = document.getElementById("audio-test");
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





var x;
var x1;

function visualizer2()
{   
    
    WIDTH = canvas_waves.width;
HEIGHT = canvas_waves.height;
    
    
    analyser.fftSize = 2048;
    
    console.log("visualizer2")
 
    analyser.smoothingTimeConstant = 0.9;
     
    bufferLength = analyser.fftSize;
    
    var frequencyData = new Uint8Array(bufferLength);
    
    drawVisual2 = requestAnimationFrame(visualizer2);
   
    analyser.getByteTimeDomainData(frequencyData);
    
    // canvasCtx2.fillStyle = 'rgb(255, 200, 200)';
    canvasCtx2.fillRect(0, 0, WIDTH, HEIGHT);
    
    canvasCtx2.clearRect(0,0,WIDTH,HEIGHT);
    
    
    canvasCtx2.lineWidth = 1;
   // canvasCtx2.strokeStyle = 'rgb(106, 96, 192)';
    canvasCtx2.strokeStyle = RGB;

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

      canvasCtx2.lineTo(canvasCtx2.width, canvasCtx2.height/2);
      canvasCtx2.stroke();
    };
    
    



function visualizer()
{// analyser.smoothingTimeConstant = 0.9;
    
    
    
    
WIDTH = canvas.width;
HEIGHT = canvas.height;
   
  console.log("visualizer1")
  analyser.getByteFrequencyData(frequencyData);
    
    //  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                        //x,y,width,height
    
     canvasCtx.clearRect(0,0,WIDTH,HEIGHT);
    
      drawVisual1 = requestAnimationFrame(visualizer);
    
   //   var barWidth = (WIDTH / bufferLength) * 2.5;
      barWidth = 2;
      var barHeight;
      var x = 0;
    
    for(var i = 0; i < bufferLength; i++) {
       // barHeight = frequencyData[i]/2;
        barHeight = frequencyData[i]/2;

       // canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',150,250)';
        canvasCtx.fillStyle = RGB;
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);
        
        
        //update starting position of bar for next bar
        x += barWidth + 1;
      }
    
}









/*

function playIt(){
    var sound = SC.stream("/tracks/250711755", function(sound){
      console.log(sound.stream_url)
        sound.play();
    });
}

*/

//// remember to append "/stream?client_id=" + client_id" to sound.uri
//// sc.stream is prepackaged player f

/*

SC.get("/tracks/250711755", {}, function(sound){
console.log("Sound URI: "+sound.uri + "/stream?client_id=" + client_id);
    console.log(sound.title) //gives titles
    console.log(sound.favoritings_count)
$("#audio-test").attr("src", sound.uri + "/stream?client_id=" + client_id);
});

*/
//// artwork default: https://i1.sndcdn.com/artworks-000233970951-jh7hre-large.jpg
//// artwork size 300x300: https://i1.sndcdn.com/artworks-000233970951-jh7hre-t300x300.jpg



/*

SC.get("/tracks/", {q: "Don't let me down"}, function(sound){
    console.log("Sound URI: "+sound.uri + "/stream?client_id=" + client_id);
    console.log(sound)
    console.log(sound.title) //gives titles
    console.log(sound.favoritings_count)
$("#audio-test").attr("src", sound.uri + "/stream?client_id=" + client_id);
});




SC.get('/users', {q: 'illenium', limit:5}, function (users) {
  console.log(users);
    var userid = users[0].id;
  //  alert(users[0].permalink)
    
    
    
        SC.get("/tracks", {
      user_id: userid,
      limit: 100
  }, function (tracks) {
     console.log("All tracks by illenium: ")
        console.log(tracks)

            
          
            
            for(i=0;i<tracks.length;i++)
{            if(tracks[i].title=="Illenium - Fractures (ft. Nevve)")
                {
       //         alert("Found")
                $("#audio-test").attr("src", tracks[i].uri + "/stream?client_id=" + client_id)
                }
    }
    
  
            
            
            console.log(tracks.length)
    }
               )
  
    
  // iterate over users, do the matching
  // hit the users api link, get tracks and stream them via their IDs
});


*/










/*

SC.initialize({
    client_id: "AKm0rmaY0ScS4y0FyUdvWMyfmtMdUYh6",
   redirect_uri: "https://developers.soundcloud.com/callback.html"
});




$(document).ready(function() {
SC.stream("/tracks/114739594", function (sound) {
  sound.play();
console.log("Playing: Background Soundtrack");
});
});



// Background Sounds - Rain
SC.stream("/tracks/114739594", function (sound) {
  sound.play();
console.log("Playing: Background Soundtrack");
});






SC.initialize({
    client_id: "d4ab52d80ed2e7790c3a243495b30093",
      redirect_uri: "https://developers.soundcloud.com/callback.html"
});

// Background Sounds - Rain
SC.stream("/tracks/114739594", function (sound) {
  //  sound.play();
    console.log("Playing: Background Soundtrack");
});

$(document).ready(function () {

    // 01. Solomon's Theme - Deviance Arrange
    SC.stream("/tracks/136405212", function (sound) {
        $("#song1").click(function (e) {
            e.preventDefault();
            sound.start();
            console.log("Playing Song 1");
        });
        $("#stop1").click(function (e) {
            e.preventDefault();
            sound.stop();
            console.log("Song 1 Stopped");
        });
    });

    // 02. Mute (Feelings) cover
    SC.stream("/tracks/98883660", function (sound) {
        $("#song2").click(function (e) {
            e.preventDefault();
            sound.start();
            console.log("Playing Song 2");
        });
        $("#stop2").click(function (e) {
            e.preventDefault();
            sound.stop();
            console.log("Song 2 Stopped");
        });
    });
});






var client_id = '278594df9a311b2a1a56251b3a2b0fbe';
var track_id = '293605256';

SC.initialize({
  client_id: client_id
});


$(document).ready(function() {
  $("#stream").on("click", function() {
    SC.stream("/tracks/" + track_id, function(sound)     {
      sound.play();
    }
    );
  });
});

$('button').on('click', function() {
  $(this).toggleClass('pause-sprite');
});




  SC.initialize({
      client_id: "AKm0rmaY0ScS4y0FyUdvWMyfmtMdUYh6",
   //   redirect_uri: "http://example.com/callback.html",
  });




var userId = 39090345; // user_id of Prutsonic

  SC.get("/tracks", {
      user_id: userId,
      limit: 100
  }, function (tracks) {

      var tmp = '';

      for (var i = 0; i < tracks.length; i++) {

          tmp = '<a href="' + tracks[i].permalink_url + '">' + tracks[i].title + ' - ' + tracks[i].duration + '</a>';

          $("<li/>").html(tmp).appendTo("#track-list");
      }
  })
*/



