import React, {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import TopBar from '../Elements/TopBar';
import UserFavourites from "../Elements/UserFavourites";
import Footer from "../Elements/Footer";
import ListingDisplay from "../Elements/Listing";
import ListingData from "../listings.json";
import {SearchFilter} from "../Elements/SearchFilter";
import '../App.css';

export const PrimaryPage = () => {
    const [filteredListings, setFilteredListings] = useState(ListingData.listings);
    const [favouriteListings, setFavouriteListings] = useState([]);

    const addToShortlist = (id) => {
        const listing = filteredListings.find(listing => listing.id === id);
        if (listing && !favouriteListings.includes(listing)) {
            setFavouriteListings([...favouriteListings, listing]);
        }
    };

    const removeFromFavouriteList = (id) => {
        setFavouriteListings(favouriteListings.filter(listing => listing.id !== id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="d-flex flex-column" style={{overflow:"hidden"}}>
                <TopBar properties={filteredListings} setFilteredListings={setFilteredListings} />
                <div>
                    <SearchFilter setFilteredListings={setFilteredListings}/>
                </div>
                <div className="pt-5 pb-5">
                    <div className="row pt-2 h-100 w-100">
                        <div className="col-md-9">
                            <ListingDisplay data={{listings: filteredListings}} addToShortlist={addToShortlist}/>
                        </div>
                        <div className="col-md">
                            <div className="favouriteBox">
                                <div className="h-100">
                                    <UserFavourites favouriteListings={favouriteListings}
                                                    removeFromFavouriteList={removeFromFavouriteList}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </DndProvider>
    );
};
