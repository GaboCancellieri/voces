var nodemailer = require('nodemailer'); 

exports.sendEmail = async (email, asunto, contenido) => {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'w9854w@gmail.com',
            pass: 'y31$k?n9,'
        }
    });

    // Definimos el email
    var mailOptions = {
        from: 'VOCES',
        to: email,
        subject: asunto,
        text: contenido
    };

    // Enviamos el email
    return await transporter.sendMail(mailOptions);
};