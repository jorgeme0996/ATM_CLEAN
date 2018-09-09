var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/users");
    seedDB          = require("./seed");

var pagosRoutes     = require("./routes/pagos"),
    cuentasRoutes   = require("./routes/cuentas"),
    usersRoutes     = require("./routes/users");

//seedDB();
mongoose.connect("mongodb://localhost/atmClean", {useNewUrlParser: true});
//mongoose.connect("mongodb://jorge:jorge007@ds249942.mlab.com:49942/base10", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(require("express-session")({
    secret: "Payton es la mejor",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    req.logout();
    res.render("landing")
})

app.use(pagosRoutes);
app.use(cuentasRoutes);
app.use(usersRoutes);

app.listen(3000, function(){
    console.log("Esta vivo ")
});

//process.env.PORT,process.env.IP