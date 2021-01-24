import { Card, notification } from "antd";
import { connect } from "react-redux";
import { addToCart } from "../Actions/actions";

import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	ShoppingCartOutlined,
	EyeOutlined
} from "@ant-design/icons";

import BookDescription from "./BookDescription";

const images = [
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/red-book-hi8d6431a.png"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/indexa51d5d7.jpeg"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/blue-book-hic09def7.png"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/blue-book-reading-hid3b6f09.png"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/green-book-reading-hiec1b149.png"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/closed-book-cartoon-vector-symbol-icon-design-beautiful-illustr-illustration-isolated-white-background-975033320bc2a72.jpeg"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/inex290acda.jpeg"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/f958c0ca1c1701d236796ed90542a21940742f7.jpeg"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/index5848f8e.png"
	},
	{
		Image:
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/2511916-orange-book-cartoon6cc76e1.jpeg"
	}
];

const { Meta } = Card;

function BookCard(props) {
	const book = props.book;
	const image_url = images[Math.floor(Math.random() * 11)];
	let final_url = "";
	if (!image_url) {
		final_url = images[0].Image;
	} else {
		final_url = image_url.Image;
	}

	const handleAddToCart = v => {
		props.addToCart(book);
		openNotification();
	};

	const openNotification = () => {
		notification["success"]({
			message: "Added to cart successfully",
			bottom: 0
		});
	};
	return (
		<div>
			<Card
				style={{ width: 290 }}
				cover={<img alt="example" width="50" height="150" src={final_url} />}
				actions={[
					<ShoppingCartOutlined
						style={{ cursor: "pointer" }}
						onClick={v => handleAddToCart()}
						key="ellipsis"
					/>
				]}
			>
				<Meta
					title={book.title}
					description={<BookDescription book={book} />}
				/>
			</Card>
		</div>
	);
}

export default connect(null, { addToCart })(BookCard);
