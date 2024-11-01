import React from 'react';
import { useSearch } from '../context/search';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import api from '../const.js';

const Search = () => {
  const [value, setvalue] = useSearch();
  const navigate = useNavigate();

  // Placeholder function for viewing details of a single product
  const getSingleProduct = (productId) => {
    // Implement logic to fetch details for the selected product
    console.log(`View details for product with ID: ${productId}`);
    navigate(`/${productId}`);
    
  };

  return (
    <Layout>
      {value.result.length < 1 ? (
        <div>Products not found</div>
      ) : (
        <div className="card-container d-flex flex-wrap">
          {value.result.map((product) => (
            <div key={product._id} className="card" style={{ width: '18rem', margin: '10px' }}>
              <img
                src={`${api}/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description.substring(0, 30)}</p>
                <p className="card-text">$ {product.price}</p>
                <button className="btn btn-primary" onClick={() => getSingleProduct(product._id)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Search;
