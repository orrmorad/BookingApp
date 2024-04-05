const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const port = 3000;
mongoose.connect('mongodb://localhost:27017/bookingDB');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

const locationSchema = new mongoose.Schema({
    country: String,
    city: String,
    street: String,
    number: Number,
    title: String
})

const hotelSchema = new mongoose.Schema({
    userCreatedId: String,
    name: String,
    location: locationSchema,
    title: String,
    capacity: Number,
    rating: Number,
    image: String,
    roomPrice: Object,
    isAvailable: Boolean
});

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    reservations: [],
    isAdmin: Boolean
})

const guestSchema = new mongoose.Schema({
    id: String,
    firstname: String,
    lastname: String,
    age: Number,
    isAdult: Boolean
})

const roomSchema = new mongoose.Schema({
    roomType: Number,
    capacity: Number,
    guests: [guestSchema],
    price: Object
})

const reservationSchema = new mongoose.Schema({
    id: String,
    user: userSchema,
    hotel: hotelSchema,
    guests: [guestSchema],
    startingDate: Date,
    endDate: Date,
    rooms: [roomSchema],
    totalPrice: Number,
    isActive: Boolean
})

const Hotel = mongoose.model('hotels', hotelSchema);
const User = mongoose.model('users', userSchema);
const Reservation = mongoose.model('reservations', reservationSchema);

app.get('/', (req, res) => {
    res.send(`BookingApp server running on port ${port}`)
})

app.route('/hotels/getAllHotels')
    .get((req, res) => {
        Hotel.find().then(hotels => {
            res.send(hotels);
        }, err => { res.send(err); });
    });

app.route('/hotels/addHotel')
    .post((req, res) => {
        const newHotel = new Hotel(req.body);
        newHotel.save().then(() => {
            Hotel.find().then(hotels => {
                res.send(hotels)
            });
        }, err => { res.send(err) });
    });

app.route('/hotels/removeHotel/:id')
    .delete((req, res) => {
        let id = req.params.id;
        Hotel.deleteOne({ _id: id }).then((response) => {
            res.send(response);
        }, err => { res.send(err) });
    });

app.route('/users/getAllUsers')
    .get((req, res) => {
        User.find().then(users => {
            res.send(users)
        }, err => res.send(err))
    });

app.route('/users/getUser/:id')
    .get((req, res) => {
        console.log(req.params)
        User.findOne({ id: req.params.id }).then(user => {
            if (user)
                res.send(user);
        }, err => { res.send(err) })
    });

app.route('/users/addUser')
    .post((req, res) => {
        const newUser = new User(req.body);
        newUser.save().then(() => {
            User.find().then(users => {
                res.send(users)
            });
        }, err => { res.send(err) });
    });

app.route('/users/removeUser/:id')
    .delete((req, res) => {
        let id = req.params.id;
        User.deleteOne({ id: id }).then((response) => {
            res.send(response);
        }, err => { res.send(err) });
    });

app.route('/login')
    .get(async(req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });        
        if(user && user.password){
            if(user.password === password){
                res.send(user)
            }
        }
    })

app.listen(3000, function () {
    console.log(`Server started on port ${port}`);
});