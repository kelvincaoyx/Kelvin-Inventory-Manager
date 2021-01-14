/*
----------------------------------------------------------------------------------------------
Name:        warehouseSection.js
Purpose:     Practice with objects, inheritance, files, conversion of datatypes and one-dimensional arrays of objects

Author:      Kelvin Cao (629937)
Created:     07-Dec-2020
Updated:     15-Jan-2021
----------------------------------------------------------------------------------------------
*/
var warehouseObjects = [];

//Access to html Buttons
const fileButtonActivate = document.getElementById("file");
const warehouseTable = document.getElementById("warehouseTable")

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

function refreshPalletTable(array){
  while (palletTable.rows.length > 0){
    palletTable.deleteRow(0);
  };
  for (var i = 0; i < array.length; i++){
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
    productName.innerHTML = array[i].productName;
    productCode.innerHTML = array[i].productCode;
    stock.innerHTML = array[i].stock;
    palletSize.innerHTML = array[i].palletSize;
    numberOfProducts.innerHTML = array[i].palletSize * array[i].stock;
    currentLocation.innerHTML = array[i].currentLocation;
    shippingDestination.innerHTML = array[i].shippingDestination;
    
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
    refreshPalletTable(warehouseObjects);
  };
  return updatedPallets;
};

/**
 * Takes in array and sorts it by stock using bubble sort
 * 
 * @param {array} array - The array of objects that will be sorted
 * @returns {array} - The array which is sorted by stock
 */
function sortByBNumOfProducts(array) {
  var finished = false;
  while (!finished) {
    finished = true
    for (let i = 0; i < array.length - 1; i++){
      //when getting my empirical data, this line was modified to sort from high to low.
      if (array[i].palletSize * array[i].stock < array[i+1].palletSize * array[i+1].stock) {
        let temp = array[i];
        array[i] = array[i+1];
        array[i + 1] = temp;
        finished = false
      }
    }
  }
  return array;
}

/**
 * Takes in array and sorts it by stock using insertion sort
 * 
 * @param {array} array - The array of objects that will be sorted
 * @returns {array} - The array which is sorted by stock
 */
function sortByINumOfProducts(array){
  for (var i = 1; i < array.length; i++){
    var current = array[i];
    var previous = i - 1;
    while((previous >= 0) && array[previous].palletSize * array[previous].stock > current.palletSize * current.stock){
      array[previous + 1] = array[previous]
      previous--
    }
    array[previous + 1] = current;
  }
  return array
}

/**
 * Finds the inputed product code using linear search.
 * 
 * @param {array} array - The array of objects that will be searched through.
 * @param {number} code - The product code that is going to be found
 * @returns {number} - The index number of the product. If the product isn't found, -1 will be returned
 */
function findTheLProduct(array, code){
  for (var i = 0; i < array.length; i++){
    if (code == array[i].productCode){
      return i
    }
  }
  return -1
}

/**
 * Finds the inputed product code using binary search.
 * 
 * @param {array} array - The array of objects that will be searched through.
 * @param {number} code - The product code that is going to be found
 * @returns {number} - The index number of the product. If the product isn't found, -1 will be returned
 */
function findTheBProduct(array, code){
  firstTime = new Date()
  var low = 0
  var high = array.length - 1
  while(low<=high){
    var mid = Math.floor((low + high)/2);
    if (array[mid].productCode > code){
      high = mid - 1;
    } 
    else if (array[mid].productCode < code){
      low = mid + 1;
    } 
    else {
      secondTime = new Date();
      console.log("Binary Searching Time: " + (secondTime.getTime() - firstTime.getTime()))
      return mid;
    }
  }
  secondTime = new Date();
  console.log("Binary Searching Time: " + (secondTime.getTime() - firstTime.getTime()))
  return -1
}

/**
 * Takes in a specified range of numbers and then returns a random number between specified range
 * 
 * @param {number} lowRange - The lowest number that random number generator can go
 * @param {number} highRange - The highest number that the random number generator can go
 * @returns {number} - A number between the specified range that the function was given
 */
function randomNumberGenerator(lowRange, highRange){
  highRange -= lowRange;
  return Math.floor(Math.random() * highRange) + lowRange; 
};

/**
 * Generates a sample array of products
 */
for (var i = 0; i < 100; i++){
  let productName = ['Xbox', 'Playstation', 'Rtx 3060 ti', 'RX 5700 xt', 'Led Strips', '5600x', 'HP notebook', 'Meshify C', 'i9 9900k', 'Ergonomic Chair'];
  let productCode = randomNumberGenerator(100000000000,999999999999);
  let stock = randomNumberGenerator(0,999);
  let palletSize = randomNumberGenerator(10,50);
  let currentLocation = ['chicago', 'New York', "N/A",  'in transit', "in transit", "Washington", "Montreal", "In transit", 'Las Vegas', 'N/A'];
  let shippingDestination = ["none", "none",'N/A', 'toronto', 'niagara', 'none', "none", "Toronto", "none", "N/A"];
  let newProduct = new WarehouseProduct(productName[randomNumberGenerator(0,10)], productCode, stock, palletSize, currentLocation[randomNumberGenerator(0,10)], shippingDestination[randomNumberGenerator(0,10)]);
  warehouseObjects.push(newProduct);
};

/**
 * Automatically triggers when the user enters the page.
 * It displays the table of products
 */
refreshPalletTable(warehouseObjects)

/**
 * Triggers when new product button is pressed
 * It activates several prompts that allows the user to add a product to the table
 */
$('#palletFormButton').click(function () {
  var productName = prompt("Enter product name");
  var productCode = prompt("Enter product code");
  var stock = Number(prompt('Enter stock of this new product'));
  var palletSize = Number(prompt("Enter # of products per stock"));
  var currentLocation = prompt("Enter current location")
  var shippingDestination = prompt("Enter shippingDestination");
  palletForm = new WarehouseProduct(productName, productCode, stock, palletSize, currentLocation, shippingDestination);
  warehouseObjects.push(palletForm)
  refreshPalletTable(warehouseObjects)
});

/**
 * Triggers when delete button is pressed
 * It give a prompt that allows the user to delete a product from the inventory manager
 */
$('#deletePalletButton').click(function () {
  const number = prompt("Which product do you want to delete? (enter product number)");
  warehouseObjects.splice(number, 1);
  refreshPalletTable(warehouseObjects)
  });

/**
 * Triggers when add pallet button is pressed
 * It give a prompt that allows the user to add a new pallets to the inventory manager
 */
$('#addPalletButton').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var addedStock = Number(prompt("How much pallets of "+ warehouseObjects[number].productName + " are you adding?"));
  warehouseObjects[number].addStock(addedStock) 
  refreshPalletTable(warehouseObjects);
});

/**
 * Triggers when remove pallet button is pressed
 * It give a prompt that allows the user to report pallets that have used up
 */
$('#removePalletButton').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var removedStock = Number(prompt("How many pallets of " + warehouseObjects[number].productName + " has been used?"));
  warehouseObjects[number].removeStock(removedStock) 
  refreshPalletTable(warehouseObjects);
  });

/**
 * Triggers when request pallet button is pressed
 * It give a prompt that allows the user to request stock for their local store
 */
$('#requestPalletButton').click(function () {
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
  refreshPalletTable(warehouseObjects)

  });

/**
 * Triggers when update shipping status button is pressed
 * It give a prompt that allows the user to update the shipping status of stock
 */
$('#updatePalletButton').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var shippingStatus = prompt("What is the shipping status of " + warehouseObjects[number].productName + "?");
  warehouseObjects[number].changeStatus(shippingStatus) 
  refreshPalletTable(warehouseObjects);
});

/**
 * Triggers when change amount of stock per pallet button is pressed
 * It give a prompt that allows the user to update the amount of stock that can fit on a pallet
 */
$('#changePalletButton').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var palletNumber = Number(prompt("How much stock of " + warehouseObjects[number].productName + " can fit on 1 pallet?"));
  warehouseObjects[number].changePallet(palletNumber) ;
  refreshPalletTable(warehouseObjects);
});

/**
 * Triggers when update shipping destination button is pressed
 * It give a prompt that allows the user to change the destination of specified stock
 */
$('#updateDestinationPalletButton').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var shippingDestinationStatus = prompt("What is the new shipping destination of " + warehouseObjects[number].productName + "?");
  warehouseObjects[number].movePallet(shippingDestinationStatus) 
  refreshPalletTable(warehouseObjects);
});

/**
 * Triggers when the download data button is pressed
 * It automatically downloads the file for the user
 */
$('#downloadPalletButton').click(function () {
  var palletInformation = ["Number    Product Name     Product Code     # of Pallets  Stock per pallet     Total # of products    Current Location          Shipping Destination \n-------------------------------------------------------------------------------------------------------------------------------------------\n"];
  for (var i = 0; i < warehouseObjects.length; i++){
    //adds dashes until column after product name lines up
    var dash = "-"

    //adds dashes until the column after "number" lines up
    var numberLength = String(i)
    var numberOfNCharacters = numberLength.length
    var nNeeded = 9 - numberOfNCharacters
    var nDashes = dash.repeat(nNeeded)
    var updatedNName = numberLength + nDashes

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

    //adds dashes until the column after product code lines up
    var stockLength = String(warehouseObjects[i].stock)
    var numberOfSCharacters = stockLength.length
    var sNeeded = 13 - numberOfSCharacters
    var sDashes = dash.repeat(sNeeded)
    var updatedSName = stockLength + sDashes

    //creates dividers so the columns of information match up
    palletInformation.push(updatedNName + "~" + updatedName + "~" + warehouseObjects[i].productCode + "----~" + updatedSName + "~" + warehouseObjects[i].palletSize + "----------------~" + updatedStockLength + '~' + updatedLocationLength + "~" + warehouseObjects[i].shippingDestination + "\n");
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
$('#showPalletsButton').click(function () {
  reader.readAsText(fileButtonActivate.files[0]);
  reader.onload = e => {
    var output = e.target.result;
    //removes the extra dashes I added to create neat columns
    output = output.replace(/-/g, "")
    //removes first two rows
    output = output.split('\n');
    output.splice(0, 2); 
    warehouseObjects = updateWarehouseInfo(output);
    refreshPalletTable(warehouseObjects)
  };
});

/**
 * Triggers when the sort number of products (high to low) button is clicked
 * It sorts the number of products by number using bubble sort
 */
$('#sortBNumOfProducts').click(function () {
  firstTime = new Date()
  sortByBNumOfProducts(warehouseObjects)
  secondTime = new Date()
  console.log("Bubble sort = " + (secondTime.getTime() - firstTime.getTime()) + " millisecond")
  refreshPalletTable(warehouseObjects)
})

/**
 * Triggers when the sort number of products (low to high) button is clicked
 * It sorts the number of products by number using insertion sort
 */
$('#sortINumOfProducts').click(function () {
  firstTime = new Date()
  sortByINumOfProducts(warehouseObjects)
  secondTime = new Date()
  console.log("Insertion sort = " + (secondTime.getTime() - firstTime.getTime()) + " millisecond")
  refreshPalletTable(warehouseObjects)
})

/**
 * Triggers when the search for product using code button is clicked
 * It searches through the array using linear search
 */
$('#findTheLProduct').click(function () {
  var wantedProductCode = Number(prompt('Enter product code of desired product'));
  firstTime = new Date()
  answer = findTheLProduct(warehouseObjects, wantedProductCode)
  secondTime = new Date()
  console.log("Linear search: " + (secondTime.getTime() - firstTime.getTime()) + " milliseconds")
  if (answer == -1){
    alert("This product is not in our inventory")
  }
  else{
    alert(wantedProductCode + " can be found at list number " + answer)
  }
})

/**
 * Triggers when the search and sort for product using code button is clicked
 * It searches through the array using binary search while also sorting the list
 */
$('#findTheBProduct').click(function () {
  var wantedProductCode = Number(prompt('Enter product code of desired product'));
  firstTime = new Date()
  warehouseObjects.sort((a, b) => a.productCode - b.productCode)
  secondTime = new Date()
  console.log("Sorting Time: " + (secondTime.getTime() - firstTime.getTime()))
  answer = findTheBProduct(warehouseObjects, wantedProductCode)
  refreshPalletTable(warehouseObjects)
  if (answer == -1){
    alert("This product is not in our inventory")
  }
  else{
    alert(wantedProductCode + " can be found at list number " + answer)
  }
})
