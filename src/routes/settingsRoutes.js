const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { validateSettingsInput } = require('../middleware/validator');

router.get('/', settingsController.getSettings);
router.get('/:userId', settingsController.getSettings);
router.post('/', validateSettingsInput, settingsController.createSettings);
router.put('/:userId', validateSettingsInput, settingsController.updateSettings);
router.delete('/:userId', settingsController.deleteSettings);

module.exports = router;