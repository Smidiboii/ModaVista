import mongoose from 'mongoose';

// Define client schema
const clientSchema = new mongoose.Schema({
    Prenom: { type: String, required: true },
    Nom: { type: String, required: true },
    Email: { type: String, required: true },
    Mdp: { type: String, required: true },
    TelNum: { type: String, required: true },
    Adresse: { type: String, required: true },
    DateCreation: { type: Date, default: Date.now }
});

// Define collection schema
const collectionSchema = new mongoose.Schema({
    NomCollection: { type: String, required: true }
});

// Define product schema
const produitSchema = new mongoose.Schema({
    Nom: { type: String, required: true },
    Description: { type: String, required: true },
    TypeProduit: { type: String, required: true },
    Marque: { type: String, required: true },
    Taille: { type: String, required: true },
    Prix: { type: Number, required: true },
    CollectionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true }
});

// Define cart schema
const panierSchema = new mongoose.Schema({
    ClientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    ProduitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
    PrixTotal: { type: Number, required: true },
    PromoCode: { type: String }
});

// Define order schema
const commandeSchema = new mongoose.Schema({
    PanierID: { type: mongoose.Schema.Types.ObjectId, ref: 'Panier', required: true },
    Etat: { type: String, required: true },
    OrderDate: { type: Date, default: Date.now }
});

// Define payment method schema
const methodePayementSchema = new mongoose.Schema({
    ClientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    CarteCredit: { type: Number, required: true },
    CVC: { type: Number, required: true },
    DateExpiration: { type: Date, required: true },
    TypeDeCarte: { type: String, required: true }
});

// Define promo code schema
const codePromoSchema = new mongoose.Schema({
    PourcentageRabais: { type: Number, required: true },
    Expiration: { type: Date, required: true }
});

// Create models
const Client = mongoose.model('Client', clientSchema);
const Collection = mongoose.model('Collection', collectionSchema);
const Produit = mongoose.model('Produit', produitSchema);
const Panier = mongoose.model('Panier', panierSchema);
const Commande = mongoose.model('Commande', commandeSchema);
const MethodePayement = mongoose.model('MethodePayement', methodePayementSchema);
const CodePromo = mongoose.model('CodePromo', codePromoSchema);

export { Client, Collection, Produit, Panier, Commande, MethodePayement, CodePromo };