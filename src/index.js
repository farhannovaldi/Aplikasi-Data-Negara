const express = require('express');
const path = require('path');
const hbs = require('hbs');
const collection = require('./config');
const session = require('express-session');

const app = express();

// Konfigurasi session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware untuk mengecek status login
function checkLoginStatus(req, res, next) {
    if (req.session) {
        res.locals.loggedInUser = req.session.loggedInUser;
    }
    next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkLoginStatus);

const port = process.env.PORT || 3000;

const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views');
const direktoriPartials = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', direktoriViews);
hbs.registerPartials(direktoriPartials);

app.use(express.static(direktoriPublic));

app.get('/', (req, res) => {
    res.render('login', { judulApk: 'Data Negara App' });
});

app.get('/home', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/');
    }
    res.render('home');
});

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ username: req.body.username });
        if (!check) {
            res.send(`<script>alert('Username tidak ditemukan'); window.location.href='/';</script>`);
        } else if (req.body.password === check.password) {
            // Set session properties to indicate the user is logged in
            req.session.loggedIn = true;
            req.session.loggedInUser = check.username; // Save username in session
            res.redirect('/home');
        } else {
            res.send(`<script>alert('Password salah'); window.location.href='/';</script>`);
        }
    } catch (error) {
        console.error(error);
        res.send('Wrong Details');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
    };
app.get('/logout', (req, res) => {
    console.log('Logout request received');
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Gagal:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});

    const existingUser = await collection.findOne({ username: data.username });
    if (existingUser) {
        res.send(`<script>alert('User sudah ada. Tolong masukkan username lain'); window.location.href='/signup';</script>`);
    } else {
        await collection.create(data);
        res.send(`<script>alert('User berhasil didaftarkan'); window.location.href='/';</script>`);
    }
});

app.get('*', (req, res) => {
    res.status(404).render('404', {
        judul: '404',
        pesanKesalahan: 'Halaman tidak ditemukan',
    });
});

app.listen(port, () => {
    console.log('Server berjalan pada port ' + port);
});
