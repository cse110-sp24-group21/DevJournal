// task-element.js

class TaskElement extends HTMLElement {
    constructor() {
      super(); // inherets everything from HTMLElement
      this.attachShadow({ mode: 'open' }); // Creates the Shadow DOM
    }
  
    set data(data) {
      this.json = data; // Store the data passed in for later
      this.inCart = false; // A flag that marks whether the item is in the cart
  
      // Store the element styles in a <style> block, needed bc of the shadow DOM
      const styles = document.createElement('style');
      styles.innerHTML = `
        .description {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }
  
        .task {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas: 
          'title'
          'dueDate'
          'assignDate'
          'description';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }
  
        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }
  
        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }
  
        .product > img {
          align-self: center;
          justify-self: center;
          object-fit: contain;
          height: 100%;
          width: 100%;
        }
  
        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
  
        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
        }
      `;
  
      // Create the outer wrapper for the product to nest inside
      const wrapper = document.createElement('div');
      wrapper.classList.add('task');
  
      // Create the product image element
      const img = document.createElement('img');
      img.setAttribute('src', data.image);
      img.setAttribute('alt', data.title);
      img.setAttribute('width', 200);
  
      // Create the product title
      const title = document.createElement('p');
      title.classList.add('title');
      title.innerHTML = data.title;
  
      // Create the product price
      const price = document.createElement('p');
      price.classList.add('price');
      price.innerHTML = `$${data.price.toFixed(2)}`;
  
      // Create the "Add to Cart button"
      const button = document.createElement('button');
      button.innerHTML = 'Add to Cart';
  
      // Assigning "this" to variable to access inside func
      const prodItem = this;
      // Create new Events to fire when the element is added / removed
      // from the cart
      const addedToCart = new Event('addedToCart');
      const removedFromCart = new Event('removedFromCart');
      button.addEventListener('click', () => {
        if (!this.inCart) {
          button.innerHTML = 'Remove from Cart';
          prodItem.dispatchEvent(addedToCart);
        } else {
          button.innerHTML = 'Add to Cart';
          prodItem.dispatchEvent(removedFromCart);
        }
        this.inCart = !this.inCart;
      });
  
      // Add all of the above elements to the wrapper
      wrapper.append(img, title, price, button);
  
      // Append the wrapper and the styles to the Shadow DOM
      this.shadowRoot.append(styles, wrapper);
    }
  
    get data() {
      return this.json;
    }
  
    // Updates the item to show that it's already in the cart. Useful
    // for page reloads so you don't accidentally update the storage twice
    alreadyInCart() {
      this.shadowRoot.querySelector('button').innerHTML = 'Remove from Cart';
      this.inCart = true;
    }
  }
  
  customElements.define('product-item', TaskElement);