const loadAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

const setAllMenu = async () => {
    // console.log(loadAllProducts());
    const data = await loadAllProducts();

    const allMenu = document.getElementById('all-menu');
    const uniqueArray = [];
    for (const product of data) {
        // console.log(product.category);
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `
            <a>${product.category}</a>
            `;
            allMenu.appendChild(li);
        }
    }
}

setAllMenu()

// loadAllProducts(); 
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        // console.log(searchField.value);
        const searchValue = searchField.value;
        const allProducts = await loadAllProducts();
        // console.log(allProducts);
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        console.log(foundProducts);
        const productContainer = document.getElementById('products-container');
        productContainer.textContent = '';
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        if (foundProducts.length === 0) {
            notFound.innerHTML = `<h2 class="text-white text-2xl text-center">No Product Found! Please Try Another keyword</h2>`
            return;
        }
        foundProducts.forEach(product => {
            console.log(product);
            const { category, image, title, description } = product;
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img src="${image}" class="h-80 w-full" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title"> ${category} </h2>
                    <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
                    <div class="card-actions justify-end">
                    <label for="my-modal-3" onclick="showModal('${description}', '${image}')" class="btn btn-primary">open modal</label>
                    </div>
                </div>
            </div>
            `;
            productContainer.appendChild(div);
        });
    }
})

const showModal = (description, image) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = ``;
    modalBody.innerHTML = `
    <p class="mb-5"> ${description} </p>
    <img src="${image}">
    `;
}