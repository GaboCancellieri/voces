import { Request, Response } from 'express';
import { Cliente } from '../schemas';
import { sendEmail } from '../utils/email.controller';
import bcrypt from 'bcrypt';
import { randomString } from '../utils/codigo.controller';
const saltRounds = 10;

export const getClientes = async (req: Request, res: Response) => {
  const clientes = await Cliente.find({});
  res.json(clientes);
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const newCliente = new Cliente(req.body);
    const codigo = randomString(10, '#aA');
    const hash = await bcrypt.hash(codigo, saltRounds);
    newCliente.password = await bcrypt.hash(req.body.password, saltRounds);
    newCliente['codigo'] = hash;
    const cliente = await newCliente.save();
    const contenido = `
        <div style="text-align: center; width: 100%; height: 100%; background: black; color: white;">
          <img src="https://scontent.faep8-1.fna.fbcdn.net/v/t1.0-9/73257648_699185753906957_503143044925620224_o.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=IhMcAjejbHsAX9riwJ6&_nc_ht=scontent.faep8-1.fna&oh=0f4efc83a298a8ef8cca57e008b8e69c&oe=5FE37C12"
          style="width: 30%"
          alt="logo voces">
          <h1>¡Hola ${cliente.nombre}!</h1>
          <h1>Necesitamos que actives tu cuenta.</h1>
          <h2>Tu código es: <strong style="color: #fc01a0">${codigo}</strong></h2>
        </div>
    `;
    sendEmail(cliente.email, 'VOCES: ACTIVACIÓN DE USUARIO', contenido);
    res.json(cliente);
  } catch (err) {
    return res.status(400).json({
      imageUrl:
        'https://cdn4.iconfinder.com/data/icons/mail-linefilled/512/email_mail__letter__internet__envelope__chat__screw_-256.png',
      imageHeight: 90,
      title: 'Ya existe este usuario.',
      message: 'El mail ingresado ya posee una cuenta asociada.',
    });
  }
};

export const getCliente = async (req: Request, res: Response) => {
  const cliente = await Cliente.findById(req.params.idCliente);
  res.json(cliente);
};

export const updateCliente = async (req: Request, res: Response) => {
  const cliente = await Cliente.findOneAndUpdate(
    { _id: req.params.idCliente },
    req.body,
    { new: true, useFindAndModify: true }
  );
  res.json(cliente);
};

export const validarCliente = async (req: Request, res: Response) => {
  try {
    const codigo = req.body.params.codigo;
    const cliente = await Cliente.findById(req.params.idCliente);
    if (!cliente) return;
    const result = await bcrypt.compare(codigo, cliente.codigo);
    if (result) {
      cliente.validado = true;
      await cliente.save();
      res.status(200).json({
        _id: cliente._id,
        email: cliente.email,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        validado: cliente.validado,
      });
    } else {
      return res.status(400).json({
        imageUrl:
          'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/locked-256.png',
        imageHeight: 90,
        title: 'Codigo incorrecto',
        message:
          'Revise el código ingresado con el código que le llegó a su email al crear la cuenta.',
      });
    }
  } catch (err) {}
};

export const iniciarSesion = async (req: Request, res: Response) => {
  try {
    const email = req.body.params.email;
    const password = req.body.params.password;
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(400).json({
        imageUrl:
          'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/Search-Male-User.png',
        imageHeight: 90,
        title: 'Usuario no encontrado.',
        message: 'Revise el email y/o la contraseña que ingresó.',
      });
    }
    const resultado = await bcrypt.compare(password, cliente.password);
    if (resultado) {
      res.status(200).json({
        _id: cliente._id,
        email: cliente.email,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        validado: cliente.validado,
      });
    } else {
      return res.status(400).json({
        imageUrl:
          'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/Search-Male-User.png',
        imageHeight: 90,
        title: 'Usuario no encontrado.',
        message: 'Revise el email y/o la contraseña que ingresó.',
      });
    }
  } catch (err) {}
};

export const deleteCliente = (req: Request, res: Response) => {
  const cliente = Cliente.remove({
    _id: req.params.idCliente,
  });
  res.json(cliente);
};
