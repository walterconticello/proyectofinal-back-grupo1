import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.KEY_GMAIL,
  },
});

async function registerSuccess(email) {
  const mailOptions = {
    from: `"Gol de Reserva 👻" <${process.env.GMAIL}>`,
    to: email,
    subject: 'Registro exitoso ✔',
    html: '<b>Bienvenido, has sido registrado correctamente</b>',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

export default registerSuccess;
