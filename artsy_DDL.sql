
# Remove Previous tables as neccessary
DROP TABLE IF EXISTS `artwork_gene`;
DROP TABLE IF EXISTS `gene`;
DROP TABLE IF EXISTS `artwork`;
DROP TABLE IF EXISTS `artist_partner`;
DROP TABLE IF EXISTS `partner`;
DROP TABLE IF EXISTS `artist`;


# artist table and sample data inserted
CREATE TABLE `artist` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`hometown` varchar(255),
	`birthday` int(11),
	`deathday` int(11),
	`biography` varchar(255),
	PRIMARY KEY (`id`),
	CONSTRAINT UC_artist UNIQUE (name, birthday)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO artist (name, hometown, birthday, deathday, biography)
VALUES ('Vincent Van Gogh','Zundert',1853, 1890, 'a Dutch post-impressionist painter. He painted Starry night'),
('Michelangelo','Caprese',1475, 1564, 'An Italian sculptor, painter, architect and poet of the High Renaissance. Many consider him to be the greatest artist of all time.'),
('Pablo Picasso','Malaga',1881, 1973, 'a Spanish painter, sculptor and ceramacist, known for his work in Cubism.');


# partner table and sample data inserted
CREATE TABLE `partner` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`type` varchar(255),
	`email` varchar(255),
	`region` varchar(255),
	PRIMARY KEY (`id`),
	CONSTRAINT UC_partner UNIQUE (name, email, region)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO partner (name, type, email, region)
VALUES ('The Met','Museum','met@met.com','North America'),
('The Louvre','Museum','louvre@louvre.com','Europe');

#artist_partner table and sample data inserted
CREATE TABLE `artist_partner` (
	`artist_id` int(11) NOT NULL,
	`partner_id` int(11) NOT NULL,
	PRIMARY KEY (`artist_id`, `partner_id`),
	FOREIGN KEY (`artist_id`) REFERENCES artist (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`partner_id`) REFERENCES partner (`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO artist_partner (artist_id, partner_id)
VALUES (1, 1),(1, 2),(2, 2);


# artwork table and sample data inserted
CREATE TABLE `artwork` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`artist_id` int(11) NOT NULL,
	`category` varchar(255),
	`date` int(11),
	`thumbnail_url` varchar(255),
	`partner_id` int(11),
	PRIMARY KEY (`id`),
	FOREIGN KEY (`artist_id`) REFERENCES artist (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`partner_id`) REFERENCES partner (`id`) ON DELETE SET NULL,
	CONSTRAINT UC_artwork UNIQUE (title, artist_id, date)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO artwork (title, artist_id, category, date, thumbnail_url, partner_id)
VALUES
('The Starry Night',1, 'Painting',1889, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/600px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg', NULL),
('Girl before a Mirror',3, 'Painting',1932, 'https://upload.wikimedia.org/wikipedia/en/6/60/GirlBeforeAMirror.jpg', NULL);



# gene table and sample data inserted
CREATE TABLE `gene` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	PRIMARY KEY (`id`),
	CONSTRAINT UC_gene UNIQUE (name)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO gene (name, description)
VALUES ('Pointilism','lots of points that compose an image'),
('Cubism','Surrealist style that involves cubes to create an image');


# artwork_gene table and sample data inserted
CREATE TABLE `artwork_gene` (
	`artwork_id` int(11) NOT NULL,
	`gene_id` int(11) NOT NULL,
	PRIMARY KEY(`artwork_id`, `gene_id`),
	FOREIGN KEY (`artwork_id`) REFERENCES artwork (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`gene_id`) REFERENCES gene (`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO artwork_gene VALUES
(1,1),(2,2);
