import { ADD_TO_CART } from "../constants/ActionTypes";

export const addToCart = content => ({
	type: ADD_TO_CART,
	payload: {
		content
	}
});
