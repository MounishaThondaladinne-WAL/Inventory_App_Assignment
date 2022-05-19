import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NewProduct() {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const allItems = 'ALLAH';
    navigate('/home', { state: { allItems } });
}
