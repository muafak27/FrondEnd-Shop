import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useRegisterMutation } from '../services/api';
import NavbarComponent from './navbarAuthComponent';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const Register = () => {
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axios.post('http://localhost:3001/auth/register', {
    //             email,
    //             password,
    //             full_name
    //         });
    //         Swal.fire({icon: 'success',
    //         title: 'Berhasil membuat akun',
    //         footer: '<a href="/">Kembali ke menu</a>'})
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // console.log(inputs);
    // }

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [full_name, setFullName] = useState("");

    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [prosesRegister, { isLoading, isError, error, isSuccess }] = useRegisterMutation();

    const onSubmit = (data) => {
        prosesRegister(data); 
    };

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil membuat akun',
                footer: '<a href="/">Kembali ke menu</a>'
            });
        }

        if (isError) {
            Swal.fire({
                icon: 'error',
                title: 'Register Gagal',
                text: error.data.message,
                footer: '<a href="/">Kembali ke menu</a>'
            });
        }
    }, [isError, error, isSuccess]);


    return (
        <>
            <NavbarComponent />
            <Container className='mt-5'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            name="full_name"
                            {...register('full_name', {
                                required: "Username harus diisi",
                            })}
                        />
                        {errors.full_name && (
                            <p style={{ color: 'red' }}>{errors.full_name.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="email"
                            {...register('email', {
                                required: "Email harus diisi",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email tidak valid"
                                }
                            })}
                        />
                        {errors.email && (
                            <p style={{ color: 'red' }}>{errors.email.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            {...register('password', {
                                required: "Password harus diisi",
                            })}
                        />
                        {errors.password && (
                            <p style={{ color: 'red' }}>{errors.password.message}</p>
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
                            'Register'
                        }
                    </Button>
                    <Button href='/' className='mx-2'>Kembali</Button>
                </Form>
            </Container>
        </>
    );
}

export default Register;