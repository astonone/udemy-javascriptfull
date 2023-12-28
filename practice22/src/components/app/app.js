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
                }],
            term: ''
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

    searchEmployee = (items, term) => {
        if (!term.trim().length) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onSearch = (term) => {
        this.setState({term});
    }

    render() {
        const {employees, term} = this.state;
        const visibleData = this.searchEmployee(employees, term);

        return (
            <div className="app">
                <AppInfo total={employees.length}
                         increase={employees.filter(item => item.increase).length}
                />
                <div className="my-panel">
                    <SearchFilter onSearch={this.onSearch}/>
                </div>
                <div className="my-panel">
                    <EmployeesList
                        employees={visibleData}
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