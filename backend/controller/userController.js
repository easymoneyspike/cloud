// Importar as dependências
import User from '../models/userSchema.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).json({ error: 'Não foi possível obter os usuários' });
    }
}

export const getUserByID = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ error: 'Não foi possível obter o usuário' });
    }
}

export const addUser = async (req, res) => {
    const { nick, email, password } = req.body;
    console.log(nick, email, password);

    try {
        const existingUser = await User.findOne({ $or: [{ nick: nick }, { email: email }] });

        if (existingUser) {
            if (existingUser.nick === nick) {
                console.log('Esse apelido já está cadastrado!');
                return res.status(409).send({ msg: 'Esse nick já está cadastrado, escolha outro!' })
            }

            if (existingUser.email === email) {
                console.log('Esse email já está cadastrado!');
                return res.status(409).send({ msg: 'Esse email já está cadastrado, faça login!' })
            }
        } else {
            const saveUser = await new User({ nick, email, password }).save();
            return res.status(201).json(saveUser);
        }
    } catch (err) {
        return res.status(500).send({ msg: 'Não foi possível cadastrar o usuário!' });
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { nick, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { nick, email, password }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o usuário' });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.status(200).json({ message: 'Usuário excluído com sucesso' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Não foi possível excluir o usuário' });
    }
};

