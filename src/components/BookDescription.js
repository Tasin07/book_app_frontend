import { RatingStar } from "rating-star";
import { Popover } from "antd";
import { Item } from "rc-menu";
export default function BookDescription(props) {
	const book = props.book;
	return (
		<div>
			<div>Author : {book.authors}</div>
			<div>Language : {book.language_code}</div>

			<div>
				Rating:{" "}
				<RatingStar
					size="18"
					maxScore={5}
					id="123"
					rating={
						typeof book.average_rating === "number" ? book.average_rating : 1
					}
				/>
				<span>{book.ratings_count}</span>
			</div>
			<div>
				<strong style={{ color: "green" }}>price : {book.price}</strong>
			</div>

			{/* <Col span={3} align="center">
					<Popover content="Add to cart" trigger="hover">
						<ShoppingCartOutlined
							onClick={() => props.addToCart(book)}
							style={{ fontSize: "24px" }}
						/>
					</Popover>
				</Col> */}
		</div>
	);
}
