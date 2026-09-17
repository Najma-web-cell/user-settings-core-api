const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../../data/userSettings.json');

const readData = async () => {
  try {
    const fileData = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(fileData || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(dataPath, '[]');
      return [];
    }
    throw error;
  }
};

const writeData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = { readData, writeData };