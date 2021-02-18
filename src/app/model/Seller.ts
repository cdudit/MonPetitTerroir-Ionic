/**
 * Interface concernant un point de vente
 */
export interface Seller {
    /**
    * Id firebase du point de vente
    */
    sellerId: String;

    /**
     * Nom
     */
    name: String;

    /**
     * Code postal
     */
    cp: String;

    /**
     * Ville
     */
    city: String;

    /**
     * Adresse
     */
    address: String;
}