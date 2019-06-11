
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
VALUES ("Claude Monet", "Paris, France", 1840, 1926, "French painter, a founder of French Impressionist painting and practitioner of the movement's philosophy of expressing one's perceptions before nature, especially as applied to plein air landscape painting"),
("Eugene Delacroix", "Ile-de-France, France", 1798, 1863, "French Romantic artist regarded from the outset of his career as the leader of the French Romantic school."),
("Leonardo da Vinci", "Vinci, Republic of Florence", 1452, 1519, "Italian polymath of the Renaissance whose areas of interest included drawing, painting, sculpting, architecture, science, music, mathematics, literature, anatomy, geology, astronomy, botany, and cartography."),
("Vincent van Gogh", "Auvers-sur-Oise, France", 1853, 1890, "Dutch post-impressionist painter, famous for his landscapes, still lifes, portraits, and self-portraits often characterised by bold colours and dramatic, impulsive and expressive brushwork."),
("Piet Mondrian", "Amersfoort, Netherlands", 1872, 1944, "Dutch painter and theoretician, known for being one of the pioneers of 20th century abstract art. His art transitioned from figurative painting to an increasingly abstract style reduced to simple geometric elements"),
("Gian Lorenzo Bernini", "Naples, Kingdom of Naples", 1598, 1690, "Italian sculptor and architect. While a major figure in the world of architecture, he was, also and even more prominently, the leading sculptor of his age, credited with creating the Baroque style of sculpture"),
("Pablo Picasso", "Malaga, Spain", 1881, 1973, " Spanish painter, sculptor, printmaker, ceramicist, stage designer, poet and playwright. Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement");

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
VALUES ("Cathedral Notre-Dame de Paris", "Museum", "contact@notre-dame.com", "France"),
("The Louvre", "Museum", "support@louvre.com", "France"),
("The Metropolitan Museum of Art", "Museum", "met@met.com", "USA"),
("Francis Pinault", "Personal Collector", "", "France"),
("Musee D'Orsay", "Museum", "contact@notre-dame.com", "France"),
("Museum of Modern Art", "Museum", "contact@moma.com", "USA");

#artist_partner table and sample data inserted
CREATE TABLE `artist_partner` (
	`artist_id` int(11) NOT NULL,
	`partner_id` int(11) NOT NULL,
	PRIMARY KEY (`artist_id`, `partner_id`),
	FOREIGN KEY (`artist_id`) REFERENCES artist (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`partner_id`) REFERENCES partner (`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO artist_partner (artist_id, partner_id)
VALUES (1, 2), (2, 2), (3, 2), (4, 3), (5, 4), (4, 5), (6, 2), (7, 6);


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
("Bain a la Grenouillere", 1, "Oil on Canvas", 1869, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/La_Grenouill%C3%A8re_MET_DT833.jpg/600px-La_Grenouill%C3%A8re_MET_DT833.jpg", 2),
("Liberty Leading the People", 2, "Oil on Canvas", 1830, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1920px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg", 2),
("Saint John the Baptist", 3, "Oil on Canvas", 1513, "https://www.leonardodavinci.net/images/gallery/st-john-the-baptist.jpg", 2),
("Portrait of Theo", 4, "Oil on Canvas", 1887, "https://upload.wikimedia.org/wikipedia/commons/9/91/Vincent_van_Gogh%2C_Portrait_of_Theo_van_Gogh_%281887%29.jpg", 3),
("Tableau Losangique II", 5, "Oil on Canvas", 1990, "https://static1.squarespace.com/static/56733cf4841aba5776123355/t/58e309189f74565ac26d9040/1491357867545/?format=1500w", 4),
("The Starry Night", 4, "Oil on Canvas", 1889, "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1513px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", 5),
("The Church at Auvers", 4, "Oil on Canvas", 1890, "https://www.vincentvangogh.org/images/paintings/the-church-at-auvers.jpg", 5),
("Sleeping Hermaphroditus", 6, "Marble Sculpture", 1620, "https://upload.wikimedia.org/wikipedia/commons/6/6c/Hermafrodita_2.JPG", 2),
("Ma Jolie", 7, "Oil Painting", 1912, "https://www.moma.org/learn/moma_learning/_assets/www.moma.org/wp/moma_learning/wp-content/uploads/2012/07/Picasso.-Ma-Jolie-255x395.jpg", 6);

# gene table and sample data inserted
CREATE TABLE `gene` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	PRIMARY KEY (`id`),
	CONSTRAINT UC_gene UNIQUE (name)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO gene (name, description)
VALUES
('Impressionism','19th-century art movement characterized by relatively thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light, ordinary subject matter, movement as a crucial element of human perception, and unusual visual angles'),
('French Romanticism','Often characterized by loose, flowing brushstrokes and brilliant colors comparable to the style of Baroque artist Rubens; viewed as a means of making the presence of the artist’s thoughts and emotions apparent'),
('High Renaissance', ' the culmination of the varied means of expression and various advances in painting technique, such as linear perspective, the realistic depiction of physical and psychological features, and the manipulation of light and darkness'),
('Post-Impressionism', 'derived from Impressionism with use of vivid colors, thick application of paint, and real-life subject matter, but more inclined to emphasize geometric forms, distort form for expressive effect, and use arbitrary color'),
('Abstract Art', 'use of a visual language of shape, form, color and line to create a composition which may exist with a degree of independence from visual references in the world'),
('Cubism', 'subject depiction using multitude of viewpoints to represent the subject in a greater context; objects are analyzed, broken up and reassembled in an abstracted form instead of depicting objects from a single viewpoint'),
('De Stijl', 'pure abstraction and universality by a reduction to the essentials of form and colour; simplification of visual compositions to vertical and horizontal, often using only black, white and primary colors'),
('Baroque', 'highly ornate and often extravagant style of architecture, music, dance, painting, sculpture and other arts that flourished in Europe from the early 17th until the mid-18th century');

# artwork_gene table and sample data inserted
CREATE TABLE `artwork_gene` (
	`artwork_id` int(11) NOT NULL,
	`gene_id` int(11) NOT NULL,
	PRIMARY KEY(`artwork_id`, `gene_id`),
	FOREIGN KEY (`artwork_id`) REFERENCES artwork (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`gene_id`) REFERENCES gene (`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO artwork_gene VALUES
(1,1), (2,2), (3, 3), (4, 4), (6, 4), (7, 4), (5, 5), (5, 6), (5, 7), (8, 8), (9, 6);
