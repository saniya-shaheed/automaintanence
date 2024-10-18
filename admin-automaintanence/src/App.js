import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'
import AddCustomer from "./Components/AddCustomer/AddCustomer";
import AddExpense from "./Components/AddExpense/AddExpense";
import NavbarAdmin from "./Components/NavbarAdmin/NavbarAdmin";
import SidebarAdmin from "./Components/SidebarAdmin/SidebarAdmin";
import AdminCustomer from "./Components/AdminCustomer/AdminCustomer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminDAF" element={<AdminLogin />} />
        </Routes>
        <NavbarAdmin />
        <SidebarAdmin />
        <Routes>
        <Route path="/adminDAF/dashboard" element={<AdminDashboard />} />
        <Route path="/adminDAF/customers/add-customer" element={<AddCustomer />} />
        <Route path="/adminDAF/customers" element={<AdminCustomer />} />
        <Route path="/adminDAF/add-expense" element={<AddExpense />} />
        
      </Routes>
    </Router>
  );
}

export default App;
