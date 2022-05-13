const nodemailer = require("nodemailer");

const gmail = 'schoolpghenry@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: gmail,
    pass: 'PprinaPg'
    }
    });

export const sendMail = (mailTo:string, type:string)=>{
  if(type === "passwordUpdate"){
   const mail = {
      from: gmail,
      to: mailTo,
      subject: 'Cambio de contraseña',
      text: 'Admin hizo cambios en tu contraseña. Ahora es "123456"'
  }
  transporter.sendMail(mail, function(error: any, info: { response: string; }){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

const paycheck = (mailTo:string)=>{
    const mail = {
        from: gmail,
        to: mailTo,
        subject: 'Pago disponible',
        text: 'Tu pago ahora esta disponible, recordamos que busques tu recibo y lo firmes'
    }
    transporter.sendMail(mail, function(error: any, info: { response: string; }){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

const addTo = (mailTo:string)=>{
    const mail = {
        from: gmail,
        to: mailTo,
        subject: 'Agregado a la plataforma',
        text: 'Tu usuario fue agregado a nuestra plataforma con exito'
    }
    transporter.sendMail(mail, function(error: any, info: { response: string; }){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}