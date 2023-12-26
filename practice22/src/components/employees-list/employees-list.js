import {Card, List} from 'antd';
import EmployeesListItem from "../employees-list-item/employees-list-item";

const EmployeesList = () => {
    const data = [
        {
            name: 'John Smith',
            salary: 1000
        },
        {
            name: 'Ivan Ivanov',
            salary: 800
        },
        {
            name: 'Erik Tamm',
            salary: 1200
        }];
    return (
        <Card>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <EmployeesListItem item={item} index={index}/>
                )}
            />
        </Card>
    );
}

export default EmployeesList;