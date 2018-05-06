// Required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

// Connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "Abe271830",
    database: "bamazon_DB"
});

// make sure inputting only positive numbers 
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a valid number.';
    }
}

// prompts user for the item & quantity they would like to purchase
function promptUserPurchase() {

// prompts user to select item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number,
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function(input) {

        var item = input.item_id;
        var quantity = input.quantity;

        // check database to make sure item and quantity exist
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, {item_id: item}, function(err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();
            } else {
                var productData = data[0];

                // if quantity and item is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations! The product you selected is in stock!');

                    // update query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    // update inventory
                    connection.query(updateQueryStr, function(err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping BAMAZON!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End database connection
                        connection.end();
                    })
                } else {
                    console.log('Sorry, there is not enough product in stock, please review order.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

// Retrieve the current inventory from the database 
function displayInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
}

// runBamazon will execute the main application logic
function runBamazon() {
	// console.log('___ENTER runBamazon___');

	// Display the available inventory
	displayInventory();
}

// Run the application logic
runBamazon();