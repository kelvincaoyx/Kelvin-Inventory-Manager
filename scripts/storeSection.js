/*
-------------------------------------------------------------------------------------------------------------------
Name:        storeSection.js
Purpose:     Practice with objects, inheritance, files, conversion of datatypes and one-dimensional arrays of objects

Author:      Kelvin Cao (629937)
Created:     07-Dec-2020
Updated:     14-Dec-2020
--------------------------------------------------------------------------------------------------------------------
*/
var productObjects = [];

//Access to html elements
const showProductsButtonActivate = document.getElementById("showProductsButton");
const restockAllButtonActivate = document.getElementById("restockAll");
const restockAllWith0StockButtonActivate = document.getElementById("restockAllWith0Stock");
const addStockButtonActivate = document.getElementById("addStock");
const removeStockButtonActivate = document.getElementById("removeStock");
const changePriceButtonActivate = document.getElementById("changePrice");
const changeAisleButtonActivate = document.getElementById("changeAisle");
const deleteButtonActivate = document.getElementById("delete");
const discontinueButtonActivate = document.getElementById("discontinue");
const productFormActivate = document.getElementById("productFormButton");
const downloadProductButtonActivate = document.getElementById("downloadProductButton");
const fileProductButtonActivate = document.getElementById("fileProduct");
const fullTable = document.getElementById("table")

//Creating elements for the table
const productLink = document.createElement('a');
const productTable = document.createElement("Table");
const numberHeading =  document.createElement("th");
const productNameHeading =  document.createElement("th");
const productCodeHeading =  document.createElement("th");
const stockHeading =  document.createElement("th");
const priceHeading =  document.createElement("th");
const restockingHeading =  document.createElement("th");
const discontinuedHeading =  document.createElement("th");
const storeHeading =  document.createElement("th");
const aisleHeading =  document.createElement("th");
const lastUpdatedHeading =  document.createElement("th");

//Adds info to the headers
numberHeading.innerHTML = "Number";
productNameHeading.innerHTML = "Product Name";
productCodeHeading.innerHTML = "Product Code";
stockHeading.innerHTML = "Stock";
priceHeading.innerHTML = "Price";
restockingHeading.innerHTML = "Restocking";
discontinuedHeading.innerHTML = "Discontinued";
storeHeading.innerHTML = "Store";
aisleHeading.innerHTML = "Aisle #";
lastUpdatedHeading.innerHTML = "last Updated";

//adds headers to the main table
productTable.appendChild(numberHeading);
productTable.appendChild(productNameHeading);
productTable.appendChild(productCodeHeading);
productTable.appendChild(stockHeading);
productTable.appendChild(priceHeading);
productTable.appendChild(restockingHeading);
productTable.appendChild(discontinuedHeading);
productTable.appendChild(storeHeading);
productTable.appendChild(aisleHeading);
productTable.appendChild(lastUpdatedHeading);

//For reading files
const reader = new FileReader;

/**
 * This function creates a table filled with the products
 */
function refreshTable(){
  while (productTable.rows.length > 0){
    productTable.deleteRow(0);
  };
  for (var i = 0; i < productObjects.length; i++){
    var row = document.createElement("tr");
    var number = document.createElement("td");
    var productName = document.createElement("td");
    var productCode = document.createElement("td");
    var stock = document.createElement("td");
    var price = document.createElement("td");
    var restocking = document.createElement("td");
    var discontinued = document.createElement("td");
    var store = document.createElement("td");
    var aisle = document.createElement("td");
    var lastUpdated = document.createElement("td");

    number.innerHTML = i;
    productName.innerHTML = productObjects[i].productName;
    productCode.innerHTML = productObjects[i].productCode;
    stock.innerHTML = productObjects[i].stock;
    price.innerHTML = "$" + productObjects[i].price;
    restocking.innerHTML = productObjects[i].restocking;
    discontinued.innerHTML = productObjects[i].discontinued;
    store.innerHTML = productObjects[i].store;
    aisle.innerHTML = productObjects[i].aisle;
    lastUpdated.innerHTML = productObjects[i].lastUpdated;

    row.appendChild(number);
    row.appendChild(productName);
    row.appendChild(productCode);
    row.appendChild(stock);
    row.appendChild(price);
    row.appendChild(restocking);
    row.appendChild(discontinued);
    row.appendChild(store);
    row.appendChild(aisle);
    row.appendChild(lastUpdated);

    productTable.appendChild(row);
    
  };
  fullTable.appendChild(productTable);
};

/**
 * Takes in a long string from a text document, seperates the data and then adds the information to the product object array
 * 
 * @param {string} newProductSpreadSheet - A very long string that can be turned into product information
 */
function updateProductInfo(newProductSpreadSheet){
  let updatedProducts = [];
  for (let i = 0; i < newProductSpreadSheet.length; i++){
    productSpeadSheet = newProductSpreadSheet[i].split("~");
    productName = productSpeadSheet[1];
    productCode = productSpeadSheet[2];
    stock = productSpeadSheet[3];
    price = productSpeadSheet[4];
    restocking = productSpeadSheet[5];
    discontinued = productSpeadSheet[6];
    store = productSpeadSheet[7];
    aisle = productSpeadSheet[8];
    lastUpdated = productSpeadSheet[9];
    newProductSheet = new Store(productName, productCode, Number(stock), Number(price), restocking, discontinued, store, aisle, lastUpdated);
    updatedProducts.push(newProductSheet);
    refreshTable();
  };
  return updatedProducts;
};


/**
 * Generates a sample array for the table
 */
for (var i = 0; i < 10; i++){
  let productName = ['Xbox', 'Playstation', 'Rtx 3060 ti', 'RX 5700 xt', 'RGB fans', '5600x', 'HP notebook', 'Meshify C', 'i9 9900k', 'Ergonomic Chair'];
  let productCode = ['xboxjdkjudje', 'jsdu3bs8jd3j', 'slkj3hdu7fhe', 'sh8djfk3j3je', '2kjhd8hbedk3', 'jhd8dds3h8su', 'dhy7ejf9cbs8', 'd8djendsdh8d', 'd9fb3bdysdrn', '3djsk9csdjdk'];
  let stock = [1, 2, 0, 3, 8, 3, 0, 7, 4, 0];
  let price = [600, 600, 600, 500, 120, 300, 500, 130, 469, 300];
  let store = ['mississauga', 'toronto', 'niagara', 'brampton', 'New York', 'Toronto', 'Mississauga', 'Quebec', 'Chicago', 'Brampton'];
  let aisle = ['11', '32', 'a4', '32', '38', '31', 'b4', '27', '34', '12'];
  let lastUpdated = ["12/09/2020", "12/08/2020", "12/07/2020", "12/06/2020","12/01/2020","12/02/2020","12/11/2020","12/13/2020","12/01/2020","12/02/2020"]
  let restocking = [false, false, true, false, false, false, false, false, false, false];
  let discontinued = [false, false, false, false, true, false, false, false, true, false];
  let newProduct = new Store(productName[i], productCode[i], stock[i], price[i], restocking[i], discontinued[i], store[i], aisle[i], lastUpdated[i]);
  productObjects.push(newProduct);
};

/**
 * Automatically triggers when the user enters the page.
 * It displays the table of products
 */
refreshTable()

/**
 * Triggers when new product button is pressed
 * It activates several prompts that allows the user to add a product to the table
 */
productFormActivate.addEventListener("click", () => {
  var productName = prompt("Enter product name");
  var productCode = prompt("Enter product code");
  var stock = Number(prompt('Enter stock of this new product'));
  var price = Number(prompt("Enter price of product"));
  var restocking = false;
  var discontinued = false;
  var store = prompt("Enter store")
  var aisle = prompt("Enter aisle that the product will be stored");
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
  var lastUpdated = mm +'/'+ dd + '/' + yyyy ;
  productFormInfo = new Store(productName, productCode, stock, price, restocking, discontinued, store, aisle, lastUpdated);
  productObjects.push(productFormInfo);
  refreshTable();
});

/**
 * Triggers when restock all button is pressed
 * It starts restock process for all products.
 */
restockAllButtonActivate.addEventListener("click", () => {
  for (var i = 0; i < productObjects.length; i++){
    productObjects[i].restock();
    productObjects[i].updated();
  }
  refreshTable()
});

/**
 * Triggers when restock all with no stock button is pressed
 * It starts restock process for all products that has no stock.
 */
restockAllWith0StockButtonActivate.addEventListener("click", () => {
  for (var i = 0; i < productObjects.length; i++){
    if (productObjects[i].noStock()){
      productObjects[i].restock();
      productObjects[i].updated();
    }   
  }
  refreshTable()
});

/**
 * Triggers when add stock button is pressed
 * It give a prompt that allows the user to add stock to the inventory manager
 */
addStockButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var addedStock = Number(prompt("How much Stock of "+ productObjects[number].productName + " are you adding?"));
  productObjects[number].addStock(addedStock) 
  productObjects[number].updated();
  refreshTable();
});

/**
 * Triggers when take out stock button is pressed
 * It give a prompt that allows the user to report sold stock
 */
removeStockButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var removedStock = Number(prompt("How much Stock of " + productObjects[number].productName + " has been used?"));
  productObjects[number].removeStock(removedStock) 
  productObjects[number].updated();
  refreshTable();
});

/**
 * Triggers when change price button is pressed
 * It give a prompt that allows the user to change the price of a product
 */
changePriceButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var newPriceOfObject = Number(prompt("What is the new price of " + productObjects[number].productName + " ?"));
  productObjects[number].newPrice(newPriceOfObject) 
  productObjects[number].updated();
  refreshTable()
});

/**
 * Triggers when change aisle button is pressed
 * It give a prompt that allows the user to change the aisle that the product should be located.
 */
changeAisleButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var newAisleOfObject = prompt("What is the new aisle of " + productObjects[number].productName + " ?");
  productObjects[number].moveProduct(newAisleOfObject) 
  productObjects[number].updated();
  refreshTable()
});

/**
 * Triggers when discontinue button is pressed
 * It allows a user to discontinue a product.
 */
discontinueButtonActivate.addEventListener("click", () => {
  const number = prompt("Which product do you want to discontinue? (enter product number)");
  productObjects[number].discontinue() 
  productObjects[number].updated();
  refreshTable()
});

/**
 * Triggers when delete button is pressed
 * It give a prompt that allows the user to delete a product from the inventory manager
 */
deleteButtonActivate.addEventListener("click", () => {
  const number = prompt("Which product do you want to delete? (enter product number)");
  productObjects.splice(number, 1);
  refreshTable()
});

/**
 * Triggers when the download data button is pressed
 * It automatically downloads the file of products for the user
 */
downloadProductButtonActivate.addEventListener("click", () => {
  var productInformation = ["Number    Product Name     Product Code     Stock   Price     Restocking    Discontinued      Store         Aisle #     Last Updated \n-------------------------------------------------------------------------------------------------------------------------------------------\n"];
  for (var i = 0; i < productObjects.length; i++){
    //adds dashes until the column after product name lines up
    var dash = "-"
    var productNameLength = productObjects[i].productName
    var numberOfCharacters = productNameLength.length
    var needed = 16 - numberOfCharacters
    var dashes = dash.repeat(needed)
    var updatedName = productNameLength + dashes
    
    //add dashes until the row after current location lines up
    var locationLength = productObjects[i].store
    var numberOfLCharacters = locationLength.length
    var lNeeded = 13 - numberOfLCharacters
    var lDashes = dash.repeat(lNeeded)
    var updatedLocationLength = locationLength + lDashes
    
    //add dashes until the row after restocking lines up
    var restockLength = String(productObjects[i].restocking)
    var numberOfRCharacters = restockLength.length
    var rNeeded = 5 - numberOfRCharacters
    var rDashes = dash.repeat(rNeeded)
    var updatedRestockLength = restockLength + rDashes

    //add dashes until the row after discontinued lines up
    var discontinueLength = String(productObjects[i].discontinued)
    var numberOfDCharacters = discontinueLength.length
    var dNeeded = 5 - numberOfDCharacters
    var dDashes = dash.repeat(dNeeded)
    var updatedDiscontinueLength = discontinueLength + dDashes

    //creates dividers so the columns of information match up
    productInformation.push(i +  "--------~" + updatedName + "~" + productObjects[i].productCode + "----~" + String(productObjects[i].stock) + "------~" + String(productObjects[i].price) + "------~" + updatedRestockLength + "--------~" + updatedDiscontinueLength + "------------~" + updatedLocationLength + "~" + productObjects[i].aisle + "---------~" + productObjects[i].lastUpdated + "\n");
  };

 //removes the extra row that was automatically added
 productInformation[productInformation.length - 1] = productInformation[productInformation.length - 1].replace("\n", "")
 
 //Create a link to download a text file and then automatically downloads for you
 var data = new Blob([productInformation.join("")], {type: 'text/plain'});
 productLink.href = window.URL.createObjectURL(data);
 productLink.download = "Store Inventory List.txt";
 productLink.click()
});

/**
 * Triggers when the refresh table of products button is clicked
 * It starts the process of reading through the added text document
 */
showProductsButtonActivate.addEventListener("click", () => {
  reader.readAsText(fileProductButtonActivate.files[0]);
  reader.onload = e => {
    var output = e.target.result;
    //removes the extra dashes I added to create neat columns
    output = output.replace(/-/g, "")
    output = output.split('\n');
    output.splice(0, 2); 
    productObjects = updateProductInfo(output);
    refreshTable()
  };
});

