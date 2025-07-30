// command/aset.js
const asetData = require('../lib/asetData.json');

module.exports = async function aset(naze, m, { prefix }) {
  const kategori = Object.keys(asetData);

  const buttons = kategori.map(k => ({
    buttonId: `${prefix}pilihaset ${k}`,
    buttonText: { displayText: `📦 ${k.toUpperCase()}` },
    type: 1
  }));

  const teks = `🏠 *Daftar Kategori Aset:*

` + kategori.map((k, i) => `${i + 1}. ${k.toUpperCase()} (${asetData[k].length} item)`).join('\n');

  await naze.sendButtonMsg(m.chat, {
    text: teks,
    footer: 'Klik tombol untuk memilih kategori aset\n\n.jualaset <category> <number>\n.beliaset <category> <number>',
    buttons
  }, { quoted: m });
};


