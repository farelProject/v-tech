// const { join } = require('path');
// const gtts = require('node-gtts');
// const { readFileSync, unlinkSync } = require('fs');
const axios = require('axios');

async function tts(text, voice = 'Gadis') {
  try {
    const res = await axios.get('https://nirkyy-dev.hf.space/api/v1/text2speech-indo', {
      params: {
        text,
        voice
      },
      responseType: 'arraybuffer'
    });

    if (res.headers['content-type'].startsWith('audio')) {
      return res.data;
    } else {
      throw new Error('Gagal mendapatkan audio. Cek nama voice.');
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { tts };
