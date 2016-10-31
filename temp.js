//----CODE THEM CHUYEN BAY MOI----


// var f = new Flight({
// 	_ma:'BL327',
// 	_noiDi:'SGN',
// 	_noiDen:'BMT',
// 	_ngayDi:'10-25-2016',
// 	_gioDi: '7:45',
// 	_hang: 'C1',
// 	_soGhe: '200',
// 	_giaVe: 2000000
// });

// f.save(function(err, f) {
// 	if (err) {

// 	} else {
// 		Flight.find(function(err, flights) {
// 			console.log(flights);
// 		});
// 	}
// });


//API Lấy danh sách chuyến bay
// app.get('/flights', function(req, res) {
//     // get all the flights
//     Flight.find(function(err, flights) {
//         if (err)
//             return console.error(err);
//         else {
//             res.send(flights);
//             //console.log(flights);
//         }
//     });
// });

//Ham lay danh sach cac chuyen bay theo muc gia (E)
Flight.find({
    _mucGia: 'Y'
}, function(err, flights) {
    if (err)
        return console.error(err);
    else {
        //console.log('-----DANH SACH CHUYEN BAY THEO MUC GIA----');
        //console.log(flights);
    }
});

//API Lay thong tin san bay di
app.get('/detailarr_airports/:ma', function(req, res) {
    var ma = req.params.ma;

    Flight.findOne({
        _noiDi: ma
    }).select('_noiDen -_id').exec(function(err, arrs) {
        console.log('arr', arrs._noiDen);

        Airport.find({
            _ma: arrs._noiDen
        }).select('_nhomSanBay _diaDanh -_id').exec(function(err, arrs) {
            if (err) {
                res.status(400).send({
                    'error': 'Bad request (The data is invalid)'
                });
                return console.log(err);
            } else {
                res.status(200).send(arrs);
                console.log(arrs);
            }
        });
    });
});


//API4 Tim chuyen bay thoa yeu cau
//Chua xu ly duoc so ghe
// app.get('/flights', function(req, res) {
//     var maNoiDi = req.params.maNoiDi;
//     var maNoiDen = req.params.maNoiDen;
//     var ngayDi = req.params.ngayDi;
//     var soNguoi = req.params.soNguoi;

//     console.log('soNguoi', soNguoi);

//     Flight.find({
//         _noiDi: maNoiDi,
//         _noiDen: maNoiDen,
//         _ngayDi: ngayDi,
//         "$where": "this._soGhe >= 0"
//     }).select('_ma _noiDi _noiDen _ngayDi _gioDi _soGhe _giaVe -_id').exec(function(err, flights) {
//         if (err) {
//             res.status(400).send({
//                 'error': 'Bad request (The data is invalid)'
//             });
//             return console.error(err);
//         } else {
//             res.status(200).send(flights);
//             console.log(flights);
//         }
//     });
// });

//API7 Lay danh sach hanh khach
app.get('/passengers', function(req, res) {
    Passenger.find({}).select('_maDatCho _danhXung _ho _ten -_id').exec(function(err, passengers) {
        if (err) {
            return console.error(err);
        } else {
            res.status(200).send(passengers);
            console.log(passengers);
        }
    });
});

//API8 Them hanh khach
app.post('/api/passengers', function(req, res) {
    var maDatCho = req.body.maDatCho;
    var danhXung = req.body.danhXung;
    var ho = req.body.ho;
    var ten = req.body.ten;
    var dienThoai = req.body.dienThoai;
    var quocTich = req.body.quocTich;

    var p = new Passenger({
        _maDatCho: maDatCho,
        _danhXung: danhXung,
        _ho: ho,
        _ten: ten,
        _dienThoai: dienThoai,
        _quocTich: quocTich
    });

    p.save(function(err, p) {
        if (err) {
            res.status(400).send({
                'error': 'Bad request (The data is invalid)'
            });
            return console.error(err);
        } else {
            Passenger.find(function(err, passengers) {
                console.log(passengers);
                res.status(201).send({
                    'messege': 'Created',
                    'data': p
                });
            });
        }
    });

});

//API9 Tao dat cho 
app.get('/bookings/:_maDatCho/:_thoiGianDatCho/:_tongTien', function(req, res) {
    var maDatCho = req.params._maDatCho;
    var thoiGian = req.params._thoiGianDatCho;
    var tongTien = Number(req.params._tongTien);

    var b = new Booking({
        _maDatCho: maDatCho,
        _thoiGianDatCho: thoiGian,
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
            Passenger.find(function(err, bookings) {
                console.log(bookings);
                res.status(201).send({
                    'messege': 'Created'
                });
            });
        }
    });
});

//API10 Thong tin dat cho
app.get('/bookings/:_ma', function(req, res) {
    var maDatCho = req.params._ma;

    Booking.find({
        _maDatCho: maDatCho
    }).select('_maDatCho _thoiGianDatCho _tongTien _trangThai -_id').exec(function(err, bookings) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(bookings);
            console.log(bookings);
        }
    });
});

//API11 Them chi tiet chuyen bay
app.get('/flight-details/:_maDatCho/:_maChuyenBay/:_ngay/:_hang', function(req, res) {
    var maDatCho = req.params._maDatCho;
    var maChuyenBay = req.params._maChuyenBay;
    var ngay = req.params._ngay;
    var hang = req.params._hang;

    var fb = new FlightDetail({
        _maDatCho: maDatCho,
        _maChuyenBay: maChuyenBay,
        _ngay: ngay,
        _hang: hang
    });

    fb.save(function(err, fd) {
        if (err) {
            res.status(400).send({
                'error': 'Bad request (The data is invalid)'
            });
            return console.error(err);
        } else {
            Passenger.find(function(err, fbs) {
                res.status(201).send({
                    'messege': 'Created'
                });
            });
        }
    });
});

//API Lấy danh sách chi tiết chuyến bay
app.get('/api/flight_details', function(req, res) {
    FlightDetail.find(function(err, flight_details) {
        if (err)
            return console.error(err);
        else {
            res.send(flight_details);
            //console.log(flight_details);
        }
    });
});

//API Lấy danh sách đặt chỗ
app.get('/api/bookings', function(req, res) {
    Booking.find(function(err, bookings) {
        if (err)
            return console.error(err);
        else {
            res.send(bookings);
            //console.log(bookings);
        }
    });
});

//API Lấy danh sách đặt chỗ
app.get('/api/passengers', function(req, res) {
    Passenger.find(function(err, passengers) {
        if (err)
            return console.error(err);
        else {
            res.send(passengers);
            //console.log(passengers);
        }
    });
});

app.get('/setupUser', function(req, res) {

  // create a sample user
  var admin = new User({ 
    username: 'admin', 
    password: 'admin',
    admin: true 
  });

  // save the sample user
  admin.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});