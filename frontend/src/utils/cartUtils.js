export const addDecimals = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //   Calculate items price (subtotal before tax and shipping)
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + (item.price * 100 * item.qty) / 100, 0);

  state.itemsPrice = addDecimals(itemsPrice);

  //   Calculate items shipping price (if order is > 100 = free : 10)
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  //   Calculate items tax price (15%)
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  //   Calculate items total price (after tax and shipping)
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
