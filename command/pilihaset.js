// command/pilihaset.js
const asetData = require('../lib/asetData.json');

module.exports = async function pilihaset(naze, m, { args, prefix }) {
  if (!args[0]) return m.reply('❗ Contoh: .pilihaset mobil');

  const kategori = args[0].toLowerCase();
  if (!asetData[kategori]) return m.reply('❌ Kategori tidak ditemukan.');

  const daftar = asetData[kategori];

  let teks = `📦 *Daftar Aset Kategori: ${kategori.toUpperCase()}*

`;
  teks += daftar.map((aset, i) => `*${i + 1}.* ${aset.name}
💰 Rp ${typeof aset.price === 'number' ? aset.price.toLocaleString('id-ID') : 'Tidak diketahui'}`).join('\n\n');
  teks += `\n\nBalas pesan ini dengan perintah .beliaset <category> <number>`;

  await naze.sendMessage(m.chat, {
    text: teks,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'Aset Digital Vtech Ai',
        body: `Kategori: ${kategori}`,
        previewType: 'PHOTO',
        thumbnailUrl: 'https://pomf2.lain.la/f/p5vp5nnx.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://instagram.com/farel.project_5'
      }
    }
  }, { quoted: m });

  // Simpan sesi untuk menunggu reply user
  global._pilihAset = global._pilihAset || {};
  global._pilihAset[m.sender] = { kategori, list: daftar };
};
