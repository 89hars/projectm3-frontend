# Arrti.

# MVP
* eCommerce for selling and buying art-related products.
* A page to display all the art products on sale.
* A page to create a product, including description and a picture.
* A page to display the details of the created product.
* A shopping cart connected to a payment system and linked to a user.
* A user profile to display the products linked to a specific user.


# About
* Backend running using ExpressJs and MongoDb.
* Middleware Functions to secure routes and conect with cloud services to store images.
* Bycrypt to secure the password
* Possibility of storing images using Claudinary
* Payment system habilitated via credit card or PayPal
* Project deployed on Netlify.
* 
# Backlog
* Adding a mechanism for users to interact with each other.
* Adding a favorites functionality to the profile.
* Incorporating a comment model.
* Incorporating a model for Stores and providing a clear way to handle revenues, taxes, and shipping.
* Generating hierarchy among users based on minimum sales numbers, as a way to incentivize trust in buyers.
* Adding more pictures to the product.
* Adding a special section for audiovisual pieces.
* Adding a NFT section. 

# Data Structure
``` 
├── middleware
│   └── PrivateRoute.jsx
├── node_modules
├── public
│   ├── Images
│   └── _redirects
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Layouts.jsx
│   │   ├── Search.jsx
│   │   └── TableOfProducts.jsx
│   ├── context
│   │   ├── CartContext.jsx
│   │   ├── SearchContext.jsx
│   │   └── SessionContext.jsx
│   ├── pages
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── Create.jsx
│   │   ├── Details.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Privacy.jsx
│   │   ├── Profile.jsx
│   │   ├── Search.jsx
│   │   └── Signup.jsx
├── app.jsx
├── index.css
├── main.jsx
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-loc.json
└── vite.config.js
``` 


