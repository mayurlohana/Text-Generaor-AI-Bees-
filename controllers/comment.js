const mongoose = require("mongoose");
const winkNLP = require("wink-nlp");
const sentiment = require("wink-sentiment");
const its = require("wink-nlp/src/its");
const model = require("wink-eng-lite-model");
const fs = require("fs");

const nlp = winkNLP(model);

const commentModel = require("../models/comment");

let jsonBytes = fs.readFileSync(__dirname + "/commentTemplates.json");

let jsonDoc = JSON.parse(jsonBytes);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

async function generateNewComment(tweetText, cat) {
    const sentimentScore = sentiment(tweetText).score;
    const senti = sentimentScore > 1 ? "pos" : (sentimentScore < 1 ? "neg" : "net");
    const doc = nlp.readDoc(tweetText);

    let nounIdx = new Array();
    let toks = doc.tokens().out(its.value);
    let pos = doc.tokens().out(its.pos);

    pos.forEach((element, idx) => {
        if (element === "PROPN") {
            nounIdx.push(idx);
        }
    });

    let possibleComments = jsonDoc[cat][senti];

    let randIdx = getRandomInt(possibleComments.length);
    let newComment = possibleComments[randIdx].format(toks[nounIdx[0]]);
    let dbComments = await commentModel.find({
        commentText: newComment
    });

    while (dbComments.length != 0) {
        randIdx = getRandomInt(possibleComments.length);
        newComment = possibleComments[randIdx].format(toks[nounIdx[0]]);
        dbComments = await commentModel
        console.log("Regenerating comment, new comment: {0}".format(newComment));
    }
    return newComment;
}


module.exports = {
    getComments: async (req, res) => {
        try {
            const comments = await commentModel.find();
            res.json({
                status: "success",
                comments
            });
        } catch (error) {
            console.log("Error getting comments.");
            res.json({
                status: "fail",
                reason: "error",
                error: error.message
            });
        }
    },
    postNewComment: async (req, res) => {
        try {
            const {
                tweet,
                category
            } = req.body;
            const newCommentText = await generateNewComment(tweet, category);
            const newComment = new commentModel({
                commentText: newCommentText,
                category: category,
            });

            await newComment.save();
            res.json({
                status: "success",
                newComment
            });

        } catch (error) {
            console.error("Error in generating new Comment:", error.message);
            res.json({
                status: "fail",
                reason: "error",
                error: error.message
            })
        }

    }
}