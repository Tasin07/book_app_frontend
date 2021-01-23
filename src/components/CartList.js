import { Table } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { getCartList } from "../redux/selectors";
import axios from "axios";

function CartList({ finalCart }) {
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				"selectedRows: ",
				selectedRows
			);
		}
	};

	const redirectToPayment = () => {
		const data = {
			purpose: "Book payment",
			amount: "100",
			buyer_name: "ajith",
			email: "a@a.com",
			phone: "0000000000",
			user_id: "1232323",
			redirect_url: "http://localhost:3000/payment/success",
			webhook_url: "/webhook/"
		};
		axios
			.post("http://localhost:8000/paymentGateway", data)
			.then(res => {
				console.log("resp", res.data);
				window.location.href = res.data;
			})
			.catch(error => console.log(error.response.data));
	};

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title"
		},
		{
			title: "Author",
			dataIndex: "authors",
			key: "authors"
		},
		{
			title: "Language",
			dataIndex: "language_code",
			key: "language_code"
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity"
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price"
		}
	];

	return (
		<div>
			<Table
				columns={columns}
				rowSelection={rowSelection}
				dataSource={finalCart}
				pagination={false}
			/>
			<Button
				onClick={() => redirectToPayment()}
				type="primary"
				block
				style={{ marginTop: 20 }}
			>
				Checkout
			</Button>
		</div>
	);
}

const mapStateToProps = state => {
	let cartListResult = {};
	const cartList = getCartList(state);
	cartList.forEach(v => {
		if (cartListResult.hasOwnProperty(v.bookID)) {
			cartListResult[v.bookID].quantity += 1;
			cartListResult[v.bookID].price += v.price;
		} else {
			cartListResult[v.bookID] = {};
			cartListResult[v.bookID] = v;
			cartListResult[v.bookID].quantity = 1;
		}
	});
	let finalCart = [];
	Object.keys(cartListResult).forEach(function(key) {
		finalCart.push(cartListResult[key]);
	});
	return { finalCart };
};

export default connect(mapStateToProps)(CartList);
