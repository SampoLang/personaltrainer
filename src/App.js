
import './App.css';
import React from "react";
import CustomerList from "./components/customer/CustomerList"
import TrainingList from './components/training/TrainingList';
import DisplayData from "./components/DisplayData";
import BigCalendar from './components/BigCalendar';
import { Switch, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Drawer from "./components/Drawer";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
function App() {
  return (
    <div className='container'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Drawer />
          <Routes>
            <Route exact path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
            <Route path="/calendar" element={<BigCalendar />} />
            <Route path="/showdata" element={<DisplayData />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
