/* eslint-disable react/prop-types */
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
    FormFeedback,
    Input,
    Label,
} from 'reactstrap';
import ItemContext from './ItemsContext';

export default function EditProduct(props) {
    const { itemId, title, price, quantity, description } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { getItems } = useContext(ItemContext);
    const [imgerr, setImgErr] = useState(false);
    const [productImage, setImage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: title,
            quantity,
            price,
            description,
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
                .put(`/items/${itemId}`, formData, {
                    headers: { token: location.state.token },
                })
                .then((res) => {
                    getItems();
                    console.log(res.data);
                    toggle();
                    alert('Item Updated Successfully');
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
            <Button onClick={toggle} style={{ width: '70px' }} color="warning">
                Edit
            </Button>
            <Modal isOpen={modal}>
                <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>
                                        <b>Product Name</b>
                                    </Label>
                                    <Input
                                        name="name"
                                        placeholder="Enter Product Name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        invalid={formik.errors.name}
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
                                    <Label>
                                        <b>Quantity</b>
                                    </Label>
                                    <Input
                                        name="quantity"
                                        placeholder="Enter quantity"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.quantity}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>
                                        <b>Price</b>
                                    </Label>
                                    <Input
                                        name="price"
                                        placeholder="Product Price"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>
                                        <b>Description</b>
                                    </Label>
                                    <Input
                                        name="description"
                                        placeholder="Product Description"
                                        type="textarea"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        invalid={formik.errors.description}
                                    />
                                    <FormFeedback>
                                        {formik.errors.description}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit">EditProduct</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}
