const express = require("express");
const path = require("path");
const hbs = require('hbs')

const {logger} = require("./Middleware/all.middleware");
const film = require("./utils/film"); 
let accounts = require("./utils/accounts"); 
let recFilmsObj = require("./utils/recFilms"); 
hbs.registerPartials(path.join(__dirname, '/views/partials'))

const port = 1717;

let access;
let inThatAcc;
favFilmsArr = [];
disabledButtons = [];

const app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(logger);

app.get('/', function (request, response) {
    response.render("enter.hbs", {home: true});
});

app.post('/regData', function (request, response) {
    let accObj = {};
    access = '';

    accObj.name = request.body.name;
    accObj.surname = request.body.surname;
    accObj.email = request.body.email;
    accObj.password = request.body.password;
    accObj.favFilm = '';
    accObj.favFilms = [];
    accObj.favFilmsArr = [];
    accObj.splittedFav = [];
    accObj.favFilmsObj = {
        title: "Favourite films",
        favFilmsArray: []
    },
    accObj.filmsDisabled = [];

    accounts.push(accObj);
    access = "True";
    inThatAcc = request.body.email;
    response.send(true);
});

app.post('/entData', function (request, response){
    access = '';
    for(i=0;i<accounts.length;i++){
        if(request.body.email == accounts[i].email && request.body.password == accounts[i].password){
            access = "True";
        }
    }
    inThatAcc = request.body.email;
    response.send(true);
});

app.post('/favFilm', function (request, response){
    for(i=0;i<accounts.length;i++){
        if(inThatAcc == accounts[i].email){
            accounts[i].favFilm += request.body.filmName + ',';
            accounts[i].splittedFav = accounts[i].favFilm.split(',');
            accounts[i].favFilms = accounts[i].splittedFav;
            accounts[i].splittedFav.length = accounts[i].splittedFav.length-1;
        }
    }
    for(d=0;d<accounts.length;d++){
        if(inThatAcc == accounts[d].email){
            x=0;
            for(i=0;i<film.films.films.length;i++){
                for(j=0;j<film.films.films.length;j++){
                    if(accounts[d].splittedFav[i] == film.films.films[j].filmName){
                        accounts[d].favFilmsArr[x] = film.films.films[j];
                        x++;
                    }
                }
            }
            accounts[d].favFilmsObj.favFilmsArray = accounts[d].favFilmsArr;
        }
    }
    response.send(true);
});

app.post('/deleteFav', function (request, response){      
    for(i=0;i<accounts.length;i++){
        if(inThatAcc == accounts[i].email){
            for(j=0;j<accounts[i].favFilmsObj.favFilmsArray.length;j++){
                if(request.body.filmName == accounts[i].favFilmsObj.favFilmsArray[j].filmName){
                    replace = accounts[i].favFilm.replace(request.body.filmName+',' , '');
                    accounts[i].favFilm = replace;
                    accounts[i].favFilms = accounts[i].splittedFav;
                    accounts[i].splittedFav.length = accounts[i].splittedFav.length-1;
                    accounts[i].favFilmsObj.favFilmsArray.splice(j, 1);
                    str = request.body.filmName + ','
                    accounts[i].favFilm.replace(str, '');
                }
            }
        }
    }
    response.send(true);
});

app.get('/films', function (request, response) {
    if(access == "True"){
        response.render("films.hbs", film.films);
    }
});

app.get('/regData', function (request, response) {
    response.render("films.hbs", film.films);
});

app.get('/recFilms', function (request, response) {
    response.render("recFilms.hbs", recFilmsObj);
});

app.get('/registration', function (request, response) {
    response.render("registration.hbs", {home: true});
});

app.get('/accCab', function (request, response) {
    for(i=0;i<accounts.length;i++){
        if(inThatAcc == accounts[i].email){
            console.log('рендер фильмы в аккаунте:' + inThatAcc);
            console.log(accounts[i].favFilmsObj);
            response.render("accCab.hbs", accounts[i].favFilmsObj);
        }
    }
});

app.use(express.static(path.join(__dirname, 'src')));

app.use(function(req, res, next) {
    res.status(404).send('<h1>Not found</h1>');  
});

app.listen(port, () => {
});