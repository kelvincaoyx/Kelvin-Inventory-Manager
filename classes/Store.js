/**
 * This class inherits from the Products class and creates Store objects
 * 
 * @class
 */
class Store extends Products {

  /**
   * The constructor for Store objects
   * @constructor
   * @param {string} productName - The name of the product
   * @param {string} productCode - The product code
   * @param {number} stock - The amount of product stock
   * @param {number} price - The price of the product
   * @param {boolean} restocking - The restocking status of the product
   * @param {boolean} discontinued - The status of the product
   * @param {string} store - The store that the product is located at
   * @param {string} aisle - The aisle where the product is stored
   * @param {string} lastUpdated - The last time the information for this product was updated
   */
    constructor(productName, productCode, stock, price, restocking, discontinued, store, aisle, lastUpdated){
      super(productName, productCode, stock);
      this.store = store;
      this.aisle = aisle;
      this.price = price;
      this.lastUpdated = lastUpdated;
      this.restocking = restocking;
      this.discontinued = discontinued;
    };
  
  /**
   * This function updates the lastUpdated variable with the current date.
   */
    updated(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) {
        dd='0'+dd;
      }
      if(mm<10){
        mm='0'+mm;
      } 
      var lastUpdate = mm +'/'+ dd + '/' + yyyy ;
      this.lastUpdated = lastUpdate
    };
    
  /**
   * This function allows the user to update the location of a product
   * 
   * @param {string} updatedAisle - The new aisle for the product.
   */
    moveProduct(updatedAisle){
      this.aisle = updatedAisle
    };
  
  /**
   * This function lets the user change the price of a product.
   * 
   * @param {number} updatedPrice - The new price for the product.
   */
    newPrice(updatedPrice){
      this.price = updatedPrice
    };

 /**
   * This function lets the user order a restock of a product.
   */
    restock(){
      if (this.discontinued == false)
        this.restocking = true;
    };

  /**
   * This function lets the user discontinue a product.
   */
    discontinue(){
      this.discontinued = true;
    };
    
};
  