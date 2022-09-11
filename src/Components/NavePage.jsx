import React from "react"
import { Routes, Route } from "react-router-dom"
import UserList from '../Pages/UserList'
import Home from '../Pages/Home'
import MaterialList from "../Pages/MaterialList"
import CompetitionList from "../Pages/CompetitionList"

const NavPage = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/materials" element={<MaterialList />} />
          <Route path="/competitions" element={<CompetitionList />} />
      </Routes>
    </>
  )
}

export default NavPage;