nodeMailer = require('nodemailer'),
module.exports.transport = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'sparxproducts@gmail.com',
              pass: 'Sparx@sparx'
          }
      });
