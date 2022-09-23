const router = require("express").Router();
const User = require("../models/User");

// Register
router.get("/register", async (req, res) => {
        try {
                const newUser = await new User({
                username: "Marvin",
                email: "nguyenmao.2912@gmail.com",
                password: "123456",
        });

        const user = await newUser.save();
        res.status(200).json(user);
        } catch (err) {
                console.log(err);
                res.status(500).json(err);
        }
        
});

module.exports = router;