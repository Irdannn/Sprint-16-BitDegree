import  Express  from "express";

const app= Express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Your Fancy Random Quotes has been started, and listen to Port: ${PORT}`);
});

app.get("/", (request, response) => {
    response.send(`My Random quotes App is running`);
});