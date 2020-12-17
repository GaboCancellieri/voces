var nodemailer = require('nodemailer'); 

exports.sendEmail = async (email, asunto, contenido) => {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vocesescueladecanto@gmail.com',
            pass: 'Canto123e'
        }
    });

    // Definimos el email
    var mailOptions = {
        from: 'VOCES',
        to: email,
        subject: asunto,
        html: contenido
    };

    // Enviamos el email
    return await transporter.sendMail(mailOptions);
};