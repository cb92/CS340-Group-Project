module.exports = function() {
	var express = require('express');
	var router = express.Router();

	//Retrieve from Database
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

	//For all get request: render page with table.
	router.get("/", function(req, res){
		var callbackCount = 0;
		var context = {};
    context.jsscripts=["filter.js"];
    context.title="Gene";
		var mysql = req.app.get("mysql");
		getGenes(res, mysql, context, complete);
    getArtworks(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount == 2)
				res.render('gene',context);
		}
	});

	//For all post requests: form submissions (insert new gene & new artwork_gene relationship)
  router.post("/", function(req, res){
    var mysql = req.app.get("mysql");
    var inserts = [req.body.name, req.body.description];

    var sql = "INSERT INTO gene (name, description) VALUES (?, ?)";
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
				console.log(JSON.stringify(error));
				res.redirect('/gene#error');
      } else {

        sql = "INSERT INTO artwork_gene (artwork_id, gene_id) VALUES (?, (SELECT id FROM gene WHERE name = ?))";
        if (typeof req.body.artworks_to_link != "object")
        {
          sql+=";";
          inserts = [req.body.artworks_to_link, req.body.name];
        }
        else {
          inserts = [req.body.artworks_to_link[0], req.body.name];
          for (let i=1; i<req.body.artworks_to_link.length; i++)
          {
            sql+=", (?, (SELECT id FROM gene WHERE name = ?))";
            inserts.push(req.body.artworks_to_link[i], req.body.name);
          }
          sql+=";";
        }

        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
          if (error) {
						console.log(JSON.stringify(error));
						res.redirect('/gene#error');
          } else {
            res.redirect('/gene');
          }
        });
      }
    });
   });

  return router;
}();
