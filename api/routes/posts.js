const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


// Create api post
router.post("/create", async (req, res) => {
	const newPost = await Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json({savedPost, Message: "Saved successfully!"});
	} catch (err) {
		res.status(500).json({Message: err.message})
	}
});


// Update api post
router.put("/:id/update", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await post.updateOne({$set: req.body});
			res.status(200).json({Message: "Updated successfully!"});
		} else {
			res.status(403).json({Message: "You can update only your post!"});
		}
	} catch (err) {
		res.status(500).json({Message: err.message});
	}
});

// Delete api post
router.delete("/:id/delete", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await post.deleteOne();
			res.status(200).json({Message: "Delete successfully!"});
		} else {
			res.status(403).json({Message: "You can delete only your post."});
		}
	} catch (err) {
		res.status(500).json({Message: err.message});
	}
});

// Like api post

router.put("/:id/like", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({$push: {likes: req.body.userId}});
			res.status(200).json({Message: "The post has been liked."});
		} else {
			await post.updateOne({$pull: {likes: req.body.userId}});
			res.status(200).json({Message: "The post has been disliked"});
		}
	} catch (err) {
		res.status(500).json({Message: err.message});
	}
});

// Get api post
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json({post, Message: "Get successfully!"});
	} catch (err) {
		res.status(500).json({Message: err.message});
	}
});

// get timeline posts
router.get("/timeline/all", async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await Post.find({userId: currentUser._id});

		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({userId: friendId});
			})
		);

		res.json(userPosts.concat(...friendPosts));
	} catch (err) {
		res.status(500).json({Message: err.message});
	}
});

module.exports = router;