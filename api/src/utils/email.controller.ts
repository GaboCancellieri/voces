import nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  asunto: string,
  contenido: string
) => {
  // Definimos el transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vocesescueladecanto@gmail.com',
      pass: 'Canto123e',
    },
  });

  // Definimos el email
  const mailOptions = {
    from: 'VOCES',
    to: email,
    subject: asunto,
    html: contenido,
  };

  // Enviamos el email
  return await transporter.sendMail(mailOptions);
};
