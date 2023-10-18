import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/persistedCartSlice';
import { Col, Row, Container } from 'react-bootstrap';
import NavbarComponent from './navbarComponent';
import HasilProduk from './BodyMain/Hasil';
import ListTags from './BodyMain/ListTags';
import getProduk from './DataBase/Produk/GetProduk';
import MainTags from './BodyMain/MainTags';
import { FormatRupiah } from "@arismun/format-rupiah";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Cart from './BodyMain/Cart';

const MainComponent = () => {
    const dispatch = useDispatch();

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const res = await getProduk();
                setMenus(res);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMenus();
    }, []);

    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleTagClick = (tagId) => {
        setSelectedTag(tagId);
        setSelectedCategory(null);
        setCurrentPage(0);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedTag(null);
        setCurrentPage(0);
    };

    const handleViewAll = () => {
        setSelectedCategory(null);
        setSelectedTag(null);
        setSearchInput('');
    };

    const addToCart = (produk) => {
        dispatch(setCart(produk));
    }

    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        let filteredData = menus?.data?.data || [];

        if (searchInput) {
            setCurrentPage(0);
            setSelectedCategory('');
            setSelectedTag('');
            filteredData = filteredData.filter((data) =>
                data.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        if (selectedTag) {
            setSelectedCategory('');
            filteredData = filteredData.filter((data) =>
                data.tags.some((tag) => tag._id === selectedTag)
            );
        }

        if (selectedCategory) {
            setSelectedTag('');
            filteredData = filteredData.filter((data) =>
                data.category._id === selectedCategory
            );
        }

        return filteredData;
    }, [menus, searchInput, selectedTag, selectedCategory]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginatedMenus = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = (currentPage + 1) * itemsPerPage;

        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, itemsPerPage]);


    return (
        <div>
            <NavbarComponent
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                onCategorySelect={handleCategorySelect}
            />
            <div className='mt-3 colItems'>
                <Container fluid>
                    <Row>
                        <ListTags />
                        <div>
                            <Col className='ColItems2' md={6} mt="2">
                                <h4><strong>Daftar Produk</strong></h4>
                                <hr />
                            </Col>
                        </div>
                        <HasilProduk />
                    </Row>
                </Container>
                <div className='bodyBox'>
                    <Container fluid className='boxMain'>
                        <div className='boxTool'>
                            <div className='boxLeft'>
                                <MainTags onTagClick={handleTagClick} onViewAll={handleViewAll} />
                            </div>
                            <div className='boxJustify'>
                                <div className='pagination-container'>
                                    <Pagination>
                                        <Pagination.Prev
                                            onClick={() => handlePageClick({ selected: currentPage - 1 })}
                                            disabled={currentPage === 0}
                                        />
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <Pagination.Item
                                                key={i}
                                                active={i === currentPage}
                                                onClick={() => handlePageClick({ selected: i })}
                                            >
                                                {i + 1}
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Next
                                            onClick={() => handlePageClick({ selected: currentPage + 1 })}
                                            disabled={currentPage === totalPages - 1}
                                        />
                                    </Pagination>

                                </div>
                                <Container className='mainCard'>
                                    {paginatedMenus && paginatedMenus.map((data, i) => (
                                        <Card key={i} >
                                            <Card.Img variant="top" src={`http://localhost:3001/images/products/${data.image_url}`} />
                                            <Card.Body>
                                                <Card.Title>{data.name}</Card.Title>
                                                <Card.Text><FormatRupiah value={data.price} /></Card.Text>
                                                <Button variant="primary" onClick={() => addToCart(data)}>Beli</Button>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Container>
                            </div>
                            <div className='boxRight'>
                                <Cart />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default MainComponent;
