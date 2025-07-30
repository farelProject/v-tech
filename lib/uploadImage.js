const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

module.exports = async function uploadImage(path) {
  const form = new FormData();
  form.append('file', fs.createReadStream(path));

  const res = await axios.post('https://telegra.ph/upload', form, {
    headers: form.getHeaders(),
  });

  return 'https://telegra.ph' + res.data[0].src;
};
