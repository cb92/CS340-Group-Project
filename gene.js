module.exports = function() {
	var express = require('express');
	var router = express.Router();

  function getGenes(res, mysql, context, complete)
	{
		mysql.pool.query("SELECT name, description FROM gene", function(error, results, fields){
			if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			context.genes = results;
			complete();

		});
	};

  function getArtworks(res, mysql, context, complete)
	{
		mysql.pool.query("SELECT id, title FROM artwork", function(error, results, fields){
			if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			context.artworks = results;
			complete();
		});
	};

  function insertGene(res, mysql, inserts, context)
  {

  }

	router.get("/", function(req, res){
		var callbackCount = 0;
		var context = {};

		var mysql = req.app.get("mysql");
		getGenes(res, mysql, context, complete);
    getArtworks(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount == 2)
				res.render('gene',context);
		}
	});

  router.post("/", function(req, res){
    var mysql = req.app.get("mysql");



    // var sql = "INSERT INTO gene (name, description) VALUES (?, ?)";
    // var inserts = [req.body.name, req.body.description];
    // sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    //   if (error) {
    //     res.write(JSON.stringify(error));
    //     res.end;
    //   }
    // });
    //
    // var idArray = [req.body.name];
    //
    // var newId;
    // mysql.pool.query("SELECT id FROM gene WHERE (name = ?)", idArray, function(error, results, fields){
		// 	if (error)
		// 	{
		// 		res.write(JSON.stringify(error));
		// 		res.end();
		// 	}
    //   JSON.stringify(results);
    //   newId = results[0].id;
    //   console.log(newId);
    // });
    //
    //  var newInsert = [req.body.artworks_to_link, newId]
    //  console.log(newInsert);
    //
    //  sql = "INSERT INTO artwork_gene (artist_id, gene_id) VALUES (?, ?)";
    //
    //  sql = mysql.pool.query(sql, newInsert, function(error, results, fields) {
    //    if (error) {
    //      res.write(JSON.stringify(error));
    //      res.end;
    //    } else {
    //      res.redirect('/partner');
    //    }
    // });
   });



  return router;
}();
