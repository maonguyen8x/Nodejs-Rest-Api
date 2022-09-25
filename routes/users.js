const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (e) {
				return res.status(500).json({Message: e.message})
			}
		}
		try {
			const user = await User.findOneAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json({user, Message: "Account has been updated!"})
		} catch (e) {
			return res.status(500).json({Message: e.message})
		}

	} else {
		return res.status(403).json({Message: "You can update only your account."})
	}
});

// Delete user
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json({Message: "Account has been deleted!"});
		} catch (e) {
			return res.status(500).json({Message: e.message});
		}

	} else {
		return res.status(403).json({Message: "You can delete only your account."});
	}
});

// Get user
router.get("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findById(req.params.id);
			res.status(200).json(user);
		} catch (err) {
			res.status(500).json({Message: err.message});
		}
	}
});

// Follow user
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);

			if (!user.followers.includes(req.body.userId)) {
				await currentUser.updateOne({$push: {followings: req.body.userId}});
				res.status(200).json({Message: "User has been followed."});
			} else {
				req.status(403).json({Message: "You already follow this user."});
			}
		} catch (err) {
			res.status(500).json({Message: err.message});
		}
	} else {
		res.status(403).json({ Message: "You cannot follow yourself." });
	}
});

module.exports = router;