import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;