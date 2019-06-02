# Database Group Project
## CS 340, Section 400, Spring 2019
#### Team: SQ Legends
#### Members: Christina Brasco and Amy Suzuki

### Project Description
This project, as part of CS340 at Oregon State University, is an effort to build a web based application to interact with a database with CRUD functionality. 

### Project Outline
We will be making a database using public data (https://developers.artsy.net/v2) on the auction sales of modern artworks. Each auction can be mapped through the relationships between the artists, their work, the partners that purchase the art, and the genre (gene) of each piece. 

### Database Outline
#### Entities

**Artists** (keyed on artist_id, can be retrieved with partner_id, gene_id) - Each creator of a work or works of art are stored in the database with the following attributes:
* **Artist id:** auto incremented ID int, unique to each artist. Must be included and is automatically generated. 
* **Name:** string value containing the name of the artist. Must be included and there is no default value. 
* **Hometown:** string value containing the city and country where the artist was born. There is no default value. 
* **Birthday:** integer value containing the year in which the artist was born. There is no default value. 
* **Deathday:** integer value the year in which the artist died. There is no default value. 
* **Biography:** string value containing a brief description (roughly a paragraph) of their defining characteristics and background. There is no default value. Max length of this string is 2048 characters (roughly 20 standard sentences).

**Partner** (partner_id) - The purchaser of each work of art at an auction (i.e. a Museum); can be recorded in the database prior to their first purchase as well. The database tracks the following attributes of each partner:
* **Partner id:** auto incremented ID int, unique to each partner. Must be included and is automatically generated.
* **Name:** String value with the name of the partner. Must be included and there is no default value
* **Type:** string value that describes the type of each partner (eg.Institution, Individual, etc). There is no default value.
* **Email:** a string value holding the contact email of the partner. Email is not required.
* **Region:** a string value holding the region name of where the partner is located. 

**Artworks** (have a unique ID, can be retrieved with artist_id or partner_id) - A work of art created by an artist, possibly as a part of a collection maintained by a partner. The database tracks the following attributes for an artwork:
* **Artwork ID:** auto incremented ID int, unique to each artwork. Must be included and is automatically generated. 
* **Title:** string representing the title of the artwork. Required field with no default value.
* **Category:** string representing the category of the artwork (ie. “Painting”, “Sculpture”). No default value. 
* **Medium:** string representing the medium of the artwork (ie. “Oil on canvas”, “marble”). No default value.
* **Date:** integer value representing the year of the artwork’s creation. No default value. 
* **Thumbnail:** string representing the URL for the thumbnail image of the artwork. Not explicitly required, although it can be derived from the ID if absent. 

**Gene** (has a unique ID, can be retrieved with artist_id or artwork_id) - a descriptive category of works of art (ie. Pop Art, Bright Colors). Each gene is stored in the database with the following fields:
* **Gene id:** auto incremented ID int of the gene, unique to each gene. Required value without a default. 
* **Name:** a string value holding name of the gene. Required value without a default. 
* **Description:** string value that briefly describes the gene in roughly a paragraph. There is no default value. Max length of this string is 2048 characters (roughly 20 standard sentences).

#### Relationships

**Artists create artworks:** Each artwork is created by a single artist. An artist can create many artworks, but must have at least one artwork to be an artist. So the Artist and Artworks entities are in a one to many relationship.

**Artists allow their work to be displayed by partners:** Artists can allow their work to be displayed by many partners, and a single partner may curate work from several artists. An artist does not need to have work displayed by a partner, and a partner can be registered prior to owning a work art, and therefore does not need to have artist relationships at all times. Therefore, the Artist and Partner entities are in a many to many relationship.

**Artworks have genes:** a single work of art must have at least one but can have several genes, or descriptors, and a single gene can be represented in many works of art. Genes are recorded based off an existing artist/artwork, and therefore must be associated with at least one artwork. Therefore, the Artwork and Gene entities are in a many to many relationship. 

**Partners display artworks:** A partner can have and display many works of art, but a work of art can only be displayed or held by one partner at a time. A partner can be registered prior to owning a work art, and therefore does not need to hold artwork at all times. Artwork does not need to be displayed by a partner. Therefore, the Partner and Artwork entities are in a one to many relationship.
