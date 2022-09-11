import React from "react";
import { Routes , Route } from "react-router-dom";
import MainPage from "./Components/MainPage.jsx";
import PrivateRoutes from "./Components/PrivateRoutes";
import PrivateRoutes2 from "./Components/PrivateRoutes2";
import Login from "./Components/Login.jsx";
import UserList from "./Pages/UserList.jsx";
import './App.css'
import MaterialList from "./Pages/MaterialList.jsx";
import CompetitionList from "./Pages/CompetitionList.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<MainPage/>} path="/" >
            <Route element={<UserList />} path="/users" /> 
            <Route element={<MaterialList />} path="/materials" /> 
            <Route element={<CompetitionList />} path="/competitions" /> 
          </Route>
        </Route>
        <Route element={<PrivateRoutes2 />}>
          <Route element={<Login/>} path='/login' />
        </Route>
      </Routes>
    </>  
  );
}

export default App;
