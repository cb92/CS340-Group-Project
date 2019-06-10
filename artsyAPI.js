var request = require('request');
var artistList = [];
var artList = [];

function connectAPI(callback) {
  request({
   "url":"https://api.artsy.net/api/tokens/xapp_token?client_id=e620889611e0b9c2f3ec&client_secret=5f1d66d4bc8984ea0bebc1680fd2b24f",
   "method":"POST",
   "headers":{
     "Content-Type":"application/json"
   },
   "body":'{}'
 }, function(err, response, body){
   if(!err && response.statusCode < 400){
     console.log("Connected to Artsy API; retreived token");
     var token = JSON.parse(body).token;
     callback(token);
   }else{
     console.log(response);
   }
 }
 );
}

function getArtist(token, callback) {
  request({
   "url":"https://api.artsy.net/api/artists?artworks=true&size=20",
   "method":"GET",
   "headers":{
     'X-Xapp-Token': token,
     'Accept': 'application/vnd.artsy-v2+json'
   },
 }, function(err, response, body){
   if(!err && response.statusCode < 400){
    var artists = JSON.parse(response.body)._embedded.artists;
    for (var i = 0; i < artists.length; i++) {
      var artist = {};
      if (!isNaN(artists[i].birthday) && !isNaN(artists[i].deathday)) {
        artist.name = artists[i].name;
        artist.birthday = artists[i].birthday;
        artist.deathday = artists[i].deathday;
        artist.hometown = artists[i].hometown;
        artist.id = artists[i].id;
        artist.biography = artists[i].biography;
        artistList.push(artist);
      }
    }
    callback(artistList);
          //getArtwork(mysql, artistList);
        }else{
         console.log("Error connected to ARTSY API while retrieving Artist");
       }
     });
}


function artworkCall(artistID, token, callback) {

  console.log(artistID);
  var passIn = {};
  passIn.ids = artistID;
  passIn.token = token;
  setTimeout(function() {
    for (var i = 0; i < passIn.ids.length; i++ ) {
      var url = "https://api.artsy.net/api/artworks?artist_id=" + passIn.ids[i];
      request({
       "url":url,
       "method":"GET",
       "headers":{
         'X-Xapp-Token': passIn.token,
         'Accept': 'application/vnd.artsy-v2+json'
       },
     }, function(err, response, body){
       if(!err && response.statusCode < 400){
         console.log(JSON.parse(response.body)._embedded.artworks[0].title)
         callback();
       } else {
         console.log("Error connected to ARTSY API while retrieving Artwork");
               //console.log(err);
               callback();
             }
           });
    }

  }, 3000, passIn);
}

connectAPI(function(token) {
  getArtist(token, function(artistList) {
    artistIDs = [];
    for (var i = 0; i < artistList.length; i ++){
      artistIDs.push(artistList[i].id);
    }
    Promise.all(artistIDs).then(getArtworks(artistIDs, token, artList));
  })
});

var counter = 0;

function getArtworks(artistIDs, token, artList) {
  artworkCall(artistIDs.slice(0,5), token, function() {
    counter++;
    if (counter == 1) {
      artworkCall(artistIDs.slice(5,10), token, function() {
      })
    }
  })
}
