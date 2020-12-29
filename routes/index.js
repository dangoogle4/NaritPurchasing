var express = require('express');
var router = express.Router();
const { ObjectId, Int32 } = require("mongodb");
let MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydata";


router.post("/initializeCollection", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydata");
    dbo.createCollection("user", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    dbo.createCollection("data", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    dbo.createCollection("shop", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    dbo.createCollection("maintable", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
});

router.post("/api/addmaintable", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myitem = {
        order: req.body.name,
        respon: req.body.lastname,
        amount: req.body.email,
        nameorder: req.body.phone,
        status: req.body.password,
        //group: req.body.group,
        //department: req.body.department,
    };
    dbo.collection("maintable").insertOne(myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});


router.post("/api/adddata", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myitem = {
      shop: req.body.shop,
      item: req.body.item,
      partnumber: req.body.partnumber,
      price: req.body.price,
      amount: req.body.amount,
      sumprice: req.body.sumprice,
      responsibleperson: req.body.responsibleperson,
      statusz: req.body.statusz,
        //group: req.body.group,
        //department: req.body.department,
    };
    dbo.collection("data").insertOne(myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});

router.post("/get/maintable", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo
      .collection("maintable")
      .find({})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/data", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo
      .collection("data")
      .find({})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

var getDataId = "";

router.post("/save/editmain", function (req, res, next) {
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log(myquery);
    console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        order: req.body.ordernew,
        respon: req.body.responnew,
        amount: req.body.amountnew,
        nameorder: req.body.nameordernew,
        status: req.body.statusnew,
        //status: req.body.status,
      },
    };
    dbo
      .collection("maintable")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});

router.post("/save/editdata", function (req, res, next) {
  //console.log('DDDD');
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("DAN" + req.body.ServergetDataId);
    console.log(req.body.shopnew);
    console.log(req.body.itemnew);
    var newvalues = {
      $set: {
        shop:req.body.shopnew,
        item:req.body.itemnew,
        partnumber:req.body.partnumbernew,
        price:req.body.pricenew,
        amount:req.body.amountnew,
        sumprice:req.body.sumpricenew,	
        responsibleperson:req.body.responsiblepersonnew,
       // picture: picture,
        statusz:req.body.statusznew,
        //shopid: ObjectId(req.body.shopid),
        //mainid: ObjectId(req.body.mainid),
      },
    };
    dbo
      .collection("data")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});


router.post("/get/shop", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //var query = { _id: ObjectId(req.body.profile) };
    //console.log(query);
    dbo
      .collection("shop")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        db.close();
      });
  });
});


router.post("/drop/mainTable", function (req, res, next) {
  // console.log("Hi category");
  // console.log(req.body.drop_id_category);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var dropcategory = { _id: ObjectId(req.body.dropRoomId) };
    dbo.collection("maintable").deleteOne(dropcategory, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send('Dan');
      db.close();
    });
  });
});

router.post("/drop/DataKrup", function (req, res, next) {
  // console.log("Hi category");
  // console.log(req.body.drop_id_category);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var dropcategory = { _id: ObjectId(req.body.dropRoomId) };
    dbo.collection("data").deleteOne(dropcategory, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send('Dan');
      db.close();
    });
  });
});










// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("Purchasing");
//   dbo.collection("maintable").updateOne(
    
    
//     myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });


module.exports = router;
