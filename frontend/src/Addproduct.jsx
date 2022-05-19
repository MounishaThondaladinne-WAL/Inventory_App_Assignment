import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { React, useState, useContext } from 'react';
import {
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    FormFeedback,
} from 'reactstrap';
import ItemContext from './ItemsContext';

export default function AddProduct() {
    const [modal, setModal] = useState(false);
    const [imgerr, setImgErr] = useState(false);
    const [productImage, setImage] = useState('');
    const toggle = () => setModal(!modal);
    const location = useLocation();
    const navigate = useNavigate('/');
    const { getItems } = useContext(ItemContext);
    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: '',
            price: '',
            description: '',
            userId: '',
        },
        async onSubmit(values) {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('image', productImage);
            formData.append('quantity', values.quantity);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('userId', location.state.id);
            await axios
                .post('/items', formData, {
                    headers: { token: location.state.token },
                })
                .then((res) => {
                    console.log(res.data);
                    getItems();
                    toggle();
                    alert('Product added Sucessfully');
                })
                .catch((errors) => {
                    console.log(errors.response.data);
                    if (errors.response.data.length > 1000) {
                        setImgErr(true);
                    }
                    if (errors.response.data.message === 'Invalid JWT Token') {
                        navigate('/');
                    }
                });
        },
        validate() {
            const errors = {};
            if (
                formik.values.name.length < 6 ||
                formik.values.name.length > 21
            ) {
                errors.name = 'Image Name must be 7 to 22 characters';
            }
            if (
                formik.values.description.length < 11 ||
                formik.values.description.length > 34
            ) {
                errors.description = 'Description must be 12 to 35 characters';
            }
            return errors;
        },
    });
    const saveImage = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };
    return (
        <div>
            <Button onClick={toggle} style={{ width: '120px' }} color="primary">
                AddProduct
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>AddProduct</ModalHeader>
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input
                                        name="name"
                                        placeholder="Enter Product Name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        invalid={formik.errors.name}
                                        required
                                    />
                                    <FormFeedback>
                                        {formik.errors.name}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input
                                        name="image"
                                        type="file"
                                        placeholder="Choose a file"
                                        accept="image/*"
                                        onChange={saveImage}
                                        invalid={imgerr}
                                        required
                                    />
                                    <FormFeedback>
                                        Only .png .jpg and .jpeg files are
                                        allowed
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input
                                        name="quantity"
                                        placeholder="Enter quantity"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.quantity}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input
                                        name="price"
                                        placeholder="Product Price"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input
                                        name="description"
                                        placeholder="Product Description"
                                        type="textarea"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        required
                                        invalid={formik.errors.description}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormFeedback>
                                        {formik.errors.description}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit">AddProduct</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}
