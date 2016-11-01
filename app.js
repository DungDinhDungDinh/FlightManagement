var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('client'));


var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
mongoose.connect('mongodb://dungdinh:tthuyddung218@ds053136.mlab.com:53136/flight_management');

var secret = '131205413120661312072';
app.set('superSecret', secret);

//mongoose.connect('mongodb://localhost/FlightManagement');


var Flight = require('./models/flight');
var FlightDetail = require('./models/detail');
var Booking = require('./models/booking');
var Passenger = require('./models/passenger');
var Airport = require('./models/airport');
var User = require('./models/user');

var apiRoutes = express.Router(); 


// API1 lấy danh sách mã nơi đi

apiRoutes.get('/start_airports', function(req, res) {

    Flight.find().distinct('_noiDi', function(err, flights) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(flights);
            console.log(flights);
        }
    });
});




//API2 lay thong tin san bay
apiRoutes.get('/airports/:ma', function(req, res) {
    var ma = req.params.ma;
    Airport.find({
        _ma: ma
    }).select('-_id').exec(function(err, infos) {
        if (err)
            return console.log(err);
        else {
            res.status(200).send(infos);
            console.log(infos);
        }
    });
});


//API3 lấy danh sách nơi đến ứng với nơi đi
apiRoutes.get('/dest_airports', function(req, res) {
    var ma = req.query.ma;
    Flight.find({
        _noiDi: ma
    }).distinct('_noiDen', function(err, flights) {
        if (err) {
            res.status(400).send({
                'error': 'Bad request (The data is invalid)'
            });
        } else {
            res.status(200).send(flights);
        }
    });
});

//Tìm chuyến bay

apiRoutes.get('/flights', function(req, res) {
    var maNoiDi = req.query.maNoiDi;
    var maNoiDen = req.query.maNoiDen;
    var ngayDi = req.query.ngayDi;
    var soNguoi = req.query.soNguoi;
    var maChuyenBay = req.query.maChuyenBay;

    var paramsNumber = Object.keys(req.query).length;


    if (paramsNumber == 4) {
        Flight.find({
            _noiDi: maNoiDi,
            _noiDen: maNoiDen,
            _ngayDi: ngayDi,
            "$where": "this._soGhe >= " + soNguoi
        }).select('-_id').exec(function(err, flights) {
            if (err) {
                res.status(404).send({
                    'error': 'Flight not found'
                });
                return console.error(err);
            } else {
                res.status(200).send(flights);
                console.log(flights);
            }
        });
    } else if (paramsNumber == 3) {
        Flight.find({
            _noiDi: maNoiDi,
            _noiDen: maNoiDen,
            _ngayDi: ngayDi,
            "$where": "this._soGhe >= 0"
        }).select('-_id').exec(function(err, flights) {
            if (err) {
                res.status(404).send({
                    'error': 'Flight not found'
                });
                return console.error(err);
            } else {
                res.status(200).send(flights);
                console.log(flights);
            }
        });
    } else if (paramsNumber == 2) {
        Flight.find({
            _noiDi: maNoiDi,
            _noiDen: maNoiDen,
        }).select('-_id').exec(function(err, flights) {
            if (err) {
                res.status(404).send({
                    'error': 'Flight not found'
                });
                return console.error(err);
            } else {
                res.status(200).send(flights);
                console.log(flights);
            }
        });
    } else if (paramsNumber == 1) {
        Flight.find({
            _ma: maChuyenBay
        }).select('-_id').exec(function(err, flights) {
            if (err) {
                res.status(404).send({
                    'error': 'Flight not found'
                });
                return console.error(err);
            } else {
                res.status(200).send(flights);
                console.log(flights);
            }
        });
    } else {
        Flight.find({}).exec(function(err, flights) {
            if (err) {
               res.status(404).send({
                    'error': 'Flight not found'
                });
                return console.error(err);
            } else {
                res.status(200).send(flights);
                console.log(flights);
            }
        });
    }
});



// apiRoutes.get('/flights/:id', function(req, res) {
//     Flight.find({
//         _id : ObjectId(req.params.id)
//     }, function (err, f) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(f);
//         }
//     });
// });


// Đặt chỗ

apiRoutes.post('/bookings', function(req, res) {

    var khuHoi = req.body.khuHoi;
    console.log(khuHoi);
    var maChuyenBayDi = req.body.maChuyenBayDi;
    var hangDi = req.body.hangDi;
    var soGheDat = req.body.soGheDat;
    var ngayDi = req.body.ngayDi;

    var maChuyenBayVe = req.body.maChuyenBayVe;
    var hangVe = req.body.hangVe;
    var ngayVe = req.body.ngayVe;

    var danhXung = req.body.danhXung;
    var ho = req.body.ho;
    var ten = req.body.ten;
    var dienThoai = req.body.dienThoai;
    var quocTich = req.body.quocTich;


    var tongTien = 0;

    //Kiem _ma lon nhat
    Booking.findOne().sort({
        _maDatCho: -1
    }).select('_maDatCho -_id').limit(1).exec(function(err, number) {
        if (number == null || number._maDatCho == null || number._maDatCho == '' || number._maDatCho == undefined)
            max = 100000;
        else
            max = number._maDatCho;
    });

    Flight.findOne({
        _ma: maChuyenBayDi,
        _hang: hangDi,
        _ngayDi: ngayDi
    }).exec(function(err, flight) {
        console.log(flight);

        flight._soGhe -= soGheDat;
        flight.save(function(err, b) {
            if (err) {
                console.log(err);
            }
        });


        tongTien = flight._giaVe * soGheDat;
        max = max + 1;

        if (khuHoi) {
            Flight.findOne({
                _ma: maChuyenBayVe,
                _hang: hangVe,
                _ngayDi: ngayVe
            }).exec(function(err, backFlight) {
            backFlight._soGhe -= soGheDat;
            backFlight.save(function(err, b) {
                if (err) {
                    console.log(err);
                }
                console.log('tien x2');
                tongTien += backFlight._giaVe * soGheDat;
                //Them dat cho
                var b = new Booking({
                    _maDatCho: max,
                    _thoiGianDatCho: new Date().toString(),
                    _tongTien: tongTien,
                    _trangThai: 1
                });

                b.save(function(err, b) {
                    if (err) {
                        res.status(400).send({
                            'error': 'Bad request (The data is invalid)'
                        });
                        return console.error(err);
                    } else {
                        Booking.find(function(err, bookings) {
                            res.status(201).send({
                                'messege': 'Created',
                                'data': b
                                });
                            });
                        }
                    });

                    var chuyenBayVe = new FlightDetail({
                        _maDatCho: max,
                        _maChuyenBay: maChuyenBayVe,
                        _ngay: ngayVe,
                        _hang: hangVe
                    });

                    chuyenBayVe.save(function(err, chuyenBayVe) {
                        if (err) {
                            console.log(err);
                        }
                    });

                });
            });
        } else {
             //Them dat cho
                var b = new Booking({
                    _maDatCho: max,
                    _thoiGianDatCho: new Date().toString(),
                    _tongTien: tongTien,
                    _trangThai: 1
                });

                b.save(function(err, b) {
                    if (err) {
                         console.error(err);
                    } else {
                        Booking.find(function(err, bookings) {
                            res.status(201).send({
                                'messege': 'Created',
                                'data': b
                                });
                            });
                        }
                    });
        }


        var chuyenBayDi = new FlightDetail({
            _maDatCho : max,
            _maChuyenBay : maChuyenBayDi,
            _ngay : ngayDi,
            _hang : hangDi
        });

        chuyenBayDi.save(function(err, chuyenBayDi) {
            if (err) {
                console.log(err);
            }
        });

        //Them hanh khach
        var p = new Passenger({
            _maDatCho: max,
            _danhXung: danhXung,
            _ho: ho,
            _ten: ten,
            _dienThoai: dienThoai,
            _quocTich: quocTich
        });

        p.save(function(err, p) {
            if (err) {
                console.error(err);
            } else {
                //Passenger.find(function(err, passengers) {
                // res.status(201).send({
                //     'messege': 'Created'
                // });
                //});
            }
        });
    });
});



//############################ Authenticate ############################################


apiRoutes.post('/users', function(req, res) {

  // create a sample user
  var admin = new User({ 
    username: req.body.username, 
    password: req.body.password,
    admin: true 
  });

  // save the sample user
  admin.save(function(err) {
    if (err) {
        res.status(400).json({'error' : 'bad request'});
    }

    console.log('User saved successfully');
    res.status(201).send({'message' : 'created'});
  });
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

    console.log(req.body.username);
    console.log(req.body);
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    console.log(user);
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});


//Tạo chuyến bay

apiRoutes.post('/flights', function(req, res) {
    var maChuyenBay = req.body.maChuyenBay;
    var noiDi = req.body.noiDi;
    var noiDen = req.body.noiDen;
    var ngay = req.body.ngayDi;
    var gio = req.body.gio;
    var hang = req.body.hang;
    var soGhe = req.body.soGhe;
    var giaVe = req.body.giaVe;

    console.log(ngay);

    var f = new Flight({
        _ma: maChuyenBay,
        _noiDi: noiDi,
        _noiDen: noiDen,
        _ngayDi: ngay,
        _gioDi: gio,
        _hang: hang,
        _soGhe: '200',
        _giaVe: giaVe
    });

    f.save(function(err, f) {
        if (err) {
            res.status(400).send({
                'error': 'Bad request (The data is invalid)'
            });
            return console.error(err);
        } else {
            Booking.find(function(err, bookings) {
                res.status(201).send({
                    'messege': 'Created'
                });
            });
        }
    });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});





// Sửa chuyến bay

apiRoutes.put('/flights/:id', function(req, res) {
   
    var maChuyenBay = req.body.maChuyenBay;
    var noiDi = req.body.noiDi;
    var noiDen = req.body.noiDen;
    var ngay = req.body.ngay;
    var gio = req.body.gio;
    var hang = req.body.hang;
    var soGhe = req.body.soGhe;
    var giaVe = req.body.giaVe;

    Flights.findOne({
               _id : ObjectId(req.params.id)
            }, function(err, f) {

                if (err) throw err;

                if (!f) {
                    f._ma = maChuyenBay;
                    f._noiDi = noiDi;
                    f._noiDen = noiDen;
                    f._ngayDi = ngay;
                    f._gioDi = gio;
                    f._hang = hang;
                    f._soGhe = soGhe;
                    f._giaVe = giaVe;

                    f.save(function(err, f) {
                    if (err) {
                        res.status(400).send({
                            'error': 'Bad request (The data is invalid)'
                        });
                        return console.error(err);
                    } else {
                        Booking.find(function(err, bookings) {
                            res.status(200).send({
                                'messege': 'Updated'
                            });
                        });
                    }
                });
                }


                
            });
});

apiRoutes.delete('/flights/:id', function(req, res) {

    Flights.remove({
        _id : ObjectId(req.params.id)
    }, function(err) {
        if (!err) {
            console.log('remove flight successfull');
        } else {
            console.log(error);
        }
    });
});


//API Lấy danh sách đặt chỗ
apiRoutes.get('/bookings', function(req, res) {
    Booking.find(function(err, bookings) {
        if (err)
            return console.error(err);
        else {
            res.send(bookings);
        }
    });
});

//API Lấy danh sách chi tiết chuyến bay
apiRoutes.get('/flight_details', function(req, res) {
    FlightDetail.find(function(err, flight_details) {
        if (err)
            return console.error(err);
        else {
            res.send(flight_details);
        }
    });
});



var port = process.env.PORT || 8081;

apiRoutes.get('/', function(req, res) {
    res.send('API run at localhost:' + port + '/api');
});

app.use('/api', apiRoutes);


//Test 


app.listen(port);