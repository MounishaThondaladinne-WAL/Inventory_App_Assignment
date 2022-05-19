/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Col,
} from 'reactstrap';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

export default function Item(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { id, title, image, quantity, price, description } = props;
    return (
        <div>
            <Card
                className="mb-4 mt-4 card-style"
                style={{ textAlign: 'left', background: '#d6e5e9' }}
            >
                <CardImg
                    alt="Card image cap"
                    src={image}
                    onClick={toggle}
                    style={{ height: '240px' }}
                />
                <CardBody>
                    <CardTitle style={{ height: '60px' }}>
                        <b>{title}</b>
                    </CardTitle>
                    <CardText>
                        <b>Qty : </b>
                        {quantity}
                    </CardText>
                    <CardText>
                        <b>₹ </b>
                        {price}
                    </CardText>
                    <CardText style={{ height: '60px' }}>
                        {description}
                    </CardText>
                    <Row>
                        <Col lg={5} md={5} sm={5} xs={5}>
                            <EditProduct
                                itemId={id}
                                title={title}
                                quantity={quantity}
                                price={price}
                                description={description}
                            />
                        </Col>
                        <Col>
                            <DeleteProduct itemId={id} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <img alt="card img" src={image} style={{ width: '100%' }} />
                </ModalBody>
            </Modal>
        </div>
    );
}
