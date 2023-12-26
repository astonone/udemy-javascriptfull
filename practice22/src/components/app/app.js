import './app.css';
import AppInfo from "../app-info/app-info";
import SearchFilter from "../search-filter/search-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

function App() {
    return (
        <div className="app">
            <AppInfo/>
            <div className="my-panel">
                <SearchFilter/>
            </div>
            <div className="my-panel">
                <EmployeesList/>
            </div>
            <div className="my-panel">
                <EmployeesAddForm/>
            </div>
        </div>
    );
}

export default App;