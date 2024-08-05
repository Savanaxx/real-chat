'use strict';
//error page
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    color: #333;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
                    max-width: 400px;
                    width: 100%;
                }
                h1 {
                    font-size: 3rem;
                    margin: 0;
                    color: #e74c3c;
                }
                p {
                    font-size: 1.5rem;
                    margin-top: 10px;
                    color: #555;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Whoops!</h1>
                <p>Something went wrong. Please try again later.</p>
            </div>
        </body>
        </html>
    `);
};

module.exports = errorHandler;