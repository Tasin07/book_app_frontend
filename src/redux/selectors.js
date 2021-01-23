export const getCartState = store => {
	return store.cart;
};

export const getCartList = store => {
	return getCartState(store) ? getCartState(store).cartList : [];
};

export const getCartLength = store => {
	return getCartState(store) ? getCartState(store).cartList.length : [];
};
