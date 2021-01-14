/*
-------------------------------------------------------------------------------------------------------------------
Name:        storeSection.js
Purpose:     Practice with objects, inheritance, files, conversion of datatypes and one-dimensional arrays of objects

Author:      Kelvin Cao (629937)
Created:     07-Dec-2020
Updated:     15-Jan-2021
--------------------------------------------------------------------------------------------------------------------
*/
var productObjects = [];

//Access to html elements
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
function refreshTable(array){
  while (productTable.rows.length > 0){
    productTable.deleteRow(0);
  };
  for (var i = 0; i < array.length; i++){
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
    productName.innerHTML = array[i].productName;
    productCode.innerHTML = array[i].productCode;
    stock.innerHTML = array[i].stock;
    price.innerHTML = "$" + array[i].price;
    restocking.innerHTML = array[i].restocking;
    discontinued.innerHTML = array[i].discontinued;
    store.innerHTML = array[i].store;
    aisle.innerHTML = array[i].aisle;
    lastUpdated.innerHTML = array[i].lastUpdated;

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
    newProductSheet = new StoreProduct(productName, productCode, Number(stock), Number(price), restocking, discontinued, store, aisle, lastUpdated);
    updatedProducts.push(newProductSheet);
    refreshTable(productObjects);
  };
  return updatedProducts;
};

/**
 * Takes in array and sorts it by stock using bubble sort
 * 
 * @param {array} array - The array of objects that will be sorted
 * @returns {array} - The array which is sorted by stock
 */
function sortByBStock(array) {
  var finished = false;
  while (!finished) {
    finished = true
    for (let i = 0; i < array.length - 1; i++){
      //when getting my empirical data, this line was modified to sort from high to low.
      if (array[i].stock < array[i + 1].stock){
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
function sortByIStock(array){
  for (var i = 1; i < array.length; i++){
    var current = array[i];
    var previous = i - 1;
    while((previous >= 0) && array[previous].stock > current.stock){
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
function findLProduct(array, code){
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
function findBProduct(array, code){
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
 * Generates a sample array for the table
 */
for (var i = 0; i < 100; i++){
  let productName = ['Xbox', 'Playstation', 'Rtx 3060 ti', 'RX 5700 xt', 'RGB fans', '5600x', 'HP notebook', 'Meshify C', 'i9 9900k', 'Ergonomic Chair'];
  let productCode = randomNumberGenerator(100000000000,999999999999);
  let stock = randomNumberGenerator(0,999);
  let price = randomNumberGenerator(100,999);
  let store = ['mississauga', 'toronto', 'niagara', 'brampton', 'New York', 'Toronto', 'Mississauga', 'Quebec', 'Chicago', 'Brampton'];
  let aisle = ['11', '32', 'a4', '32', '38', '31', 'b4', '27', '34', '12'];
  let lastUpdated = ["12/09/2020", "12/08/2020", "12/07/2020", "12/06/2020","12/01/2020","12/02/2020","12/11/2020","12/13/2020","12/01/2020","12/02/2020"]
  let restocking = [false, true];
  let discontinued = [false, true];
  let newProduct = new StoreProduct(productName[randomNumberGenerator(0,10)], productCode, stock, price, restocking[randomNumberGenerator(0,2)], discontinued[randomNumberGenerator(0,2)], store[randomNumberGenerator(0,10)], aisle[randomNumberGenerator(0,10)], lastUpdated[randomNumberGenerator(0,10)]);
  productObjects.push(newProduct);
};

/**
 * Automatically triggers when the user enters the page.
 * It displays the table of products
 */
refreshTable(productObjects)

/**
 * Triggers when new product button is pressed
 * It activates several prompts that allows the user to add a product to the table
 */
$('#productFormButton').click(function () {
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
  productFormInfo = new StoreProduct(productName, productCode, stock, price, restocking, discontinued, store, aisle, lastUpdated);
  productObjects.push(productFormInfo);
  refreshTable(productObjects);
});

/**
 * Triggers when restock all button is pressed
 * It starts restock process for all products.
 */
$('#restockAll').click(function () {
  for (var i = 0; i < productObjects.length; i++){
    productObjects[i].restock();
    productObjects[i].updated();
  }
  refreshTable(productObjects)
});

/**
 * Triggers when restock all with no stock button is pressed
 * It starts restock process for all products that has no stock.
 */
$('#restockAllWith0Stock').click(function () {
  for (var i = 0; i < productObjects.length; i++){
    if (productObjects[i].noStock()){
      productObjects[i].restock();
      productObjects[i].updated();
    }   
  }
  refreshTable(productObjects)
});

/**
 * Triggers when add stock button is pressed
 * It give a prompt that allows the user to add stock to the inventory manager
 */
$('#addStock').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var addedStock = Number(prompt("How much Stock of "+ productObjects[number].productName + " are you adding?"));
  productObjects[number].addStock(addedStock) 
  productObjects[number].updated();
  refreshTable(productObjects);
});

/**
 * Triggers when take out stock button is pressed
 * It give a prompt that allows the user to report sold stock
 */
$('#removeStock').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var removedStock = Number(prompt("How much Stock of " + productObjects[number].productName + " has been used?"));
  productObjects[number].removeStock(removedStock) 
  productObjects[number].updated();
  refreshTable(productObjects);
});

/**
 * Triggers when change price button is pressed
 * It give a prompt that allows the user to change the price of a product
 */
$('#changePrice').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var newPriceOfObject = Number(prompt("What is the new price of " + productObjects[number].productName + " ?"));
  productObjects[number].newPrice(newPriceOfObject) 
  productObjects[number].updated();
  refreshTable(productObjects)
});

/**
 * Triggers when change aisle button is pressed
 * It give a prompt that allows the user to change the aisle that the product should be located.
 */
$('#changeAisle').click(function () {
  var number = prompt("Which product do you want to edit? (enter product number)");
  var newAisleOfObject = prompt("What is the new aisle of " + productObjects[number].productName + " ?");
  productObjects[number].moveProduct(newAisleOfObject) 
  productObjects[number].updated();
  refreshTable(productObjects)
});

/**
 * Triggers when discontinue button is pressed
 * It allows a user to discontinue a product.
 */
$('#discontinue').click(function () {
  const number = prompt("Which product do you want to discontinue? (enter product number)");
  productObjects[number].discontinue() 
  productObjects[number].updated();
  refreshTable(productObjects)
});

/**
 * Triggers when delete button is pressed
 * It give a prompt that allows the user to delete a product from the inventory manager
 */
$('#delete').click(function () {
  const number = prompt("Which product do you want to delete? (enter product number)");
  productObjects.splice(number, 1);
  refreshTable(productObjects)
});

/**
 * Triggers when the download data button is pressed
 * It automatically downloads the file of products for the user
 */
$('#downloadProductButton').click(function () {
  var productInformation = ["Number    Product Name     Product Code     Stock   Price     Restocking    Discontinued      Store         Aisle #     Last Updated \n-------------------------------------------------------------------------------------------------------------------------------------------\n"];
  for (var i = 0; i < productObjects.length; i++){
    var dash = "-"

    //adds dashes until the column after "number" lines up
    var numberLength = String(i)
    var numberOfNCharacters = numberLength.length
    var nNeeded = 9 - numberOfNCharacters
    var nDashes = dash.repeat(nNeeded)
    var updatedNName = numberLength + nDashes

    //adds dashes until the column after product name lines up
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

    //adds dashes until the column after product name lines up
    var stockLength = String(productObjects[i].stock)
    var numberOfSCharacters = stockLength.length
    var sNeeded = 7 - numberOfSCharacters
    var sDashes = dash.repeat(sNeeded)
    var updatedSName = stockLength + sDashes

    //creates dividers so the columns of information match up
    productInformation.push(updatedNName +  "~" + updatedName + "~" + String(productObjects[i].productCode) + "----~" + updatedSName + "~" + String(productObjects[i].price) + "------~" + updatedRestockLength + "--------~" + updatedDiscontinueLength + "------------~" + updatedLocationLength + "~" + productObjects[i].aisle + "---------~" + productObjects[i].lastUpdated + "\n");
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
$('#showProductsButton').click(function () {
  reader.readAsText(fileProductButtonActivate.files[0]);
  reader.onload = e => {
    var output = e.target.result;
    //removes the extra dashes I added to create neat columns
    output = output.replace(/-/g, "")
    output = output.split('\n');
    output.splice(0, 2); 
    productObjects = updateProductInfo(output);
    refreshTable(productObjects)
  };
});

/**
 * Triggers when the sort stock (high to low) button is clicked
 * It sorts the stock by number using bubble sort
 */
$('#sortBStock').click(function () {
  firstTime = new Date()
  sortByBStock(productObjects)
  secondTime = new Date()
  console.log("Bubble sort = " + (secondTime.getTime() - firstTime.getTime()) + " millisecond")
  refreshTable(productObjects)
})

/**
 * Triggers when the sort stock (low to high) button is clicked
 * It sorts the stock by number using insertion sort
 */
$('#sortIStock').click(function () {
  firstTime = new Date()
  sortByIStock(productObjects)
  secondTime = new Date()
  console.log("Insertion sort = " + (secondTime.getTime() - firstTime.getTime()) + " millisecond")
  refreshTable(productObjects)
})

/**
 * Triggers when the sort stock using .sort button is clicked
 * It sorts the stock by number using quick sort/ built in sort. Button not active since it was just used for test data
 */
$('#sortStock').click(function () {
  firstTime = new Date()
  productObjects.sort((a, b) => a.stock - b.stock)
  secondTime = new Date()
  console.log(".sort = " + (secondTime.getTime() - firstTime.getTime() + " millisecond"))
  refreshTable(productObjects)
})

/**
 * Triggers when the search for product using code button is clicked
 * It searches through the array using linear search
 */
$('#findLProduct').click(function () {
  var wantedProductCode = Number(prompt('Enter product code of desired product'));
  firstTime = new Date()
  answer = findLProduct(productObjects, wantedProductCode)
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
$('#findBProduct').click(function () {
  var wantedProductCode = Number(prompt('Enter product code of desired product'));
  firstTime = new Date()
  productObjects.sort((a, b) => a.productCode - b.productCode)
  secondTime = new Date()
  console.log("Sorting Time: " + (secondTime.getTime() - firstTime.getTime()))
  answer = findBProduct(productObjects, wantedProductCode)
  refreshTable(productObjects)
  if (answer == -1){
    alert("This product is not in our inventory")
  }
  else{
    alert(wantedProductCode + " can be found at list number " + answer)
  }
})