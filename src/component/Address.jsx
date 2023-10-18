import { Container } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react'
import NavbarComponent from './navbarAuthenticatedComponent';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from "react-hook-form";
import { useAddAddressMutation, useViewAddressQuery, useDeleteAddressMutation } from '../services/api';
// import axios from 'axios';
import Swal from 'sweetalert2'
import EditAddress from './EditAddress';

const Address = () => {
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axios.post('http://localhost:3001/api/delivery-address', {
    //             user,
    //             nama,
    //             kelurahan,
    //             kecamatan,
    //             kabupaten,
    //             provinsi,
    //             detail
    //         });
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Berhasil masuk akun',
    //             footer: '<a href="/">Kembali ke menu</a>'
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const [user, setUser] = useState("");
    // const [nama, setNama] = useState("");
    // const [kelurahan, setKelurahan] = useState("");
    // const [kecamatan, setKecamatan] = useState("");
    // const [kabupaten, setKabupaten] = useState("");
    // const [provinsi, setProvinsi] = useState("");
    // const [detail, setDetail] = useState("");


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [prosesAddAddress, { isLoading, isError, error, isSuccess }] = useAddAddressMutation();

    const onSubmit = (data) => {
        prosesAddAddress(data); 
    };

    const [listAddress, setListAddress] = useState('');

    const {
        data: dataAddress,
        isSuccess: isSuccessViewAddress,
        isLoading: isLoadingViewAddress,
        isError: isErrorViewAddress,
        error: ErrorViewAddress,
        refetch: RefetchViewAddress
    } = useViewAddressQuery();

    const [deleteAddress, {
        isError: isErrorDeleteAddress,
        error: ErrorDeleteAddress,
        isSuccess: isSuccessDeleteAddress
    }] = useDeleteAddressMutation();

    const onSubmitDelete = (id) => {
        deleteAddress(id).then((response) => {
            if (response.data) {
                RefetchViewAddress();
            }
        });
    };

    useEffect(() => {
        if (isSuccessDeleteAddress) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil menghapus address',
            });
            RefetchViewAddress();
        }

        if (isErrorDeleteAddress) {
            Swal.fire({
                icon: 'error',
                title: 'Menghapus address Gagal',
                text: ErrorDeleteAddress.data.message,
            });
        }
    }, [isErrorDeleteAddress, ErrorDeleteAddress, isSuccessDeleteAddress, RefetchViewAddress]);

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil menambahkan address',
            });
            RefetchViewAddress();
        }

        if (isError) {
            Swal.fire({
                icon: 'error',
                title: 'Menambahkan address Gagal',
                text: error.data.message,
            });
        }
    }, [isError, error, isSuccess, RefetchViewAddress]);

    useEffect(() => {
        if (isSuccessViewAddress) {
            setListAddress(dataAddress);
        }
    }, [isSuccessViewAddress, dataAddress, isErrorViewAddress, ErrorViewAddress]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isEdit, setIsEdit] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();

    const handleEditAddress = (data) => {
        handleShow();
        setSelectedAddress(data);
        setIsEdit(true);
    }
    return (
        <>
            <NavbarComponent />
            <Container>
                <Row>
                    <Col xs={8} className='mt-5'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>User</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="User"
                                    name="user"
                                    {...register('user', {
                                        required: "User harus diisi",
                                    })}
                                />
                                {errors.user && (
                                    <p style={{ color: 'red' }}>{errors.user.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nama"
                                    name="nama"
                                    {...register('nama', {
                                        required: "Nama harus diisi",
                                    })}
                                />
                                {errors.nama && (
                                    <p style={{ color: 'red' }}>{errors.nama.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Kelurahan</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Kelurahan"
                                    name="kelurahan"
                                    {...register('kelurahan', {
                                        required: "Kelurahan harus diisi",
                                    })}
                                />
                                {errors.kelurahan && (
                                    <p style={{ color: 'red' }}>{errors.kelurahan.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Kecamatan</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Kecamatan"
                                    name="kecamatan"
                                    {...register('kecamatan', {
                                        required: "Kecamatan harus diisi",
                                    })}
                                />
                                {errors.kecamatan && (
                                    <p style={{ color: 'red' }}>{errors.kecamatan.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Kabupaten</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Kabupaten"
                                    name="kabupaten"
                                    {...register('kabupaten', {
                                        required: "Kabupaten harus diisi",
                                    })}
                                />
                                {errors.kabupaten && (
                                    <p style={{ color: 'red' }}>{errors.kabupaten.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Provinsi</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Provinsi"
                                    name="provinsi"
                                    {...register('provinsi', {
                                        required: "Provinsi harus diisi",
                                    })}
                                />
                                {errors.provinsi && (
                                    <p style={{ color: 'red' }}>{errors.provinsi.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Detail</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Detail"
                                    name="detail"
                                    {...register('detail', {
                                        required: "Detail harus diisi",
                                    })}
                                />
                                {errors.detail && (
                                    <p style={{ color: 'red' }}>{errors.detail.message}</p>
                                )}
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                {isLoading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Loading...</span>
                                    </>
                                ) :
                                    'Submit'
                                }
                            </Button>
                            <Button href='/' className='mx-2'>Kembali</Button>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <div className='mt-5' style={{ overflowY: 'auto', height: '446px' }}>
                            {isLoadingViewAddress && 'Loading...'}
                            {isSuccessViewAddress && listAddress.data && listAddress.data.length === 0 && 'Kamu belum mempunyai address'}
                            {isSuccessViewAddress && listAddress.data && listAddress.data.map((hasil, i) =>
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
                                            <p className='mt-2' style={{ display: 'flex' }}>
                                                <i style={{ cursor: 'pointer', marginRight: '8px' }} onClick={() => { handleEditAddress(hasil) }}>
                                                    <Icon icon="fluent:edit-24-regular" width="16" height="16" className='text-neutral-700' />
                                                </i>
                                                <i style={{ cursor: 'pointer' }} onClick={() => onSubmitDelete(hasil._id)}>
                                                    <Icon icon="heroicons:trash" width="16" height="16" className='text-neutral-700' />
                                                </i>
                                            </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            {isEdit &&
                <Modal show={show} onHide={() => { handleClose(); setIsEdit(false); }}>
                    <EditAddress
                        addressSelected={selectedAddress}
                        onClose={() => { handleClose(); setIsEdit(false); }}
                        onUpdateSuccess={RefetchViewAddress}
                    />
                </Modal >
            }
        </>
    )
}

export default Address