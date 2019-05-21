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
		mysql.pool.query("SELECT name, id FROM artist", function(error, results, fields){
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


	function getArtwork(res, mysql, context, complete)
	{
		mysql.pool.query(
			"SELECT title, thumbnail_url, artist_name, date, category, partner_name, GROUP_CONCAT(distinct gene_name SEPARATOR ', ') as gene_names_comb FROM ( \
				SELECT a.title, ar.name as artist_name, a.thumbnail_url, a.date, a.category, g.name as gene_name, p.name as partner_name \
				FROM artwork a left join artwork_gene ag on a.id=ag.artwork_id \
				left join gene g on ag.gene_id=g.id \
				left join partner p on a.partner_id = p.id \
				left join artist ar on a.artist_id=ar.id) a \
			GROUP BY title, thumbnail_url, artist_name, date, category, partner_name;", 
			function(error, results, fields){
			if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			context.artwork = results;
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
		getArtwork(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount>=4)
				res.render('artwork',context);
		}
	});




	router.post("/", function(req,res){
		console.log(req.body);
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO artwork (title, artist_id, category, date, thumbnail_url, partner_id) VALUES (?, ?, ?, ?, ?, ?);";
		var inserts = [req.body.artwork_title, req.body.artist_id, req.body.artwork_category, req.body.artwork_date, req.body.artwork_thumbnail,req.body.artwork_partner];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields){
			if(error) {
				res.write(JSON.stringify(error));
				res.end;
			}
			else {
				sql = "INSERT INTO artwork_gene (artwork_id, gene_id) VALUES ((SELECT id FROM artwork where title=? and artist_id = ? and date = ?), ?);";
				inserts = [req.body.artwork_title, req.body.artist_id, req.body.artwork_date, parseInt(req.body.genes_to_link)];
				sql = mysql.pool.query(sql, inserts, function(error, results, fields){
					if(error) {
						res.write(JSON.stringify(error));
						res.end;
					}
					else {
						res.redirect('/artwork');
					}
				});
			}
		});			
	});

	return router;
}();