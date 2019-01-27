// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var results = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

// Displays all characters
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "hello.html"));
});
// Displays all characters
app.get("/api/results", function(req, res) {
  res.json(results);
});




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
  });

// -------------------------------------------------------------------------------------------------------------


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


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
