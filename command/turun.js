const axios = require('axios');

module.exports = async function turun(naze, m, { args, db }) {
  const user = db.users[m.sender];
  if (!user) return m.reply('❌ Data pengguna tidak ditemukan.');

  const sesi = global.sessionPasar?.[m.sender];
  if (!sesi) return m.reply('📊 Kamu belum memilih pasar. Gunakan perintah .crypto lalu pilih crypto.');

  const text = m.body.slice(6).trim(); // hapus ".turun "
  const [namaCoin, nominalDetik] = text.split(' ', 2);
  const [nominalStr, detikStr] = nominalDetik?.split('|').map(s => s.trim()) || [];

  const nominal = parseInt(nominalStr);
  const detik = parseInt(detikStr);

  if (!namaCoin || isNaN(nominal) || isNaN(detik))
    return m.reply('Format salah. Contoh:\n.turun Bitcoin 1000000|30');
  if (detik < 10) return m.reply('⏱️ Minimal waktu tebakan adalah *10 detik*.');
  if (nominal <= 50000) return m.reply('💸 Nominal harus lebih dari 50k.');
  if (user.money < nominal) return m.reply('❌ Uangmu tidak cukup untuk menebak!');

  const hargaAwal = sesi.price;

  global.tebakanAktif = global.tebakanAktif || {};
  global.tebakanAktif[m.sender] = {
    arah: 'turun',
    coin: namaCoin.toLowerCase(),
    nominal,
    detik,
    hargaAwal,
    waktuMulai: Date.now()
  };

  m.reply(`⏳ Menunggu ${detik} detik...\n📉 Tebakan arah: TURUN\n💰 Nominal: Rp ${nominal.toLocaleString('id-ID')}`);

  setTimeout(async () => {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: { ids: sesi.id, vs_currencies: 'idr' }
      });
      const hargaAkhir = res.data[sesi.id].idr;
      let arahBenar = hargaAkhir > hargaAwal ? 'naik' : 'turun';

      // Sistem anti-streak menang terus (anti cheat)
      user.streakBenar = user.streakBenar || 0;
      if (user.streakBenar >= 2 && Math.random() < 0.6) {
        // Balik arah secara acak jika terlalu sering menang
        arahBenar = arahBenar === 'naik' ? 'turun' : 'naik';
      }

      let hasil = `📊 *Hasil Tebakan*\nArah tebakan: turun\nHarga awal: Rp ${hargaAwal.toLocaleString('id-ID')}\nHarga akhir: Rp ${hargaAkhir.toLocaleString('id-ID')}\n`;

      if (arahBenar === 'turun') {
        const hadiah = nominal * 2;
        user.money += hadiah;
        user.streakBenar++;
        hasil += `✅ Tebakan benar! Kamu mendapatkan Rp ${hadiah.toLocaleString('id-ID')}`;
      } else {
        user.money -= nominal;
        user.streakBenar = 0;
        hasil += `❌ Tebakan salah! Uangmu berkurang Rp ${nominal.toLocaleString('id-ID')}`;
      }

      delete global.tebakanAktif[m.sender];
      m.reply(hasil);
    } catch (e) {
      console.error(e);
      m.reply('❌ Gagal mengambil data harga terbaru.');
    }
  }, detik * 1000);
};
