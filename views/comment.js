const express = require("express");
const {getComments, postNewComment} = require("../controllers/comment");

const router = express.Router();


// @ route: GET /
// @ desc: Returns all the comments in the database
// @ access: public

router.get("/", getComments);

// @ route: POST /
// @ desc: Generates a new comment and inserts it to the DB
// @ access: publid

router.post("/", postNewComment);

module.exports = router;