import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return <p>No product data available</p>;
  }

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;