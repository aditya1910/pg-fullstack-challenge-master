// This is the function act as the middle ware if the user's session is active or not if not 
// or any other restrictions can be applied to this route 
module.exports = (req, res, next) => {
  //let sessionObj = {};
  console.log(req.session.email,"this is the session");
  //if (req.session  && req.session.email) {
    // fetching tokens from active session
    //sessionObj.userEmail = req.session.email;
    next();
  //}
  // else {
  //   return res.status(401).json({
  //     msg: 'Session expired. Please login again',
  //     isError: true,
  //     isActiveSession: false,
  //     isSessionActive: false,
  //   });
  // }
};
