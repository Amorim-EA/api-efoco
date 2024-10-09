const User = require("../model/User");
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { name, password, email, solicited, cpf } = req.body;

        const passwdCrypt = await bcrypt.hash(password, 7);
        const newUser = {
             name: name,
             email: email,
             password: passwdCrypt,
             cpf: cpf,
             solicited: solicited || false
          };
        const addUser = await User.create(newUser);
        res.status(201).json({ user: newUser, msg: 'Usuário criado!' });
        console.log('Usuário criado com sucesso!');
    } catch (error) {
        console.log(`Erro ao cadastrar: ${error}`);
        return res.status(400).json("Erro ao cadastrar usuário!");
    }
};

const requestAgent = async (req, res) => {
    try {
        const users = await User.find({ solicited: true , type: 'cidadao' });
        res.status(200).json({ users });
        console.log('Usuários buscados com sucesso!');
    } catch (error) {
        console.log(`Erro ao buscar: ${error}`);
        return res.status(404).json("Erro ao buscar usuários!");
    }
};

const changeToAgent = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await User.updateOne(
            { email: email },
            { type: 'agente' }
        );
        res.status(200).json({ result, msg: 'Usuário atualizado para agente!' });
        console.log('Usuário atualizado com sucesso!');

    } catch (error) {
        console.log(`Erro ao atualizar: ${error}`);
        return res.status(500).json({ message: "Erro ao atualizar usuário para agente!" });
    }
};


const authenticatedUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userOfAuth = await User.findOne({ email }).exec();
        
        if (!userOfAuth) {
            return res.status(401).json({ message: 'Usuário não encontrado!' });
        }

        const isPwdValid = await bcrypt.compare(password, userOfAuth.password);
        
        if (isPwdValid) {
            const token = jwt.sign({ id: userOfAuth._id }, secret, { expiresIn: 86400 });
            const userRetorno = {
                name: userOfAuth.name,
                email: userOfAuth.email,
                type: userOfAuth.type,
                token
            };

            res.cookie('token', token, { httpOnly: true });
            console.log({ message: 'Autenticação completa' });
            return res.status(200).json(userRetorno);
        } else {
            console.log({ message: 'Senha incorreta!' });
        }
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(500).json({ message: 'Erro na autenticação!' });
    }
};

module.exports = { createUser, requestAgent, changeToAgent, authenticatedUser };
