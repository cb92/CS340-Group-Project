module.exports = function() {
	var express = require('express');
	var router = express.Router();

	//Retrieve from Database
	function getPartners(res, mysql, context, complete)
	{
		mysql.pool.query("SELECT id, name, type, email, region FROM partner", function(error, results, fields){
			if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			context.partners = results;
			complete();
		});
	}

	//For all get request: render page with table.
	router.get("/", function(req, res){
		var callbackCount = 0;
		var context = {};
    context.jsscripts = ["deletepartner.js","filter.js"];
    context.title="Partner";

		var mysql = req.app.get("mysql");
		getPartners(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount ==1)
				res.render('partner',context)
		}
	});

	//For all post requests: form submissions (insert new partner)
  router.post("/", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO partner (name, type, email, region) VALUES (?, ?, ?, ?)";
    var inserts = [req.body.name, req.body.type, req.body.email, req.body.region];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
				console.log(JSON.stringify(error));
        res.redirect('/partner#error');
      } else {
				res.redirect('/partner');
      }
    });
  });

	//For all delete requests: Remove partner from table
  router.delete("/:id", function(req,res) {
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM partner WHERE id = ?";
      var inserts = [req.params.id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
        if (error) {
					console.log(JSON.stringify(error));
					res.redirect('/partner');
        } else {
          res.status(202).end();
        }
      })
  });

  return router;
}();
