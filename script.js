const productList = document.getElementById("product-ul");
const totalAmountValue = document.getElementById("total-amount-value");

// let apiUrl = "https://crudcrud.com/api/0423f7adca1d4b3d9ae41ab068a7de65/products"

let products = [];

// Fetch data from the server when the page loads
axios.get("https://crudcrud.com/api/0423f7adca1d4b3d9ae41ab068a7de65/products")
    .then(response => {
        products = response.data;
        renderProduct();
        calculateTotalAmount();
    })
    .catch(error => {
        console.error('Error fetching data from the server:', error);
    });

function renderProduct() {
    productList.innerHTML = "";
    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - ${product.price} 
                         
                        <button onclick="deleteProduct('${product._id}')">Delete</button>`;
        productList.appendChild(li);
    });
}

function calculateTotalAmount() {
    const total = products.reduce((acc, product) => acc + product.price, 0);
    totalAmountValue.innerText = total;
}

function addProduct() {
    const productName = prompt("Enter product name:");
    const productPrice = parseFloat(prompt("Enter product price:"));
    
    if (productName && !isNaN(productPrice)) {
        const newProduct = { id: Date.now().toString(), name: productName, price: productPrice };

        // Send data to the server
        axios.post('https://crudcrud.com/api/0423f7adca1d4b3d9ae41ab068a7de65/products', newProduct)
            .then(response => {
                products.push(response.data);
                renderProduct();
                calculateTotalAmount();
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    }
}

// function editProduct(id) {
//     const newName = prompt("Enter new name:");
//     const newPrice = parseFloat(prompt("Enter new price:"));

//     if (newName && !isNaN(newPrice)) {
//         // Update data on the server
//         axios.put(`https://crudcrud.com/api/0423f7adca1d4b3d9ae41ab068a7de65/products/${id}`, { name: newName, price: newPrice })
//             .then(response => {
//                 const updatedProductIndex = products.findIndex(product => product.id === id);
//                 products[updatedProductIndex] = response.data;
//                 renderProduct();
//                 calculateTotalAmount();
//             })
//             .catch(error => {
//                 console.error('Error updating product:', error);
//             });
//     }
// }

function deleteProduct(id) {
    // Delete data from the server
    axios.delete(`https://crudcrud.com/api/0423f7adca1d4b3d9ae41ab068a7de65/products/${id}`)
        .then(() => {
            products = products.filter(product => product.id !== id);
            renderProduct();
            calculateTotalAmount();
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });
}
