let Userdb = require('../model/model');

// create and save new user 
exports.create = (req, res) => {
    // validate request 
    if(!req.body) {
        res.status(400).send({message : "Content can not be empty!"});
        return;
    }

    //new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    //save user in the database
    user
      .save(user)
      .then(data => {
        // res.send(data)
        res.redirect('/add-user')
      })
      .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occured while creating a create operation"
        });
      });
}

// retrieve and return all users/retrive and return single user
exports.find = (req, res) => {

  if(req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then(data => {
        if(!data) {
          res.status(404).send({message : 'not found user with id' + id})
        }
        else {
          res.send(data)
        }
      })
      .catch (err => {
        res.status(500).send({messsage : 'Error retriving user with id' + id});
      })
  }
  else {
    Userdb.find()
    .then(user =>{
      res.send(user)
    })
  
    .catch (err => {
      res.status(500).send({message : err.message || "Error occured white retrieving user information"})
    })
  }


}

//Update a new identified user by user id
exports.update = (req, res) => {
  if(!req.body) {
    return res
      .status(400)
      .send({message: "Data to update can not to be empty"})
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body, {useFindAndModify : false})
    .then(data => {
      if(!data) {
        res.status(404).send({messsage : `cannot update user with ${id}. maybe user not found`})
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({message: 'Error update user info'})
    })
}

//Delete a user with specified user id in the request 
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
      .then(data => {
        if(!data) {
          res.status(404).send({message : `cannot delete with id ${id} maybe id was wrong`});
        }
        else {
          res.send({
            message : "User was deleted successfully!"
          })
        }
      })

      .catch(err => {
        res.status(500).send({
          message : "could not delete user with id= " + id
        })
      })
}