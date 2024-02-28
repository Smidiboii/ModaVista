CREATE TABLE Clients (
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
    Description varchar(500) not null,
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