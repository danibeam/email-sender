require("dotenv").config();
const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");

router.post("/send-email", async (req, res) => {
  const { nombre, email, mensaje, dominio, emailDominio } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false,
    auth: {
      // Recibir auth por body? -> asi puedo usar solo una API para todas las webs
      user: process.env.user,
      pass: process.env.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter
    // .sendMail({
    //   from: "'Dani - test' <dani@abierto24.com>",
    //   to: "danibeam97@gmail.com",
    //   subject: "Prueba - contact form",
    //   text: "Hola, esto es una prueba",
    // })
    .sendMail({
      from: "Admin - Abierto24.com",
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
