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



// To Remove Test Inserts
  // function deleteGenes(res, mysql) {
  //   var sql = "DELETE FROM gene WHERE id > 2";
  //   sql = mysql.pool.query(sql, function(error, results, fields) {
  //     if (error) {
  //       res.write(JSON.stringify(error));
  //       res.end;
  //     }
  //   });
  //   console.log("deleted");
  // };

	router.get("/", function(req, res){
		var callbackCount = 0;
		var context = {};

		var mysql = req.app.get("mysql");

    //REMOVE for testing
    // deleteGenes(res, mysql);

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
    var inserts = [req.body.name, req.body.description];

    var sql = "INSERT INTO gene (name, description) VALUES (?, ?)";
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      } else {
        sql = "INSERT INTO artwork_gene (artwork_id, gene_id) VALUES (?, (SELECT id FROM gene WHERE name = ?))";
        inserts = [parseInt(req.body.artworks_to_link), req.body.name];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          } else {
            res.redirect('/gene');
          }
        });
      }
    });

   });

  return router;
}();
