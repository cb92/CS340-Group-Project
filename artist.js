module.exports = function() {
	var express = require('express');
	var router = express.Router();


	function getGenes(res, mysql, context, complete)
	{
		mysql.pool.query("SELECT name FROM gene", function(error, results, fields){
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

		/*var sql = "\
			INSERT INTO artist (name, hometown, birthday, deathday, biography) \
			VALUES  ((?), (?), (?), (?), (?));\
			INSERT INTO artwork (title, artist_id, category, date, thumbnail_url, partner_id)\
			VALUES ((?), (SELECT id FROM artist WHERE name = (?) and birthday=(?)), :category, :date, :thumbnail_url, :partner_id);";*/
		res.redirect('/artist');

		/*[req.body.name, req.body.hometown, req.body.birthday, req.body.deathday, req.body.biography, 
				req.body.artist_title, req.body.name, req.body.birthday, req.body.artist_category, req.body.artist_date, req.body.artist_thumbnail]*/



			//	INSERT INTO artwork_gene (artwork_id, gene_id)\
			//VALUES ((SELECT id FROM artwork where title=:title and artist_id = \
			//	(SELECT id FROM artist WHERE name = :name and birthday=:birthday) and date = :date), :selected_gene_id_i);

	});



//2019-05-16T04:07:38.891513+00:00 app[web.1]: artist_thumbnail: 'http://www.foo.com',
//2019-05-16T04:07:38.891515+00:00 app[web.1]: artist_partner: 'The',
//2019-05-16T04:07:38.891517+00:00 app[web.1]: genes_to_link: 'Pointilism' }






	return router;
}();