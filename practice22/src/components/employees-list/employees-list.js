import {Card, List} from 'antd';
import EmployeesListItem from "../employees-list-item/employees-list-item";
import {Component} from "react";

class EmployeesList extends Component {

    render() {
        const {employees, onDelete} = this.props;
        return (
            <Card>
                <List
                    itemLayout="horizontal"
                    dataSource={employees}
                    renderItem={(item, index) => (
                        <EmployeesListItem item={item} index={index} onDelete={() => onDelete(index)}/>
                    )}
                />
            </Card>
        );
    }
}

export default EmployeesList;