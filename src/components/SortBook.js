import { Select, Row, Col, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
const { Option } = Select;

export default function SortBook(props) {
	const onChange = page => {
		console.log(page);
	};
	return (
		<Row style={{ width: "100%", padding: "0px 40px" }}>
			<Col span={20}>
				<Pagination
					size="small"
					onChange={onChange}
					total={props.bookListLength}
					showSizeChanger={false}
					showQuickJumper
				/>
			</Col>

			<Col justify="end">
				{/* <Button type="primary" icon={<ClearOutlined />}>
					Clear Search
				</Button> */}
				<Select
					defaultValue="-- Sort Books --"
					align="right"
					style={{ width: 200, paddingLeft: "40px" }}
					onChange={v => props.handleChange(v)}
				>
					<Option value="sortBook">--clear filter--</Option>
					<Option value="highRated">Best Rated</Option>
					<Option value="lowPrice">Lowest price First</Option>
					<Option value="highPrice">Highest Price First</Option>
				</Select>
			</Col>
		</Row>
	);
}
