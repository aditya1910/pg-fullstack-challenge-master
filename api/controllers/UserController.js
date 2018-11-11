/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Hashids = require('hashids');
const hashids = new Hashids(`this is unique salt`, 10);
const stdlib = require('sails-stdlib');

module.exports = {
  async signup(req, res) {
    if (_.any(['name', 'email', 'password'], attr => !req.body[attr] || req.body[attr].trim().length === 0)) {
      return res.badRequest({ error: 'The provided fullName, password and/or email address are invalid.' });
    }
    try {
      // TODO : Improve logic to generate unique username for new users.
      // Logic to generate username
      const userCount = await User.count();
      const userName = hashids.encode(userCount + 1);

      // TODO : save timezone based on user location.
      await User.create({
        email: req.body.email,
        password: await stdlib('passwords').hashPassword(req.body.password),
        name: req.body.name,
        userName,
      }).intercept('E_UNIQUE', 'emailAlreadyInUse');
      return res.json(200);
    } catch (err) {
      return res.badRequest({ error: err.message }, null, err);
    }
  },
  async login(req, res) {
    if (_.any(['email', 'password'], attr => !req.body[attr] || req.body[attr].trim().length === 0)) {
      return res.badRequest({ error: 'The provided fullName, password and/or email address are invalid.' });
    }
    try {
      // TODO : Improve logic to generate unique username for new users.
      // Logic to generate username
      //const userCount = await User.count();
      //const userName = hashids.encode(userCount + 1);

      // TODO : save timezone based on user location.
      let user = await User.findOne({
        email: req.body.email,
        password: req.body.password,//await stdlib('passwords').hashPassword(req.body.password),
      })/*.intercept('E_UNIQUE', 'emailAlreadyInUse');*/
      console.log(user);
      return res.json(user);
    } catch (err) {
      return res.badRequest({ error: err.message }, null, err);
    }
  },
};
