import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListOfStudents from './components/ListOfStudents';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/Login';
import AuthProvider from './hooks/AuthProvider';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute children={undefined} />}>
              <Route path="/students" element={<ListOfStudents />} />
              <Route path="/" element={<ListOfStudents />} />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>

  );
}

export default App;
