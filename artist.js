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
		context.jsscripts=["filter.js"];
		context.title="Artist";
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
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO artist (name, hometown, birthday, deathday, biography) VALUES  (?, ?, ?, ?, ?);";
		var inserts = [req.body.name, req.body.hometown, req.body.birthday, req.body.deathday, req.body.biography];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields){
			if (error) {
				console.log(JSON.stringify(error));
				res.redirect('/artist');
			} else
			{
				sql = "INSERT INTO artwork (title, artist_id, category, date, thumbnail_url, partner_id) VALUES (?, (SELECT id FROM artist WHERE name = ? and birthday=?), ?, ?, ?, ?);";
				inserts = [req.body.artwork_title, req.body.name, req.body.birthday, req.body.artwork_category, req.body.artwork_date, req.body.artwork_thumbnail,req.body.artwork_partner];
				if (req.body.artwork_partner=="null")
				{
					inserts[6] = null;
				}
				sql = mysql.pool.query(sql, inserts, function(error, results, fields){
					if(error) {
						console.log(JSON.stringify(error));
						res.redirect('/artist');
					}
					else {
						sql = "INSERT INTO artwork_gene (artwork_id, gene_id) VALUES ((SELECT id FROM artwork where title=? and artist_id = (SELECT id FROM artist WHERE name = ? and birthday=?) and date = ?), ?)";
						if (typeof req.body.genes_to_link != "object")
						{
							sql+=";";
							inserts = [req.body.artwork_title, req.body.name, req.body.birthday, req.body.artwork_date, req.body.genes_to_link];
						}
						else {
							inserts = [req.body.artwork_title, req.body.name, req.body.birthday, req.body.artwork_date, req.body.genes_to_link[0]];
							for (let i=1; i<req.body.genes_to_link.length; i++)
							{
								sql+=", ((SELECT id FROM artwork where title=? and artist_id = (SELECT id FROM artist WHERE name = ? and birthday=?) and date = ?), ?)";
								inserts.push(req.body.artwork_title, req.body.name, req.body.birthday, req.body.artwork_date, req.body.genes_to_link[i]);
							}
							sql+=";";
						}
						sql = mysql.pool.query(sql, inserts, function(error, results, fields){
						if(error) {
							console.log(JSON.stringify(error));
							res.redirect('/artist');
						}
						else {
							res.redirect('/artist');
						}
					});
					}
				});
			}
		});
	});


	return router;
}();
