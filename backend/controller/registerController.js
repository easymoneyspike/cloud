import { check, validationResult } from 'express-validator'

import User from '../models/userSchema.js'; // importe do UserSchema 

import { sendEmailVerify, codeAuth } from './emailController.js'; // importe: enviar email e gerar código segurança

let userData = {}; // transferindo para escopo global os dados do userSave

export const registerUser = async (req, res) => {
    const { nick, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ nick: nick }, { email: email }] });

        if (existingUser) {

            if (existingUser.nick === nick) {
                return res.status(409);
            }

            if (existingUser.email === email) {
                return res.status(409);
            }
        }

        await validatePassword(password); // Verificar senha

        userData = { nick, email, password };
        sendEmailVerify(email) //envio do email

        console.log(codeAuth); // código de confirmação

        return res.status(200).redirect('http://127.0.0.1:5500/frontend/public/views/verify.html');

    } catch (err) {
        return res.status(500).send({ msg: 'Não foi possível cadastrar o usuário!' + err });
    };

    async function validatePassword(password) {
        await check('password')
            .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
            .matches(/[a-zA-Z]/).withMessage('A senha deve conter pelo menos uma letra')
            .matches(/[!@#$%^&*()]/).withMessage('A senha deve conter pelo menos um símbolo')
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new Error('Verificação de senha falhou');
        }
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
