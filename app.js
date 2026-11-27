
const cors = require('cors');
const express = require('express');
const pool = require('./database');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'https://authflow-3l9g.netlify.app',
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 30
    }
}));

// REGISTRATION
app.post(['/register', '/api/register'], async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: 'Please fill in all fields!'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match!'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must contain at least 8 characters!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: 'Registration successful! Please sign in.'
        });

    } catch (error) {
        console.log(error.message);

        if (error.code === '23505') {
            return res.status(409).json({
                message: 'Email already registered!'
            });
        }

        res.status(500).json({
            message: 'Registration failed!'
        });
    }
});

// LOGIN
app.post(['/login', '/api/login'], async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter email and password.'
            });
        }

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: 'Email not registered!'
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Incorrect password!'
            });
        }

        req.session.regenerate((error) => {
            if (error) {
                return res.status(500).json({
                    message: 'Could not create login session.'
                });
            }

            req.session.userId = user.id;

            req.session.save((error) => {
                if (error) {
                    return res.status(500).json({
                        message: 'Could not save login session.'
                    });
                }

                res.json({
                    message: 'Login successful!',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            });
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: 'Login failed!'
        });
    }
});

// LOGGED-IN USER
app.get('/api/me', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: 'Please log in first.'
        });
    }

    try {
        const result = await pool.query(
            'SELECT id, name, email FROM users WHERE id = $1',
            [req.session.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.json({ user: result.rows[0] });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: 'Could not fetch user details.'
        });
    }
});

// LOGOUT
app.post(['/logout', '/api/logout'], (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({
                message: 'Logout failed!'
            });
        }

        res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.json({
            message: 'Logged out successfully!'
        });
    });
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
