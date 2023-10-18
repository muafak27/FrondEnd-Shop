import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormatRupiah } from "@arismun/format-rupiah";
import { clear, tambahSatu, kurangSatu } from '../../redux/persistedCartSlice';
import { useViewAddressQuery } from '../../services/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

const Cart = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.persistedCart.cart);

    const isLoggedIn = useSelector((state) => state.persistedAuthentication.isLoggedIn);

    useEffect(() => {

        const hitungTotalPesanan = () => {
            const total = Object.values(cart).reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);

            setTotalPesanan(total);
        }

        hitungTotalPesanan();
    }, [cart]);

    const clearCart = () => {
        dispatch(clear());
    }

    const addOne = (productId) => {
        dispatch(tambahSatu(productId));
    }

    const removeOne = (productId) => {
        dispatch(kurangSatu(productId));
    }

    const [totalPesanan, setTotalPesanan] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);


    const [listAddress, setListAddress] = useState('');

    const {
        data: dataAddress,
        isSuccess: isSuccessViewAddress,
        isLoading: isLoadingViewAddress,
        isError: isErrorViewAddress,
        error: ErrorViewAddress
    } = useViewAddressQuery();


    useEffect(() => {
        if (isSuccessViewAddress) {
            setListAddress(dataAddress);
        }
    }, [isSuccessViewAddress, dataAddress, isErrorViewAddress, ErrorViewAddress]);

    const [selectedAddress, setSelectedAddress] = useState('');
    return (
        <div>
            <div className='cartCardHeader'>
                <h5>
                    <strong>Keranjang</strong>
                </h5>
                {isLoggedIn && Object.values(cart).length > 0 &&
                    <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={clearCart}>
                        <strong>Kosongkan</strong>
                    </span>
                }
            </div>
            {isLoggedIn && (
                <>
                    {Object.values(cart).length > 0 ?
                        <>
                            <div className='cartCard'>
                                <div style={{ fontSize: '18px' }}>Nama Menu</div>
                                <div style={{ fontSize: '18px' }}>Jumlah</div>
                                <div style={{ fontSize: '18px' }}>Harga</div>
                            </div>
                            {Object.values(cart).map((item) => (
                                <div key={item._id} className="cartCardItem">
                                    <div style={{ fontSize: '18px' }}>{item.name}</div>
                                    <div style={{ fontSize: '18px', display: 'flex' }}>
                                        <span style={{ cursor: 'pointer', marginRight: '6px' }} onClick={() => removeOne(item._id)}>-</span>
                                        {item.quantity}
                                        <span style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => addOne(item._id)}>+</span>
                                    </div>
                                    <div style={{ fontSize: '18px' }}>
                                        <FormatRupiah value={item.price * item.quantity} />
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
                                <div style={{ fontSize: '18px' }}>Total pesanan</div>
                                <div style={{ fontSize: '18px', paddingRight: '4px' }}>
                                    <FormatRupiah value={totalPesanan} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end', paddingTop: '16px' }}>
                                <Button variant="dark" onClick={handleShow}>Bayar Sekarang</Button>
                            </div>
                        </> : 'Keranjang pesanan kosong'
                    }
                </>
            )}
            {!isLoggedIn &&
                <div>Login untuk melihat keranjang pesanan</div>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedAddress ? 'Address '+selectedAddress.nama+' dipilih' : 'Pilih Address'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoadingViewAddress && 'Loading address...'}
                    {isSuccessViewAddress &&
                        <div style={{ overflowY: 'auto', height: '446px' }}>
                            {listAddress.data && listAddress.data.map((hasil, i) =>
                                <Card
                                    bg={'Secondary'}
                                    text='dark'
                                    className="mb-2"
                                    key={i}
                                >
                                    <Card.Header>Address {i + 1}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{hasil.nama}</Card.Title>
                                        <Card.Text style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{hasil.detail}</span>
                                            <span>{hasil.kelurahan}, {hasil.kecamatan},</span>
                                            <span>{hasil.kabupaten}, {hasil.provinsi}</span>
                                            <h6 className='mt-2' style={{cursor: 'pointer'}} onClick={() => { setSelectedAddress(hasil); }}>
                                                <strong>Pilih Address</strong>
                                            </h6>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Cart