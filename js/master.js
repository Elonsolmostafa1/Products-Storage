// define input elements that we will get our inputs from
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");


// define products container
var productsContainer = [];



/* We Store our data in local storage 
   When we reopen the app , productsContainer is empty so if there are products in local storage we will push them in productsContainer
   and then we display the products again because productsContainer is changed  
*/
if(localStorage.getItem("products") != null)
{
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}



// Function to add products 
function addProduct()
{
    // check if the product name is valid , if it's valid we add product else we do nothing
    if(isValidProductName())
    {
        var product = {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value
        };
        productsContainer.push(product);
        localStorage.setItem("products" , JSON.stringify(productsContainer));
        displayProducts();
    }

    else
    {
        window.alert("invalid product name")
    }
}


// Function to display all products
function displayProducts()
{
    // variable that contains all products tuples to be displayed
    var cartoona = ``;
    for(var i=0 ; i<productsContainer.length;i++)
    {
        cartoona+= `<tr>
                        <td>${i+1}</td>
                        <td>${productsContainer[i].name}</td>
                        <td>${productsContainer[i].price}</td>
                        <td>${productsContainer[i].category}</td>
                        <td>${productsContainer[i].desc}</td>
                        <td><button onclick="deleteProduct(${i});" class="btn btn-sm btn-outline-danger">Delete</button></td>
                        <td><button class="btn btn-sm btn-outline-warning">Update</button></td>
                    </tr>`
    }
    // Add all products to our table in HTML
    document.getElementById('table-body').innerHTML = cartoona;
}



// Function that clear all input field after each addition
function clearForm()
{
    productNameInput.value =``;
    productPriceInput.value = ``;
    productCategoryInput.value = ``;
    productDescInput.value = `` ;
}


// Function to delete product
function deleteProduct(deletedIndex)
{
    productsContainer.splice(deletedIndex,1);
    // Local storage accept only strings so we convert our array to string to push it into local storage
    // We push productsContainer again because we delete an element from productsContainer only not from local storage
    localStorage.setItem("products" , JSON.stringify(productsContainer));
    displayProducts();
}

//
function searchProduct(term)
{
    var cartoona = ``;
    for(var i=0 ; i<productsContainer.length;i++)
    {
        // We use includes() to search in all of our products
        // We convert to lower case bacause inlcudes() is case sensitive 
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            cartoona+= `<tr>
                        <td>${i+1}</td>
                        <td>${productsContainer[i].name}</td>
                        <td>${productsContainer[i].price}</td>
                        <td>${productsContainer[i].category}</td>
                        <td>${productsContainer[i].desc}</td>
                        <td><button onclick="deleteProduct(${i});" class="btn btn-sm btn-outline-danger">Delete</button></td>
                        <td><button class="btn btn-sm btn-outline-warning">Update</button></td>
                    </tr>`
        }
    }
    document.getElementById('table-body').innerHTML = cartoona;
}


// Function to validate the product name
function isValidProductName()
{
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value))
        return true;
    return false;
}