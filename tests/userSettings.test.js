const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

const startServer = async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  return { server, port };
};

test('GET /api/settings returns all user settings when no id is provided', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/settings`);
    assert.equal(response.status, 200);

    const payload = await response.json();
    assert.equal(payload.status, 'success');
    assert.ok(Array.isArray(payload.data));
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('GET /api/settings?id=usr_101 returns only that user', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/settings?id=usr_101`);
    assert.equal(response.status, 200);

    const payload = await response.json();
    assert.equal(payload.status, 'success');
    assert.equal(payload.data.userId, 'usr_101');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('GET /api/settings/usr_101 returns only that user', async () => {
  const { server, port } = await startServer();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/settings/usr_101`);
    assert.equal(response.status, 200);

    const payload = await response.json();
    assert.equal(payload.status, 'success');
    assert.equal(payload.data.userId, 'usr_101');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
