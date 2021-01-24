import { Form, Input } from "antd";
import "./SearchBook.css";

export default function SearchBook(props) {
	const onFinish = val => {
		props.onInputChange(val.searchText);
	};
	const [form] = Form.useForm();
	form.setFieldsValue({
		searchText: props.searchInput
	});
	return (
		<div className="searchBoxDiv">
			<Form name="basic" onFinish={onFinish} form={form}>
				<Form.Item name="searchText">
					<Input placeholder="Search Books" />
				</Form.Item>
			</Form>
		</div>
	);
}
