var express = require('express');
var router = express.Router();
var path = require("path");
const { route } = require(".");
let MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";


// router.get("/", function (req, res, next) {
//   //check cookies

//   res.sendFile(path.join(__dirname + "/main.html"));
// });

/* GET users listing. */
router.post("/login", function (req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //Find the first document in the customers collection:
    dbo
      .collection("user")
      .findOne(
        { userName: req.body.userName, password: req.body.password },
        function (err, result) {
          if (err) throw err;
          db.close();
          // console.log(result.email);
          // res.send(result);

          if (result != null) {
            // console.log(result);
            // create cookies
            let result2 = {
              id: result._id,
              name: result.name,
              surname: result.surname,
              priority: result.priority,
            };

            let Max_Age = 1000 * 60 * 60 * 12; //อายุ cookie ครึ่งวัน 12 ชั่วโมง
            res.cookie("CookieUser", JSON.stringify(result2), {
              maxAge: Max_Age,
            });
            res.send(true);
          } else {
            res.send(false);
          }
        }
      );
  });
});

router.post("/logout", function (req, res, next) {
  res.clearCookie("CookieUser");
  // res.redirect('/');
  // res.end();
  res.send(true);
});

module.exports = router;
