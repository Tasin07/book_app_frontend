import { ADD_TO_CART } from "../constants/ActionTypes";
const initialState = {
	cartList: []
};

export default function(state = initialState, action) {
	debugger;
	switch (action.type) {
		case ADD_TO_CART: {
			const { content } = action.payload;
			return {
				...state,
				cartList: [...state.cartList, content]
			};
		}
		default:
			return state;
	}
}
