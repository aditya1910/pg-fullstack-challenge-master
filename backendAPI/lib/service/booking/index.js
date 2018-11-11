const Models = require('../../../app/models');
/**
 * This is the service class for the booking functionalist all core business logic is defined here 
 */
class Booking {
  /**
   * [createBooking this function is called from the booking controller from create booking it check if the booking exist for a perticular 
   * date and time if not then it makes an new entry in booking collection for that date and time ]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  createBooking(params, callback) {
    // check if the time exist in the following zone if not then return

    const date = new Date(params.date);
    if (date === 'Invalid Date') return callback('Invalid Date');

    const centeralDate = this.getUTCTime(date);

    const query = Models.Booking.findOne();
    //query.where({ _userId: params.userId, time: { $ne: params.time }, date: centeralDate });
    query.where({ userName: params.userName, time: params.time, date: centeralDate });
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);
      if (result !== null) return callback({ msg: 'slot already booked' });

      //const objToInsert = { _userId: params.userId, _bookedFor: params.bookedFor, date: centeralDate, time: params.time };
      const objToInsert = { userName: params.userName, bookedFor: params.bookingFor, date: centeralDate, time: params.time };
      Models.Booking.create(objToInsert, (insertErr, insertResult) => {
        if (insertErr) return callback(insertErr);

        return callback(null, insertResult);
      });
    });
  }
  /**
   * [getMyBooking function is called when a user request for booking info]
   * @param  {[type]}   params   [userName and date(optional) it fetch all the booking of a user if no date is provided
   * if date is provide in ISO format it will fetch booking for that particular date]
   * @param  {Function} callback [callback function when function finished it's execution]
   * @return {[type]}            [description]
   */
  getMyBooking(params, callback) {
    if (!params.userName) return callback({ msg: 'Incorrect payload' });
    const query = Models.Booking.find();
    if (params.date === null) query.where({ userName: params.userName });
    else {
      const date = new Date(params.date);
      if (date === 'Invalid Date') return callback('Invalid Date');
      const centeralDate = this.getUTCTime(date);
      query.where({ userName: params.userName, date: centeralDate });
    }
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);

      return callback(null, result);
    });
  }
  /**
   * [deleteBooking function is used to delete the booking by it's booking Id]
   * @param  {[type]}   params   [bookingId unique ObjectId provide from the client]
   * @param  {Function} callback [callback function when finished it's execution]
   * @return {[type]}            [description]
   */
  deleteBooking(params, callback) {
    if (!params.bookingId) return callback({ msg: 'Incorrect payload' });

    Models.Booking.deleteOne({ _id: params.bookingId }, (error, result) => {
      if (error) return callback(error);

      return callback(null, result);
    });
  }
  /**
   * [getUTCTime function is used to convert an ISO date to standard ISO date irrespective of any timezone]
   * @param  {[type]} date [description]
   * @return {[type]}      [description]
   */
  getUTCTime(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).toISOString();
  }
}

module.exports = Booking;
