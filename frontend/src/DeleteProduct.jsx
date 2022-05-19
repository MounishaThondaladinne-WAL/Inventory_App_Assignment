/* eslint-disable react/prop-types */
import { React, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import ItemContext from './ItemsContext';

export default function DeleteProduct(props) {
    const { itemId } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { getItems } = useContext(ItemContext);
    const deleteProduct = () => {
        console.log(`delete item ${itemId}`);
        axios
            .delete(`/items/delete/${itemId}`, {
                headers: { token: location.state.token },
            })
            .then((res) => {
                console.log(res.data);
                toggle();
                getItems();
            })
            .catch((errors) => {
                console.log(errors.response.data);
                if (errors.response.data.message === 'Invalid JWT Token') {
                    navigate('/');
                }
            });
    };
    return (
        <div>
            <Button
                onClick={toggle}
                style={{ width: '80px' }}
                animated
                color="danger"
            >
                Delete
            </Button>
            <Modal isOpen={modal}>
                <ModalHeader>Want to Delete ?</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Button onClick={deleteProduct}>Delete</Button>
                        </Col>
                        <Col
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Button onClick={toggle}>Cancel</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
}
