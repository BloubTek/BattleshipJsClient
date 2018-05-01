var mongoose = require('mongoose'),
Task = mongoose.model('postmans');


exports.get_all_postmans = function(req, res) {
  Task.find({}, function(err, flats){
        if (err){
            res.send(err); 
        }
        res.json(flats);  
    }); 
};

exports.add_a_postman = function(req,res){
  var postmans = new Task();
  postmans.address = req.body.address;
  postmans.id_poste = req.body.id_poste;
  postmans.Name = req.body.Name; 
  postmans.Tel = req.body.Tel; 
  postmans.dept_rattachement = req.body.dept_rattachement; 
  postmans.bluetooth_address = req.body.bluetooth_address; 
  postmans.auth_facial = req.body.auth_facial; 
  postmans.auth_vocal = req.body.auth_vocal; 
  postmans.photo = req.body.photo; 
  postmans.save(function(err){
    if(err){
      res.send(err);
    }
    res.json({message : 'Bravo, le postier est maintenant stockée en base de données'});
  }); 
};

exports.get_a_postman = function(req,res){ 
            Task.findById(req.params._id, function(err, postmans) {
            if (err)
                res.send(err);
            res.json(postmans);
        });
};

exports.update_postman = function(req,res){ 
  Task.findById(req.params._id, function(err, postmans) {
  if (err){
      res.send(err);
  }
  postmans.address = req.body.address;
  postmans.id_poste = req.body.id_poste;
  postmans.Name = req.body.Name; 
  postmans.Tel = req.body.Tel; 
  postmans.dept_rattachement = req.body.dept_rattachement; 
  postmans.bluetooth_address = req.body.bluetooth_address; 
  postmans.auth_facial = req.body.auth_facial; 
  postmans.auth_vocal = req.body.auth_vocal; 
  postmans.photo = req.body.photo; 
  postmans.save(function(err){
    if(err){
      res.send(err);
    }
    res.json({message : 'Bravo, mise à jour des données OK'});
  });                
  });
};

/*exports.delete_postman = function(req,res){
  Task.findByIdAndRemove(req.params._id, function(err){
    if (err){
            res.send(err); 
        }
    res.json({message:"Bravo, postier supprimé"});
  });
};*/

exports.delete_postman = function(req,res){ 
    Task.remove({_id: req.params._id}, function(err, flat){
        if (err){
            res.send(err); 
        }
        res.json({message:"Bravo, postier supprimé"}); 
    }); 
    
};