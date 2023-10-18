import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import getKategori from "./DataBase/Produk/GetKategori"
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/persistedAuthenticationSlice';


function NavbarComponent({ setSearchInput, searchInput, onCategorySelect }) {
  const dispatch = useDispatch();

  const [kategori, setKategori] = useState([])

  const isLoggedIn = useSelector((state) => state.persistedAuthentication.isLoggedIn);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const kategoriData = await getKategori();
        setKategori(kategoriData.data);
      } catch (error) {
        console.error('Error fetching kategori:', error);
      }
    };

    fetchKategori();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <Navbar className='Navbar' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href="/"><strong>Shop App</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Kategori" id="basic-nav-dropdown">
              {kategori.length > 0 && kategori.map((category, i) =>
                <NavDropdown.Item
                  key={i}
                  onClick={() => onCategorySelect(category._id)}
                >
                  {category.name}
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>

          <Form className="d-flex searchPanel">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} 
            />
          </Form>
          <div style={{ display: 'flex' }}>
            {!isLoggedIn &&
              <>
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
              </>
            }
            {isLoggedIn &&
              <>
                <div style={{ display: 'flex', cursor: 'pointer' }} onClick={handleLogout}>
                  <i style={{ color: 'white' }}>
                    <Icon icon="eva:power-fill" width="24" height="24" />
                  </i>
                  <span style={{ color: 'white' }}>
                    Logout
                  </span>
                </div>
                <div className='mx-2' style={{ display: 'flex', cursor: 'pointer' }}>
                  <Link to='/Address'>
                    <i style={{ color: 'white' }} >
                      <Icon icon="heroicons:map-pin" width="24" height="24" />
                    </i>
                    <span style={{ color: 'white' }}>
                      Address
                    </span>
                  </Link>
                </div>
              </>
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;