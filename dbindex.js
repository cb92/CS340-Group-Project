/* Setup boilerplate */
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
//var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
//connection.connect();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.set('port',process.env.PORT || 3450); // compatible with Heroku deployment
app.set('mysql',mysql);
/* End of setup boilerplate */


app.get("/", function(req, res){
	res.render("home.handlebars");
});

app.use("/artist", require("./artist.js"));
app.use("/artwork", require("./artwork.js"));
app.use("/partner", require("./partner.js"));
app.use("/gene", require("./gene.js"));


app.get("/artwork", function(req, res){
	res.render("artwork.handlebars");
});

app.get("/artistPartner", function(req, res){
	res.render("artistPartner.handlebars");
});

app.get("/close-museum", function(req, res){
	res.render("close-museum.handlebars");
});

app.get("/creative-difference", function(req, res){
	res.render("creative-difference.handlebars");
});


/* Error handling boilerplate*/
app.use(function(req, res){
	res.status(404);
	res.render('404.handlebars');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500.handlebars');
});

/* end of error handling boilerplate */


// app listener
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
