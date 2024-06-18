// const bcrypt = require('bcrypt');
// const db = require('../models');
// const User = db.User;
// const { User } = require('../../models');
// const router = require('express').Router();

// // User registration
// const signup = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ username, password: hashedPassword });
//         req.session.userId = user.id; // Set the session userId
//         res.status(201).redirect('/home'); // Redirect to home after successful signup
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// router.post('/api/signup', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ username, password: hashedPassword });
//         req.session.userId = user.id; // Set the session userId
//         res.status(201).redirect('/home'); // Redirect to home after successful signup
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ error: error.message });
//     }
//   });



// // User login
// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) {
//             return res.status(401).json({ error: 'Invalid password' });
//         }
//         req.session.userId = user.id; // Set the session userId
//         res.status(200).redirect('/home'); // Redirect to home after successful login
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // User logout
// const logout = (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).json({ error: 'Could not log out, please try again.' });
//         }
//         res.clearCookie('connect.sid');
//         res.status(200).redirect('/auth/login'); // Redirect to login after logout
//     });
// };

// module.exports = {
//     signup,
//     login,
//     logout
// };

const bcrypt = require('bcrypt');
const db = require('../models'); // Correct path to models
const User = db.User;

// User registration
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        req.session.userId = user.id; // Set the session userId
        res.status(201).json(user);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: error.message });
    }
};

// User login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        req.session.userId = user.id; // Set the session userId
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.message });
    }
};

// User logout
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out, please try again.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};

module.exports = {
    signup,
    login,
    logout
};
