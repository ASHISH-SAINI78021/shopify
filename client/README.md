# react-helmet
it is used to make the website SEO friendly
go to layout.jsx

# react-toastify  / use react-hot-toast instead
it is used for the alert messages
go to register.jsx and layout.jsx

# concurrently
it is used simultanesously run the frontend and backend server

# context Api
learn the concept of context api

# useLocation hook
used to check the previous path of the user. Go to Spinner.jsx

# slugify
used to convert to lowercase , - , etc. go to mondels in category.js , it is used for SEO

# express-formidable
used to extract any type of data from the forms like photo , etc

# infinite-scroll-functionality
const products = await Product.find({}).select("-photo").limit(12).sort({createdAt : -1});

# Ant Design
UI library

# how to pass two function in one event
<td><button className="btn btn-primary" onClick={()=> {handleEdit(event , value._id); ()=> clickOnEdit()}}>Edit</button></td>

# how to use emoji in vs code
window + ;

# how to send form data instead of json data in any request
const productData = new formData();
product.append("name" , name);
go to product.jsx

# how to add the functionality of filtering
go to home.jsx

# how to limit the characters in description
<p className="card-text">{product.description.substring(0 , 30)}</p>

# how to reload the window
window.location.reload();

# how to add searching functionality
const products = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");
go to product route


# how to exclude a document using query
const products = await Product.find({
            category : cid ,
            _id : {$ne : pid} // not included
        }).select("-photo").limit(3);


# how to count the documents
const count = await Product.find({}).estimatedDocumentCount(); // it is used to count the documents in a collection
go to product controller

# how to delete an element from an array
const index = mycart.findIndex(item=> item._id === pid);
mycart.splice(index , 1);
go to Cart.jsx in pages

# how to select country currency
const total = cart.reduce((sum, product) => sum + product.price, 0);
      const formattedTotal = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });

# navigate("/login" ,{state: "/cart"})    

# payment gateway
braintreegateway.com
first install npm i braintree
npm i braintree-web-drop-react