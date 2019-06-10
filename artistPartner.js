module.exports = function() {
	var express = require('express');
	var router = express.Router();

		//Retrieve from Database
   function getArtists(res, mysql, context, complete)
   {
    mysql.pool.query("SELECT id, name FROM artist", function(error, results, fields){
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

  function getArtistPartners(res, mysql, context, complete)
  {
    mysql.pool.query("SELECT artist_partner.artist_id, artist_partner.partner_id, artist.name AS artistName, partner.name AS partnerName FROM artist_partner INNER JOIN artist ON artist_partner.artist_id = artist.id INNER JOIN partner ON artist_partner.partner_id = partner.id", function(error, results, fields){
     if (error)
     {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.artist_partners = results;
    complete();
  });
  };

	//For all get request: render page with table.
	router.get("/", function(req, res){
		var callbackCount = 0;
		var context = {};
    context.jsscripts = ["deleteartistpartner.js","filter.js"];
    context.title="Artist/Partner";
    var mysql = req.app.get("mysql");
    getArtists(res, mysql, context, complete);
    getArtistPartners(res, mysql, context, complete);
    getPartners(res, mysql, context, complete);
    function complete() {
     callbackCount++;
     if (callbackCount == 3)
      res.render('artistPartner',context);
  }
});

	//For all post requests: form submissions (insert new artist_partner relationship)
  router.post("/", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO artist_partner (artist_id, partner_id) VALUES (?, ?)";
    var inserts = [req.body.artist, req.body.partner];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.redirect('/artistPartner#error');
      } else {
        res.redirect('/artistPartner');
      }
    });
  });

	//For all delete requests
  router.delete("/:artistId/:partnerId", function(req,res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM artist_partner WHERE artist_id = ? AND partner_id = ?";
    var inserts = [req.params.artistId, req.params.partnerId];
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
