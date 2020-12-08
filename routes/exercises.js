const router = require('express').Router();
var Exercise = require('../models/exercise');
const auth = require('../auth')
const exerciseController = require('../controllers/exerciseController')


router.get('/',auth, exerciseController.get_user_exercises);

router.post('/add', auth, exerciseController.create_exercise)

router.get('/:id', auth, exerciseController.get_exercise_list_by_id)

router.post('/:id', auth, exerciseController.update_exercise)

router.delete('/:id', auth, exerciseController.delete_exercise_by_id)

router.route('/update/:id', auth, exerciseController.update_exercise)


module.exports = router;
