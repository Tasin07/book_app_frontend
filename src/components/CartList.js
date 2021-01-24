import { Table, Row, Col, Input, Modal, Form, InputNumber } from "antd";
import React, { useState } from "react";
import { Button, message } from "antd";
import { connect } from "react-redux";
import { getCartList } from "../redux/selectors";
import axios from "axios";
import "./CartList.css";

function CartList({ finalCart }) {
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {}
	};
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);

	const handlePayment = async () => {
		console.log(await form.validateFields());
		redirectToPayment();
	};

	const redirectToPayment = () => {
		var hide = message.loading("Action in progress..", 0);
		var userDetails = form.getFieldsValue();
		const data = {
			purpose: "Book payment",
			amount: totalPrice,
			buyer_name: "ajith",
			email: userDetails.email,
			phone:
				userDetails.phoneno.length != 0 ? "1234567890" : userDetails.phoneno,
			user_id: "1232323",
			redirect_url: "https://bookwebcart.herokuapp.com/payment/success",
			webhook_url: "/webhook/"
		};
		axios
			.post("https://afternoon-forest-65061.herokuapp.com/paymentGateway", data)
			.then(res => {
				message.destroy(hide);
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
			<Table
				scroll={{ x: 1500, y: 300 }}
				style={{ "table-layout": "fixed" }}
				columns={columns}
				dataSource={finalCart}
				pagination={false}
			/>
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
				onClick={() => setModalVisible(true)}
				type="primary"
				block
				disabled={finalCart.length === 0}
				style={{ marginTop: 20 }}
			>
				Checkout
			</Button>
			<Modal
				title="Payment Details"
				centered
				visible={modalVisible}
				onOk={() => handlePayment()}
				onCancel={() => setModalVisible(false)}
			>
				<Form name="basic" form={form}>
					<Form.Item
						label="Email:"
						name="email"
						rules={[
							{
								type: "email",
								required: true,
								message: "Please input valid email!"
							}
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Phone No:"
						name="phoneno"
						rules={[
							{
								type: "number",
								required: true,
								message: "Please input valid phone number!"
							}
						]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
				</Form>
			</Modal>
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
