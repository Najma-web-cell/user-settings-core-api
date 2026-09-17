const { readData, writeData } = require('../models/settingsModel');

// GET /api/settings or GET /api/settings?id=... or GET /api/settings/:userId
exports.getSettings = async (req, res, next) => {
  try {
    const requestedId = req.query.id || req.query.userId || req.params.userId;
    const settings = await readData();

    if (requestedId) {
      const userSetting = settings.find((item) => item.userId === String(requestedId));

      if (!userSetting) {
        return res.status(404).json({ status: 'fail', message: `User settings for userId '${requestedId}' not found.` });
      }

      return res.status(200).json({ status: 'success', data: userSetting });
    }

    res.status(200).json({
      status: 'success',
      data: Array.isArray(settings) ? settings : []
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/settings
exports.createSettings = async (req, res, next) => {
  try {
    const { userId, language = 'EN', notificationsEnabled = true, timezone = 'UTC' } = req.body;
    const settings = await readData();

    const existingUser = settings.find((item) => item.userId === userId);
    if (existingUser) {
      return res.status(409).json({ status: 'fail', message: `User ID '${userId}' already exists.` });
    }

    const now = new Date().toISOString();
    const newSetting = {
      userId,
      language,
      notificationsEnabled,
      timezone,
      createdAt: now,
      updatedAt: now
    };

    settings.push(newSetting);
    await writeData(settings);

    console.log(`[DATA LOG] New settings created for userId: ${userId}`);

    res.status(201).json({
      status: 'success',
      message: 'User settings created successfully.',
      data: newSetting
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/settings/:userId
exports.updateSettings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { language, notificationsEnabled, timezone } = req.body;

    const settings = await readData();
    const index = settings.findIndex((item) => item.userId === userId);

    if (index === -1) {
      return res.status(404).json({ status: 'fail', message: `User settings for userId '${userId}' not found.` });
    }

    const currentSetting = settings[index];
    const updatedSetting = {
      ...currentSetting,
      language: language !== undefined ? language : currentSetting.language,
      notificationsEnabled: notificationsEnabled !== undefined ? notificationsEnabled : currentSetting.notificationsEnabled,
      timezone: timezone !== undefined ? timezone : currentSetting.timezone,
      updatedAt: new Date().toISOString()
    };

    settings[index] = updatedSetting;
    await writeData(settings);

    console.log(`[DATA LOG] Settings updated for userId: ${userId}`);

    res.status(200).json({
      status: 'success',
      message: 'User settings updated successfully.',
      data: updatedSetting
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/settings/:userId
exports.deleteSettings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const settings = await readData();

    const index = settings.findIndex((item) => item.userId === userId);

    if (index === -1) {
      return res.status(404).json({ status: 'fail', message: `User settings for userId '${userId}' not found.` });
    }

    const filteredSettings = settings.filter((item) => item.userId !== userId);
    await writeData(filteredSettings);

    console.log(`[DATA LOG] Settings deleted for userId: ${userId}`);

    res.status(200).json({
      status: 'success',
      message: `User settings for userId '${userId}' deleted successfully.`
    });
  } catch (error) {
    next(error);
  }
};