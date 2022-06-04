require("dotenv").config();
const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");
const cors = require("cors");

const whitelist = ["http://diesan.es", "http://caktus.eu"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, preflightContinue: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

router.get("/", (req, res) => {
  res.json({
    hello: "world",
  });
});

router.post("/send-email", cors(), async (req, res) => {
  const { nombre, email, mensaje, dominio, emailDominio } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter
    .sendMail({
      from: "Admin - Abierto24.com <info@abierto24.com>",
      // from: `Admin - Abierto24.com <${emailDominio}>`,
      to: emailDominio,
      subject: `Formulario de contacto - ${dominio}`,
      text: `
        Nombre: ${nombre}.
        Email: ${email}.
        Mensaje: ${mensaje}
      `,
    })
    .catch((err) => {
      console.error(err);
    });

  console.log("Mensaje enviado");

  res.send("Received");
});

module.exports = router;
// {
//     nombre: '',
//     asunto: '',
//     email: '',
//     mensaje: ''
// }
