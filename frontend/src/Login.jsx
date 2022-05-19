import axios from 'axios';
import { React, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Input,
    Button,
    FormFeedback,
    Col,
    Row,
    Container,
} from 'reactstrap';

export default function Login() {
    const navigate = useNavigate();
    const [mailError, setMailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        async onSubmit(values) {
            await axios
                .post('/users/login', {
                    email: values.email,
                    password: values.password,
                })
                .then((res) => {
                    console.log(res.data);
                    navigate('/home', {
                        state: {
                            token: res.data.jwtToken,
                            id: res.data.userExists.id,
                        },
                    });
                })
                .catch((errors) => {
                    console.log(errors.response.data);
                    const errormsg = errors.response.data.message;
                    if (errormsg === 'Invalid Password') {
                        setPassError(true);
                    } else {
                        setMailError(true);
                    }
                });
        },
    });
    return (
        <Container
            style={{
                background: 'linear-gradient(275deg,#dae2f8,#D6A4A4 )',
                // background: 'linear-gradient(45deg,#757F9A,#D7DDE8 )',
                // background: 'linear-gradient(45deg,#003973, #E5E5BE)',
                height: '100vh',
                paddingTop: '12%',
            }}
            fluid
        >
            <Row
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Col
                    lg={4}
                    className="d-lg-block d-none "
                    style={{ padding: '0px' }}
                >
                    <img
                        alt="Login pagePicture"
                        src="https://www.poweredbysearch.com/wp-content/uploads/2019/12/customer-content-fit-workshop.jpg"
                        width="100%"
                        height="300px"
                    />
                </Col>
                <Col
                    lg={4}
                    md={7}
                    sm={7}
                    xs={8}
                    style={{
                        backgroundColor: 'white',
                        paddingTop: '2%',
                        height: '300px',
                    }}
                >
                    <Form onSubmit={formik.handleSubmit}>
                        <h3>Inventory App</h3>
                        <FormGroup>
                            <Input
                                invalid={mailError}
                                id="exampleEmail"
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                required
                            />
                            <FormFeedback>
                                Please Enter a valid Email
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                invalid={passError}
                                id="examplePassword"
                                name="password"
                                placeholder="Password "
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                required
                            />
                            <FormFeedback>Incorrect Password</FormFeedback>
                        </FormGroup>
                        <Button
                            type="submit"
                            style={{ width: '100%' }}
                            color="primary"
                        >
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
