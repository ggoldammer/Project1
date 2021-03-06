$("#search").on("click", function (e) {
  e.preventDefault();

  // var location = "+location:florida";
  // var queryURL = "https://webhose.io/filterWebContent?token=fde323c7-bec1-4079-9a0a-70e7d9f77f00&format=json&q=published:>1537426800000+language:english+thread.section_title:weather+thread.section_title:hurricane";
  var userCity = $("#location").val().trim();

  var queryURL1 = "https://api.newsriver.io/v2/search?query=website.domainName%3Aaccuweather.com%20or%20weather.com%20%20OR%20text%3Aweather%20and%20hurricane%20or%20storm%20or%20earthquake%20or%20mudslide%20or%20blizzard%20or%20rain%20AND%20discoverDate%3A%5B2018-08-12%20TO%20*%5DAND%20text%3A" + userCity + "&sortBy=_score&sortOrder=DESC&limit=5";

  $.ajax({
    url: queryURL1,
    method: "GET",
    headers: {
      Authorization: "sBBqsGXiYgF0Db5OV5tAw2nAU62B1RUZ9pCmf0ATBiyk6sHFFj2Nl10zzvpuOCDPn2pHZrSf1gT2PUujH1YaQA"
    }

  }).then(function (response) {
    $("#news-appear-here").empty();
    console.log(response);
    for (i = 0; i < response.length; i++) {
      console.log(response[i].url);
      var div = $("<div>");
      var h3 = $("<h3>");
      var img = $("<img>");
      var imgLink = $("<a>");
      var a = $("<a>");
      div.addClass("row m-3");
      img.attr("src", response[i].elements[0].url);
      a.attr("href", response[i].url);
      a.attr("target", '_blank');
      a.text(response[i].title);
      h3.append(a);
      h3.addClass("col-md-9 align-middle");
      img.addClass("img-150");
      imgLink.addClass("col-md-3");
      imgLink.attr("href", response[i].url);
      imgLink.append(img);
      div.append(imgLink);
      div.append(h3);
      $("#news-appear-here").append(div);
    }
  });

  // api.openweathermap.org/data/2.5/weather?q=London
  var userWeatherCity = $("#location").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=2ece379be43a1466dd625e136e146032&q=" + userWeatherCity + "&units=imperial";
  // https://api.openweathermap.org/data/2.5/weather?zip=,us&appid=fd6e725758c4ad90e02e45e3b42c4654
  $("#location").val("");
  $.ajax({
    url: queryURL,
    method: "GET",

  }).then(function (response) {
    console.log(response);
    $("#weather-icon").empty();
    var icon = $("<img>")
    icon.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon +".png");
    $("#weather-icon").append(icon);
    $("#nameHere").text(response.name);
    $("#tempHere").text(Math.floor(response.main.temp) + "°F");
    $("#humidityHere").text(response.main.humidity);
    $("#pressureHere").text(response.main.pressure);
  })
  
})

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDoqkXycu3RxZY8bj3BAW4XWaMvNkymL7A",
  authDomain: "should-i-be-worried.firebaseapp.com",
  databaseURL: "https://should-i-be-worried.firebaseio.com",
  projectId: "should-i-be-worried",
  storageBucket: "should-i-be-worried.appspot.com",
  messagingSenderId: "278732037019"
};
firebase.initializeApp(config);
var database = firebase.database();
var clickCounter = 0;

$("#firebaseLike").on("click", function () {
  clickCounter++;
  $(this).hide();
  var newText = $("<h3>Thank You!</h3>")
  $("#newText").append(newText);

  database.ref().set({
    clickCount: clickCounter
  });

});

database.ref().on("value", function (snapshot) {

  $("#click-value").text(snapshot.val().clickCount);

  clickCounter = snapshot.val().clickCount;

}, function (errorObject) {

  console.log("The read failed: " + errorObject.code);
});




