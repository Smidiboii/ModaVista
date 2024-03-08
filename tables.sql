<<<<<<< HEAD
CREATE TABLE Client (
=======
CREATE TABLE Clients (
>>>>>>> 2d4fb5c71b95f0c1d7ab7320e6523378857ccca5
    ClientID INT AUTO_INCREMENT PRIMARY KEY,
    Prenom VARCHAR(200) NOT NULL,
    Nom VARCHAR(200) NOT NULL,
    Email VARCHAR(200) NOT NULL,
    Mdp VARCHAR(200) NOT NULL,
    TelNum VARCHAR(12) NOT NULL,
    Adresse VARCHAR(200) NOT NULL,
    DateCreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Collection (
    CollectionID INT AUTO_INCREMENT PRIMARY KEY,
    NomCollection VARCHAR(200) NOT NULL
);

CREATE TABLE Produit (
    ProduitID int AUTO_INCREMENT PRIMARY KEY,
    Nom varchar(200) not null,
    TypeProduit varchar(200) not null,
    Marque varchar(200) not null,
    Taille varchar(10) not null,
    Prix DECIMAL (10,2) not null,
<<<<<<< HEAD
    CollectionID int not null
=======
    CollectionID int not null,
    FOREIGN KEY (CollectionID) REFERENCES Collection(CollectionID)
>>>>>>> 2d4fb5c71b95f0c1d7ab7320e6523378857ccca5
);
create table Panier( 
    PanierID int AUTO_INCREMENT PRIMARY KEY,
    ClientID int not null,
    ProduitID int not null,
    PrixTotal DECIMAL(10,2) not null,
<<<<<<< HEAD
    PromoCode varchar(10)
=======
    PromoCode varchar(10),
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (ProduitID) REFERENCES Produit(ProduitID)
>>>>>>> 2d4fb5c71b95f0c1d7ab7320e6523378857ccca5
);
create table Commande (
    OrderID int AUTO_INCREMENT PRIMARY KEY,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PanierID int not null,
<<<<<<< HEAD
    Etat varchar(200) not null
);
create table MethodePayement (
    ClientID int AUTO_INCREMENT PRIMARY KEY,
    CarteCredit int not null,
    CVC int not null,
    DateExpiration date not null,
    TypeDeCarte varchar(10) not null
=======
    Etat varchar(200) not null,
    FOREIGN KEY (PanierID) REFERENCES Panier(PanierID)
);
create table MethodePayement (
    ClientID int,
    CarteCredit int not null,
    CVC int not null,
    DateExpiration date not null,
    TypeDeCarte varchar(10) not null,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID)
>>>>>>> 2d4fb5c71b95f0c1d7ab7320e6523378857ccca5
);
create table CodePromo (
    CodeID int AUTO_INCREMENT PRIMARY KEY,
    PourcentageRabais int not null,
    Expiration date not null
);
<<<<<<< HEAD
/*CREATE TABLE `PRODUIT` (
    `PRODUCTID` INT NOT NULL,
    `NAME` VARCHAR(200) NOT NULL,
    `TYPEPRODUIT` VARCHAR(200) NOT NULL,
    `MARQUE` VARCHAR(200) NOT NULL,
    `TAILLE` VARCHAR(10) NOT NULL,
    `PRICE` DECIMAL(10, 2) NOT NULL,
    `COLLECTIONID` INT NOT NULL,
    PRIMARY KEY (`PRODUCTID`),
    CONSTRAINT `UC_PRODUIT_NAME` UNIQUE (`NAME`)
);*/



/*CREATE TABLE `PANIER` (
    `PANIERID` INT NOT NULL,
    `CLIENTID` INT NOT NULL,
    `PRODUITID` INT NOT NULL,
    `PRIXTOTAL` DECIMAL(10, 2) NOT NULL,
    `PROMOCODE` VARCHAR(10),
    PRIMARY KEY (`PANIERID`)
);*/


/*
CREATE TABLE `COMMANDE` (
    `ORDERID` INT NOT NULL,
    `ORDERDATE` DATETIME NOT NULL,
    `PANIERID` INT NOT NULL,
    `ETAT` VARCHAR(200) NOT NULL,
    PRIMARY KEY ( `ORDERID` )
);*/


/*
CREATE TABLE `METHODEPAYEMENT` (
    `CLIENTID` INT NOT NULL,
    `CARTECREDIT` INT NOT NULL,
    `CVC` INT NOT NULL,
    `DATEEXPIRATION` INT NOT NULL,
    `TYPE` VARCHAR(10) NOT NULL
);*/


/*
CREATE TABLE `CODEPROMO` (
    `CODEID` VARCHAR(10) NOT NULL,
    `POURCENTAGERABAIS` INT NOT NULL,
    `EXPIRATION` DATETIME NOT NULL,
    PRIMARY KEY ( `CODEID` )
);*/

/*
ALTER TABLE `PRODUIT` ADD CONSTRAINT `FK_COMMANDE_COLECTIONID` FOREIGN KEY(`COLLECTIONID`) REFERENCES `COLLECTION` (`COLLECTIONID`);

ALTER TABLE `COMMANDE` ADD CONSTRAINT `FK_COMMANDE_PANIERID` FOREIGN KEY(`PANIERID`) REFERENCES `PANIER` (`PANIERID`);

ALTER TABLE `PANIER` ADD CONSTRAINT `FK_PANIER_CLIENTID` FOREIGN KEY(`CLIENTID`) REFERENCES `CLIENT` (`CLIENTID`);

ALTER TABLE `PANIER` ADD CONSTRAINT `FK_PANIER_PRODUITID` FOREIGN KEY(`PRODUITID`) REFERENCES `PRODUIT` (`PRODUCTID`);

ALTER TABLE `PANIER` ADD CONSTRAINT `FK_PANIER_PROMOCODE` FOREIGN KEY(`PROMOCODE`) REFERENCES `CODEPROMO` (`CODEID`);

ALTER TABLE `INVENTAIRE` ADD CONSTRAINT `FK_INVENTAIRE_PRODUCTID` FOREIGN KEY(`PRODUCTID`) REFERENCES `PRODUIT` (`PRODUCTID`);

ALTER TABLE `METHODEPAYEMENT` ADD CONSTRAINT `FK_METHODEPAYEMENT_CLIENTID` FOREIGN KEY(`CLIENTID`) REFERENCES `CLIENT` (`CLIENTID`);
*/
=======

-- Insertion de Collections et Produits
INSERT INTO Collection (NomCollection) VALUES ('ETE 2024'), ('Hiver 2024'), ('Saint-Valentin 2024');

INSERT INTO Produit (Nom, TypeProduit, Marque, Taille, Prix, CollectionID) VALUES
('T-shirt blanc', 'T-shirt', 'Zara', 'M', 19.99, 1),
('Robe fleurie', 'Robe', 'H&M', 'S', 29.99, 1),
('Short en jean', 'Short', 'Levis', 'L', 39.99, 1),
('Veste en cuir', 'Veste', 'Gucci', 'XL', 499.99, 1),
('Pull en laine', 'Pull', 'Lacoste', 'M', 59.99, 2),
('Pantalon noir', 'Pantalon', 'Armani', 'S', 79.99, 2),
('Coton ouaite', 'Veste', 'Armando', 'M', 89.99, 2),
('Jeans Futuristes', 'Pantalon', 'CyberUrban', 'M', 149.99, 2),
('Chemise rouge', 'Chemise', 'Tommy Hilfiger', 'M', 49.99, 3),
('Jupe plissée', 'Jupe', 'Dior', 'S', 99.99, 3),
('Collier en or', 'Bijou', 'Tiffany', 'U', 199.99, 3);
>>>>>>> 2d4fb5c71b95f0c1d7ab7320e6523378857ccca5
