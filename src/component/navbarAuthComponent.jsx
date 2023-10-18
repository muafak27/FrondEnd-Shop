import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/persistedAuthenticationSlice';

const NavbarAuthComponent = () => {
    const dispatch = useDispatch();


    const isLoggedIn = useSelector((state) => state.persistedAuthentication.isLoggedIn);
    const user = useSelector((state) => state.persistedAuthentication.user);

    const handleLogout = () => {
      dispatch(logout());
    };
    return (
        <Navbar className='Navbar' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand><strong>{isLoggedIn ? user.full_name : 'Guest'}</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <div style={{ display: 'flex' }}>
                        {!isLoggedIn &&
                            <Link to='/login'>
                                <div style={{ display: 'flex', marginRight: '16px', }}>
                                    <i style={{ color: 'white', marginRight: '4px' }}>
                                        <Icon icon="material-symbols:lock-outline" width="24" height="24" />
                                    </i>
                                    <span style={{ color: 'white' }}>
                                        Login
                                    </span>
                                </div>
                            </Link>
                        }
                        <Link to='/register'>
                            <div style={{ display: 'flex', marginRight: '16px', }}>
                                <i style={{ color: 'white', marginRight: '4px' }}>
                                    <Icon icon="ci:user-add" width="24" height="24" />
                                </i>
                                <span style={{ color: 'white' }}>
                                    Register
                                </span>
                            </div>
                        </Link>
                        {isLoggedIn &&
                            <div style={{ display: 'flex', cursor: 'pointer' }}  onClick={handleLogout}>
                                <i style={{ color: 'white' }}>
                                    <Icon icon="eva:power-fill" width="24" height="24" />
                                </i>
                                <span style={{ color: 'white' }}>
                                    Logout
                                </span>
                            </div>
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarAuthComponent;
