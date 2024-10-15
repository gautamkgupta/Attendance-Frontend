import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'jquery/dist/jquery.min.js';

// LoginLayOut:
import LoginLayout from './layouts/LoginLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// LayOut:
import HomeLayout from './layouts/HomeLayout';
import AdminLayout from './layouts/AdminLayout';

// 1. Dashboard:
import Biometric from './pages/Dashboard/Biometric';
import Overview from './pages/Dashboard/Overview';
import Attendance from './pages/Dashboard/Attendance';
import Regularization from './pages/Dashboard/Regularization';
import ApplyRegularization from './pages/Dashboard/Apply-regularization';
import LeaveStatus from './pages/Dashboard/LeaveStatus';
import TaskList from './pages/Dashboard/TaskList';
import Timesheet from './pages/Dashboard/Timesheet';

// 2. Profile:
import MyProfile from './pages/Profile/MyProfile';
import IdentityCard from './pages/Profile/IdentityCard';
import GetResume from './pages/Profile/GetResume';

// Admin Route
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminAttendance from './pages/Admin/AdminAttendance';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="success" element={<Success />} />
          <Route path="failed" element={<Failed />} /> */}
          <Route path="/auth" element={<LoginLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="" element={<HomeLayout />}>
            <Route index element={<Biometric />} />
            <Route path="overview" element={<Overview />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="regularization" element={<Regularization />} />
            <Route path="regularization/apply-regularization/:userId/:email/:date" element={<ApplyRegularization />} />
            <Route path="leave_status" element={<LeaveStatus />} />
            <Route path="task_list" element={<TaskList />} />
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="/profile/myprofile" element={<MyProfile />} />
            <Route path="/profile/identitycard" element={<IdentityCard />} />
            <Route path="/profile/resume" element={<GetResume />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="attendance" element={<AdminAttendance />} />
          </Route>

          {/* <Route path="*" element={<Navigate to="" replace />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
