import { Request, Response } from 'express';
import { sendEmail } from '../utils/email.controller';

export const contactoSendEmail = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido,
    email,
    caracteristica,
    telefono,
    contenido,
    asunto,
  } = req.body;
  const emailCuerpo = `
        <div style="text-align: center; width: 100%; height: 100%; background: black; color: white;">
          <img src="https://scontent.faep8-1.fna.fbcdn.net/v/t1.0-9/73257648_699185753906957_503143044925620224_o.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=IhMcAjejbHsAX9riwJ6&_nc_ht=scontent.faep8-1.fna&oh=0f4efc83a298a8ef8cca57e008b8e69c&oe=5FE37C12"
          style="width: 30%"
          alt="logo voces">
          <h1>¡Llegó una consulta!</h1>
          <h3>Datos de la Persona</h3>
          <label><strong style="color: #fc01a0">Nombre Completo</strong>: ${nombre} ${apellido}</label><br>
          <label><strong style="color: #fc01a0">Email</strong>: ${email}</label><br>
          <label><strong style="color: #fc01a0">Teléfono</strong>: (${caracteristica}) ${telefono}</label><br>
          <br>
          <h3>Consulta</h3>
          <p>${contenido}</p>
        </div>
    `;
  await sendEmail('vocesescueladecanto@gmail.com', asunto, emailCuerpo);
  return res.status(200).json({ message: 'Mail Sent' });
};
