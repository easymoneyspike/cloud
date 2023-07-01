import User from '../models/userSchema.js'

export const loginUserPage = async (req, res) => {
  res.render('login')
}

export const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = parseInt(req.body.password);
  
    try {
      const userSearch = await User.findOne({ email: email });
      if (!userSearch) {
        res.status(404).send( {message: 'Usuário não encontrado'} );
      } else {
        if (userSearch.password === password) {
          res.send({message: 'Autenticação bem sucedida!'});
        } else {
          res.status(401).send( {message: 'Senha incorreta!'} );
        }
      }
    } catch (err) {
      res.status(500).send('Erro ao verificar o usuário');
    }
  };
  
