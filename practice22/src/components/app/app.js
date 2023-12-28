import './app.css';
import AppInfo from "../app-info/app-info";
import SearchFilter from "../search-filter/search-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                {
                    name: 'John Smith',
                    salary: 1500,
                    increase: false,
                    rise: true
                },
                {
                    name: 'Ivan Ivanov',
                    salary: 800,
                    increase: true,
                    rise: false
                },
                {
                    name: 'Erik Tamm',
                    salary: 2000,
                    increase: false,
                    rise: false
                }]
        }
    }

    deleteEmployee = (idx) => {
        this.setState(({employees}) => {
            return {
                employees: employees.filter((item, index) => index !== idx)
            }
        });
    }

    addEmployee = (newEmployee) => {
        this.setState(({employees}) => {
            return {
                employees: [...employees, newEmployee]
            }
        });
    }

    onToggleProp = (idx, prop) => {
        this.setState(({employees}) => ({
            employees: employees.map((item, index) => {
                if (index === idx) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }

    render() {
        return (
            <div className="app">
                <AppInfo total={this.state.employees.length}
                         increase={this.state.employees.filter(item => item.increase).length}
                />
                <div className="my-panel">
                    <SearchFilter/>
                </div>
                <div className="my-panel">
                    <EmployeesList
                        employees={this.state.employees}
                        onDelete={this.deleteEmployee}
                        onToggleProp={this.onToggleProp}
                    />
                </div>
                <div className="my-panel">
                    <EmployeesAddForm
                        onAdd={this.addEmployee}
                    />
                </div>
            </div>
        );
    }
}

export default App;