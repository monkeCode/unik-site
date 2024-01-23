import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Button
} from "reactstrap";
import { EmployeeProfile, RecruterProfile } from './Profile';
function NavMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`/api/getme`).then((response) => {
                if(response.status === 200)
                    setUser(response.data);
    }).catch((error) => {})}, [isOpen]);

    const toggle = () => {

        setIsOpen(!isOpen);
    }

    let offcanvasData = (<>
    <p>Вы не авторизированны</p>
    <NavLink href='/login'>Войти</NavLink>
    </>);
    if (user !== null)
    {
        offcanvasData = (<>
            {user.type === 'employee'?(<EmployeeProfile user={user}/>):(<RecruterProfile user={user}/>)}
        </>)
    }
  
    return (
      <div>
        <Navbar dark color="dark">
          <NavbarBrand href="/">Главная</NavbarBrand>
            <Nav className="me-auto" tabs >
              <NavItem>
                <NavLink href="/vacancies/" >Вакансии</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/companies">
                  Компании
                </NavLink>
              </NavItem>
            </Nav>
            <Button onClick={toggle}>
                Профиль
            </Button>
        </Navbar>
        <Offcanvas
    backdrop={true}
    direction="end"
    isOpen={isOpen}
    toggle={toggle}
  >
    <OffcanvasHeader toggle={toggle}  >
      Профиль
    </OffcanvasHeader>
    <OffcanvasBody>
        {offcanvasData}
    </OffcanvasBody>
  </Offcanvas>
      </div>
    );
  }
  
  export default NavMenu;