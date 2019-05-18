module.exports = function() {
	var express = require('express');
	var router = express.Router();

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

	router.get("/", function(req, res){
		var callbackCount = 0;
		var context = {};
    context.jsscripts = ["deletepartner.js"];

		var mysql = req.app.get("mysql");
		getPartners(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount ==1)
				res.render('partner',context)
		}
	});

  router.post("/", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO partner (name, type, email, region) VALUES (?, ?, ?, ?)";
    var inserts = [req.body.name, req.body.type, req.body.email, req.body.region];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end;
      } else {
        res.redirect('/partner');
      }
    });
  });

  router.delete("/:id", function(req,res) {
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM partner WHERE id = ?";
      var inserts = [req.params.id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
        if (error) {
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
        } else {
          res.status(202).end();
        }
      })

  })

  return router;
}();
