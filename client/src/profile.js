import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'underscore';
import {formatTwelveHour,formatTime} from './helper'
import moment from 'moment';

class Profile extends Component {
  constructor() {
    super();
    this.deleteBooking = this.deleteBooking.bind(this);
    this.fetchBooking = this.fetchBooking.bind(this);
  }
  state = {
    userName: null,
    bookingData: [],
  };
  componentDidMount() {
    const { userName } = this.props.match.params;
    this.setState({ userName: userName });
    this.fetchBooking(userName);
  }

  fetchBooking(userName){
    fetch(`http://localhost:3003/api/v1/booking/${userName}`)
      .then(bookingData => {
        return bookingData.json();
      })
      .then(myJson => {
        this.setState({ bookingData: myJson.data });
      })
      .catch(error => {
        alert('No able to process this request try again');
      });
  }

  deleteBooking(bookingId) {
    fetch(`http://localhost:3003/api/v1/booking/${bookingId}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(bookingData => {
        console.log(bookingData.status);
        if(bookingData.status===200)
          return this.fetchBooking(this.state.userName);
        else
          alert('Sorry! unable to delete this booking')
      })
      .catch(error => {
        alert('No able to process this request try again');
      });
    console.log(bookingId);
  }

  render() {
    let bookingData = this.state.bookingData;
    const newObj = _.groupBy(bookingData, element => {
      return element.date;
    });
    const objectKeys = Object.keys(newObj) ? Object.keys(newObj) : [];
    const reservationObj = objectKeys.map(element => {
      return (
        <div>
          {moment(element).add(1,'days').format('Do MMMM YYYY')}
          {newObj[element].map(item => {
            return (
              <Reservation
                deleteBooking={() => {
                  this.deleteBooking(item._id);
                }}
                data={item}
              />
            );
          })}
        </div>
      );
    });

    return (
      <div className="App">
        <h1>welcome {this.state.userName} </h1>
        <h2>Time zone {Intl.DateTimeFormat().resolvedOptions().timeZone}</h2>
        Reservations
        {reservationObj}
      </div>
    );
  }
}

const Reservation = props => {
  return (
    <ul>
      <span>{formatTime(props.data.time.split('-')[0])}</span>
      <span>Booked By {props.data.bookedFor?props.data.bookedFor:'Anonymous'}</span>
      <button className='button button3' onClick={props.deleteBooking}>Delete</button>
    </ul>
  );
};



export default Profile;
