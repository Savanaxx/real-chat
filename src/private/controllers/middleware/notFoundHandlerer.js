'use strict';
//not found page
const notFoundHandler = (req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Not Found</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #101310;
                    color: #ffffff;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                .container {
                    background-color: #1d241ed5;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                }
                h1 {
                    font-size: 4rem;
                    margin: 0;
                }
                p {
                    font-size: 1.5rem;
                    margin: 10px 0 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Error 404</h1>
                <p>Not Found! :(</p>
            </div>
        </body>
        </html>
    `);
};

module.exports = notFoundHandler;