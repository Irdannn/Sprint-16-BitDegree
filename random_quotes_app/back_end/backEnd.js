"use strict";

import  express  from "express";
import fs from "fs";
import { quotesJackHandey } from "./public/quotes.js";
import mongoose from "mongoose";
import { Quote } from "./models/quote.js";

const app= express();
const PORT = 3300;

const dbURI =
"mongodb+srv://Irdan:Anyonecanyoudo1@cluster0.ndqgavj.mongodb.net/test";

app.set("view engine", "ejs");
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000), console.log("connected to DB"))
  .catch((err) => console.log(err));


app.listen(PORT, () => {
    console.log(`Your Fancy Random Quotes has been started, and listen to Port: ${PORT}`);
});

//app.get("/", (request, response) => {
    //response.send(`My Random quotes App is running`);
//});
app.get("/", (request, response) => {
    //response.sendFile("./views/index.html", { root: "." });
    //const quotes = [
            //{author: 'Jack Handey', snippet: 'On time-travel ...'},
            //{author: 'Jack Handey', snippet: 'On poor people ...'},
            //{author: 'Jack Handey', snippet: 'On de-forrestation ...'}
        //]
    //response.render('index.ejs', {quotes: quotes})
    response.redirect("/quotes");
});
app.get("/about", (request, response) => {
  response.render("about.ejs");
});
app.get("/quotes/create", (req, res) => {
    res.render("create");
  });
//app.get("/404", (request, response) => {
    //response.sendFile("./views/404.html", { root: "." });
//});

app.post("/quotes", (req, res) => {
    console.log(req.body);
    const newQuote = new Quote(req.body);
    newQuote
      .save()
      .then((result) => {
        // res.send(result)
        res.redirect("/quotes");
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.get("/quotes", (req, res) => {
    Quote.find().then((result) => {
      res.render("index", { quotes: result });
    });
  });

app.get("/quotes/:id", (req, res) => {
console.log(req.params.id);
const id = req.params.id;
Quote.findById(id).then((result) => {
    console.log(result);
    res.render("details", { quote: result });
    });
});

app.delete("/quotes/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    Quote.findByIdAndDelete(id).then((result) => {
      console.log(result);
      res.json({ redirect: "/quotes" });
    });
});

app.get("/random", (request, response) => {
  // From original, FE randomizer
  // const randomNumber = Math.floor(Math.random() * quotesJackHandey.length);
  // console.log(randomNumber);

  // // Store the generated Quote
  // let randomQuote = quotesJackHandey[randomNumber];

  // // Return the Quote
  // response.send(randomQuote);

  response.render("random.ejs");
});

app.use((req, res) => {
    res.status(404).render("404.ejs");
});