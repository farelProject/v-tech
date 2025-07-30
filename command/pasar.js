const axios = require('axios');

module.exports = async function pasar(naze, m, { db, prefix }) {
  const user = db.users[m.sender];
  if (!user) return m.reply('❌ Data pengguna tidak ditemukan.');

  const coinList = [
    { name: 'Bitcoin', id: 'bitcoin' },
    { name: 'Ethereum', id: 'ethereum' },
    { name: 'BNB', id: 'binancecoin' },
    { name: 'Solana', id: 'solana' }
  ];

  try {
    const ids = coinList.map(c => c.id).join(',');
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids,
        vs_currencies: 'idr',
        include_24hr_change: 'true'
      }
    });

    const data = res.data;

    const market = coinList.map(c => ({
      name: c.name,
      id: c.id,
      price: data[c.id]?.idr,
      change: data[c.id]?.idr_24h_change?.toFixed(2)
    }));

    const buttons = market.map(c => ({
      buttonId: `${prefix}pilihpasar ${c.id}`,
      buttonText: { displayText: `📊 ${c.name}` },
      type: 1
    }));

    const text = `*📈 Pilih pasar crypto untuk ditebak:*\n\n` +
      market.map(c =>
        `*${c.name}*\nHarga: Rp ${c.price?.toLocaleString('id-ID')}\n24h: ${c.change || 0}%\n`
      ).join('\n');

    await naze.sendButtonMsg(m.chat, {
      text,
      footer: 'Klik salah satu untuk melihat grafik dan mulai tebak arah!',
      buttons
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Gagal mengambil data pasar crypto.');
  }
};
