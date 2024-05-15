import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListOfStudents from './components/ListOfStudents';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/common/Login';
import AuthProvider from './hooks/AuthProvider';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';
import Homepage from './components/common/Homepage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route path='*' element={<Homepage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
