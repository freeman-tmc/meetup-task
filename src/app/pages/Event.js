import React from 'react';
import eventImg from '../img/event.jpg';

const Event = (props) => {
    return (
        <div className="event-box">
            <div className="img-box">
                <img src={eventImg} alt="" />
                <p className="date">{props.local_date}</p>
            </div>
            <h3 className="name">{props.name}</h3>
            <p className="time">Time: {props.local_time}</p>
            <p className="details" dangerouslySetInnerHTML={{ __html: props.description}}></p>
            <div className="location">
                <p>{props.venue.address_1}</p>
                <p>{props.venue.name}</p>
            </div>
        </div>
    );
}

export default Event;
