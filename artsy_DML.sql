-- Query for add a new functionality with colon : character being used to
-- denote the variables that will have data from the backend programming language


### ARTIST PAGE
INSERT INTO artist (name, hometown, birthday, deathday, biography)
VALUES  (:name, :hometown, :birthday, :deathday, :biography);

INSERT INTO artwork (title, artist_id, category, date, thumbnail_url, partner_id)
VALUES (:title, (SELECT id FROM artist WHERE name = :name and birthday=:birthday), :category, :date, :thumbnail_url, :partner_id);

# NOTE: since an arbitrary number of genes can be selected, this query will be run with every selected gene (each iteratively substituted into the :selected_gene_id_i variable)
INSERT INTO artwork_gene (artwork_id, gene_id)
VALUES ((SELECT id FROM artwork where title=:title and artist_id = (SELECT id FROM artist WHERE name = :name and birthday=:birthday) and date = :date), :selected_gene_id_i);

SELECT name, id FROM gene; -- to populate Gene list in Artwork  
SELECT * FROM artist; -- to populate Artist table
SELECT name, id FROM partner;

### PARTNER PAGE
INSERT INTO partner (name, type, email, region)
VALUES (:name, :type, :email, :region);

SELECT id, name, type, email, region FROM partner; -- to populate table

DELETE FROM partner
WHERE id = :id_to_delete;


### GENE PAGE
INSERT INTO gene (name, description)
VALUES (:name, :description);

# NOTE: since an arbitrary number of artworks can be selected for a new gene, this query will be run with every selected artwotk (each iteratively substituted into the :selected_artwork_id_i variable)
INSERT INTO artwork_gene (artwork_id, gene_id)
VALUES (:selected_artwork_id_i, (SELECT id FROM gene where name = :name));

SELECT name, description FROM gene;
SELECT id, title FROM artwork;

### ARTIST PARTNER PAGE
SELECT id, name from artist;
SELECT name, id from partner;
INSERT INTO artist_partner (artist_id, partner_id)
VALUES (:artist_id, :partner_id);

SELECT artist_partner.artist_id, artist_partner.partner_id, artist.name AS artistName, partner.name AS partnerName FROM artist_partner INNER JOIN artist ON artist_partner.artist_id = artist.id INNER JOIN partner ON artist_partner.partner_id = partner.id;

DELETE FROM artist_partner
WHERE partner_id = :pid_to_delete
AND artist_id = :aid_to_delete;

### ARTWORK PAGE
SELECT name, id from artist;
SELECT name, id from partner;
SELECT name, id from gene;
INSERT INTO artwork (title, artist_id, category, date, thumbnail_url, partner_id)
VALUES (:title, :artist_id, :category, :date, :thumbnail_url, :partner_id);

# NOTE: since an arbitrary number of genes can be selected, this query will be run with every selected gene (each iteratively substituted into the :selected_gene_id_i variable)
INSERT INTO artwork_gene (artwork_id, gene_id)
VALUES ((SELECT id FROM artwork where title=:title and artist_id = :artist_id and date = :date), :selected_gene_id_i);

# to update partner
SELECT name, region FROM partner;

UPDATE artwork SET partner_id = :pid_selected
WHERE id = :aid_to_move;

# Display Artwork SELECT query
SELECT id, title, thumbnail_url, artist_name, date, category, partner_name, GROUP_CONCAT(distinct gene_name SEPARATOR ', ') as gene_names_comb FROM (
	SELECT a.id, a.title, ar.name as artist_name, a.thumbnail_url, a.date, a.category, g.name as gene_name, p.name as partner_name
	FROM artwork a left join artwork_gene ag on a.id=ag.artwork_id 
	left join gene g on ag.gene_id=g.id
	left join partner p on a.partner_id = p.id
	left join artist ar on a.artist_id=ar.id) a
GROUP BY id, title, thumbnail_url, artist_name, date, category, partner_name;


