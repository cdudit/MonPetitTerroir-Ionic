import { Coordinates } from "@ionic-native/geolocation/ngx";

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

    /**
     * Localisation
     */
    geoloc: Coordinates;
}