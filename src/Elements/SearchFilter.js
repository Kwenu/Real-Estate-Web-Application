import "react-widgets/styles.css";
import React, {useState} from 'react';
import {Combobox, DateTimePicker, DropdownList, NumberPicker} from 'react-widgets';
import ListingData from "../listings.json";
import '../App.css';
import {HiOutlineAdjustmentsVertical} from "react-icons/hi2";

export const SearchFilter = ({setFilteredListings}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValues, setInputValues] = useState({
        ListingType: "",
        PriceLower: "",
        PriceUpper: "",
        RoomsLower: "",
        RoomsUpper: "",
        ZipCode: "",
        DateStart: "",
        DateEnd: ""
    });

    const handleInputUpdate = (name, value) => {
        if (name.startsWith('Date')) {
            value = value ? `${value.getMonth() + 1}/${value.getDate()}/${value.getFullYear()}` : '';
        }
        setInputValues({...inputValues, [name]: value});
    };

    const handleQuery = (e) => {
        e.preventDefault();
        const filtered = ListingData.listings.filter(listing => {
            return Object.keys(inputValues).every(key => {
                if (!inputValues[key]) return true;
                switch (key) {
                    case 'ListingType':
                        return compareListingType(listing.type, inputValues[key]);
                    case 'PriceLower':
                    case 'PriceUpper':
                        return compareValues(listing.price, inputValues[key], key.endsWith('Lower'));
                    case 'RoomsLower':
                    case 'RoomsUpper':
                        return compareValues(listing.bedrooms, inputValues[key], key.endsWith('Lower'));
                    case 'ZipCode':
                        return compareZipCode(listing.location, inputValues[key]);
                    case 'DateStart':
                    case 'DateEnd':
                        return compareDates(listing.added, inputValues[key], key.endsWith('Start'));
                    default:
                        return true;
                }
            });
        });
        setFilteredListings(filtered);
    };

    const compareListingType = (listingType, inputType) => {
        return inputType === 'Any' || listingType.toLowerCase() === inputType.toLowerCase();
    };

    const compareValues = (listingValue, inputValue, isLower) => {
        return isLower ? listingValue >= Number(inputValue) : listingValue <= Number(inputValue);
    };

    const compareZipCode = (listingLocation, inputZipCode) => {
        const zipCode = listingLocation.split(',').pop().trim();
        return zipCode.toLowerCase().includes(inputZipCode.toLowerCase());
    };

    const compareDates = (listingAdded, inputDateStr, isStart) => {
        const listingDate = new Date(listingAdded.year, getMonthNumber(listingAdded.month), listingAdded.day);
        const inputDateParts = inputDateStr.split('/');
        const inputDate = new Date(inputDateParts[2], inputDateParts[0] - 1, inputDateParts[1]);
        return isStart ? listingDate >= inputDate : listingDate <= inputDate;
    };

    const getMonthNumber = (monthName) => {
        const monthMap = {
            'January': 0,
            'February': 1,
            'March': 2,
            'April': 3,
            'May': 4,
            'June': 5,
            'July': 6,
            'August': 7,
            'September': 8,
            'October': 9,
            'November': 10,
            'December': 11
        };
        return monthMap[monthName] || -1;
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="searchForm-container">
            <div className="d-flex justify-content-center float-end">
                <button className="filter-button btn-outline-dark float-end" onClick={handleToggle}>
                    {isExpanded ? 'Hide Filter' : 'Show Filter'}
                    <HiOutlineAdjustmentsVertical  className="ms-2"/>
                </button>
            </div>
            {isExpanded && (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <div className="w-50 h-auto">
                        <form onSubmit={handleQuery}>
                            <section className="row g-3">
                                <section className="col-lg-6">
                                    <section className="mb-3">
                                        <span className="form-label">Listing Type</span>
                                        <DropdownList className="form-control" defaultValue="Any"
                                                      data={["House", "Flat", "Any"]} filter='contains'
                                                      onChange={value => handleInputUpdate('ListingType', value)}/>
                                    </section>
                                    <section className="mb-3">
                                        <span className="form-label">Lower Price</span>
                                        <NumberPicker className="form-control"
                                                      format={{style: "currency", currency: "EUR"}}
                                                      placeholder="Lower Price"
                                                      onChange={value => handleInputUpdate('PriceLower', value)}/>
                                    </section>
                                    <section className="mb-3">
                                        <span className="form-label">Lower Rooms</span>
                                        <NumberPicker className="form-control" placeholder="Lower Rooms"
                                                      onChange={value => handleInputUpdate('RoomsLower', value)}/>
                                    </section>
                                    <section className="mb-3">
                                        <span className="form-label">Date Start</span>
                                        <DateTimePicker className="form-control" placeholder="mm/dd/yy (Start)"
                                                        onChange={value => handleInputUpdate('DateStart', value)}/>
                                    </section>
                                </section>
                                <section className="col-lg-6">
                                    <section className="mb-3">
                                        <span className="form-label">Zip Code</span>
                                        <Combobox className="form-control" hideCaret hideEmptyPopup
                                                  placeholder="Zip code"
                                                  onChange={value => handleInputUpdate('ZipCode', value)}/>
                                    </section>
                                    <section className="mb-3">
                                        <span className="form-label">Upper Price</span>
                                        <NumberPicker className="form-control"
                                                      format={{style: "currency", currency: "EUR"}}
                                                      placeholder="Upper Price"
                                                      onChange={value => handleInputUpdate('PriceUpper', value)}/>
                                    </section>
                                    <section className="mb-3">
                                        <span className="form-label">Upper Rooms</span>
                                        <NumberPicker className="form-control" placeholder="Upper Rooms"
                                                      onChange={value => handleInputUpdate('RoomsUpper', value)}/>
                                    </section>
                                    <section className="mb-3">
                                        <span className="form-label">Date End</span>
                                        <DateTimePicker className="form-control" placeholder="m/dd/yy (End)"
                                                        onChange={value => handleInputUpdate('DateEnd', value)}/>
                                    </section>
                                </section>
                            </section>
                            <section className="d-grid gap-2">
                                <button type="submit" className="btn btn-dark">Search</button>
                            </section>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};