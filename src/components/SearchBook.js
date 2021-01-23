import { Form, Input } from "antd";
import "./SearchBook.css";

export default function SearchBook(props) {
	const onFinish = val => {
		props.onInputChange(val.searchText);
	};
	return (
		<div className="searchBoxDiv">
			<Form
				name="basic"
				onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
			>
				<Form.Item name="searchText">
					<Input value={props.searchInput} placeholder="Search Books" />
				</Form.Item>
			</Form>
		</div>
	);
}
