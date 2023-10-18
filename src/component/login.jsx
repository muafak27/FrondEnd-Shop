import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/api';
import { setAuthenticated } from '../redux/persistedAuthenticationSlice';
import NavbarComponent from './navbarAuthComponent';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const Login = () => {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axios.post('http://localhost:3001/auth/login', {
    //             email,
    //             password
    //         });
    //         Swal.fire({icon: 'success',
    //         title: 'Berhasil masuk akun',
    //         footer: '<a href="/">Kembali ke menu</a>'})
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // fetch('http://localhost:3001/auth/login',{
    //     //     method : 'POST',
    //     //     headers: {
    //     //         'Content-Type' : 'application/json'
    //     //     },
    //     //     body: JSON.stringify(email, password)
    //     // }).then(response => response.json())
    //     // .then(result => {
    //     //     console.log(result);
    //     // })
    // }

    // Mengimpor hook 'useDispatch' dari Redux untuk mengirim aksi
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [prosesLogin, { isLoading, isError, data, error, isSuccess }] = useLoginMutation();

    const onSubmit = (data) => {
        prosesLogin(data); 
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                setAuthenticated({
                    isLoggedIn: true,
                    user: data.user,
                    token: data.token
                })
            );

            Swal.fire({
                icon: 'success',
                title: 'Berhasil masuk akun',
                footer: '<a href="/">Kembali ke menu</a>'
            });
        }

        if (isError) {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: error.data.message,
                footer: '<a href="/">Kembali ke menu</a>'
            });
        }
    }, [isError, error, isSuccess, data, dispatch]);

    return (
        <>
            <NavbarComponent />
            <Container className='mt-5'>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                            'Login'
                        }
                    </Button>
                    <Button href='/' className='mx-2'>Kembali</Button>
                </Form>
            </Container>
        </>
    )
}

export default Login