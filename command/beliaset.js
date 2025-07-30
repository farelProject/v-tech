// command/beliaset.js
const fs = require('fs');
const asetData = require('../lib/asetData.json');

module.exports = async function beliaset(naze, m, { args, db }) {
  const user = db.users[m.sender];
  if (!user) return m.reply('❌ Data pengguna tidak ditemukan.');

  const kategori = args[0]?.toLowerCase();
  const nomor = parseInt(args[1]) - 1;

  if (!kategori || isNaN(nomor)) {
    return m.reply(`❗ Contoh: .beliaset mobil 1`);
  }

  if (!asetData[kategori]) return m.reply('❌ Kategori aset tidak ditemukan.');
  if (!asetData[kategori][nomor]) return m.reply('❌ Nomor aset tidak ditemukan.');

  const aset = asetData[kategori][nomor];
  if (user.money < aset.price) {
    return m.reply(`💸 Uang kamu tidak cukup untuk membeli aset ini!\n\n` +
      `Harga: Rp ${aset.price.toLocaleString('id-ID')}\n` +
      `Uang kamu: Rp ${user.money.toLocaleString('id-ID')}`);
  }

  // Potong uang user
  user.money -= aset.price;

  // Inisialisasi struktur aset jika belum ada
  if (!Array.isArray(user.aset)) user.aset = [];

  // Simpan aset ke daftar user
  user.aset.push({
    name: aset.name,
    price: aset.price,
    image: aset.image,
    kategori: kategori
  });

  return m.reply(`✅ Berhasil membeli *${aset.name}*\n💰 Harga: Rp ${aset.price.toLocaleString('id-ID')}`);
};
