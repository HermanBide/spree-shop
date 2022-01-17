import React, { useState, useEffect } from 'react'
import { popularProducts } from '../data';
import Product from './Product'
import styled from 'styled-components';
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const products = ({cat, filters, sort}) => {

    const [products, setProducts ] = useState([])
    const [filteredProducts, setFilteredProducts ] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(cat ? `http:://localhost:3002/api/products?category=${cat}` : "http:://localhost:3002/api/products")
                console.log(response)
            } catch (err) {
            
            }
        }
    }, [cat])

    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
        )
    }, [cat,filters, products])


    useEffect(() =>{
        if((sort="newest")) {
            setFilteredProducts((prev) =>
            [...prev].sort((a,b) => a.createdAt - b.createdAt))
        } else if ((sort === "asc")) {
            setFilteredProducts((prev) =>
            [...prev].sort((a,b) => a.price - b.price))
        } else {
            setFilteredProducts((prev) =>
            [...prev].sort((a,b) => a.price - b.price))
        }
        
    })
    return (
        <Container>
            {cat ? filteredProducts.map((item) =>
                <Product item={item} key={item.id} />)
                : products.slice(0, 8).map((item) => <Product item={item} key={item.id} />)
            }
        </Container>
    );
};

export default products;
