// command/ceksifat.js
module.exports = async function ceksifat({ text, mentionedJid, pushname, sender }, reply) {
    let target
    if (mentionedJid && mentionedJid.length) {
        target = '@' + mentionedJid[0].split('@')[0]
    } else if (text) {
        target = text
    } else {
        target = pushname
    }

    const sifatList = [
        'Cerdas luar biasa',
        'Suka bercanda',
        'Cool tapi agak sombong',
        'Sabar dan penyayang',
        'Mudah panik',
        'Matre banget',
        'Bijaksana tapi pendiam',
        'Suka ngelawak tapi baperan',
        'Pendiam tapi mematikan',
        'Suka pamer',
        'Culun Tapi Bijaksana',
        'Penakut',
        'Matre',
        'Gila duid cuyy',
        'Banyak impian kurang aksi'
    ]

    const sifat = sifatList[Math.floor(Math.random() * sifatList.length)]

    let result = `👤 Nama: ${target}\n📜 Sifatnya adalah:\n${sifat}`
    reply(result, mentionedJid)
}
