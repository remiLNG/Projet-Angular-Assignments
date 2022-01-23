let Matiere = require('../model/matiere');

// Ajout d'un assignment (POST)
function postMatiere(req, res){
    let matiere = new Matiere();

    matiere.id = req.body.id;
    matiere.nom = req.body.nom;
    matiere.professor_name = req.body.professor_name;
    matiere.professor_img = req.body.professor_img;

    matiere.save( (err) => {
        if(err){
            res.send('Cant post Matiere ', err);
        }
        res.json({ message: `${matiere.nom} saved!`})
    })
}

function getMatieres(req, res){
    Matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }
        res.send(matieres);
    });
}

function getMatiere(req, res){
    let matiereId = req.params.id;

    Matiere.findOne({id: matiereId}, (err, matiere) =>{
        if(err){
            res.send(err)
        }
        res.json(matiere);
    })
}

module.exports = { postMatiere, getMatieres, getMatiere };