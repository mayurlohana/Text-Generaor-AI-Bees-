const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config()

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin"
    })
    .then(() => console.log("Comments database connected."))
    .catch(err => console.log("Error occured:", err, err.message));

const commentRouter = require("./views/comment");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// @ route: /comments
// @ desc: Forwards all the /comments requests to the comment view/router.
// @ access: public

app.use("/comments", commentRouter);


app.listen(process.env.PORT, () => {
    console.log("Application listening at:", process.env.PORT);
});