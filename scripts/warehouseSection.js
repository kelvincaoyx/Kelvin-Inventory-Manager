/*
----------------------------------------------------------------------------------------------
Name:        warehouseSection.js
Purpose:     Practice with objects, inheritance, files, conversion of datatypes and one-dimensional arrays of objects

Author:      Kelvin Cao (629937)
Created:     07-Dec-2020
Updated:     14-Dec-2020
----------------------------------------------------------------------------------------------
*/
var warehouseObjects = [];

//Access to html Buttons
const showPalletsButtonActivate = document.getElementById("showPalletsButton");
const palletFormActivate = document.getElementById("palletFormButton");
const deletePalletButtonActivate = document.getElementById("deletePalletButton");
const addPalletButtonActivate = document.getElementById("addPalletButton");
const removePalletButtonActivate = document.getElementById("removePalletButton");
const requestPalletButtonActivate = document.getElementById("requestPalletButton");
const updatePalletButtonActivate = document.getElementById("updatePalletButton");
const updateDestinationPalletButtonActivate = document.getElementById("updateDestinationPalletButton");
const downloadPalletButtonActivate = document.getElementById("downloadPalletButton");
const fileButtonActivate = document.getElementById("file");
const warehouseTable = document.getElementById("warehouseTable")
const changePalletButtonActivate = document.getElementById("changePalletButton")

//creating elements for table and a link for the download
const link = document.createElement('a');
const palletTable = document.createElement("Table");
const numbersHeading =  document.createElement("th");
const productNamesHeading =  document.createElement("th");
const productCodesHeading =  document.createElement("th");
const stocksHeading =  document.createElement("th");
const palletSizeHeading =  document.createElement("th");
const numberOfProductsHeading =  document.createElement("th");
const currentLocationHeading =  document.createElement("th");
const shippingDestinationHeading =  document.createElement("th");

//Adding info into the headers
numbersHeading.innerHTML = "Number";
productNamesHeading.innerHTML = "Product Name";
productCodesHeading.innerHTML = "Product Code";
stocksHeading.innerHTML = "# of Pallets";
palletSizeHeading.innerHTML = "Stock per pallet";
numberOfProductsHeading.innerHTML = "Total # of products";
currentLocationHeading.innerHTML = "Current Location";
shippingDestinationHeading.innerHTML = "Shipping Destination";

//Adding the headers into the main table
palletTable.appendChild(numbersHeading);
palletTable.appendChild(productNamesHeading);
palletTable.appendChild(productCodesHeading);
palletTable.appendChild(stocksHeading);
palletTable.appendChild(palletSizeHeading);
palletTable.appendChild(numberOfProductsHeading);
palletTable.appendChild(currentLocationHeading);
palletTable.appendChild(shippingDestinationHeading);

//For reading file
const reader = new FileReader;

/**
 * This function creates a table filled with the warehouse object array
 */

function refreshPalletTable(){
  while (palletTable.rows.length > 0){
    palletTable.deleteRow(0);
  };
  for (var i = 0; i < warehouseObjects.length; i++){
    var row = document.createElement("tr");
    var number = document.createElement("td");
    var productName = document.createElement("td");
    var productCode = document.createElement("td");
    var stock = document.createElement("td");
    var palletSize = document.createElement("td");
    var numberOfProducts = document.createElement("td");
    var numberOfProducts = document.createElement("td");
    var currentLocation = document.createElement("td");
    var shippingDestination = document.createElement("td");

    number.innerHTML = i;
    productName.innerHTML = warehouseObjects[i].productName;
    productCode.innerHTML = warehouseObjects[i].productCode;
    stock.innerHTML = warehouseObjects[i].stock;
    palletSize.innerHTML = warehouseObjects[i].palletSize;
    numberOfProducts.innerHTML = warehouseObjects[i].palletSize * warehouseObjects[i].stock;
    currentLocation.innerHTML = warehouseObjects[i].currentLocation;
    shippingDestination.innerHTML = warehouseObjects[i].shippingDestination;
    
    row.appendChild(number);
    row.appendChild(productName);
    row.appendChild(productCode);
    row.appendChild(stock);
    row.appendChild(palletSize);
    row.appendChild(numberOfProducts);
    row.appendChild(currentLocation);
    row.appendChild(shippingDestination);

    palletTable.appendChild(row);

  };
  warehouseTable.appendChild(palletTable);
};

/**
 * Takes in a long string, seperates the data and then adds the information to the warehouse object array
 * 
 * @param {string} newSpreadSheet - A very long string that can be turned into product information
 */
function updateWarehouseInfo(newSpreadSheet){
  let updatedPallets = [];
  for (let i = 0; i < newSpreadSheet.length; i++){
    palletSpeadSheet = newSpreadSheet[i].split("~");
    productName = palletSpeadSheet[1];
    productCode = palletSpeadSheet[2];
    stock = palletSpeadSheet[3];
    palletSize = palletSpeadSheet[4];
    currentLocation = palletSpeadSheet[6];
    shippingDestination = palletSpeadSheet[7];
    newPalletSheet = new WarehouseProduct(productName, productCode, Number(stock), Number(palletSize), currentLocation, shippingDestination);
    updatedPallets.push(newPalletSheet);
    refreshPalletTable();
  };
  return updatedPallets;
};

/**
 * Generates a sample array of products
 */
for (var i = 0; i < 10; i++){
  let productName = ['Xbox', 'Playstation', 'Rtx 3060 ti', 'RX 5700 xt', 'Led Strips', '5600x', 'HP notebook', 'Meshify C', 'i9 9900k', 'Ergonomic Chair'];
  let productCode = ['xboxjdkjudje', 'jsdu3bs8jd3j', 'slkj3hdu7fhe', 'sh8djfk3j3je', '2kjhd8hbedk3', 'jhd8dds3h8su', 'dhy7ejf9cbs8', 'd8djendsdh8d', 'd9fb3bdysdrn', '3djsk9csdjdk'];
  let stock = ['1', '2', '0', '3', '8', '3', '5', '7', '4', '0'];
  let palletSize = ['21', '12', '30', '23', '48', '23', '15', '27', '24', '10'];
  let currentLocation = ['chicago', 'New York', "N/A",  'in transit', "in transit", "Washington", "Montreal", "In transit", 'Las Vegas', 'N/A'];
  let shippingDestination = ["none", "none",'N/A', 'toronto', 'niagara', 'none', "none", "Toronto", "none", "N/A"];
  let newProduct = new WarehouseProduct(productName[i], productCode[i], stock[i], palletSize[i], currentLocation[i], shippingDestination[i]);
  warehouseObjects.push(newProduct);
};

/**
 * Automatically triggers when the user enters the page.
 * It displays the table of products
 */
refreshPalletTable()

/**
 * Triggers when new product button is pressed
 * It activates several prompts that allows the user to add a product to the table
 */
palletFormActivate.addEventListener("click", () => {
  var productName = prompt("Enter product name");
  var productCode = prompt("Enter product code");
  var stock = Number(prompt('Enter stock of this new product'));
  var palletSize = Number(prompt("Enter # of products per stock"));
  var currentLocation = prompt("Enter current location")
  var shippingDestination = prompt("Enter shippingDestination");
  palletForm = new WarehouseProduct(productName, productCode, stock, palletSize, currentLocation, shippingDestination);
  warehouseObjects.push(palletForm)
  refreshPalletTable()
});

/**
 * Triggers when delete button is pressed
 * It give a prompt that allows the user to delete a product from the inventory manager
 */
deletePalletButtonActivate.addEventListener("click", () => {
  const number = prompt("Which product do you want to delete? (enter product number)");
  warehouseObjects.splice(number, 1);
  refreshPalletTable()
  });

/**
 * Triggers when add pallet button is pressed
 * It give a prompt that allows the user to add a new pallets to the inventory manager
 */
addPalletButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var addedStock = Number(prompt("How much pallets of "+ warehouseObjects[number].productName + " are you adding?"));
  warehouseObjects[number].addStock(addedStock) 
  refreshPalletTable();
});

/**
 * Triggers when remove pallet button is pressed
 * It give a prompt that allows the user to report pallets that have used up
 */
removePalletButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var removedStock = Number(prompt("How many pallets of " + warehouseObjects[number].productName + " has been used?"));
  warehouseObjects[number].removeStock(removedStock) 
  refreshPalletTable();
  });

/**
 * Triggers when request pallet button is pressed
 * It give a prompt that allows the user to request stock for their local store
 */
requestPalletButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var requestedStock = Number(prompt("How much Stock of " + warehouseObjects[number].productName + " do you want?"));
  while (Number(requestedStock) > Number(warehouseObjects[number].stock)){
      var requestedStock = Number(prompt("You are requesting more stock than possible. How much Stock of " + warehouseObjects[number].productName + " do you want?"));
  };
  var requestedDestination = prompt("Where do you want the " + requestedStock + " pallets of " + warehouseObjects[number].productName + " to go?");
  warehouseObjects[number].removeStock(requestedStock)
  
  requestedPallets = new WarehouseProduct(warehouseObjects[number].productName, warehouseObjects[number].productCode, requestedStock, warehouseObjects[number].palletSize, warehouseObjects[number].currentLocation, requestedDestination)
  warehouseObjects.push(requestedPallets)

  if (warehouseObjects[number].stock == 0){
    warehouseObjects[number].currentLocation = "N/A"
    warehouseObjects[number].shippingDestination = "N/A"
  }
  refreshPalletTable()

  });

/**
 * Triggers when update shipping status button is pressed
 * It give a prompt that allows the user to update the shipping status of stock
 */
updatePalletButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var shippingStatus = prompt("What is the shipping status of " + warehouseObjects[number].productName + "?");
  warehouseObjects[number].changeStatus(shippingStatus) 
  refreshPalletTable();
});

/**
 * Triggers when change amount of stock per pallet button is pressed
 * It give a prompt that allows the user to update the amount of stock that can fit on a pallet
 */
changePalletButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var palletNumber = Number(prompt("How much stock of " + warehouseObjects[number].productName + " can fit on 1 pallet?"));
  warehouseObjects[number].changePallet(palletNumber) ;
  refreshPalletTable();
});

/**
 * Triggers when update shipping destination button is pressed
 * It give a prompt that allows the user to change the destination of specified stock
 */
updateDestinationPalletButtonActivate.addEventListener("click", () => {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var shippingDestinationStatus = prompt("What is the new shipping destination of " + warehouseObjects[number].productName + "?");
  warehouseObjects[number].movePallet(shippingDestinationStatus) 
  refreshPalletTable();
});

/**
 * Triggers when the download data button is pressed
 * It automatically downloads the file for the user
 */
downloadPalletButtonActivate.addEventListener("click", () => {
  var palletInformation = ["Number    Product Name     Product Code     # of Pallets  Stock per pallet     Total # of products    Current Location          Shipping Destination \n-------------------------------------------------------------------------------------------------------------------------------------------\n"];
  for (var i = 0; i < warehouseObjects.length; i++){
    //adds dashes until column after product name lines up
    var dash = "-"
    var productNameLength = warehouseObjects[i].productName
    var numberOfCharacters = productNameLength.length
    var needed = 16 - numberOfCharacters
    var dashes = dash.repeat(needed)
    var updatedName = productNameLength + dashes

    //add dashes until column after current location lines up
    var locationLength = warehouseObjects[i].currentLocation
    var numberOfLCharacters = locationLength.length
    var lNeeded = 25 - numberOfLCharacters
    var lDashes = dash.repeat(lNeeded)
    var updatedLocationLength = locationLength + lDashes

    //add dashes until column after Total stock Lines up
    var totalStockLength = String(warehouseObjects[i].palletSize * warehouseObjects[i].stock)
    var numberOfSCharacters = totalStockLength.length
    var sNeeded = 22 - numberOfSCharacters
    var sDashes = dash.repeat(sNeeded)
    var updatedStockLength = totalStockLength + sDashes

    //creates dividers so the columns of information match up
    palletInformation.push(i +  "--------~" + updatedName + "~" + warehouseObjects[i].productCode + "------~" + warehouseObjects[i].stock + "------------~" + warehouseObjects[i].palletSize + "----------------~" + updatedStockLength + '~' + updatedLocationLength + "~" + warehouseObjects[i].shippingDestination + "\n");
  };

  //removes the extra row that was automatically added 
  palletInformation[palletInformation.length - 1] = palletInformation[palletInformation.length - 1].replace("\n", "")

  //creates download link for file and activates the link
  var data = new Blob([palletInformation.join("")], {type: 'text/plain'});
  link.href = window.URL.createObjectURL(data);
  link.download = "Warehouse Inventory List.txt";
  link.click()
});

/**
 * Triggers when the refresh table of products button
 * It starts the process of reading through the added text document
 */
showPalletsButtonActivate.addEventListener("click", () => {
  reader.readAsText(fileButtonActivate.files[0]);
  reader.onload = e => {
    var output = e.target.result;
    //removes the extra dashes I added to create neat columns
    output = output.replace(/-/g, "")
    //removes first two rows
    output = output.split('\n');
    output.splice(0, 2); 
    warehouseObjects = updateWarehouseInfo(output);
    refreshPalletTable()
  };
});
