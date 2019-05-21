module.exports = function() {
	var express = require('express');
	var router = express.Router();


	function getGenes(res, mysql, context, complete)
	{
		mysql.pool.query("SELECT name, id FROM gene", function(error, results, fields){
			if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			context.genes = results;
			complete();

		});
	};

	function getArtists(res, mysql, context, complete)
	{
		mysql.pool.query("SELECT * FROM artist", function(error, results, fields){
			if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			context.artists = results;
			complete();
		});
	};

	function getPartners(res, mysql, context, complete)
	{
		mysql.pool.query("SELECT name, id FROM partner", function(error, results, fields){
			if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			context.partners = results;
			complete();

		});

	};


	router.get("/", function(req, res){
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get("mysql");
		getArtists(res, mysql, context, complete);
		getPartners(res, mysql, context, complete);
		getGenes(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount>=3)
				res.render('artist',context)
		}
	});

	router.post("/", function(req,res){
		console.log(req.body);
		var mysql = req.app.get('mysql');
		var sql = "\
			INSERT INTO artist (name, hometown, birthday, deathday, biography) \
			VALUES  ((?), (?), (?), (?), (?));\
			INSERT INTO artwork (title, artist_id, category, date, thumbnail_url, partner_id)\
			VALUES ((?), (SELECT id FROM artist WHERE name = (?) and birthday=(?)), (?), (?), (?), (?));\
			INSERT INTO artwork_gene (artwork_id, gene_id)\
			VALUES ((SELECT id FROM artwork where title=(?) and artist_id = \
			(SELECT id FROM artist WHERE name = (?) and birthday=(?)) and date = (?)), (?));";
		var inserts = [req.body.name, req.body.hometown, req.body.birthday, req.body.deathday, req.body.biography, 
				req.body.artwork_title, req.body.name, req.body.birthday, req.body.artwork_category, req.body.artwork_date, req.body.artwork_thumbnail,req.body.artwork_partner,
				req.body.artwork_title, req.body.name, req.body.birthday, req.body.artwork_date, parseInt(req.body.genes_to_link)];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields){
			if (error) {
				res.write(JSON.stringify(error));
				res.end;
			} else
			{
				res.redirect('/artist');
			}
		});			
	});


	return router;
}();