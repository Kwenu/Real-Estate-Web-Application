import React from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {SlDislike} from "react-icons/sl";

const FavouriteItem = ({favouriteItem, removeFromFavouriteList}) => {
    const [, drag] = useDrag({
        type: 'favouriteItem',
        item: {id: favouriteItem.id},
    });

    const [, drop] = useDrop({
        accept: 'favouriteItem',
        drop: (item, monitor) => {
            if (item.id === favouriteItem.id) {
                removeFromFavouriteList(item.id);
            }
        },
    });

    return (
        <article className="favouriteItem" ref={node => drag(drop(node))}>
            <img src={require(`../${favouriteItem.picture}`)} alt="Favourite" className="img-fluid"/>
            <div>
                <h5>{favouriteItem.type} in {favouriteItem.location}</h5>
                <p>{favouriteItem.description}</p>
                <SlDislike className="dislike-btn" onClick={() => removeFromFavouriteList(favouriteItem.id)}/>
            </div>
        </article>
    );
};

const UserFavourites = ({favouriteListings, removeFromFavouriteList}) => {
    const [{canDrop, isOver}, drop] = useDrop({
        accept: 'listingElement',
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                removeFromFavouriteList(item.id);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={drop} className={`Fav-List ${canDrop ? 'over' : ''}`} style={{height: '200vh'}}>
            <h2 className="text-center">Favourites</h2>
            {favouriteListings.map(favouriteItem => (
                <FavouriteItem key={favouriteItem.id} favouriteItem={favouriteItem} removeFromFavouriteList={removeFromFavouriteList}/>
            ))}
        </div>
    );
};

export default UserFavourites;