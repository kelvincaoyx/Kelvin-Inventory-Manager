/**
 * This class is used to create Products objects
 * 
 * @class
 */
//fix
class Inventory{

    /**
  * This is the constructor function for a Products object
  * @constructor
  * @param {string} productName - The name of the product
  * @param {string} productCode - The product code
  * @param {number} stock - The amount of product stock
  */
    constructor(productName, productCode, stock) {
      this.productName = productName;
      this.productCode = productCode;
      this.stock = stock;

    };
  
 
  /**
   * This function lets the user checks if a product needs to be restocked.
   * @returns {bool} - false if there is still stock left
   * @returns {bool} - true if there is no more stock left
   */
    noStock(){
      if (this.stock == 0){
        return true;
      }
      else {
        return false;
      };
    };
  
  /**
   * This function lets the user add stock to a product. Will also tell the system the product was restocked.
   * 
   * @param {number} numberToAdd - The amount of product that is added to the stock
   */
    addStock(numberToAdd){
      this.stock = Number(this.stock) + Number(numberToAdd);
      this.restock = false
    };
  
  /**
   * This function lets the user remove product from the stock.
   * 
   * @param {number} numberToRemove - The amount of product that has been sold.
   */
    removeStock(numberToRemove){
      this.stock = Number(this.stock) - Number(numberToRemove)
      if (this.stock < 0){
        this.stock = 0;
      };
    }
  
};
  
  