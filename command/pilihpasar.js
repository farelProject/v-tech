const axios = require('axios');

module.exports = async function pilihpasar(naze, m, { args, prefix }) {
  let id = args[0];

  // Ambil ID dari m.body jika tombol ditekan
  if (!id && m.body) {
    const cmd = m.body.trim().split(' ');
    id = cmd[1];
  }

  if (!id) return m.reply(`❗ Contoh:\n${prefix}pilihpasar bitcoin`);

  try {
    // Ambil data coin detail
    const { data: coin } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    const market = coin.market_data;

    const harga = market.current_price?.idr;
    const change24h = market.price_change_percentage_24h_in_currency?.idr || 0;
    const label = coin.name;
    const symbol = coin.symbol.toUpperCase();

    // Ambil data historis 7 hari
    const history = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=idr&days=7`);
    const hargaList = history.data.prices.map(p => Math.round(p[1]));
    const waktuList = history.data.prices.map(p => {
      const d = new Date(p[0]);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    // Buat URL grafik blok (stepLine chart)
const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
  type: 'line',
  data: {
    labels: waktuList,
    datasets: [{
      label: `${label} (Rp)`,
      data: hargaList,
      fill: true,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderColor: '#36a2eb',
      borderWidth: 3,
      pointRadius: 0, // <== INI HILANGKAN LINGKARAN
      stepped: true // atau false kalau mau smooth
    }]
  },
  options: {
    title: {
      display: true,
      text: `Grafik Harga ${label} - 7 Hari`,
      fontColor: '#ffffff',
      fontSize: 18
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: { display: false },
        ticks: {
          fontColor: '#ffffff',
          maxRotation: 45,
          minRotation: 45
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: '#ffffff',
          callback: value => 'Rp ' + value.toLocaleString('id-ID')
        },
        gridLines: {
          color: 'rgba(255,255,255,0.2)'
        }
      }]
    },
    layout: {
      padding: 10
    },
    plugins: {
      background: {
        color: '#121212' // Background hitam gelap
      }
    }
  },
  backgroundColor: '#121212' // <== background gelap
}))}`;

    // Simpan ke sesi pengguna
    global.sessionPasar = global.sessionPasar || {};
    global.sessionPasar[m.sender] = {
      name: label,
      id,
      price: harga,
      change: change24h
    };

    const teks = `📊 *${label} (${symbol})*\n\n` +
      `💵 Harga Sekarang: Rp ${harga?.toLocaleString('id-ID')}\n` +
      `📈 Perubahan 24 Jam: ${change24h.toFixed(2)}%\n` +
      `🏦 Market Cap: Rp ${market.market_cap?.idr?.toLocaleString('id-ID')}\n` +
      `💸 Volume 24 Jam: Rp ${market.total_volume?.idr?.toLocaleString('id-ID')}\n\n` +
      `🕹️ *Balas pesan ini untuk memulai trading:*\n` +
      `• .naik ${label} <nominal> | <detik>\n` +
      `• .turun ${label} <nominal> | <detik>\n\n`;

    // Kirim sebagai gambar
    await naze.sendMessage(m.chat, {
      image: { url: chartUrl },
      caption: teks,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 10,
        isForwarded: true
      }
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply('❌ Coin tidak ditemukan atau terjadi kesalahan saat mengambil data.');
  }
};
