import { List } from "antd";
import "./BookList.css";

import BookCard from "./BookCard";

function BookList(props) {
	return (
		<div className="bookListDiv">
			<List
				grid={{
					gutter: 20,
					xs: 1,
					sm: 2,
					md: 2,
					lg: 3,
					xl: 4,
					xxl: 4
				}}
				dataSource={props.bookList.slice(0, 20)}
				renderItem={item => (
					<List.Item>
						<BookCard book={item} />
					</List.Item>
				)}
			/>
		</div>
	);
}

export default BookList;
