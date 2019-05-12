/* Setup boilerplate */
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',process.env.PORT || 3450); // compatible with Heroku deployment
/* End of setup boilerplate */


app.get("/", function(req, res){
	res.render("home.handlebars");
});

app.get("/new_artist", function(req, res){
	res.render("new_artist.handlebars");
});

app.get("/new_partner", function(req, res){
	res.render("new_partner.handlebars");
});

app.get("/new_gene", function(req, res){
	res.render("new_gene.handlebars");
});

app.get("/new_artwork", function(req, res){
	res.render("new_artwork.handlebars");
});

app.get("/new_artistPartner", function(req, res){
	res.render("new_artistPartner.handlebars");
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