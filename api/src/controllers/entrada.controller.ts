import { Request, Response } from 'express';
import { Entrada } from '../schemas';
import { sendEmail } from '../utils/email.controller';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import moment from 'moment';
import { randomString } from '../utils/codigo.controller';

export const getEntradas = async (req: Request, res: Response) => {
  const email: any = req.query.email;
  const entradas = await Entrada.find({ email, activa: true });
  res.json(entradas);
};

export const createEntrada = async (req: Request, res: Response) => {
  var entradas = req.body;
  for (const entrada of entradas) {
    var new_entrada = new Entrada(entrada);
    var codigo = randomString(10, '#aA');
    var hash = await bcrypt.hash(codigo, saltRounds);
    new_entrada['clave'] = hash;
    await new_entrada.save();
    var contenido = `
        <div style="text-align: center; width: 100%; height: 100%; background: black; color: white;">
          <img src="https://scontent.faep8-1.fna.fbcdn.net/v/t1.0-9/73257648_699185753906957_503143044925620224_o.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=IhMcAjejbHsAX9riwJ6&_nc_ht=scontent.faep8-1.fna&oh=0f4efc83a298a8ef8cca57e008b8e69c&oe=5FE37C12"
          style="width: 30%"
          alt="logo voces">
          <h1>¡Hola ${entrada.nombre}!</h1>
          <h1>Tenes una entrada para el show</h1>
          <h2>Válida desde ${moment
            .utc(entrada.inicio)
            .utcOffset('-03:00')
            .format('DD/MM/YYYY HH:mm')} hasta ${moment
      .utc(entrada.fin)
      .utcOffset('-03:00')
      .format('DD/MM/YYYY HH:mm')}</h2>
          <h2>Tu código es: <strong style="color: #fc01a0">${codigo}</strong></h2>
          <a style="font-size: x-large; font-weight: bold; 
          background: #fc01a0; text-decoration: none;
          display: block; color: white;" href="https://www.escuelavoces.com/streaming/watch/${
            entrada.idShow
          }/${new_entrada.email}/${codigo}">VER SHOW</a>
        </div>
    `;
    await sendEmail(new_entrada.email, `VOCES: ENTRADA PARA SHOW`, contenido);
  }
  res.json(entradas);
};

export const getEntrada = async (req: Request, res: Response) => {
  const entrada = await Entrada.findById(req.params.idEntrada);
  res.json(entrada);
};

export const verificarEntrada = async (req: Request, res: Response) => {
  const idShow = req.params.idShow;
  const email: any = req.query.email;
  const codigo = req.query.codigo;
  const now = moment().toDate();
  const entradas = await Entrada.find({ idShow, email, activa: true });
  if (!entradas || entradas.length < 1) {
    return res.status(400).json({
      imageUrl:
        'https://cdn0.iconfinder.com/data/icons/city-elements-flaticon/64/stop-stop_sign-traffic_sign-architecture_and_city-stopping-circulation-signaling-256.png',
      imageHeight: 90,
      title: 'No existe entrada',
      message:
        'El mail ingresado no posee ninguna entrada activa para este show. Revise que el mail sea el mismo que le asignó al comprar la entrada.',
    });
  }
  console.log(entradas);
  let entradaBuscada;
  for (const entrada of entradas) {
    const hash = entrada.clave;
    const result = await bcrypt.compare(codigo, hash);
    if (result) {
      if (
        moment(now).isAfter(entrada.inicio) &&
        moment(now).isAfter(entrada.fin)
      ) {
        return res.status(400).json({
          imageUrl:
            'https://cdn2.iconfinder.com/data/icons/xomo-basics/128/document-09-256.png',
          imageHeight: 90,
          title: 'Entrada vencida',
          message: `La entrada que desea utilizar se ha vencido. Estuvo disponible desde el ${entrada.inicio} hasta el ${entrada.fin}. Contáctenos para más información.`,
        });
      } else if (
        moment(now).isBefore(entrada.inicio) &&
        moment(now).isBefore(entrada.fin)
      ) {
        return res.status(400).json({
          imageUrl:
            'https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_sign_close-256.png',
          imageHeight: 90,
          title: 'No comenzó el show',
          message: `Aún no comenzó el show, puede utilizar esta entrada a partir del día: ${entrada.inicio}.`,
        });
      } else if (
        moment(now).isSameOrAfter(entrada.inicio) &&
        moment(now).isSameOrBefore(entrada.fin)
      ) {
        entradaBuscada = entrada;
      }
    }
  }
  if (entradaBuscada) {
    res.status(200).json({
      _id: entradaBuscada._id,
      email: entradaBuscada.email,
      inicio: entradaBuscada.inicio,
      fin: entradaBuscada.fin,
      activa: entradaBuscada.activa,
    });
  } else {
    res.status(400).json({
      imageUrl:
        'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/locked-256.png',
      imageHeight: 90,
      title: 'Codigo de entrada inválido',
      message:
        'Revise el código ingresado con el código que le llegó a su email al comprar la entrada.',
    });
  }
};

export const updateEntrada = async (req: Request, res: Response) => {
  const entrada = await Entrada.findOneAndUpdate(
    { _id: req.params.idEntrada },
    req.body,
    { new: true, useFindAndModify: true }
  );
  res.json(entrada);
};

export const deleteEntrada = async (req: Request, res: Response) => {
  const entrada = await Entrada.remove({
    _id: req.params.idEntrada,
  });
  res.json(entrada);
};
