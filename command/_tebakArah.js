const axios = require('axios');

module.exports = async function (naze, m, args, db, prefix, arahTebakan) {
  const user = db.users[m.sender];
  if (!user) return m.reply('❌ Data pengguna tidak ditemukan.');

  if (args.length < 2) return m.reply(`❗ Format salah.\nContoh:\n.${arahTebakan} bitcoin 1000000|30`);

  const [namaCrypto, nominalDetik] = args;
  const [nominalStr, detikStr] = nominalDetik.split('|').map(a => a.trim());

  const nominal = parseInt(nominalStr);
  const detik = parseInt(detikStr);

  if (isNaN(nominal) || isNaN(detik)) return m.reply(`❗ Masukkan nominal & durasi dengan benar.\nContoh:\n.${arahTebakan} bitcoin 1000000 | 30`);
  if (detik < 20) return m.reply('⏱️ Minimal waktu tebakan adalah *20 detik*.');
  if (nominal <= 50000) return m.reply('💸 Nominal harus lebih dari 50000.');
  if (nominal > user.money) return m.reply('💰 Uangmu tidak cukup untuk taruhan ini.');

  try {
    const resAwal = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${namaCrypto.toLowerCase()}&vs_currencies=idr`);
    const hargaAwal = resAwal.data[namaCrypto.toLowerCase()]?.idr;

    if (!hargaAwal) return m.reply('❌ Crypto tidak ditemukan. Gunakan ID CoinGecko seperti: bitcoin, ethereum, dll.');

    m.reply(`🕒 Menunggu ${detik} detik...\n\n📊 Crypto: *${namaCrypto}*\n🎯 Tebakan: *${arahTebakan.toUpperCase()}*\n💰 Taruhan: Rp ${nominal.toLocaleString('id-ID')}`);

    setTimeout(async () => {
      try {
        const resAkhir = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${namaCrypto.toLowerCase()}&vs_currencies=idr`);
        const hargaAkhir = resAkhir.data[namaCrypto.toLowerCase()]?.idr;

        if (!hargaAkhir) return m.reply('❌ Gagal mengambil harga akhir.');

        const selisih = hargaAkhir - hargaAwal;
        let arahAsli = selisih > 0 ? 'naik' : selisih < 0 ? 'turun' : 'tetap';

        // Sistem anti-kecurangan: jika streak benar terlalu banyak
        user.streakBenar = user.streakBenar || 0;
        if (user.streakBenar >= 2 && Math.random() < 0.6) {
          // Balik arah hasil sebenarnya
          if (arahAsli === 'naik') arahAsli = 'turun';
          else if (arahAsli === 'turun') arahAsli = 'naik';
        }

        let hasil = `📈 *Hasil Tebakan*\nCrypto: ${namaCrypto}\nHarga Awal: Rp ${hargaAwal.toLocaleString('id-ID')}\nHarga Akhir: Rp ${hargaAkhir.toLocaleString('id-ID')}\n📉 Arah Sebenarnya: *${arahAsli.toUpperCase()}*\n\n`;

        if (arahAsli === arahTebakan) {
          const bonus = nominal * 2;
          user.money += bonus;
          user.streakBenar++;
          hasil += `✅ Tebakan *BENAR!*\nKamu menang Rp ${bonus.toLocaleString('id-ID')}`;
          if (user.streakBenar >= 2) hasil += '\n⚠️ Pasar menjadi lebih sulit di prediksi. ';
        } else {
          user.money -= nominal;
          user.streakBenar = 0;
          hasil += `❌ Tebakan *SALAH!*\nKamu kehilangan Rp ${nominal.toLocaleString('id-ID')}`;
        }

        naze.sendText(m.chat, hasil, m);
      } catch (err) {
        console.error(err);
        m.reply('❌ Terjadi kesalahan saat mengambil harga akhir.');
      }
    }, detik * 1000);

  } catch (err) {
    console.error(err);
    m.reply('❌ Terjadi kesalahan saat mengambil harga awal.');
  }
};
