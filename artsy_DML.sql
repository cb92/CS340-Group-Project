-- Query for add a new functionality with colon : character being used to
-- denote the variables that will have data from the backend programming language


### ADD ARTIST PAGE
INSERT INTO artist (name, hometown, birthday, deathday, biography)
VALUES  (:name, :hometown, :birthday, :deathday, :biography);

### ADD PARTNER PAGE
INSERT INTO partner (name, type, email, region)
VALUES (:name, :type, :email, :region);

### LINK ARTIST/PARTNER PAGE, including SELECT queries to populate toggles
SELECT name from artist;
SELECT name from partner;
INSERT INTO artist_partner (artist_id, partner_id)
VALUES (:artist_id, :partner_id);

### ADD ARTWORK PAGE, including SELECT queries to populate toggles
SELECT name from artist;
SELECT name from partner;
INSERT INTO artwork (title, artist_id, category, medium, date, thumbnail_url, partner_id)
VALUES (:title, :artist_id, :category, :medium, :date, :thumbnail_url, :partner_id);

### ADD GENE PAGE
INSERT INTO gene (id, name, description)
VALUES (:id, :name, :description);


# LINK ARTWORK/GENE PAGE, including SELECT queries to populate toggles
SELECT name from artwork;
SELECT name from gene;
INSERT INTO artwork_gene (artwork_id, gene_id)
VALUES (:artwork_id, :gene_id);


### "Close Museum" page/DELETE partner SQL code, including SELECT to populate
SELECT name, region FROM partner;

UPDATE artwork SET partner_id=NULL
WHERE partner_id = :id_to_delete;

DELETE FROM artist_partner
WHERE partner_id = :id_to_delete;

DELETE FROM partner
WHERE id = :id_to_delete;


### "Creative Difference"/DELETE partner-artist relationship SQL code, including SELECT to populate
SELECT * from artist_partner;

DELETE FROM artist_partner
WHERE partner_id = :pid_to_delete
AND artist_id = :aid_to_delete;


### "Move Artwork"/Move artwork page, includingSELECT queries to populate page
SELECT name, category, medium FROM artwork;
SELECT name, region FROM partner;

UPDATE artwork SET partner_id = :pid_selected
WHERE id = :aid_to_move;


###"Display Artwork" page SELECT query
SELECT a.title, a.thumbnail_url, g.name
FROM artwork a left join artwork_gene ag on a.id=ag.artwork_id 
left join gene g on ag.gene_id=g.id