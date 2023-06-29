import User from '../models/userSchema.js' // importe do UserSchema 

import { sendEmailVerify, codeAuth } from './emailController.js' // importe: enviar email e gerar código segurança

let userData = {}; // transferindo para escopo global os dados do userSave

export const registerUser = async (req, res) => {
    const { nick, email, password } = req.body; // dados passado do form pelo User

    try {
        const existingUser = await User.findOne({ $or: [{ nick: nick }, { email: email }] });

        if (existingUser) {

            //verificação de mesmo nick no DB 

            if (existingUser.nick === nick) {
                console.log('Esse apelido já está cadastrado!');
                return res.status(409).send({ msg: 'Esse nick já está cadastrado, escolha outro!' })
            }

            //verificação de mesmo email no DB 

            if (existingUser.email === email) {
                console.log('Esse email já está cadastrado!');
                return res.status(409).send({ msg: 'Esse email já está cadastrado, faça login!' })
            }
        } 

        //código de verificação, no email passado pelo user

        else {
            userData = { nick, email, password };
            // sendEmailVerify(email) //envio do email
            console.log(codeAuth);
            return res.status(200).redirect('http://127.0.0.1:5500/frontend/public/verify.html')
        }
    } catch (err) {
        return res.status(500).send({ msg: 'Não foi possível cadastrar o usuário!' + err });
    }
}


export const verifierUser = async (req, res) => {
    const { codeUser } = req.body;

    try {
        if (codeUser == codeAuth) {
            const saveUser = await new User(userData).save(); // verificação 100% = salva dados no DB
            console.log(`CONTA CRIADA - DADOS DA CONTA: ${saveUser}`);
        } else {
            console.log('CODIGO ERRADO');
        }
    } catch (err) {
        console.log('NAO FOI POSSIVEL VERIFICAR - ' + err);
    }
}


