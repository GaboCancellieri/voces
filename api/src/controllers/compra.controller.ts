import { Request, Response } from 'express';
import axios from 'axios';
import mercadopago from 'mercadopago';
import { Compra } from '../schemas';

export const getCompras = async (req: Request, res: Response) => {
  const compras = await Compra.find({});
  res.json(compras);
};

export const createCompra = async (req: Request, res: Response) => {
  const newCompra = new Compra(req.body);
  const savedCompra = await newCompra.save();
  res.json(savedCompra);
};

export const getCompra = async (req: Request, res: Response) => {
  const compra = await Compra.findById(req.params.idCompra);
  res.json(compra);
};

export const updateCompra = async (req: Request, res: Response) => {
  const compra = await Compra.findOneAndUpdate(
    { _id: req.params.idCompra },
    req.body,
    { new: true, useFindAndModify: true }
  );
  res.json(compra);
};

export const deleteCompra = async (req: Request, res: Response) => {
  const removedCompra = Compra.remove({
    _id: req.params.idCompra,
  });
  res.json(removedCompra);
};

// MERCADO PAGO
// const access_token = 'TEST-8932391820207899-112819-021c1ec9b45f7867a062a0f2175f608e-45105333'
// const access_token = 'APP_USR-8932391820207899-112819-8a728316fef6e69c537add3b394cf27d-45105333'

// TOKEN PRUEBA
const access_token =
  'APP_USR-1020300565332165-121711-262f846652102cc8b313d906b029c014-689358796';

export const getIdentificationTypes = async (req: Request, res: Response) => {
  const result = await axios
    .get('https://api.mercadopago.com/v1/identification_types', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: Error) => error);

  res.status(200).json(result);
};

export const comprarEntrada = async (req: Request, res: Response) => {
  mercadopago.configurations.setAccessToken(access_token);

  const payment_data = {
    transaction_amount: req.body.transactionAmount,
    token: req.body.token,
    description: req.body.description,
    installments: req.body.installments,
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.docType,
        number: req.body.docNumber,
      },
    },
  };

  mercadopago.payment
    .save(payment_data)
    .then((response: any) => {
      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id,
      });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(error.status).send(error);
    });
};

export const crearPreferencia = async (req: Request, res: Response) => {
  // Agrega credenciales
  mercadopago.configure({
    access_token,
  });

  // Crea un objeto de preferencia
  let preference: any = {
    items: [
      {
        title: req.body.title,
        unit_price: req.body.unit_price,
        quantity: 1,
        category_id: 'entrentainment',
        currency_id: 'ARS',
      },
    ],
    back_urls: {
      success: `http://localhost:4200/streaming/compra/${req.body.idCompra}/success`,
      failure: `http://localhost:4200/streaming/compra/${req.body.idCompra}/failure`,
      pending: `http://localhost:4200/streaming/compra/${req.body.idCompra}/pending`,
      // success: `https://www.escuelavoces.com/streaming/compra/${req.body.idCompra}/success`,
      // failure: `https://www.escuelavoces.com/streaming/compra/${req.body.idCompra}/failure`,
      // pending: `https://www.escuelavoces.com/streaming/compra/${req.body.idCompra}/pending`
    },
    auto_return: 'approved',
  };

  mercadopago.preferences
    .create(preference)
    .then((response: any) => {
      res.status(200).json(response.response);
    })
    .catch((error: Error) => {
      console.log(error);
    });
};

// {"id":689358796,"nickname":"TEST27D8APCH","password":"qatest1549","site_status":"active","email":"test_user_91037477@testuser.com"}
// {"id":689360260,"nickname":"TESTURH4YLXM","password":"qatest4433","site_status":"active","email":"test_user_42083408@testuser.com"}
