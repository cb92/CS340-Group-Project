module.exports = function() {
	var express = require('express');
	var router = express.Router();

	//Drop all Tables
  function dropTable(mysql, complete, name) {
    sqlString = "DROP TABLE IF EXISTS " + name;
    mysql.pool.query(sqlString, function(error, results, fields){
      if (error)
      {
        console.log(JSON.stringify(error));
      } else {
        console.log(name + " dropped");
        complete();
      }
    });
  }

	//Call to drop tables and begin making tables
  function setDB(mysql) {
    console.log("Setting Up Database");
    var callback = 0;
    var progress = 0;
    var tableNames = ["artwork_gene", "gene", "artwork", "artist_partner", "artist", "partner"];
    dropTable(mysql, complete, tableNames[progress]);
    progress++;
    function complete() {
      callback++;
      if (progress == 6) {
        console.log("All Tables Dropped");
        makeArtist(mysql);
        return true;
      }
      if(callback == progress) {
        dropTable(mysql, complete, tableNames[progress]);
        progress++;
      }
    }
  }

	//Make each Table (nested calls)
  function makeArtist(mysql) {
    sqlString = "CREATE TABLE artist (" +
      "id int(11) NOT NULL AUTO_INCREMENT," +
    	"name varchar(255) NOT NULL," +
      "hometown varchar(255)," +
      "birthday int(11), " +
      "deathday int(11), " +
      "biography varchar(255)," +
      "PRIMARY KEY (id)," +
      "CONSTRAINT UC_artist UNIQUE (name, birthday))" +
      "ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";
    mysql.pool.query(sqlString, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
      } else {
        console.log("Artist created");
        makePartner(mysql);
      }
    });
  }

  function makePartner(mysql) {
    sqlString = "CREATE TABLE partner (" +
    "id int(11) NOT NULL AUTO_INCREMENT," +
    "name varchar(255) NOT NULL," +
    "type varchar(255)," +
    "email varchar(255)," +
    "region varchar(255)," +
    "PRIMARY KEY (id)," +
    "CONSTRAINT UC_partner UNIQUE (name, email, region)" +
    ")ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";
    mysql.pool.query(sqlString, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
      } else {
        console.log("Partner created");
        makeArtistPartner(mysql);
        //makePartner(mysql);
      }
    });
  }

  function makeArtistPartner(mysql) {
    sqlString = "CREATE TABLE artist_partner (" +
    "artist_id int(11) NOT NULL," +
    "partner_id int(11) NOT NULL," +
    "PRIMARY KEY (artist_id, partner_id)," +
    "FOREIGN KEY (artist_id) REFERENCES artist (id) ON DELETE CASCADE," +
    "FOREIGN KEY (partner_id) REFERENCES partner (id) ON DELETE CASCADE" +
    ")ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";
    mysql.pool.query(sqlString, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
      } else {
        console.log("Artist_Partner created");
        makeArtwork(mysql);
      }
    });
  }

  function makeArtwork(mysql) {
    sqlString = "CREATE TABLE artwork (" +
      "id int(11) NOT NULL AUTO_INCREMENT," +
      "title varchar(255) NOT NULL," +
      "artist_id int(11) NOT NULL," +
      "category varchar(255)," +
      "date int(11)," +
      "thumbnail_url varchar(255)," +
      "partner_id int(11)," +
      "PRIMARY KEY (id)," +
      "FOREIGN KEY (artist_id) REFERENCES artist (id) ON DELETE CASCADE," +
      "FOREIGN KEY (partner_id) REFERENCES partner (id) ON DELETE SET NULL," +
      "CONSTRAINT UC_artwork UNIQUE (title, artist_id, date)" +
      ")ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;";

      mysql.pool.query(sqlString, function(error, results, fields) {
        if(error) {
          console.log(JSON.stringify(error));
        } else {
          console.log("Artwork Created");
          makeGene(mysql);
        }
      });
  }

  function makeGene(mysql) {
    sqlString = "CREATE TABLE gene (" +
    "id int(11) NOT NULL AUTO_INCREMENT," +
    "name varchar(255) NOT NULL," +
    "description varchar(255)," +
    "PRIMARY KEY (id)," +
    "CONSTRAINT UC_gene UNIQUE (name)" +
    ")ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";

    mysql.pool.query(sqlString, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
      } else {
        console.log("Gene Created");
        makeArtworkGene(mysql);
      }
    });
  }

  function makeArtworkGene(mysql) {
    sqlString = "CREATE TABLE artwork_gene (" +
    "artwork_id int(11) NOT NULL," +
    "gene_id int(11) NOT NULL," +
    "PRIMARY KEY(artwork_id, gene_id)," +
    "FOREIGN KEY (artwork_id) REFERENCES artwork (id) ON DELETE CASCADE," +
    "FOREIGN KEY (gene_id) REFERENCES gene (id) ON DELETE CASCADE" +
    ")ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";

    mysql.pool.query(sqlString, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
      } else {
        console.log("Artwork Gene Created");
      }
    });

  }

  router.get("/", function(req, res){
    var mysql = req.app.get("mysql");
    res.render('home');
  });

	return router;
}();
