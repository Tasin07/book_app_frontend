import { Layout, Menu, Breadcrumb } from "antd";
import MainContent from "./MainContent";
import CartList from "./CartList";
import { Avatar, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./TopNav.css";
import { connect } from "react-redux";
import { getCartLength } from "../redux/selectors";
const { Header, Content, Footer } = Layout;

function TopNav({ cartLength }) {
	const [cartCount, setCartCount] = useState(0);
	const [cartValue, setCartValue] = useState([]);

	const updateCartCount = val => {
		setCartCount(val);
	};

	const updateCart = val => {
		setCartValue(val);
	};

	return (
		<Router>
			<Layout>
				<Header
					className="header-style"
					style={{ position: "fixed", zIndex: 1, width: "100%" }}
				>
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
						<Menu.Item key="1">
							<Link to="/">Home</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Link to="/cart">
								Cart
								<span className="avatar-item">
									<Badge count={cartLength}>
										<ShoppingCartOutlined
											style={{
												color: "white",
												paddingLeft: "4px",
												marginTop: "2px",
												fontSize: "20px"
											}}
										/>
									</Badge>
								</span>
							</Link>
						</Menu.Item>
					</Menu>
				</Header>
				<Content
					className="site-layout navContent"
					style={{
						padding: "0 50px",
						marginTop: 64
					}}
				>
					<div
						className="site-layout-background"
						style={{ paddingTop: 24, minHeight: 380 }}
					>
						<Switch>
							<Route path="/payment/success">
								<h1>Payment succesfull</h1>
							</Route>
							<Route path="/cart">
								<CartList cartValue={cartValue} />
							</Route>
							<Route path="/">
								<MainContent
									updateCartCount={updateCartCount}
									updateCart={updateCart}
								/>
							</Route>
						</Switch>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</Router>
	);
}

const mapStateToProps = state => {
	const cartLength = getCartLength(state);
	return { cartLength };
};

export default connect(mapStateToProps)(TopNav);
