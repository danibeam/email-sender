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
