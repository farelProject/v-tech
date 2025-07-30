const asetData = require('../lib/asetData.json')
const fs = require('fs')

module.exports = async function beliaset(naze, m, { args, db }) {
  let [kategori, index] = args
  if (!kategori || !index) return m.reply('❗ Format salah!\nContoh: .beliaset mobil 1')
  kategori = kategori.toLowerCase()
  index = parseInt(index) - 1

  if (!asetData[kategori]) return m.reply('❌ Kategori tidak ditemukan.')
  if (!asetData[kategori][index]) return m.reply('❌ Aset tidak tersedia.')

  const aset = asetData[kategori][index]
  if (db.users[m.sender].money < aset.price) {
    return m.reply(`❌ Uangmu tidak cukup!\n💰 Saldo: Rp ${db.users[m.sender].money.toLocaleString('id-ID')}\n💸 Harga: Rp ${aset.price.toLocaleString('id-ID')}`)
  }

  db.users[m.sender].money -= aset.price
  db.users[m.sender].aset = db.users[m.sender].aset || []
  db.users[m.sender].aset.push({
    name: aset.name,
    price: aset.price,
    kategori,
    image: aset.image
  })

  await naze.sendMessage(m.chat, {
    image: { url: aset.image },
    caption: `✅ Kamu berhasil membeli:\n\n📦 *${aset.name}*\n💵 Harga: Rp ${aset.price.toLocaleString('id-ID')}`
  }, { quoted: m })
}
