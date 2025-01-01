const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    return (
      <div className="checkout">
        <h1>Checkout</h1>
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="checkout-item">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="total">
          <h3>Total: ${totalPrice}</h3>
        </div>
        <form>
          {/* Add shipping and payment form fields here */}
          <button type="submit">Place Order</button>
        </form>
      </div>
    );
  };
  
  export default Checkout;
  