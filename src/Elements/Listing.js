import React, {useState} from 'react';
import {useDrag} from 'react-dnd';
import {Button, Modal} from 'react-bootstrap';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FloorPlan from '../Assests/FloorPlan.jpg';
import '../App.css';
import {SlLike} from "react-icons/sl";

const ListingElement = ({listingElement, addToShortlist, setPopupListingElement}) => {
    const [, drag] = useDrag({
        type: 'listingElement',
        item: {id: listingElement.id},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                addToShortlist(item.id);
            }
        },
    });

    return (
        <div className="row pb-3 mb-5 mx-auto">
            <div className="listing p-2">
                <div ref={drag} onClick={() => setPopupListingElement(listingElement)}>
                    <img src={require(`../${listingElement.picture}`)} alt="Listing" className="listing-img"/>
                    <h5>{listingElement.type} in {listingElement.location}</h5>
                    <p><b>Price: </b>€ {listingElement.price.toLocaleString()}</p>
                    <p><b>Bedrooms: </b>{listingElement.bedrooms}</p>
                    <p><b>Type: </b>{listingElement.type}</p>
                    <p className="float-end">{`${listingElement.added.month} ${listingElement.added.day}, ${listingElement.added.year}`}</p>
                    <SlLike className="like-btn" onClick={(event) => {
                        event.stopPropagation();
                        addToShortlist(listingElement.id);
                    }}/>
                </div>
            </div>
        </div>
    );
};

const ListingDisplay = ({data, addToShortlist}) => {
    const [popupListingElement, setPopupListingElement] = useState(null);
    const handleListingElementClick = (listingElement) => {
        listingElement.images = Array.from({length: 3}, (_, i) => listingElement[`img${i + 1}`]).filter(Boolean);
        setPopupListingElement(listingElement);
    };

    return (
        <main className="container">
            <div className="row">
                {data.listings && data.listings.map((listingElement, index) => (
                    <div className="col-md-4">
                        <ListingElement key={listingElement.id} listingElement={listingElement}
                                        addToShortlist={addToShortlist}
                                        setPopupListingElement={handleListingElementClick}/>
                    </div>
                ))}
            </div>
            {popupListingElement && (
                <Modal show={popupListingElement !== null} onHide={() => setPopupListingElement(null)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{popupListingElement.type} in {popupListingElement.location}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs>
                            <TabList>
                                <Tab>Listing Data</Tab>
                                <Tab>Map Location</Tab>
                                <Tab>Floor Plan</Tab>
                            </TabList>

                            <TabPanel>
                                <p>{popupListingElement.description}</p>
                                <div className="text-center">
                                    <div>
                                        <span><b>Bedrooms : </b></span>
                                        <span>{popupListingElement.bedrooms}</span>
                                    </div>
                                    <div>
                                        <span><b>Price : </b></span>
                                        <span>${popupListingElement.price.toLocaleString()}</span>
                                    </div>
                                    <div>
                                        <span><b>Tenure : </b></span>
                                        <span>{popupListingElement.tenure}</span>
                                    </div>
                                    <div>
                                        <span><b>Location : </b></span>
                                        <span>{popupListingElement.location}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <Carousel className="w-75">
                                        {[popupListingElement.img1, popupListingElement.img2, popupListingElement.img3].map((image, index) => (
                                            image && (
                                                <div key={index}>
                                                    <img src={require(`../${image}`)} alt={`Slide ${index + 1}`}/>
                                                </div>
                                            )
                                        ))}
                                    </Carousel>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="d-flex justify-content-center">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.645786487694!2d-0.14446492387286658!3d51.50136731114459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760520cd5b5eb5%3A0xa26abf514d902a7!2sBuckingham%20Palace!5e0!3m2!1sen!2slk!4v1705350792011!5m2!1sen!2slk"
                                        width="600" height="450" style={{border: 0}} allowFullScreen="" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">    
                                    </iframe>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="d-flex justify-content-center">
                                    <img className="w-75 h-auto" src={FloorPlan} alt="Floor Plan"/>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setPopupListingElement(null)}> Close </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </main>
    );
}

export default ListingDisplay;
