CREATE TABLE Client (
    ClientID INT AUTO_INCREMENT PRIMARY KEY,
    Prenom VARCHAR(200) NOT NULL,
    Nom VARCHAR(200) NOT NULL,
    Email VARCHAR(200) NOT NULL,
    Mdp VARCHAR(200) NOT NULL,
    TelNum VARCHAR(12) NOT NULL DEFAULT NULL,
    Adresse VARCHAR(200) NOT NULL DEFAULT NULL,
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
    CollectionID int not null,
    FOREIGN KEY (CollectionID) REFERENCES Collection(CollectionID)
);
create table Panier( 
    PanierID int AUTO_INCREMENT PRIMARY KEY,
    ClientID int not null,
    ProduitID int not null,
    PrixTotal DECIMAL(10,2) not null,
    PromoCode varchar(10),
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (ProduitID) REFERENCES Produit(ProduitID)
);
create table Commande (
    OrderID int AUTO_INCREMENT PRIMARY KEY,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PanierID int not null,
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
);
create table CodePromo (
    CodeID int AUTO_INCREMENT PRIMARY KEY,
    PourcentageRabais int not null,
    Expiration date not null
);

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
