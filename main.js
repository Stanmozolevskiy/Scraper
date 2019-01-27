var cheerio = require("cheerio");
var axios = require("axios");


var results = [];

console.log("hello")

axios.get("https://nh.craigslist.org/search/apa?query=exeter&availabilityMode=0&sale_date=all+dates").then(function(response) {

  // Load the Response into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("li.result-row").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).find("a.result-title").text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).find("a").attr("href");

    var price = $(element).find("span.result-price").text().split("$")[1];

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      price: price,
      link: link
    });
  })


  

$("stats").empty();


for (let i = 0; i < results.length; i++) {

  console.log(results[i].title)
  console.log(results[i].price)
  console.log(results[i].link)

  var tr = $("<p>").append(
    $("<h3>").text(results[i].title),
    $("<h3>").text(results[i].title),
    $("<h3>").text(results[i].title),
    $("<h3>").text(results[i].title),
    $("<h3>").text(results[i].title)
  );

  $("stats").append(tr);


}

})