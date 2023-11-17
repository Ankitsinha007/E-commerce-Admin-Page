document.addEventListener('DOMContentLoaded', function () {
    getProductList();
  });
  
  function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
  
    if (productName && !isNaN(productPrice)) {
      const product = { name: productName, price: productPrice };
      axios.post('https://crudcrud.com/api/f0ebb249b1d44d9fbf1ccca8f00615f6/product', product)
        .then(function (response) {
          getProductList();
          updateTotalAmount();
        })
        .catch(function (error) {
          console.error('Error adding product:', error);
        });
    }
  }
  
  function getProductList() {
    axios.get('https://crudcrud.com/api/f0ebb249b1d44d9fbf1ccca8f00615f6/product')
      .then(function (response) {
        displayProductList(response.data);
        updateTotalAmount();
      })
      .catch(function (error) {
        console.error('Error fetching product list:', error);
      });
  }
  
  function displayProductList(products) {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';
  
    products.forEach(function (product) {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `<span>${product.name} - $${product.price.toFixed(2)}</span>
                              <button onclick="deleteProduct(${product.id})">Delete</button>`;
      productListDiv.appendChild(productDiv);
    });
  }
  
  function deleteProduct(productId) {
    axios.delete(`https://crudcrud.com/api/f0ebb249b1d44d9fbf1ccca8f00615f6/${productId}`)
      .then(function (response) {
        getProductList();
      })
      .catch(function (error) {
        console.error('Error deleting product:', error);
      });
  }
  
  function updateTotalAmount() {
    axios.get('https://crudcrud.com/api/f0ebb249b1d44d9fbf1ccca8f00615f6/product')
      .then(function (response) {
        const totalAmountSpan = document.getElementById('total');
        totalAmountSpan.textContent = response.data.toFixed(2);
      })
      .catch(function (error) {
        console.error('Error fetching total amount:', error);
      });
  }
  