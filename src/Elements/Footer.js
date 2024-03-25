import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsFillHousesFill } from "react-icons/bs";
import './Footer.css';

const Footer = () => {
    const [transparent, setTransparent] = useState("Footer");

    useEffect(() => {
        const addBG = () => {
            if (window.scrollY >= 10) {
                setTransparent('Footer addBackground');
            } else {
                setTransparent('Footer');
            }
        }
        window.addEventListener("scroll", addBG);
        return () => {
            window.removeEventListener("scroll", addBG);
        }
    }, []);

    return (
        <Container fluid className={`${transparent}`}>
            <Row>
                <Col className='logo'>
                    <BsFillHousesFill className="icon"/>
                    <span>Real State</span>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
