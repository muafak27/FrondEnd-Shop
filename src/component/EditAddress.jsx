import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useEditAddressMutation } from '../services/api';
import Swal from 'sweetalert2'

const EditAddress = ({ addressSelected, onClose, onUpdateSuccess }) => {

    const user = useSelector((state) => state.persistedAuthentication.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        if (addressSelected) {
            setValue('id', user._id);
            setValue('user', addressSelected.user);
            setValue('nama', addressSelected.nama);
            setValue('kelurahan', addressSelected.kelurahan);
            setValue('kecamatan', addressSelected.kecamatan);
            setValue('kabupaten', addressSelected.kabupaten);
            setValue('provinsi', addressSelected.provinsi);
            setValue('detail', addressSelected.detail);
        }
    }, [addressSelected, setValue, user])

    const [prosesUpdateAddress, { isLoading, isError, error, isSuccess }] = useEditAddressMutation();

    const onSubmit = (data) => {
        const requestData = {
            data: data,
            id: addressSelected._id,
        };
        prosesUpdateAddress(requestData); 
    };

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil mengupdate address',
            });
            onUpdateSuccess();
        }

        if (isError) {
            Swal.fire({
                icon: 'error',
                title: 'Mengupdate address Gagal',
                text: error.data.message,
            });
        }
    }, [isError, error, isSuccess, onUpdateSuccess]);

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
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
                            'Save Changes'
                        }
                    </Button>
                </Modal.Footer>
            </Form>
        </>
    )
}

export default EditAddress
