import { Table, Row, Col } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { getCartList } from "../redux/selectors";
import axios from "axios";

function CartList({ finalCart }) {
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {}
	};

	const redirectToPayment = () => {
		const data = {
			purpose: "Book payment",
			amount: totalPrice,
			buyer_name: "ajith",
			email: "a@a.com",
			phone: "9999999999",
			user_id: "1232323",
			redirect_url:
				"https://afternoon-badlands-78202.herokuapp.com/payment/success",
			webhook_url: "/webhook/"
		};
		axios
			.post("https://afternoon-forest-65061.herokuapp.com/paymentGateway", data)
			.then(res => {
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
	const totalPrice = finalCart.reduce((total, v) => total + v.price, 0);
	return (
		<div>
			<Table columns={columns} dataSource={finalCart} pagination={false} />
			<Row justify="end" style={{ paddingTop: 20 }}>
				<Col span={20}></Col>
				{finalCart.length > 0 && (
					<Col>
						<strong style={{ color: "green", padding: 40 }}>
							{" "}
							Total Cost: {totalPrice}
						</strong>
					</Col>
				)}
			</Row>
			<Button
				onClick={() => redirectToPayment()}
				type="primary"
				block
				disabled={finalCart.length === 0}
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
