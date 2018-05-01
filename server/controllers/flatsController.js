var mongoose = require('mongoose'),
Flats = mongoose.model('Flats');

exports.get_all_flats = function(req, res) {
  Flats.find({}, function(err, flats){
        if (err){
            res.send(err); 
        }
        res.json(flats);  
    }); 
};

exports.add_a_flat = function(req,res){
      var flat = new Flats();
      flat.address = req.body.address;
      flat.id_poste = req.body.id_poste;
      flat.flatName = req.body.flatName;
      flat.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message : 'Bravo, l\'immeuble est maintenant stockée en base de données'});
      }); 
};

exports.get_a_flat = function(req,res){ 
            Flats.findById(req.params._id, function(err, flats) {
            if (err)
                res.send(err);
            res.json(flats);
        });
};

exports.update_flat = function(req,res){
                Flats.findById(req.params._id, function(err, flat) {
                if (err){
                    res.send(err);
                }
                        flat.address = req.body.address;
                        flat.id_poste = req.body.id_poste;
                        flat.status = req.body.status;
                        flat.photo = req.body.photo;
                        flat.auth_vocal = req.body.auth_vocal;
                        flat.auth_facial = req.body.auth_facial;
                        flat.auth_bluetooth = req.body.auth_bluetooth;
                              flat.save(function(err){
                                if(err){
                                  res.send(err);
                                }
                                res.json({message : 'Bravo, mise à jour des données OK'});
                              });                
                });
};

exports.delete_flat = function(req,res){
    Flats.remove({_id: req.params._id}, function(err, flat){
        if (err){
            res.send(err); 
        }
        res.json({message:"Bravo, l\'immeuble supprimé"}); 
    }); 
    
};