import React from "react";
import NavPage from "./NavePage";
import SideBar from './SideBar'
import { Row , Container } from 'reactstrap'
//store
import { useSelector } from 'react-redux';

const MainPage = () => {
  
  const globalState = useSelector((state) => state);
  const sideBar = () => {
  return globalState.sideBar.isExpand;
  };
  

  return (
    <Container fluid>
      <Row> 
        {sideBar() && <SideBar />}
        <NavPage /> 
      </Row> 
    </Container>
  )
};

export default MainPage;