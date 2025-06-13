const User = require("../model/User");
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { name, password, email, solicited, cpf } = req.body;

        const hash = await bcrypt.hash(password, 7);
        const newUser = {
            name,
            email,
            password: hash,
            cpf,
            solicited: solicited || false
        };

        const addUser = await User.create(newUser);

        res.status(201).json('Cadastro realizado com sucesso!');
        console.log('Usuário criado com sucesso!');
    } catch (error) {
        const { email, cpf } = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json('Email já cadastrado!');
            console.log('Resultado do findOne (email):', emailExists);
        }

        const cpfExists = await User.findOne({ cpf });
        if (cpfExists) {
            return res.status(400).json('CPF já cadastrado');
            console.log('Resultado do findOne (email):', cpfExists);
        }
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
        const userAutentication = await User.findOne({ email });
        
        if (!userAutentication) {
            return res.status(401).json({ message: 'Usuário não encontrado!' });
        }

        const passwordValidated = await bcrypt.compare(password, userAutentication.password);
        
        if (passwordValidated) {
            const token = jwt.sign({ id: userAutentication._id }, secret);
            const userAuthenticated = {
                name: userAutentication.name,
                email: userAutentication.email,
                type: userAutentication.type,
                token
            };
            console.log({ message: 'Autenticação completa' });
            return res.status(200).json(userAuthenticated);
        } else {
            console.log({ message: 'Senha incorreta!' });
            return res.status(400).json({ message: 'Senha incorreta!' });
        }
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(500).json({ message: 'Erro na autenticação!' });
    }
};

module.exports = { createUser, requestAgent, changeToAgent, authenticatedUser };
