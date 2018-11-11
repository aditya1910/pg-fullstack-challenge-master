const express = require('express');
const Booking = require('../../../lib/service/booking');

const router = express.Router();
/**
 * This is the controller class for the booking functionality
 */
class BookingController {
  /**
   * [createBooking this is the controller function which take care of the new booking]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  createBooking(req, res) {
    const BookingObj = new Booking();
    const params = req.body;
    // params.userId = req.body.userId;
    // params.bookedFor = req.body.bookedFor||null;
    // params.userName = req.body.userName;
    // params.bookingFor = req.body.bookingFor||null;
    BookingObj.createBooking(params, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({
        msg: result.msg || 'Successfully created the Booking.',
        isError: false,
        isInserted: true,
        data: result,
      });
    });
  }
  /**
   * [getBooking this function is called when the client request for the booking details]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getBooking(req, res) {
    const params = {};
    params.userName = req.params.id;
    params.date = req.params.date || null;
    const BookingObj = new Booking();
    BookingObj.getMyBooking(params, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({
        msg: result.msg || 'Successfully got the desired Booking.',
        isError: false,
        isFetched: true,
        data: result,
      });
    });
  }

  // updateBooking(req, res) {
  //   const BookingObj = new Booking(req.params.id);
  //   BookingObj.updateBooking(req.body, (err, result) => {
  //     if (err) return res.status(500).json(err);

  //     res.status(200).json({
  //       msg: result.msg || 'Successfully update Booking.',
  //       isError: false,
  //       isUpdated: true,
  //       data: result,
  //     });
  //   });
  // }
  /**
   * [getMyBooking function is used to fetch all the booking record for a logged in user only]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getLoginUserBooking(req, res) {
    console.log("hahaha")
    if (req.session && req.session.email && req.session.userName) {
      const params = {};
      params.userName = req.session.userName;
      params.date = null;
      console.log(params);
      const BookingObj = new Booking();
      BookingObj.getMyBooking(params, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({
          msg: result.msg || 'Successfully got the desired Booking.',
          isError: false,
          isFetched: true,
          data: result,
        });
      });
    } else {
      return res.status(401).json({ msg: 'you are not logged in kindly login and try again!!' });
    }
  }
  /**
   * [deleteBooking function is called when user deletes a booking]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  deleteBooking(req, res) {
    const parameter = {
      bookingId: req.params.id,
    };
    const BookingObj = new Booking();
    BookingObj.deleteBooking(parameter, (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(200).json({
        msg: result.msg || 'Successfully deleted Booking.',
        isError: false,
        isDeleted: true,
      });
    });
  }
}
const BookingRoute = new BookingController();

router.post('/', BookingRoute.createBooking);
router.get('/profile', BookingRoute.getLoginUserBooking);
router.get('/:id', BookingRoute.getBooking);
router.get('/:id/:date', BookingRoute.getBooking);
//router.put('/:id', BookingRoute.updateBooking);
router.delete('/:id', BookingRoute.deleteBooking);
module.exports = router;
