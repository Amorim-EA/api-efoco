const FocoModel = require("../model/Foco");
const path = require('path')

const createFoco = async (req, res) => {
  try {
    const { description, longitude, latitude, cidadao } = req.body;
    const file = req.file;
    const image = file.path;

    console.log(image, description, longitude, latitude, cidadao);

    if (!description || !longitude || !latitude || !cidadao || !file) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios!' });
      console.log(file, description, longitude, latitude, cidadao);

    }

    // O caminho da imagem agora será acessado diretamente
    const foco = {
      description,
      longitude,
      latitude,
      image: fimage,
      cidadao,
    };

    await file.save()
    const response = await FocoModel.create(foco);

    res.status(201).json({ response, msg: 'Foco criado com sucesso!' });
    console.log('Foco criado com sucesso!');
  } catch (error) {
    console.log(`Erro ao cadastrar foco: ${error}`);
    return res.status(500).json("Erro ao cadastrar foco!");
  }
};

const getAllFoco = async (req, res) => {
  try {
    const focos = await FocoModel.find();
    console.log('Buscar OK')
    res.json(focos);
  } catch (error) {
    console.log(`Erro ao buscar: ${error}`);
    return res.status(500).json("Erro ao buscar todos focos!");
  }
};

const getOneFoco = async (req, res) => {
  try {
    const id = req.params.id;
    const foco = await FocoModel.findById(id);

    if (!foco) {
      return res.status(404).json({ msg: 'Foco não encontrado' });
    }

    res.json(foco);
  } catch (error) {
    console.log(`Erro ao buscar foco: ${error}`);
    return res.status(500).json("Erro ao buscar foco!");
  }
};

const deleteFoco = async (req, res) => {
  try {
    const id = req.params.id;
    const foco = await FocoModel.findById(id);

    if (!foco) {
      return res.status(404).json({ msg: 'Foco não encontrado' });
    }

    await FocoModel.findByIdAndDelete(id);

    res.status(200).json({ msg: 'Foco excluído com sucesso!' });
    console.log('Foco excluído com sucesso!');
  } catch (error) {
    console.log(`Erro ao excluir foco: ${error}`);
    return res.status(500).json("Erro ao excluir foco!");
  }
};

const updateFoco = async (req, res) => {
  try {
    const id = req.params.id;
    const { description, acao, agente } = req.body;
    
    const focoUpdate = {
      description,
      acao,
      status: 'fechado', // Atualiza o status para fechado
      agente,
    };

    const updatedFoco = await FocoModel.findByIdAndUpdate(id, focoUpdate, { new: true });

    if (!updatedFoco) {
      return res.status(404).json({ msg: 'Foco não encontrado!' });
    }

    res.status(202).json({ updatedFoco, msg: 'Foco atualizado com sucesso!' });
    console.log('Foco atualizado com sucesso!');
  } catch (error) {
    console.log(`Erro ao atualizar foco: ${error}`);
    return res.status(500).json("Erro ao atualizar foco!");
  }
};

module.exports = { createFoco, getAllFoco, getOneFoco, deleteFoco, updateFoco };
