import React from 'react'
import { SidebarData } from '../data/SideBarData'
import { NavLink } from "react-router-dom";
import { Col, Button } from 'reactstrap'
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './SideBar.css'
import LOGO from '../images/d5ee0e9c87bb54cf867d7fb89c4570b8-online-education-logo.png'

const Sidebar = () => {

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  } 
  return (
    <Col lg={2} >
      <div className='sideBar'>
        <div className='d-flex align-items-center justify-content-start gap-2 mb-4 px-2'>
          <img src={LOGO} alt="logo-img" className='logoImg' />
          <p className='logoText mt-3'> 
            E-learning
          </p> 
        </div>
        {
          SidebarData.map((item, index)=>{
            return( 
                <div key={index}> 
                  <NavLink to={item.path} className={({ isActive }) => isActive 
                  ?
                  'activebtn d-flex align-items-center justify-content-start mb-4 nav-link d-flex gap-2 px-4' 
                  :
                  'notactivebtn d-flex align-items-center justify-content-start mb-4 nav-link d-flex gap-2 px-4'
                  }>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                  </NavLink>
                </div>
            )
          })
        }
        <Button 
        className='d-flex align-items-center justify-content-center gap-2 bg-danger border-light px-5 py-2'
        style={{marginTop:180,marginLeft:20}}
        onClick={() => logoutHandler()} 
        >
          <LogoutOutlined />
          LOGOUT
        </Button>
      </div>
    </Col>
  )
}

export default Sidebar