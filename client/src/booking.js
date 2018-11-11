import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'underscore';
import DatePicker from 'react-datepicker';
import { formatTwelveHour, formatTime } from './helper';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Booking extends Component {
  constructor() {
    super();
    this.fetchBooking = this.fetchBooking.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.bookSlot = this.bookSlot.bind(this);
  }
  state = {
    userName: null,
    date: null,
    slotArray: [
      '0-1',
      '1-2',
      '2-3',
      '3-4',
      '4-5',
      '5-6',
      '6-7',
      '7-8',
      '8-9',
      '9-10',
      '10-11',
      '11-12',
      '12-13',
      '13-14',
      '14-15',
      '15-16',
      '16-17',
      '17-18',
      '18-19',
      '19-20',
      '20-21',
      '21-22',
      '22-23',
      '23-24',
    ],
    bookedSlot: [],
  };

  componentDidMount() {
    const { userName } = this.props.match.params;
    this.setState({ userName: userName });
  }

  fetchBooking(userName, date) {
    const selectedDate = date ? date.toISOString() : '';
    fetch(`http://localhost:3003/api/v1/booking/${userName}/${selectedDate}`)
      .then(bookingData => {
        return bookingData.json();
      })
      .then(myJson => {
        this.setState({
          bookedSlot: myJson.data.map(element => {
            return element.time;
          }),
        });
      })
      .catch(error => {
        alert('No able to process this request try again');
      });
  }

  handleChange(date) {
    this.setState({ date: date });
    this.fetchBooking(this.state.userName, date);
  }

  bookSlot(slot) {
    if (this.state.date === null) {
      alert('Kindly select a valid date..');
      return;
    }
    fetch(`http://localhost:3003/api/v1/booking`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: this.state.userName,
        bookingFor: null,
        time: slot,
        date: this.state.date.toISOString(),
      }),
    })
      .then(bookingData => {
        if (bookingData.status === 200) {
          alert('slot booked');
          this.fetchBooking(this.state.userName, this.state.date);
        } else alert('Sorry! No able to process this request try again');
      })
      .catch(error => {
        alert('No able to process this request try again');
      });
  }

  render() {
    const reservationObj = this.state.slotArray.map(element => {
      const disableclass = _.contains(this.state.bookedSlot, element) ? 'disabled' : '';
      return (
        <Reservation key={element + disableclass} disableclass={disableclass} bookSlot={() => this.bookSlot(element)} data={element} />
      );
    });

    return (
      <div className="App">
        <h2>Make reservation with </h2>
        <h1>
          {this.state.userName} {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </h1>
        <DatePicker selected={this.state.date} onChange={this.handleChange} />
        {reservationObj}
      </div>
    );
  }
}

const Reservation = props => {
  console.log(props);
  return (
    <ul>
      {props.disableclass === 'disabled' && (
        <button className='button button4' onClick={props.bookSlot} disabled>
          {formatTime(props.data.split('-')[0])}
        </button>
      )}
      {props.disableclass !== 'disabled' && <button className='button button2' onClick={props.bookSlot}>{formatTime(props.data.split('-')[0])}</button>}
    </ul>
  );
};

export default Booking;
