DROP TABLE IF EXISTS `artist`; 
CREATE TABLE `artist` (
	`id` int(11) NOT NULL AUTO_INCREMENT, 
	`name` varchar(255) NOT NULL,
	`hometown` varchar(255), 
	`birthday` date, 
	`deathday` date, 
	`biography` varchar(255),
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `partner`;
CREATE TABLE `partner` (
	`id` int(11) NOT NULL AUTO_INCREMENT, 
	`name` varchar(255) NOT NULL,
	`type` varchar(255), 
	`email` varchar(255),
	`region` varchar(255),
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `artist_partner`;
CREATE TABLE `artist_partner` (
	`artist_id` int(11) NOT NULL,
	`partner_id` int(11) NOT NULL,
	PRIMARY KEY (`artist_id`, `partner_id`),
	FOREIGN KEY (`artist_id`) REFERENCES artist (`id`),
	FOREIGN KEY (`partner_id`) REFERENCES partner (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `artwork`;
CREATE TABLE `artwork` (
	`id` int(11) NOT NULL AUTO_INCREMENT, 
	`title` varchar(255) NOT NULL,
	`artist_id` int(11) NOT NULL,
	`category` varchar(255),
	`medium` varchar(255),
	`date` date, 
	`thumbnail_url` varchar(255),
	`partner_id` int(11) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`artist_id`) REFERENCES artist (`id`),
	FOREIGN KEY (`partner_id`) REFERENCES partner (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `gene`;
CREATE TABLE `gene` (
	`id` int(11) NOT NULL AUTO_INCREMENT, 
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	PRIMARY KEY ('id')
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `artwork_gene`;
CREATE TABLE `artwork_gene` (
	`artwork_id` int(11) NOT NULL,
	`gene_id` int(11) NOT NULL,
	PRIMARY KEY(`artwork_id`, `gene_id`),
	FOREIGN KEY (`artwork_id`) REFERENCES artwork (`id`),
	FOREIGN KEY (`gene_id`) REFERENCES gene (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


