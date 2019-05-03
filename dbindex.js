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

app.get("/test1", function(req, res){
	res.render("test1.handlebars");
});

app.get("/test2", function(req, res){
	res.render("test2.handlebars");
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