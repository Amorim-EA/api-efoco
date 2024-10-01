const User = require("../model/User");
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { name, password, email, solicitado, cpf } = req.body;

        const passwdCrypt = await bcrypt.hash(password, 7);

        const newUser = await User.create({
            name,
            email,
            password: passwdCrypt,
            cpf,
            solicitado: solicitado || false
        });

        res.status(201).json({ user: newUser, msg: 'Usuário criado!' });
        console.log('Usuário criado com sucesso!');
    } catch (error) {
        console.log(`Erro ao cadastrar: ${error}`);
        return res.status(400).json("Erro ao cadastrar usuário!");
    }
};

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find({ solicitado: true });
        res.status(200).json({ users, msg: 'Usuários buscados!' });
        console.log('Usuários buscados com sucesso!');
    } catch (error) {
        console.log(`Erro ao buscar: ${error}`);
        return res.status(404).json("Erro ao buscar usuários!");
    }
};

const updatedUser = async (req, res) => {
    try {
        const { email, agente } = req.body;

        const result = await User.updateOne(
            { email: email },
            { $set: { agente: agente } }
        );

        if (result.nModified > 0) {
            res.status(200).json({ msg: 'Usuário atualizado para agente!' });
            console.log('Usuário atualizado com sucesso!');
        } else {
            res.status(404).json({ msg: 'Usuário não encontrado ou já atualizado!' });
        }
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
            res.cookie('token', token, { httpOnly: true }).json({
                name: userOfAuth.name,
                email: userOfAuth.email,
                token
            });
            console.log({ message: 'Usuário autenticado com sucesso' });
        } else {
            res.status(401).json({ message: 'Senha incorreta!' });
        }
    } catch (error) {
        console.log({ message: 'Erro na autenticação' });
        res.status(500).json({ message: 'Erro na autenticação!' });
    }
};

module.exports = { createUser, findAllUsers, updatedUser, authenticatedUser };
