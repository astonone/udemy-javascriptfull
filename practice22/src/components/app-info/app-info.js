import {Card, Typography} from "antd";

const AppInfo = ({total, increase}) => {
    return (
        <Card style={{background: '#bae0ff'}}>
            <Typography.Title level={2} style={{margin: 0}}>
                Accounting of employees in the company N
            </Typography.Title>
            <Typography.Title level={3} style={{margin: 0}}>
                Total number of employees: {total}
            </Typography.Title>
            <Typography.Title level={3} style={{margin: 0}}>
                The rise will get: {increase}
            </Typography.Title>
        </Card>
    );
}

export default AppInfo;