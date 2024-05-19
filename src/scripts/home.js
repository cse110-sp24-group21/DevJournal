// Script.js

// Import the storage controller object from storage.js
// Separating this isn't super necessary for this lab but keeping
// implementation details separate and silo'd is a nice pattern
import { storage } from './storage.js';

let items; // The variable we'll use to add our array of obejcts we fetch
let itemsURL = 'assets/json/tasklist.json'; // the URL to fetch from

// Bind the init() function to run once the page loads
window.addEventListener('DOMContentLoaded', init);

/** Initializes every function, they all stem from here */
async function init() {
  // Attempt to fetch the task items
  try {
    await fetchItems();
  } catch (err) {
    console.log(`Error fetch items: ${err}`);
    return; // Return if fetch fails
  }
  populatePage(); // Add <task-item> elements to page with fetched data
  bindCartUpdates(); // Add the event listeners to those <product-item> elems
}

/**
 * Fetches all of the products from itemsURL top and stores them
 * inside the global items variable. 
 * @returns {Promise} Resolves if the items are found it localStorage or if they
 *                    are fetched correctly
 */
async function fetchItems() {
  return new Promise((resolve, reject) => {
    const products = localStorage.getItem('tasks')
    if (products) {
      items = JSON.parse(products);
      resolve();
    } else {
      fetch(itemsURL)
        // Grab the response first, catch any errors here
        .then(response => response.json())
        .catch(err => reject(err))
        // Grab the data next, cach errors here as well
        .then(data => {
          if (data) {
            localStorage.setItem('tasks', JSON.stringify(data));
            items = data;
            resolve();
          }
        })
        .catch(err => reject(err));
    }
  });
}

/**
 * Adds the Fetched procut items to the webpage
 */
function populatePage() {
  if (!items) return;
  // Get all of the items currently in the cart from storage
  const inCart = storage.getItems('tasks');
  // Iterate over each of the items in the array
  items.forEach(item => {
    // Create <product-item> element and populate it with item data
    let productItem = document.createElement('task-item');
    productItem.data = item;
    // If the item was in the cart already, set it to be that way
    if (inCart.indexOf(item.id) > -1) {
      productItem.alreadyInCart();
    }
    // Add the item to the webpage
    document.querySelector('#product-list').appendChild(productItem);
  });
  // Update the cart count in the webpage
  document.querySelector('#cart-count').innerHTML = inCart.length;
}

/**
 * Binds the event listeners to each item for when the add to cart & remove
 * from cart buttons get pressed
 */
function bindCartUpdates() {
  const items = Array.from(document.querySelectorAll('product-item'));
  items.forEach(item => {
    item.addEventListener('addedToCart', () => { addToCart(item.json.id) });
    item.addEventListener('removedFromCart', () => { removeFromCart(item.json.id) });
  });
}

/**
 * Add 1 to the current cart count, update storage accordingly
 */
function addToCart(id) {
  const cartCount = document.querySelector('#cart-count');
  cartCount.innerHTML = Number(cartCount.innerHTML) + 1;
  storage.addItem('tasks', id);
}

/**
 * Remove 1 to the current cart count, update storage accordingly
 */
function removeFromCart(id) {
  const cartCount = document.querySelector('#cart-count');
  cartCount.innerHTML = Number(cartCount.innerHTML) - 1;
  storage.removeItem('tasks', id);
}