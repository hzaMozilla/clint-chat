import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';
import normalize from 'normalize-url';

import User from '../../models/User';

// @route    POST api/users
// @desc     Register user
// @access   Public
const router = express.Router();
router.post(
  '/',
  check('first_name', 'Name is required').notEmpty(),
  check('second_name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  check('vat', 'VAT is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      // eslint-disable-next-line camelcase
      first_name,
      // eslint-disable-next-line camelcase
      second_name,
      email,
      password,
      vat,
      address,
      address2,
      city,
      statem,
      zip
    } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        first_name,
        second_name,
        email,
        avatar,
        password,
        vat,
        address,
        address2,
        city,
        statem,
        zip
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err:any) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
