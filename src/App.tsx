import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Components/sidebar/Sidebar";
import AllEmployees from "./Pages/AllEmployees/AllEmployees";
import AddNewEmployee from "./Pages/AllEmployees/AddNewEmployee";
import Jobs from "./Pages/Jobs/Jobs";
import Settings from "./Pages/Settings/Settings";
import EmployeeDetails from "./Pages/Employees/EmployeeDetails";
const PayrollWrapper = React.lazy(() => import("./Pages/Payroll/Payroll"));
import UserProfile from "./Pages/user/UserProfile";
import AllUsers from "./Pages/allusers/AllUsers";
import Bookmarks from "./Pages/user/Bookmarks";
import Dashboard from "./Pages/user/Dashboard";
import Downloads from "./Pages/user/Downloads";
import Profile from "./Pages/user/Profile";

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState("All Users");
  const location = useLocation();

  // Update active page based on route
  useEffect(() => {
    if (location.pathname === '/') {
      setActivePage('All Users');
    } else if (location.pathname.startsWith('/users/') && location.pathname.endsWith('/downloads')) {
      setActivePage('Downloads');
    } else if (location.pathname.startsWith('/users/') && location.pathname.endsWith('/bookmarks')) {
      setActivePage('Bookmarks');
    } else if (location.pathname.startsWith('/users/')) {
      setActivePage('User Profile');
    } else {
      setActivePage('Dashboard');
    }
  }, [location]);
  
  return (
    <div className="flex h-full w-full bg-[#FFFFFF] overflow-auto">
      {/* Fixed Sidebar */}
      <div className="w-[320px] flex-shrink-0">
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-3 pl-0">
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/all-employees" element={<AllEmployees/>}/>
          <Route path="/users/:userId/profile" element={<Profile />} />
          <Route path="/users/:userId/downloads" element={<Downloads />} />
          <Route path="/users/:userId/bookmarks" element={<Bookmarks />} />
          <Route path="/users/:userId/dashboard" element={<Dashboard />} />
          <Route path="/add-new-employee" element={<AddNewEmployee />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payroll" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <PayrollWrapper />
            </React.Suspense>
          } />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
