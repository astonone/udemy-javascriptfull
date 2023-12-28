import {Card, List} from 'antd';
import EmployeesListItem from "../employees-list-item/employees-list-item";

const EmployeesList = ({employees, onDelete, onToggleProp}) => {

    return (
        <Card>
            <List
                itemLayout="horizontal"
                dataSource={employees}
                renderItem={(item, index) => (
                    <EmployeesListItem
                        item={item}
                        index={index}
                        onDelete={() => onDelete(item.id)}
                        onToggleProp={(e) => onToggleProp(item.id, e.currentTarget.getAttribute('data-toggle'))}
                    />
                )}
            />
        </Card>
    );
}

export default EmployeesList;