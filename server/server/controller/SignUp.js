import bcryptjs from 'bcryptjs';
import Model from '../Models/Model.js';

const userSignUp = (req, res, next) => {
  const { name, password, username, position, licenseNo } = req.body;

  // Check if the email is already taken
  Model.UserModel.findOne({ username })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Username already taken.' });
      }

      // Proceed with user creation
    bcryptjs.hash(password, 12)
      .then((hashedPassword) => {
        const newUser = new Model.UserModel({
          name,
          password: hashedPassword,
          username,
          userType: 'user',
          position,
          licenseNo
        });

        newUser
          .save()
          .then((savedUser) =>
            res.status(200).json({
              message: 'Account created successfully.',
              savedUser,
            })
          )
          .catch((err) => {
            res.status(500);
            next(
              new Error(`Unable to create user. Please try later. ${err}`)
            );
          });
      })
      .catch((err) => {
        res.status(500);
        next(new Error(err));
      });
    });
};

export default userSignUp;
