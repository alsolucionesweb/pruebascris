const express = require("express");
const fileUpload = require('express-fileupload')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");

/* cors */
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json({limit: '500mb'}));
app.use(
  express.urlencoded({
    extended: true,
    limit: '500mb',
    parameterLimit: 1000000
  })
);
app.use(fileUpload());
app.use(
    "/api-docs",
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);
app.use('/api',cors(),require("./src/routes/api"));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});