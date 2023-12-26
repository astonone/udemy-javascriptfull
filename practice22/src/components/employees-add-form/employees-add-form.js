import {Button, Card, Form, Input, Typography} from "antd";

const EmployeesAddForm = () => {
    const [form] = Form.useForm();

    return (
        <Card style={{background: '#bae0ff'}}>
            <Typography.Title level={3}>
                Add new employee
            </Typography.Title>
            <Form
                layout="inline"
                form={form}
            >
                <Form.Item label="Name">
                    <Input placeholder="Enter name"/>
                </Form.Item>
                <Form.Item label="Salary">
                    <Input placeholder="Enter salary"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Add</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default EmployeesAddForm;
