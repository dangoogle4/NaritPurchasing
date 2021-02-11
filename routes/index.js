var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
const { ObjectId, Int32 } = require("mongodb");
let MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydata";
const fs = require("fs");
const moment = require("moment");
const { json } = require('body-parser');

// const koaBody = require('koa-body');


// app.use(koaBody({
//   multipart: true,
//   formLimit: "10mb",
//   jsonLimit: "10mb",
//   textLimit: "10mb",
//   enableTypes: ['json', 'form', 'text']
// }));



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

router.post("/api/regis", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo.collection("user").insertOne(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        priority: req.body.priority,
      },
      function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});

router.post("/drop/imageNewNew", function (req, res, next) {
  console.log("is that coming <<>>"+req.body.nameImageNew);
  console.log("wpodjpqwd");
  console.log(".."+__dirname);

  fs.unlink(__dirname + '/../public/upload/temp/pic/'+req.body.nameImageNew, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
 });

 res.send(200);

 
});

// router.post("/get/user", function (req, res, next) {
//   MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("Purchasing");
//     dbo.collection("user").count({}, function (err, result_count_user) {
//       if (err) throw err;
//       // console.log(result_count_user);
//       dbo
//         .collection("user")
//         .find(
//           {},
//           {
//             projection: {
//               _id: 1,
//               name: 1,
//               surname: 1,
//               username: 1,
//               email: 1,
//               priority: 1,
//             },
//           }
//         )
//         // .skip(paging_admin)
//         // .limit(per_page_admin)
//         .sort({ _id: -1 })
//         .toArray(function (err, result) {
//           if (err) throw err;
//           // console.log(userid);
//           res.send([result, result_count_user]);
//           db.close();
//         });
//     });
//   });
  // res.send("ok" + req.body.tabel);
// });

router.post("/get/user", function (req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo.collection("user").count({}, function (err, result_count_user) {
      if (err) throw err;
      // console.log(result_count_user);
      dbo
        .collection("user")
        .find({})
        // .skip(paging_admin)
        // .limit(per_page_admin)
        .toArray(function (err, result) {
          if (err) throw err;
          // console.log(userid);
          res.send([result, result_count_user]);
          db.close();
        });
    });
  });
  // res.send("ok" + req.body.tabel);
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
        reason: req.body.reason,
        deldummymaintable: req.body.DeleteForDummyMainTable,
        //shopid: req.body.shopid,
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

router.post("/api/addmaintableadmin", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  console.log("Dannwqpdokqwpod"+ req.body.LetServerGetDataOrderFromMainTable);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { order: req.body.LetServerGetDataOrderFromMainTable};
    //console.log(myquery);
    var myitem = { 
      //status: req.body.status,
      $set: { status: [req.body.status], reason: [req.body.reason]
      
       },
       
    };
    // { $set: { [status: req.body.status],
    //   reason: req.body.reason,}
        
        //group: req.body.group,
        //department: req.body.department,
     //};
    dbo.collection("maintable").updateOne(myquery,myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});

router.post("/api/updateShopInMainqweqweqwe", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  var UPDATEKUB = JSON.parse(req.body.ShopKubEIEIEIEIEI);
  console.log("Dannwqpdokqwpod---->>"+ req.body.mainIdForDeleteData);
  console.log("DANMAPOW", JSON.parse(req.body.ShopKubEIEIEIEIEI));
  
  //console.log("eiei"+ req.body.EI);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { order: req.body.mainIdForDeleteData};
    //console.log(myquery);
    var myitem = { //status: req.body.status,
      $set: { shopid: UPDATEKUB,
 },
       
    };
    // { $set: { [status: req.body.status],
    //   reason: req.body.reason,}
        
        //group: req.body.group,
        //department: req.body.department,
     //};
    dbo.collection("maintable").updateMany(myquery,myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});



router.post("/api/addmaintableadminforshopid", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  console.log("[rpfkr[pflew[plfewp[lfwpelfdsplfdsflds]f[l]]]]"+ req.body.LetServerGetDataOrderFromMainTable);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { order: req.body.LetServerGetDataOrderFromMainTable};
    //console.log(myquery);
    var myitem = { 
      //status: req.body.status,
      $addToSet: { shopid: ObjectId(req.body.shopidnew)
      
       },
       
    };
    // { $set: { [status: req.body.status],
    //   reason: req.body.reason,}
        
        //group: req.body.group,
        //department: req.body.department,
     //};
    dbo.collection("maintable").updateOne(myquery,myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});



router.post("/uploadImageTemporary", function (req, res) {
  // console.log(req.body.serialnum);

  const folderName = __dirname + "/../public/upload/temporary/pic/";
  // console.log(folderName);
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }

  let sampleimage;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  console.log(req.files.sampleimage.length);
  // console.log('req.files >>>', req.files); // eslint-disable-line
  if (req.files.sampleimage.length > 1) {
    for (let i = 0; i < req.files.sampleimage.length; i++) {
      sampleimage = req.files.sampleimage[i];

      uploadPath =
      
      
        __dirname + "/../public/upload/temporary/pic/" + sampleimage.name;

      sampleimage.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        // res.send("File uploaded to " + uploadPath);
      });
    }
    res.send("File uploaded to " + uploadPath);
  } else {
    sampleimage = req.files.sampleimage;

    uploadPath =
      __dirname + "/../public/upload/temporary/pic/" + sampleimage.name;

    sampleimage.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      res.send("File uploaded to " + uploadPath);
    });
  }
});


router.post("/api/adddata", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("Danooo"+ req.body.item);
    var dbo = db.db("Purchasing");
    var myitem = {
      //shop: req.body.shop, //--> come from shoptable (must add shop first)
      item: req.body.item,
      partnumber: req.body.partnumber,
      price: parseFloat(req.body.price),
      amount: parseInt(req.body.amount),
      priceadmin:parseFloat(req.body.priceadmin),
      amountadmin:parseInt(req.body.amountadmin),
      sumprice: parseFloat(req.body.sumprice),
      sumpriceadmin:parseFloat(req.body.sumpriceadmin),
      responsibleperson: req.body.responsibleperson,
      shopid: ObjectId(req.body.storage),
      mainid: req.body.mainid,
      statusz: req.body.statusz, //--> come from admin table (admin must add this thing)
      picture: req.body.picture,
       //--> can't do this rightnow (don't have knowlage to do)
      //reason:  req.body.reason, --> from admin cuz admin can add this thing into maintable
        //group: req.body.group,
        //department: req.body.department,
    };
    
    dbo.collection("data").insertOne(myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();

        // let newid = ObjectId(result.ops[0]._id);
        let itemForLog = req.body.item;
        let mainId = req.body.mainid;
        // let new_name = req.body.equipmentName;
      
       console.log("i want to see it! --->> ",itemForLog )

          createlog(itemForLog,mainId,req,"ADDDATA",function (result_log) {

            console.log("IS THAT COMING ?"+result_log);
            res.send(true);
          }
        );
      }
    );
  });
});


router.post("/api/adddata2", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("Danooo"+ req.body.item);
    var dbo = db.db("Purchasing");
    var myitem = {
      //shop: req.body.shop, //--> come from shoptable (must add shop first)
      item: req.body.item,
      partnumber: req.body.partnumber,
      price: parseFloat(req.body.price),
      amount: parseInt(req.body.amount),
      priceadmin:parseFloat(req.body.priceadmin),
      amountadmin:parseInt(req.body.amountadmin),
      sumprice: parseFloat(req.body.sumprice),
      sumpriceadmin:parseFloat(req.body.sumpriceadmin),
      responsibleperson: req.body.responsibleperson,
      shopid: ObjectId(req.body.storage),
      mainid: req.body.mainid,
      statusz: req.body.statusz, //--> come from admin table (admin must add this thing)
      picture: req.body.picture,
       //--> can't do this rightnow (don't have knowlage to do)
      //reason:  req.body.reason, --> from admin cuz admin can add this thing into maintable
        //group: req.body.group,
        //department: req.body.department,
    };
    
    dbo.collection("data").insertOne(myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();

          // let newid = ObjectId(result.ops[0]._id);
          let itemForLog = req.body.item;
          let mainId = req.body.mainid;
          // let new_name = req.body.equipmentName;
        
         console.log("i want to see it! --->> ",itemForLog )
  
         createlog(itemForLog,mainId,req,"ADDDATA",function (result_log) {
  
              console.log("IS THAT COMING ?"+result_log)
              res.send(result_log);
            }
          );
      }
    );
  });
});

router.post("/api/addshop", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myitem = {
      nameOfShop: req.body.shop, //--> come from shoptable (must add shop first)
      typeOfShop: req.body.type,
      tax: req.body.tax,
      //mainid: req.body.mainid,
     
    };
    dbo.collection("shop").insertOne(myitem, function (err, result) {
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
      .sort({_id: -1 })
      .toArray(function (err, result_category) {
        if (err) throw err;
         //console.log("DDannn" + result._id);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/maintableforshopid", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo
      .collection("maintable")
      .find({order: req.body._ID})
      .toArray( function (err, result_category) {
        if (err) throw err;
         //console.log("DDannn" + result._id);
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

router.post("/get/dataForSearchTableMainIdAdmin", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      .sort({_id: -1 })
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdAdminDan", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({_id: ObjectId(req.body._ID)})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdAdmin2", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      .sort({_id: -1 })
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdAdmin23", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID ,shopid: ObjectId(req.body._ID2)})
      .sort({_id: -1 })
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdAdmin234", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID ,shopid: ObjectId(req.body._ID2)})
      .sort({_id: -1 })
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});



router.post("/get/dataForSearchTableMainIdAdmin3", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      // .sort({_id: -1 })
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});


router.post("/get/dataForSearchTableMainIdUser", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      .sort({_id: -1 })
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
    console.log("MAINMAINMAINMAINMAIN    "+req.body.deldummymaintablenew);
    
    console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        order: req.body.ordernew,
        respon: req.body.responnew,
        amount: req.body.amountnew,
        nameorder: req.body.nameordernew,
        status: req.body.statusnew,
        //deldummymaintable: 1,
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

router.post("/save/editshop", function (req, res, next) {
 
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    //console.log("MAINMAINMAINMAINMAIN    "+req.body.deldummymaintablenew);
    
    //console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        nameOfShop: req.body.shopnewforedit,
        typeOfShop: req.body.typeshopppnew,
        tax: req.body.taxnew,
        // nameorder: req.body.nameordernew,
        // status: req.body.statusnew,
        //deldummymaintable: 1,
        //status: req.body.status,
      },
    };
    dbo
      .collection("shop")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});


router.post("/save/editmaindummydrop", function (req, res, next) {
 
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("MAINMAINMAINMAINMAIN    ");
    
    console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        deldummymaintable: 1,
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

router.post("/save/recovermain", function (req, res, next) {
 
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("MAINMAINMAINMAINMAIN    ");
    
    console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        deldummymaintable: 0,
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
    console.log(req.body.mainidnew);
    var newvalues = {
      $set: {
        //shop:req.body.shopnew,
        item:req.body.itemnew,
        partnumber:req.body.partnumbernew,
        price:parseFloat(req.body.pricenew),
        amount:parseInt(req.body.amountnew),
        priceadmin:parseFloat(req.body.pricenewedit),
        amountadmin:parseInt(req.body.amountnewedit),
        sumprice:parseFloat(req.body.sumpricenew),
        sumpriceadmin:parseFloat(req.body.sumpricenewedit),
        responsibleperson:req.body.responsiblepersonnew,
        picture: req.body.image,
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

        let itemForLog = req.body.itemnew;
        let mainId = req.body.mainidnew;
        //let new_name = req.body.name_equipment;

        createlog(itemForLog,mainId,req, "UPDATE", function (result_log) {
            res.send(result_log);
          }
        );

        // res.send(true);
      });
  });
});

router.post("/save/editDataUserAdmin", function (req, res, next) {
  //console.log('DDDD');
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("DAN" + req.body.ServergetDataId);
    var newvalues = {
      $set: {
        //shop:req.body.shopnew,
        name:req.body.name,
        surname:req.body.surname,
        username:req.body.username,
        password: req.body.password,
        //mainid: ObjectId(req.body.mainid),
      },
    };
    dbo
      .collection("user")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        // let itemForLog = req.body.name;
        // let mainId = req.body.mainidnew;
        //let new_name = req.body.name_equipment;

        // createlog(itemForLog,mainId,req, "UPDATE", function (result_log) {
        //     res.send(result_log);
        //   }
        //);

         res.send(true);
      });
  });
});


router.post("/save/editdataadminColor", function (req, res, next) {
  //console.log('DDDD');
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("DAN" + req.body.ServergetDataId);
    var newvalues = {
      $set: {
        //shop:req.body.shopnew,
        statusz:req.body.statusColor,
        //mainid: ObjectId(req.body.mainid),
      },
    };
    dbo
      .collection("data")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        // let itemForLog = req.body.name;
        // let mainId = req.body.mainidnew;
        //let new_name = req.body.name_equipment;

        // createlog(itemForLog,mainId,req, "UPDATE", function (result_log) {
        //     res.send(result_log);
        //   }
        //);

         res.send(true);
      });
  });
});





router.post("/save/editdataadmin", function (req, res, next) {
  console.log('DDDD');
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
        //shop:req.body.shopnew,
        item:req.body.itemnew,
        partnumber:req.body.partnumbernew,
        price:parseFloat(req.body.pricenew),
        amount:parseInt(req.body.amountnew),
        priceadmin:parseFloat(req.body.pricenewedit),
        amountadmin:parseInt(req.body.amountnewedit),
        sumprice:parseFloat(req.body.sumpricenew),
        sumpriceadmin:parseFloat(req.body.sumpricenewedit),
        responsibleperson:req.body.responsiblepersonnew,
       // picture: picture,
        statusz:req.body.statusznew,
        picture:req.body.imagenew,
        //mainid: ObjectId(req.body.mainid),
      },
    };
    dbo
      .collection("data")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        let itemForLog = req.body.itemnew;
        let mainId = req.body.mainidnew;
        //let new_name = req.body.name_equipment;

        createlog(itemForLog,mainId,req, "UPDATE", function (result_log) {
            res.send(result_log);
          }
        );

        //res.send(true);
      });
  });
});


router.post("/get/shop", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  console.log('Dan');

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //var query = { _id: ObjectId(req.body.profile) };
    //console.log(query);
    dbo
      .collection("shop")
      //.find({shopid: req.body.shop})
       .find({})
       .sort({_id: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        db.close();
      });
  });
});

router.post("/get/loghistory", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  console.log('Dan');

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //var query = { _id: ObjectId(req.body.profile) };
    //console.log(query);
    dbo
      .collection("historylog")
      //.find({shopid: req.body.shop})
       .find({})
       .sort({_id: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        db.close();
      });
  });
});



// router.get("/getTemporaryImage", function (req, res) {
//   const directoryPath = __dirname + "/../public/upload/temp/pic/";
//   //console.log(directoryPath);
//   fileListImage = { files: [] };

//   try {
//     if (!fs.existsSync(directoryPath)) {
//       fs.mkdirSync(directoryPath, { recursive: true });
//     }
//   } catch (err) {
//     console.error(err);
//   }

//   fs.readdir(directoryPath, function (err, getfiles) {
//     //handling error
//     if (err) {
//       return console.log("Unable to scan directory: " + err);
//     }
//     //listing all files using forEach
//     getfiles.forEach(function (file) {
//       // Do whatever you want to do with the file
//       check = fileListImage.files.push(String(file));
//       console.log(check + " " + file);
//     });
//     //console.log(fileList);
//     res.send(fileListImage);
//   });
// });


router.post("/post/shopforquery", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.key);

  console.log('Dan+++++++++++++'+req.body.key);
  var regexp = new RegExp('^'+req.body.key+'.*', "i" );
  console.log("WOW---->      "+regexp);

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //var query = { _id: ObjectId(req.body.profile) };
    //console.log(query);
    dbo
      .collection("shop")
      //.find({shopid: req.body.shop})
     .aggregate( [{ $match: { nameOfShop: regexp}}]) //แก้นิดหน่อย
    // .find( { nameOfShop: { /^req.body.key/} ) //แก้นิดหน่อย
     // .find( { nameOfShop: /^req.body.key/} ) //แก้นิดหน่อย
    //, $options: 'is'
     .sort ({nameOfShop: -1 })
    //.limit(5) 
    //new RegExp('^' + req.body.key )
       ///acme.*corp/ /^S.*$/
       //db.getCollection('shop').find({ nameOfShop: {'$regex': /^p.*$/}})
      .toArray(function (err, result) {
        if (err) throw err;
         //console.log(result);
         console.log("OHHHHHHH--->>>>>   "+result.length);
        res.send(result);
        db.close();
      });
  });
});


// app.get('/search/:text', async function (req, res, next) {
//   console.log('in')
//   try {
//       console.log(req.params.text)
//       let items = [];
//       await db.instance().collection('test').find({name: { $regex : "^"+req.params.text}}).forEach((data) => {
//           items.push(data);
//       });
//       console.log(items)
//       await res.status(200).json({error: 0, payload: items});
//   } catch (e) {
//       console.log(e);
//       await res.status(200).send(e);
//   }
// });






router.post("/get/users", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  console.log('Dan');

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //var query = { _id: ObjectId(req.body.profile) };
    //console.log(query);
    dbo
      .collection("user")
      //.find({shopid: req.body.shop})
       .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result);
        db.close();
      });
  });
});

router.post("/get/usersForPriority", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  console.log('Dan');

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //var query = { _id: ObjectId(req.body.profile) };
    //console.log(query);
    dbo
      .collection("user")
      //.find({shopid: req.body.shop})
       .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        db.close();
      });
  });
});

router.post("/get/showshopnameintable", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  console.log('Dan');

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    // console.log("asdsadsad");
    // var query = { _id: req.body._ID }; // ไแกกกกกก --- ก้ทำเหมือน Edit ไง ส่งค่า post มา
    //console.log(query);
    dbo
      .collection("data")
      //.find({shopid: req.body.shop})
       .find({shopid: ObjectId(req.body._ID)}) //เย้ ติดมาประมาน 7 วัน อันตราย ขนลุกเลย
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
  
});

router.post("/get/showshopnameintableinadminaccess", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  //console.log('Danqq'+ _ID2);

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    // console.log("asdsadsad");
     // query = { shopid: ObjectId(req.body._ID)}; // ไแกกกกกก --- ก้ทำเหมือน Edit ไง ส่งค่า post มา
    //console.log(query);
    dbo
      .collection("data")
      //.find({shopid: req.body.shop})

       //.find( {shopid: ObjectId(req.body._ID)},
       .find({mainid: req.body._MAINID ,shopid: ObjectId(req.body._ID)}) //เย้ ติดมาประมาน 7 วัน อันตราย ขนลุกเลย
       .sort({_id: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });

  
  
});

router.post("/get/showshopnameintableinadminaccess2", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  //console.log('Danqq'+ _ID2);

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    // console.log("asdsadsad");
     // query = { shopid: ObjectId(req.body._ID)}; // ไแกกกกกก --- ก้ทำเหมือน Edit ไง ส่งค่า post มา
    //console.log(query);
    dbo
      .collection("shop")
      //.find({shopid: req.body.shop})

       //.find( {shopid: ObjectId(req.body._ID)},
       .find({_id: ObjectId(req.body._MAINID)})

      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });

  
  
});

// router.post("/get/showshopnameintableinadminaccessZzzz", function (req, res, next) {
//   // res.send("ok post complete"+" "+req.body.nameuser);
//   //console.log('Danqq'+ _ID2);

//   MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("Purchasing");
//     // console.log("asdsadsad");
//      // query = { shopid: ObjectId(req.body._ID)}; // ไแกกก
//     //console.log(query);
//     dbo
//       .collection("data")
//       //.find({shopid: req.body.shop})

//        //.find( {shopid: ObjectId(req.body._ID)},
//        .find({}) //เย้ ติดมาประมาน 7 วัน อันตราย ขนลุกเลย

//       .toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//         db.close();
//       });
//   });
  
// });


router.post("/get/shopforadd", function (req, res, next) {

  
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //Find all documents in the customers collection:
    dbo
      .collection("shop")
      .find({})
      .sort({nameOfShop : 1})
      .toArray(function (err, roomName) {
        for(let i = 0;i < roomName.length;i++){
          //console.log("resultsearchroom   "+roomName[i].room)
        }
        if (err) throw err;
        // console.log([category_result,result_owner]);
        //console.log("room      "+roomName[1].room);
        res.send(roomName);
        // owner_name(result_owner);

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
      //res.send('Dan');
      db.close();

      let itemForLog = req.body.itemkub;
      let mainId = req.body.mainid;
      console.log("ppooo"+itemForLog);
      // let new_name = req.body.equipmentName;

      createlog( itemForLog,mainId, req,"DELETE", function (result_log) {
          res.send(true);
        }
      );

    });
  });
});

router.post("/drop/dataAdmin", function (req, res, next) {
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

      let itemForLog = req.body.itemkub;
      let mainId = req.body.mainid;
      console.log("ppooo"+itemForLog);
      // let new_name = req.body.equipmentName;

      createlog( itemForLog,mainId, req,"DELETE", function (result_log) {
          res.send(true);
        }
      );


    });
  });
});

router.post("/drop/DataShop", function (req, res, next) {
   console.log("Hi DataShop");
  // console.log(req.body.drop_id_category);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var dropcategory = { _id: ObjectId(req.body.dropRoomId) };
    dbo.collection("shop").deleteOne(dropcategory, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send('Dan');
      db.close();
    });
  });
});

router.post("/drop/DataShopInMain", function (req, res, next) {
  console.log("Hi DataShop");
 // console.log(req.body.drop_id_category);
 MongoClient.connect(url, function (err, db) {
   if (err) throw err;
   var dbo = db.db("Purchasing");
   var dropcategory = { shopid:  ObjectId(req.body.dropRoomId) };
   dbo.collection("maintable").deleteOne(dropcategory, function (err, obj) {
     if (err) throw err;
     console.log("1 document deleted");
     res.send("Err: "+err+" | OJB: "+obj);
     db.close();
   });
 });
});

router.post("/get/maintable2", function (req, res, next) {
   console.log("hkr",req.body.mainid);
  // res.send("HRK");
  var maindForFind = req.body.mainid;
  console.log("maid"+maindForFind);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo
      .collection("maintable")
      .find({order: maindForFind})
      // .sort({_id: -1 })
      .toArray(function (err, result_category) {
        if (err) throw err;
         //console.log("DDannn" + result._id);
        res.send(result_category);
        db.close();
      });
  });
});




router.post("/users/login", function (req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("Server test")
    console.log("UserName 1 :: ",req.body.userName);
    console.log("UserName 2 :: ",req.body.username);
    console.log("Password  :: ",req.body.password);


    //Find the first document in the customers collection:
    dbo
      .collection("user")
      .findOne( //Chack Qury ทีว่ามัน where ถูกไหท +++++++ เรียบร้อย ลองู
        { username: req.body.username, password: req.body.password },
        function (err, result) {
          if (err) throw err;
          db.close();

          console.log(result);
          // res.send(result);

          if (result != null) {
            // console.log(result);
            // create cookies
            let result2 = { //จะอ้วกแล้ว
              id: result._id,
              name: result.name,
              surname: result.surname,
              priority: result.priority,
              email: result.email,
              username: result.username
            };

            let Max_Age = 1000 * 60 * 60 * 12; //อายุ cookie ครึ่งวัน 12 ชั่วโมง
            res.cookie("CookieUser", JSON.stringify(result2), { //
              maxAge: Max_Age,
            });
            res.send(result2);
          } else {
            res.send(false);
          }
        }
      );
  });
});

router.post("/users/logout", function (req, res, next) {

  res.clearCookie("CookieUser");
  // res.redirect('/');
  // res.end();
  res.send(true);
});


router.post('/uploadimage', function(req, res) 
{
  // console.log(req.body.serialnum);

  const folderName = __dirname + '/../public/upload/'+ req.body.serialnum
  // console.log(folderName);
    try 
    {
      if (!fs.existsSync(folderName)) 
      {
        fs.mkdirSync(folderName,{ recursive : true });
      }
    }
    catch (err) 
    {
      console.error(err)
    }


  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) 
  {
    res.status(400).send('No files were uploaded.');
    return;
  }

  // console.log('req.files >>>', req.files); // eslint-disable-line

  sampleimage = req.files.sampleimage;

  uploadPath = __dirname + '/../public/upload/'+ "eiei" +'/'+ "eiei";

  sampleimage.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});


function createlog(itemForLog,mainId, req, operation) { // in the past they have "callback"
  console.log("is that coming ?");
  var myobj = {
    itemhistory: itemForLog,
    mainname: mainId,
    // user_id: ObjectId(JSON.parse(req.cookies.CookieUser).id),
    // equipment_id: equip_id,
    // name: new_name,
    date: new moment().format(),
    activity: operation,
    // note: JSON.stringify(req.body),
    username: JSON.parse(req.cookies.CookieUser).name,
  };

   console.log("out out out"+new moment().format(),itemForLog,operation,
                             JSON.parse(req.cookies.CookieUser).name);
  //isnert log in database

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");

    dbo.collection("historylog").insertOne(myobj, function (err, result) {
      if (err) throw err;
       console.log("1 document inserted");
      // res.send(true);
      db.close();
    });
  });

  // callback(true);
}









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
