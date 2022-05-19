/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios';
import { React, useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Spinner,
    Button,
    ModalBody,
    Modal,
    ModalHeader,
} from 'reactstrap';
import Item from './Item';
import AddProduct from './Addproduct';
import ItemContext from './ItemsContext';
import ItemReducer from './ItemReducer';

export default function MainPage() {
    const [spin, setSpin] = useState(false);
    const [items, setItems] = useState([]);
    const intialState = { items: [] };
    const [state, dispatch] = useReducer(ItemReducer, intialState);
    const location = useLocation();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const getItems = () => {
        setSpin(true);
        axios
            .get(`/items`, { headers: { token: location.state.token } })
            .then((res) => {
                dispatch({ type: 'get', allItems: res.data });
                setItems(res.data);
                setSpin(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.message === 'Invalid JWT Token') {
                    navigate('/');
                }
            });
    };
    useEffect(() => {
        getItems();
    }, []);
    const logout = () => {
        navigate('/');
    };
    return (
        <div>
            <ItemContext.Provider value={{ state, dispatch, getItems }}>
                <Container>
                    <Row>
                        <Col
                            tag="h1"
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                            style={{
                                textAlign: 'left',
                                padding: '10px',
                                fontSize: '50px',
                                height: '10%',
                                marginBottom: '0px',
                                color: 'rgb(129, 106, 168)',
                            }}
                        >
                            Inventory App
                        </Col>
                        <Col
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                                padding: '20px',
                                height: '10%',
                            }}
                            lg={4}
                            md={3}
                            sm={8}
                            xs={8}
                        >
                            <AddProduct />
                        </Col>
                        <Col
                            style={{
                                display: 'flex',
                                justifyContent: 'left',
                                padding: '20px',
                                height: '10%',
                            }}
                        >
                            <Button onClick={toggle} style={{ width: '100px' }}>
                                LogOut
                            </Button>
                            <Modal isOpen={modal}>
                                <ModalHeader>Want to Logout ?</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col>
                                            <Button onClick={logout}>
                                                Log Out
                                            </Button>
                                        </Col>
                                        <Col
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                            }}
                                        >
                                            <Button onClick={toggle}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>
                        </Col>
                    </Row>
                    {spin ? (
                        <Spinner className="m-5">Lodaing...</Spinner>
                    ) : (
                        <Row>
                            {items.map((val) => (
                                <Col md="4" lg="3" sm="6" xs="6">
                                    <Item
                                        id={val.id}
                                        title={val.name}
                                        image={val.image}
                                        quantity={val.quantity}
                                        price={val.price}
                                        description={val.description}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </ItemContext.Provider>
        </div>
    );
}
