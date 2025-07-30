module.exports = async function jualaset(naze, m, { args, db }) {
  const user = db.users[m.sender];
  if (!user) return m.reply('❌ Data pengguna tidak ditemukan.');
  if (!args[0]) return m.reply('❗ Contoh: .jualaset mobil 1 atau 1-3');

  const kategori = args[0].toLowerCase();
  const asetUser = user.aset?.filter(a => a.kategori === kategori);
  if (!asetUser || asetUser.length === 0) return m.reply(`❌ Kamu tidak memiliki aset di kategori "${kategori}".`);

  const rangeArg = args[1];
  if (!rangeArg) return m.reply('❗ Contoh: .jualaset mobil 1 atau 1-3');

  // Parsing angka: bisa 1 atau 1-3
  let indexes = [];

  if (rangeArg.includes('-')) {
    const [start, end] = rangeArg.split('-').map(v => parseInt(v) - 1);
    if (isNaN(start) || isNaN(end)) return m.reply('❌ Format nomor tidak valid.');
    for (let i = start; i <= end; i++) indexes.push(i);
  } else {
    const index = parseInt(rangeArg) - 1;
    if (isNaN(index)) return m.reply('❌ Nomor aset tidak valid.');
    indexes.push(index);
  }

  // Validasi dan kumpulkan aset yang akan dijual
  let total = 0;
  const soldAssets = [];

  indexes = indexes.filter(i => asetUser[i]);
  if (indexes.length === 0) return m.reply('❌ Aset yang kamu pilih tidak ditemukan.');

  for (let i of indexes.sort((a, b) => b - a)) {
    const aset = asetUser[i];
    const nilaiJual = Math.floor(aset.price * 2);
    total += nilaiJual;
    soldAssets.push(`• ${aset.name} X Rp ${nilaiJual.toLocaleString('id-ID')}`);

    // Hapus dari user.aset
    const realIndex = user.aset.findIndex(x => x.kategori === kategori && x.name === aset.name && x.price === aset.price);
    if (realIndex > -1) user.aset.splice(realIndex, 1);
  }

  // Tambahkan uang
  user.money += total;

  await m.reply(`✅ Aset berhasil dijual (${kategori.toUpperCase()})\n\n${soldAssets.join('\n')}\n\n💵 Total Uang Diterima: Rp ${total.toLocaleString('id-ID')}`);
};
