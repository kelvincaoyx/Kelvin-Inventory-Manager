/**
 * This class inherits from the Products class and creates warehouse objects
 * 
 * @class
 */
//fix
class WarehouseProduct extends Inventory {

  /**
   * The constructor for Warehouse objects
   * @constructor
   * @param {string} productName - The name of the product
   * @param {string} productCode - The product code
   * @param {number} stock - The amount of product stock in terms of pallets
   * @param {number} palletSize - The amount of product per pallet
   * @param {string} currentLocation - The current location of the stock.
   * @param {string} shippingDestination - The destination of the product
   */
    constructor(productName, productCode, stock, palletSize, currentLocation, shippingDestination){
      super(productName, productCode, stock);
      this.palletSize = palletSize;
      this.currentLocation = currentLocation;
      this.shippingDestination = shippingDestination;

    };
  
  /**
   * This function allows the user to update the destination of the product
   * 
   * @param {string} destination - The new destination of the product
   */
  movePallet(destination){
    this.shippingDestination = destination;
  };

  /**
   * This function lets the user change the current location of the product
   * 
   * @param {string} status - The current location of the products
   */
  changeStatus(status){
    this.currentLocation = status;
  };

  /**
   * This function lets the user change the amount of stock per pallet
   * 
   * @param {number} stockPerPallet - The modified amount of stock per 1 pallet
   */
  changePallet(stockPerPallet){
    this.palletSize = stockPerPallet;
  };


};