module.exports = async function mSaldo(naze, m, extra = {}) {
  try {
    const db = extra.db;
    if (!db || !db.users) return m.reply('❌ Database tidak ditemukan.');

    const user = db.users[m.sender];
    if (!user) return m.reply('❌ Data pengguna tidak ditemukan.');

    const uang = user.money ?? 0;
    const limit = user.limit ?? 0;
    const aset = user.aset ?? [];

    let asetText = '📦 *Daftar Aset Kamu:*\n';

    if (!aset.length) {
      asetText += '_Kamu belum memiliki aset apapun._';
    } else {
      const kategoriMap = {};

      for (let item of aset) {
        if (!kategoriMap[item.kategori]) kategoriMap[item.kategori] = [];
        kategoriMap[item.kategori].push(item);
      }

      for (let kategori in kategoriMap) {
        const list = kategoriMap[kategori]
          .map((a, i) => ` ${i + 1}. ${a.name} - Rp${a.price.toLocaleString('id-ID')}`)
          .join('\n');
        asetText += `\n🔹 *${kategori.toUpperCase()}*\n${list}\n`;
      }
    }

    const teks = `💳 *Saldo Kamu*\n` +
      `• Uang : Rp${uang.toLocaleString('id-ID')}\n` +
      `• Limit : ${limit}\n\n` +
      `${asetText}`;

    await m.reply(teks);
  } catch (e) {
    console.error(e);
    m.reply('❌ Terjadi kesalahan saat menampilkan saldo.');
  }
};
