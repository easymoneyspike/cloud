import 'dotenv/config'
import nodemailer from 'nodemailer';
import crypto from 'crypto';


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    },
});

export function sendEmailVerify(emailUser) {
    const emailOptions = {
      from: process.env.NODEMAILER_USER,
      to: emailUser,
      subject: 'Confirmação de cadastro',
      text: `Código de verificação: ${codeAuth}`,
    };
  
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }
  

function generetorCode() {
  const codigo = Math.floor(100 + Math.random() * 900); // Gera um número aleatório de 100 a 999

  return codigo.toString().padStart(3, '0') + '-' + Math.floor(100 + Math.random() * 900).toString().padStart(3, '0');
}

export const codeAuth = generetorCode();

