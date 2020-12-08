var Exercise = require('../models/exercise');
var User = require('../models/User');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
var async = require('async');

exports.index = function(req, res){
    res.render('signin', {});
}

exports.exercise_list = function(req, res) {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.get_exercise_list_by_id = function(req, res){
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.get_user_exercises = function(req, res){
    Exercise.find({user: req.user._id})
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.delete_exercise_by_id = function(req, res){
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.update_exercise = function(req, res){
    Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.create_exercise = function(req, res){
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const user = req.user._id;
  
    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
      user
    });

    console.log("new ex: ", newExercise)

    newExercise.save()
    .then(resp => res.json(resp))
    .catch(err => res.status(400).json('Error: ' + err));
}