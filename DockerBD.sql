MYSQL> CREATE TABLE `CLIENT` (
`CLIENTID` INT NOT NULL,
`PRENOM` VARCHAR(200) NOT NULL,
`NOM` VARCHAR(200) NOT NULL,
`EMAIL` VARCHAR(200) NOT NULL,
`MDP` VARCHAR(200) NOT NULL,
`TEL.NUM` VARCHAR(12) NOT NULL,
`ADRESSE` VARCHAR(200) NOT NULL,
`DATECREATION` DATETIME NOT NULL,
PRIMARY KEY (
`CLIENTID`
)
);

/

/

MYSQL> CREATE TABLE `PRODUIT` (
`PRODUCTID` INT NOT NULL,
`NAME` VARCHAR(200) NOT NULL,
`TYPEPRODUIT` VARCHAR(200) NOT NULL,
`MARQUE` VARCHAR(200) NOT NULL,
`TAILLE` VARCHAR(10) NOT NULL,
`PRICE` DECIMAL(10, 2) NOT NULL,
`COLLECTIONID` INT NOT NULL,
PRIMARY KEY (`PRODUCTID`),
CONSTRAINT `UC_PRODUIT_NAME` UNIQUE (`NAME`)
);

/

/

MYSQL> CREATE TABLE `METHODEPAYEMENT` (
`CLIENTID` INT NOT NULL,
`CARTECREDIT` INT NOT NULL,
`CVC` INT NOT NULL,
`DATEEXPIRATION` INT NOT NULL,
`TYPE` VARCHAR(10) NOT NULL
);

/

/

MYSQL> CREATE TABLE `PANIER` (
`PANIERID` INT NOT NULL,
`CLIENTID` INT NOT NULL,
`PRODUITID` INT NOT NULL,
`PRIXTOTAL` DECIMAL(10, 2) NOT NULL,
`PROMOCODE` VARCHAR(10),
PRIMARY KEY (`PANIERID`)
);

/

/

MYSQL> CREATE TABLE `COMMANDE` (
`ORDERID` INT NOT NULL,
`ORDERDATE` DATETIME NOT NULL,
`PANIERID` INT NOT NULL,
`ETAT` VARCHAR(200) NOT NULL,
PRIMARY KEY (
`ORDERID`
)
);

/

/

MYSQL> CREATE TABLE `CODEPROMO` (
`CODEID` VARCHAR(10) NOT NULL,
`POURCENTAGERABAIS` INT NOT NULL,
`EXPIRATION` DATETIME NOT NULL,
PRIMARY KEY (
`CODEID`
)
);

MYSQL> CREATE TABLE `COLLECTION` (
`COLLECTIONID` INT NOT NULL,
`NOMCOLLECTION` INT NOT NULL,
PRIMARY KEY (
`COLLECTIONID`
)
);

/

/

ALTER TABLE `PRODUIT` ADD CONSTRAINT `FK_COMMANDE_COLECTIONID` FOREIGN KEY(`COLLECTIONID`) REFERENCES `COLLECTION` (`COLLECTIONID`);

ALTER TABLE `COMMANDE` ADD CONSTRAINT `FK_COMMANDE_PANIERID` FOREIGN KEY(`PANIERID`) REFERENCES `PANIER` (`PANIERID`);

ALTER TABLE `PANIER` ADD CONSTRAINT `FK_PANIER_CLIENTID` FOREIGN KEY(`CLIENTID`) REFERENCES `CLIENT` (`CLIENTID`);

ALTER TABLE `PANIER` ADD CONSTRAINT `FK_PANIER_PRODUITID` FOREIGN KEY(`PRODUITID`) REFERENCES `PRODUIT` (`PRODUCTID`);

ALTER TABLE `PANIER` ADD CONSTRAINT `FK_PANIER_PROMOCODE` FOREIGN KEY(`PROMOCODE`) REFERENCES `CODEPROMO` (`CODEID`);

ALTER TABLE `INVENTAIRE` ADD CONSTRAINT `FK_INVENTAIRE_PRODUCTID` FOREIGN KEY(`PRODUCTID`) REFERENCES `PRODUIT` (`PRODUCTID`);

ALTER TABLE `METHODEPAYEMENT` ADD CONSTRAINT `FK_METHODEPAYEMENT_CLIENTID` FOREIGN KEY(`CLIENTID`) REFERENCES `CLIENT` (`CLIENTID`);