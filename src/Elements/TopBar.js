import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './TopBar.css';

const TopBar = ({ properties, setFilteredListings }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const filteredProperties = properties.filter(property => {
            return property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredListings(filteredProperties);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Real State</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search by Location" className="mr-sm-2" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <Button className="m-2 float-end" variant="outline-light" onClick={handleSearch}>Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;