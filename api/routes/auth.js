const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// save new user
		const user = await newUser.save();
		res.status(200).json({user, Message: "Successfully registered."});
	} catch (err) {
		console.log(err);
		res.status(500).json({message: err.message});
	}

});

// Login
router.post("/login", async (req, res) => {
	try {
		// Check User not found
		const user = User.findOne({email: req.body.email}).exec((err, user) => {
			if (err) {
				res.status(500).send({message: err.message});
				return;
			}
			if (!user) {
				return res.status(404)
					.send({
						message: "User Not found."
					});
			}
			// comparing passwords
			const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({message: "Invalid Password!"})
			}

			return res.status(200).send({
				user: {
					id: user._id,
					email: user.email,
				},
				message: "Login Successfull"
			});
		});

	} catch (err) {
		console.log(err);
	}
});

module.exports = router;