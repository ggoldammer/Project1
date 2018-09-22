$("#search").on("click", function () {
  // var location = "+location:florida";
  // var queryURL = "https://webhose.io/filterWebContent?token=fde323c7-bec1-4079-9a0a-70e7d9f77f00&format=json&q=published:>1537426800000+language:english+thread.section_title:weather+thread.section_title:hurricane";
  var userCity = "japan";
  var queryURL = "https://api.newsriver.io/v2/search?query=website.domainName%3Aaccuweather.com%20or%20weather.com%20%20OR%20text%3Aweather%20and%20hurricane%20or%20storm%20or%20earthquake%20or%20mudslide%20or%20blizzard%20or%20rain%20AND%20discoverDate%3A%5B2018-08-12%20TO%20*%5DAND%20text%3A"+userCity+"&sortBy=_score&sortOrder=DESC&limit=15";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers : {
      Authorization: "sBBqsGXiYgF0Db5OV5tAw2nAU62B1RUZ9pCmf0ATBiyk6sHFFj2Nl10zzvpuOCDPn2pHZrSf1gT2PUujH1YaQA"
    }
    
  }).then(function (response) {
    console.log(response);
   for (i = 0; i < response.length; i++) { 
  console.log(response[i].url);
  var div = $("<div>");
  var a = $("<a>");
      a.attr("href",response[i].url);
      a.attr("target",'_blank');
      a.text(response[i].title);
      div.append(a);
      $("#news-appear-here").append(a);
}


  });
})