const FocoModel = require("../model/Foco");

const createFoco = async (req, res) => {
  try {
    const { description, longitude, latitude, cidadao } = req.body;
    const imageFile = req.file ? req.file.filename : null;
    if (!description || !longitude || !latitude || !cidadao || !imageFile) {
      console.log(imageFile, description, longitude, latitude, cidadao);
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios!' });
    }

    const novoFoco = {
      description,
      longitude,
      latitude,
      image: imageFile,
      cidadao,
    };

    const response = await FocoModel.create(novoFoco);
    console.log('Foco cadastrado com sucesso!', novoFoco);
    res.status(201).json({ message: 'Foco cadastrado com sucesso!', foco: novoFoco });
  } catch (error) {
    console.log(`Erro ao cadastrar foco: ${error}`);
    res.status(500).json({ message: 'Erro ao cadastrar foco.', error: error.message });
  }
};

const getAllFoco = async (req, res) => {
  try {
    const focos = await FocoModel.find();
    console.log('Focos encontrados com sucesso');
    res.status(200).json(focos);
  } catch (error) {
    console.log(`Erro ao buscar focos: ${error}`);
    res.status(500).json({ message: 'Erro ao buscar todos os focos!' });
  }
};

const getOneFoco = async (req, res) => {
  try {
    const id = req.params.id;
    const foco = await FocoModel.findById(id);

    if (!foco) {
      console.log('Foco não encontrado');
      return res.status(404).json({ msg: 'Foco não encontrado' });
    }

    console.log('Foco encontrado com sucesso', foco);
    res.status(200).json(foco);
  } catch (error) {
    console.log(`Erro ao buscar foco: ${error}`);
    res.status(500).json({ message: 'Erro ao buscar foco!' });
  }
};

const deleteFoco = async (req, res) => {
  try {
    const id = req.params.id;
    const foco = await FocoModel.findById(id);

    if (!foco) {
      console.log('Foco não encontrado');
      return res.status(404).json({ msg: 'Foco não encontrado' });
    }

    await FocoModel.findByIdAndDelete(id);
    console.log('Foco excluído com sucesso!');
    res.status(200).json({ msg: 'Foco excluído com sucesso!' });
  } catch (error) {
    console.log(`Erro ao excluir foco: ${error}`);
    res.status(500).json({ message: 'Erro ao excluir foco!' });
  }
};

const updateFoco = async (req, res) => {
  try {
    const { id } = req.params;  
    const { acao, agente } = req.body;  

    const focoUpdate = {
      status: 'fechado',
      agente,
      acao
    };
    console.log(focoUpdate)

    const response = await FocoModel.findByIdAndUpdate(
      id,
      { $set: focoUpdate },
      { new: true }
    );

    if (!response) {
      console.log('Foco não encontrado para atualização');
      return res.status(404).json({ msg: 'Foco não encontrado!' });
    }

    console.log('Foco atualizado com sucesso!', response);
    res.status(202).json({ response, msg: 'Foco atualizado com sucesso!' });
  } catch (error) {
    console.log(`Erro ao atualizar foco: ${error}`);
    res.status(500).json({ message: 'Erro ao atualizar foco!' });
  }
};


module.exports = { createFoco, getAllFoco, getOneFoco, deleteFoco, updateFoco };
