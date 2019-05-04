-- Query for add a new functionality with colon : character being used to
-- denote the variables that will have data from the backend programming language

INSERT INTO artist (name, hometown, birthday, deathday, biography)
VALUES  (:name, :hometown, :birthday, :deathday, :biography);

INSERT INTO partner (name, type, email, region)
VALUES (:name, :type, :email, :region);

INSERT INTO artist_partner (artist_id, partner_id)
VALUES (:artist_id, :partner_id);

INSERT INTO artwork (title, artist_id, category, medium, date, thumbnail_url, partner_id)
VALUES (:title, :artist_id, :category, :medium, :date, :thumbnail_url, :partner_id);

INSERT INTO gene (id, name, description)
VALUES (:id, :name, :description);

INSERT INTO artwork_gene (artwork_id, gene_id)
VALUES (:artwork_id, :gene_id);
