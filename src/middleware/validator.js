const validateSettingsInput = (req, res, next) => {
  const { userId, language, notificationsEnabled, timezone } = req.body;
  const isPost = req.method === 'POST';
  const isPut = req.method === 'PUT';

  // Allowed fields whitelist
  const allowedFields = ['userId', 'language', 'notificationsEnabled', 'timezone'];
  const bodyKeys = Object.keys(req.body);

  // 1. Prevent unknown / extra fields in body
  const invalidKeys = bodyKeys.filter((key) => !allowedFields.includes(key));
  if (invalidKeys.length > 0) {
    return res.status(400).json({
      status: 'fail',
      message: `Unexpected field(s) provided: ${invalidKeys.join(', ')}. Allowed fields are: ${allowedFields.join(', ')}`
    });
  }

  // 2. PUT specific check: Body cannot be empty
  if (isPut && bodyKeys.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'At least one field (language, notificationsEnabled, timezone) must be provided to update.'
    });
  }

  // 3. POST specific check: userId is mandatory
  if (isPost) {
    if (!userId) {
      return res.status(400).json({ status: 'fail', message: 'userId is required.' });
    }
    if (typeof userId !== 'string' || !userId.trim()) {
      return res.status(400).json({ status: 'fail', message: 'userId must be a non-empty string.' });
    }
    if (userId.trim().length < 3) {
      return res.status(400).json({ status: 'fail', message: 'userId must be at least 3 characters long.' });
    }
  }

  // 4. PUT specific check: Prevent updating userId inside body
  if (isPut && userId !== undefined) {
    return res.status(400).json({ status: 'fail', message: 'userId cannot be modified or passed in update request body.' });
  }

  // 5. Field: language Validation
  if (language !== undefined) {
    if (typeof language !== 'string' || !['EN', 'UR'].includes(language.toUpperCase())) {
      return res.status(400).json({ status: 'fail', message: 'language must be either "EN" or "UR".' });
    }
  }

  // 6. Field: notificationsEnabled Validation
  if (notificationsEnabled !== undefined) {
    if (typeof notificationsEnabled !== 'boolean') {
      return res.status(400).json({ status: 'fail', message: 'notificationsEnabled must be a boolean (true or false).' });
    }
  }

  // 7. Field: timezone Validation
  if (timezone !== undefined) {
    if (typeof timezone !== 'string' || !timezone.trim()) {
      return res.status(400).json({ status: 'fail', message: 'timezone must be a non-empty string.' });
    }
  }

  next();
};

module.exports = { validateSettingsInput };