import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavbarAuthComponent = () => {
    const isLoggedIn = useSelector((state) => state.persistedAuthentication.isLoggedIn);

    const user = useSelector((state) => state.persistedAuthentication.user);
    return (
        <Navbar className='Navbar' variant='dark' expand='lg'>
            <Container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isLoggedIn &&
                    <Navbar.Brand><strong>{user.full_name}</strong></Navbar.Brand>
                }
            </Container>
        </Navbar>
    );
}

export default NavbarAuthComponent;
