const FocoModel = require("../model/Foco");

// Verificar como funcionara o upload ou/e como pegar a imagem...
const createFoco = async (req, res) => {
  try {
    const foco = {
      description: req.body.description,
      localization: {
        longitude: req.body.longitude,
        latitude: req.body.latitude
      },
       image: req.imageUri.body,
       cidadao: req.cidadao.body,
       status: req.status.body
    };
    
    const response = await FocoModel.create(foco);
    res.status(200).json(dataToSave);

    res.status(201).json({ response, msg: 'Foco criado!'});
    console.log('Foco criado com sucesso!');

  } catch (error) {
    console.log(`Erro ao cadastrar: ${error}`);
    return res.status(404).json("Erro ao cadastrar foco!");
  };
};

const getAllFoco = async (req, res) => {
  try {
    const focos = await FocoModel.find();
    res.json(focos);
      
  } catch (error) {
    console.log(`Erro ao buscar: ${error}`);
    return res.status(404).json("Erro ao buscar todos focos!");
  };
};

const getOneFoco = async (req, res) => {
  try {
    const id = req.params.id
    const foco = await FocoModel.findById(id)
    
    if(!foco){
      res.status(404).json({ msg: 'Foco não encontrado' })
      return
    }
    res.json(service)
  } catch (error) {
    console.log(`Erro ao buscar: ${error}`);
    return res.status(404).json("Erro ao buscar foco!");

  };
};

const deleteFoco = async (req, res) => {
  try {
    const id = req.params.id;
    const foco = await FocoModel.findById(id)
    
    if(!foco){
      res.status(404).json({ msg: 'Foco não encontrado' })
    }
    
    const deletedFoco = await FocoModel.findByIdAndDelete(id)

    res.status(200).json({ deletedFoco, msg: 'Foco excluido!'});
    console.log('Foco excluido com sucesso!');
  } catch (error) {
    console.log(`Erro ao deletar: ${error}`);
    return res.status(404).json("Ocorreu um erro ao deletar foco!");
  };
};

const updateFoco = async (req, res) => {
  try {
    const id = req.params.id;
    const { description, acao, status, agente } = req.body

    const foco = {
      description: description,
      acao: acao,
      status: status,
      agente: agente,
    }
    
    const updatedFoco = await FocoModel.findByIdAndUpdate(
      id, foco
    )
    
    if(!updatedFoco){
      res.status(404).json({ msg: 'Foco não encontrado!' })
    }

    res.status(202).json({ updatedFoco, msg: 'Foco atualizado!' });
    console.log('Foco atualizado com sucesso!');
      
  } catch (error) {
    console.log(`Erro ao atualizar: ${error}`);
    return res.status(404).json("Erro ao atualizar foco!");

  };
}


module.exports = { createFoco, getAllFoco, getOneFoco, deleteFoco, updateFoco };