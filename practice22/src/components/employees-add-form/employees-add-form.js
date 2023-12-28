import {Button, Card, Form, Input, Typography} from "antd";
import {Component} from "react";

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        this.props.onAdd({
            name: this.state.name,
            salary: this.state.salary,
            increase: false
        });
        this.setState({
            name: '',
            salary: ''
        })
    }


    render() {
        const {name, salary} = this.props;

        return (
            <Card style={{background: '#bae0ff'}}>
                <Typography.Title level={3}>
                    Add new employee
                </Typography.Title>
                <Form
                    layout="inline"
                    onFinish={this.onSubmit}
                >
                    <Form.Item label="Name">
                        <Input placeholder="Enter name" name="name" value={name} onChange={this.onValueChange}/>
                    </Form.Item>
                    <Form.Item label="Salary">
                        <Input placeholder="Enter salary" name="salary" value={salary} onChange={this.onValueChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default EmployeesAddForm;
