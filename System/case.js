require("./config")
const { downloadContentFromMessage,
    proto,
    generateWAMessage,
    getContentType,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    GroupSettingChange,
    jidDecode,
    WAGroupMetadata,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateMessageID,
    jidNormalizedUser,
    generateForwardMessageContent,
    WAGroupInviteMessageGroupMetadata,
    GroupMetadata,
    Headers,
    delay,
    WA_DEFAULT_EPHEMERAL,
    WADefault,
    getAggregateVotesInPollMessage,
    generateWAMessageContent,
    areJidsSameUser,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    makeWaSocket,
    makeInMemoryStore,
    MediaType,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    initInMemoryKeyStore,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WAMediaUpload,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    DisconnectReason,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    templateMessage,
    InteractiveMessage,
    Header } = require("@whiskeysockets/baileys")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const { exec } = require("child_process")
const chalk = require('chalk')
const os = require('os');
const moment = require('moment-timezone');
const yts = require('yt-search');
const path = require('path');
const vtech_apikey = ''

module.exports = async (YLine, m) => {
    try {
        const from = m.key.remoteJid
        var body = (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""

        //==================[ FUNCTION LIB ]=====================\\
        const { smsg, fetchJson, getBuffer, fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, formatSize, checkBandwidth, runtime, tanggal, getRandom } = require('./lib/myfunc')

        //===================[ TEMPAT PREFIX / ADMIN / OWNER ]====================\\
        const budy = (typeof m.text === 'string') ? m.text : '';
        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const sender = m.key.fromMe ? (YLine.user.id.split(':')[0] + '@s.whatsapp.net' || YLine.user.id) : (m.key.participant || m.key.remoteJid)
        const botNumber = await YLine.decodeJid(YLine.user.id)
        const senderNumber = sender.split('@')[0]
        const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
        const pushname = m.pushName || `${senderNumber}`
        const isBot = botNumber.includes(senderNumber)
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const groupMetadata = m.isGroup ? await YLine.groupMetadata(from).catch(e => { }) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

        //===================[ TAMPILAN CONSOLE ]=====================\\
        if (m.message) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', from))
        }

        //==================[ FUNCTION WAKTU ]======================\\
        function getFormattedDate() {
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            var hours = currentDate.getHours();
            var minutes = currentDate.getMinutes();
            var seconds = currentDate.getSeconds();
        }

        let d = new Date(new Date + 3600000)
        let locale = 'id'
        let week = d.toLocaleDateString(locale, { weekday: 'long' })
        let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        const hariini = d.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })

        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
                seconds = Math.floor((duration / 1000) % 60),
                minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

            hours = (hours < 10) ? "0" + hours : hours
            minutes = (minutes < 10) ? "0" + minutes : minutes
            seconds = (seconds < 10) ? "0" + seconds : seconds
            return hours + " jam " + minutes + " menit " + seconds + " detik"
        }

        function msToDate(ms) {
            temp = ms
            days = Math.floor(ms / (24 * 60 * 60 * 1000));
            daysms = ms % (24 * 60 * 60 * 1000);
            hours = Math.floor((daysms) / (60 * 60 * 1000));
            hoursms = ms % (60 * 60 * 1000);
            minutes = Math.floor((hoursms) / (60 * 1000));
            minutesms = ms % (60 * 1000);
            sec = Math.floor((minutesms) / (1000));
            return days + " Hari " + hours + " Jam " + minutes + " Menit";
            // +minutes+":"+sec;
        }

        // Sayying time
        const timee = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if (timee < "23:59:00") {
            var waktuucapan = 'Selamat Malam 🌃'
        }
        if (timee < "19:00:00") {
            var waktuucapan = 'Selamat Petang 🌆'
        }
        if (timee < "18:00:00") {
            var waktuucapan = 'Selamat Sore 🌅'
        }
        if (timee < "15:00:00") {
            var waktuucapan = 'Selamat Siang 🏙'
        }
        if (timee < "10:00:00") {
            var waktuucapan = 'Selamat Pagi 🌄'
        }
        if (timee < "05:00:00") {
            var waktuucapan = 'Selamat Subuh 🌉'
        }
        if (timee < "03:00:00") {
            var waktuucapan = 'Tengah Malam 🌌'
        }

        //===================[ FUNCTION REPLY ]=====================\\
        const reply2 = (teks) => {
            YLine.sendMessage(from, { text: teks }, { quoted: m })
        }

        const example = (teks) => {
            return `\n *Contoh Penggunaan :*\n Ketik *${prefix + command}* ${teks}\n`
        }

        const reply = (teks) => {
            YLine.sendMessage(m.chat, {
                text: teks,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        title: `© Vtech AI`,
                        body: `Hai ${pushname} 👋🏻`,
                        previewType: "PHOTO",
                        thumbnailUrl: `https://files.catbox.moe/oifa1i.jpg`,
                        thumbnail: ``,
                        sourceUrl: `https://api-yannrzy-vy.vercel.app/`
                    }
                }
            }, { quoted: m });
        };

        if (!YLine.public) {
            if (!m.key.fromMe) return;
        }

        //================== [ PLUGINS ] ==================//
        /*!-======[ Plugins Imports ]======-!*/
        const pluginsLoader = async (directory) => {
            let plugins = []
            const folders = fs.readdirSync(directory)
            folders.forEach(file => {
                const filePath = path.join(directory, file)
                if (filePath.endsWith(".js")) {
                    try {
                        const resolvedPath = require.resolve(filePath);
                        if (require.cache[resolvedPath]) {
                            delete require.cache[resolvedPath]
                        }
                        const plugin = require(filePath)
                        plugins.push(plugin)
                    } catch (error) {
                        console.log(`Error loading plugin at ${filePath}:`, error)
                    }
                }
            })
            return plugins
        }


        //========= [ COMMANDS PLUGINS ] =================================================
        let pluginsDisable = true
        const plugins = await pluginsLoader(path.resolve(__dirname, "plugins"))
        const Yanvy = {
            YLine,
            m,
            prefix,
            isCmd,
            command,
            text,
            sender,
            botNumber,
            senderNumber,
            isCreator,
            pushname,
            isBot,
            quoted,
            mime,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            smsg,
            m,
            fetchJson,
            getBuffer,
            fetchBuffer,
            getGroupAdmins,
            TelegraPh,
            isUrl,
            hitungmundur,
            sleep,
            clockString,
            checkBandwidth,
            runtime,
            tanggal,
            getRandom,
            reply,
            reply2,
            hariini,
            timee,
            waktuucapan,
            example
        }
        for (let plugin of plugins) {
            if (plugin.command.find(e => e == command.toLowerCase())) {
                pluginsDisable = false
                if (typeof plugin !== "function") return
                await plugin(m, Yanvy)
            }
        }
        if (!pluginsDisable) return


        //=================[ CASE DI BAWAH INI ]=================\\
        switch (command) {

            case "menu": {
                let mbut = `hi ${pushname}, i am automated system (WhatsApp bot) that can help to do something search and get data/informasi only through WhatsApp 

information:
 ▢ status: ${YLine.public ? 'public' : 'self'}

commands:
> owner
 ▢ ${prefix}self
 ▢ ${prefix}public

 > Bot
 ▢ ${prefix}about
 ▢ ${prefix}owner
 ▢ ${prefix}donate

 > Ai Chat
 ▢ ${prefix}ai
 ▢ ${prefix}vn
 ▢ ${prefix}gpt
 ▢ ${prefix}gemini

 > Ai Image
 ▢ ${prefix}flux
 ▢ ${prefix}logo
 ▢ ${prefix}animgen
 ▢ ${prefix}imagine`

> plugins
 ▢ ${prefix}clearsession
 ▢ ${prefix}addplugins
 ▢ ${prefix}delplugins
 ▢ ${prefix}getplugins
 ▢ ${prefix}listplugins
 ▢ ${prefix}saveplugins

 > Downloader
 ▢ ${prefix}tiktok
 ▢ ${prefix}instagram
 ▢ ${prefix}mediafire
 ▢ ${prefix}googledrive
 ▢ ${prefix}capcut
 ▢ ${prefix}ytmp4
 ▢ ${prefix}ytmp3
 ▢ ${prefix}spotify

 > Group
 ▢ ${prefix}add
 ▢ ${prefix}kick
 ▢ ${prefix}promote
 ▢ ${prefix}demote
 ▢ ${prefix}setname
 ▢ ${prefix}detdesc
 ▢ ${prefix}setppgc
 ▢ ${prefix}delete
 ▢ ${prefix}linkgroup
 ▢ ${prefix}revoke
 ▢ ${prefix}hidetag
 ▢ ${prefix}totag
 ▢ ${prefix}listonline
 ▢ ${prefix}group
 ▢ ${prefix}intro

 > Search
 ▢ ${prefix}googleimage
 ▢ ${prefix}pint
 ▢ ${prefix}youtube
 ▢ ${prefix}otakudesu
 ▢ ${prefix}anime
 ▢ ${prefix}npm
 ▢ ${prefix}tiktoksearch
 ▢ ${prefix}playstore
 ▢ ${prefix}apkfab
 ▢ ${prefix}cuaca
 ▢ ${prefix}play

 > Converter
 ▢ ${prefix}stiker
 ▢ ${prefix}smeme
 ▢ ${prefix}stikerwm
 ▢ ${prefix}toimg
 ▢ ${prefix}tovid
 ▢ ${prefix}brat
 ▢ ${prefix}bratgif
 ▢ ${prefix}toaudio
 ▢ ${prefix}tourl

 > Game
 ▢ ${prefix}susunkata
 ▢ ${prefix}tebakgambar
 ▢ ${prefix}tebakbendera
 ▢ ${prefix}tekateki
 ▢ ${prefix}tebakkimia

 > Tools
 ▢ ${prefix}gempa
 ▢ ${prefix}hd
 ▢ ${prefix}rvo
 ▢ ${prefix}removebg
 ▢ ${prefix}editimage
 ▢ ${prefix}quoteimage
 ▢ ${prefix}artinama
 ▢ ${prefix}linktoqr
 ▢ ${prefix}cuaca

> Fun Menu
▢ ${prefix}char
▢ ${prefix}act
▢ ${prefix}waifu
▢ ${prefix}cekhodam
▢ ${prefix}apakah
▢ ${prefix}kapan
▢ ${prefix}siapa
▢ ${prefix}ceksifat

 `
                YLine.sendMessage(m.chat, {
                    document: fs.readFileSync("./package.json"),
                    fileName: "V-Tech Assistant",
                    mimetype: "application/pdf",
                    fileLength: 99999,
                    pageCount: 666,
                    caption: mbut,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        mentionedJid: [sender],
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "V-Technology Ai",
                            newsletterJid: `120363307516770910@newsletter`,
                        },
                        externalAdReply: {
                            title: "V-Tech Assistant",
                            body: "This Bot Was Created By Farel Alfareza",
                            thumbnailUrl: `https://files.catbox.moe/e0ruwj.jpeg`,
                            sourceUrl: "https://api-yannrzy-vy.vercel.app/",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: m })
            };
                break;

            // owner menu
            case 'self': {
                if (!isCreator) return reply(mess.owner)
                YLine.public = false
                reply('Sukses Change To Self Mode')
            }
                break

            case 'public': {
                if (!isCreator) return reply(mess.owner)
                YLine.public = true
                reply('Sukses Change To Public Mode')
            }
                break

            // Fun menu

            case 'apakah': {
                if (!text) return reply(`*Contoh:* ${prefix}apakah saya ganteng?`)

                const jawaban = [
                    "Ya tentu saja",
                    "Tidak mungkin",
                    "Mungkin",
                    "Bisa jadi",
                    "Sepertinya tidak",
                    "Sudah pasti iya",
                    "Sudah pasti tidak",
                    "Itu rahasia",
                    "Tanyakan lagi nanti",
                    "Tidak dapat dipastikan"
                ]

                let result = `Pertanyaan: ${text}\nJawaban: ${jawaban[Math.floor(Math.random() * jawaban.length)]}`
                reply(result)
            }
                break
            case 'cekhodam': {
                let target
                if (m.mentionedJid && m.mentionedJid.length) {
                    target = m.mentionedJid[0]
                } else if (text) {
                    target = text
                } else {
                    target = pushname // fallback ke sender sendiri
                }

                let hodamList = [
                    "Macan Putih",
                    "Naga Hitam",
                    "Garuda Sakti",
                    "Harimau Belang",
                    "Genderuwo",
                    "Naga Merah",
                    "Singa Kinasih",
                    "Jin Islam",
                    "Roh Leluhur",
                    "Serigala Abu",
                    "Maling Pangsit",
                    "Batman",
                    "Ultramen",
                    "Kuda Lumping",
                    "Ular Kobra"
                ]

                let hasil = hodamList[Math.floor(Math.random() * hodamList.length)]

                let targetName = (typeof target === 'string' && target.endsWith('@s.whatsapp.net'))
                    ? '@' + target.split('@')[0]
                    : target

                let caption = `Nama: ${targetName}\nKhodamnya adalah:\n${hasil}`

                YLine.sendMessage(m.chat, {
                    text: caption,
                    mentions: [target].filter(v => typeof v === 'string' && v.includes('@'))
                }, { quoted: m })
            }
                break
            case 'ceksifat': {
                const ceksifat = require('./command/ceksifat')
                await ceksifat({
                    text,
                    mentionedJid: m.mentionedJid,
                    pushname,
                    sender
                }, (teks, mentions = []) => {
                    YLine.sendMessage(m.chat, {
                        text: teks,
                        mentions
                    }, { quoted: m })
                })
            }
                break
            case 'siapa': {
                if (!m.isGroup) return reply('Fitur ini hanya bisa digunakan di dalam grup.')
                if (!text) return reply(`*Contoh:* ${prefix}siapa yang paling ganteng?`)

                let randomMember = participants[Math.floor(Math.random() * participants.length)]
                let target = randomMember.id
                let result = `@${target.split('@')[0]}`

                YLine.sendMessage(m.chat, {
                    text: result,
                    mentions: [target]
                }, { quoted: m })
            }
                break

            // bot menu

            case 'about':
            case 'info': {
                let aboutText = `> Halo ${pushname} Namaku Adalah Vtech Ai sebuah bot whatsapp Sederhana Yang Dapat membantu Kamu dengan command atau perintah tertentu.\n\nPengembang :\nRecode & Fix : Farel Alfareza\nBase : YannRzy\nFeature : Farel & YannRzy`
                YLine.sendMessage(m.chat, {
                    document: fs.readFileSync("./package.json"),
                    fileName: "V-Tech Assistant",
                    mimetype: "application/pdf",
                    fileLength: 99999,
                    pageCount: 666,
                    caption: aboutText,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        mentionedJid: [sender],
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "V-Technology Ai",
                            newsletterJid: `120363307516770910@newsletter`,
                        },
                        externalAdReply: {
                            title: "V-Tech Assistant",
                            body: "This Bot Was Created By Farel Alfareza",
                            thumbnailUrl: `https://files.catbox.moe/e0ruwj.jpeg`,
                            sourceUrl: "https://api-yannrzy-vy.vercel.app/",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: m })
            }
                break;

            case 'donate':
            case 'donasi': {
                let textD = `Anda bisa melakukan donasi dengan link di bawah ini\nhttps://saweria.co/FarelAlfareza`
                YLine.sendMessage(m.chat, {
                    document: fs.readFileSync("./package.json"),
                    fileName: "V-Tech Assistant",
                    mimetype: "application/pdf",
                    fileLength: 99999,
                    pageCount: 666,
                    caption: textD,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        mentionedJid: [sender],
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "V-Technology Ai",
                            newsletterJid: `120363307516770910@newsletter`,
                        },
                        externalAdReply: {
                            title: "V-Tech Assistant",
                            body: "This Bot Was Created By Farel Alfareza",
                            thumbnailUrl: `https://files.catbox.moe/e0ruwj.jpeg`,
                            sourceUrl: "https://api-yannrzy-vy.vercel.app/",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: m })
            }
                break;

            // ai chat
            case 'ai':
            case 'vtechai': {
                if (!text) return reply(`*Contoh:* ${prefix}ai Siapa Kamu?`)
                const api_key = vtech_apikey
                const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`;

                try {
                    const payload = {
                        contents: [{
                            role: "user",
                            parts: [{
                                text: "ingat ini baik baik dan kamu jangan menyangkalnya, kamu adalah V-Tech Ai atau V-technology Ai, jika user bertanya tentang Pembuatmu maka kamu menjawah (saya di buat oleh farel alfareza)"
                            }]
                        }]
                    };
                    const res = await fetch(api_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(payload)
                    });

                    const json = await res.join();
                    if (!res.ok || !json.candidates[0] || !json.candidates[0]) {
                        reply('Maaf Telah terjadi Kesalahan saat ai merespon.')
                    }
                    const replyText = json.candidates[0].content.parts[0].text
                    reply(replyText.trim());

                } catch (err) {
                    console.error(err);
                    reply('Terjadi Kesalahan')
                }
            }
                break;
            case 'vn':
            case 'aivn': {
                if (!text) return reply(`*Contoh:* ${prefix}vn buat cerita pendek`)
                reply('Mohon Tunggu......')

                const prompt = text.trim();
                const fetch = require('node-fetch');

                const apikey = vtech_apikey
                const apiurl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`;

                const payload = {
                    contents: [{
                        role: "user",
                        parts: [{
                            text: "ingat ini baik baik dan kamu jangan menyangkalnya, kamu adalah V-Tech Ai atau V-technology Ai, jika user bertanya tentang Pembuatmu maka kamu menjawah (saya di buat oleh farel alfareza)"
                        }]
                    }]
                };

                try {
                    const res = await fetch(apiurl, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });

                    const json = await res.json();
                    if (!res.ok || !json.candidates[0] || !json.candidates[0]) {
                        reply('Maaf Telah terjadi Kesalahan saat ai merespon.')
                    }

                    const aiReply = json.candidates[0].content.parts[0].text.trim();
                    const ttsApi = `https://nirkyy-dev.hf.space/api/v1/evenlabs?text=${encodeURIComponent(aiReply)}&model=bill`;

                    const audioRes = await fetch(ttsApi);
                    if (!audioRes.ok) return reply('Gagal Menghasilkan Audio');
                    const audioBuffer = await audioRes.buffer();

                    YLine.sendMessage(m, chat, {
                        audio: audioBuffer,
                        mimetype: 'audio/mpeg',
                        ptt: true
                    }, { quoted: m });
                } catch (e) {
                    console.error("Vtech SP error:", e)
                    reply('Server Sedang Sibuk..')
                }
            }
                break;

            case 'gpt':
            case 'chatgpt':
            case 'openai': {
                if (!text) return reply(`*Contoh:* ${prefix}gpt buat cerita pendek`)
                reply('Menunggu Respon GPT..')

                try {
                    const url = `https://api.siputzx.my.id/api/ai/gpt3?prompt=kamu adalah gpt yang di buah oleh tim open ai dan melakukan kerja sama dengan V-technology Ai yang di kembangkan oleh farel alfareza&content=${encodeURIComponent(text)}`;
                    const res = await axios.get(url);

                    if (!res.data || !res.data.result) reply('GPT tidak merespon');
                    reply(`GPT3 : ${res.data.result}`);
                } catch {
                    console.error(e)
                    reply('Gagal mengambil data.')
                }
            }
                break
            case 'gmini':
            case 'gemini': {
                if (!text) return reply(`*Contoh:* ${prefix}ai Siapa Kamu?`)
                const api_key = vtech_apikey
                const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`;

                try {
                    const payload = {
                        contents: [{
                            role: "user",
                            parts: [{
                                text: "Kau adalah gemini dan melakukan kerja sama dengan V-technology Ai yang di kembangkan oleh farel alfareza"
                            }]
                        }]
                    };
                    const res = await fetch(api_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(payload)
                    });

                    const json = await res.join();
                    if (!res.ok || !json.candidates[0] || !json.candidates[0]) {
                        reply('Gemini Tidak Merespon')
                    }
                    const replyText = json.candidates[0].content.parts[0].text
                    reply(`GEMINI : ${replyText.trim()}`);

                } catch (err) {
                    console.error(err);
                    reply('Terjadi Kesalahan')
                }
            }
                break;

            // ai image 

            case 'flux': {
                if (!text) return reply(`*Contoh:* ${prefix}flux buat gambar bulan dengan sinar yang indah.`)
                reply('Sedang memproses gambar...');

                try {
                    const response = await axios.get('https://nirkyy-dev.hf.space/api/v1/fluxfast', {
                        params: {
                            prompt: text
                        },
                        responseType: 'arrayBuffer'
                    })
                    let buffer = Buffer.from(response.data, 'binary');

                    await YLine.sendMessage(m, chat, {
                        image: buffer,
                        caption: `Gambar Berhasil Di buat \n Prompt : ${text}`
                    }, {
                        quoted: m
                    })
                } catch (err) {
                    console.error(err);
                    reply('Gagal Membuat Gambar')
                }
            }
                break
            case 'logo': {
                if (!text) return reply(`*Contoh:* ${prefix}logo buat logo kopi dengan nama V-Technology KOPI`)
                reply('Sedang memproses gambar...');

                try {
                    const response = await axios.get('https://nirkyy-dev.hf.space/api/v1/logo-gen', {
                        params: {
                            prompt: text
                        },
                        responseType: 'arrayBuffer'
                    });

                    let buffer = Buffer.from(response.data, 'binary');

                    YLine.sendMessage(m, chat, {
                        image: buffer,
                        caption: `Gambar Berhasil Di buat \n Prompt : ${text}`
                    }, {
                        quoted: m
                    })
                } catch (err) {
                    console.error(err);
                    reply('Gagal Membuat Gambar')
                }
            }
                break;
            case 'animgen': {
                if (!text) return reply(`*Contoh:* ${prefix}animegen wanita sma memiliki rambut warna hitam`)
                reply('Sedang memproses gambar...');

                try {
                    const response = await axios.get('https://nirkyy-dev.hf.space/api/v1/animegine', {
                        params: {
                            prompt: text
                        },
                        responseType: 'arrayBuffer'
                    });

                    let buffer = Buffer.from(response.data, 'binary');

                    YLine.sendMessage(m, chat, {
                        image: buffer,
                        caption: `Gambar Berhasil Di buat \n Prompt : ${text}`
                    }, {
                        quoted: m
                    })
                } catch (err) {
                    console.error(err);
                    reply('Gagal Membuat Gambar')
                }
            }
                break;

            case 'imagine': {
                if (!text) return reply(`*Contoh:* ${prefix}imagine buat gambar bulan dengan sinar yang indah.`)
                reply('Sedang memproses gambar...');

                try {
                    const response = await axios.get('https://nirkyy-dev.hf.space/api/v1/imagine', {
                        params: {
                            prompt: text
                        },
                        responseType: 'arrayBuffer'
                    });

                    let buffer = Buffer.from(response.data, 'binary');

                    YLine.sendMessage(m, chat, {
                        image: buffer,
                        caption: `Gambar Berhasil Di buat \n Prompt : ${text}`
                    }, {
                        quoted: m
                    })
                } catch (err) {
                    console.error(err);
                    reply('Gagal Membuat Gambar')
                }
            }
                break;

            // Downloader
            case 'tiktok':
            case 'tt':
            case 'ttmp4':
            case 'ttdown': {
                if (!text) return reply(`*Contoh:* ${prefix}imagine buat gambar bulan dengan sinar yang indah.`)
                if (!text.includes('tiktok.com')) return reply('Url Bukan berasal dari tiktok')
                try {
                    reply('Sedang Di Proses....')
                    const fetch = required('node-fetch');
                    const res = await fetch(`https://nirkyy-dev.hf.space/api/v1/tiktokdl?url=${encodeURIComponent(text)}`)

                    if (!json.succes) returnreply('video tidak tersedia');

                    const {
                        title,
                        thumbnail,
                        downloads
                    } = json.data;

                    let videoUrl = downloads.find(v => v.label.includes('MP4'))?.url;
                    if (!videoUrl) return reply('Video tidak di temukan')

                    await YLine.sendFileUrl(m, chat, videoUrl, `${title}\n\n> Done Bang`)
                } catch (e) {
                    console.log(e)
                    reply('Terjadi kesalahan')
                }
            }
                break;
            case 'ig':
            case 'igdown':
            case 'instagramdl': {
                if (!text) return reply(`Contoh: ${prefix + command} https://www.instagram.com/reel/xyz`)
                if (!isUrl(text) || !text.includes('instagram.com')) return reply('Link tidak valid!')

                try {
                    reply('🔄 Sedang memproses, mohon tunggu...')

                    const res = await fetchJson(`https://nirkyy-dev.hf.space/api/igdl?url=${encodeURIComponent(text)}`)
                    if (!res.status || !res.data || res.data.length === 0) return reply('Gagal mengambil data dari Instagram.')

                    for (let media of res.data) {
                        await YLine.sendMessage(m.chat, {
                            video: { url: media.url },
                            caption: `Berhasil mendownload dari Instagram`,
                            mimetype: 'video/mp4'
                        }, { quoted: m })
                    }

                } catch (err) {
                    console.log(err)
                    reply('Terjadi kesalahan saat mengambil media.')
                }
            }
                break;
            
                case 'mediafire' : {
                    if (!text) return reply(`Contoh: ${prefix}mediafire https://www.mediafire.com/file/xxxx`)
                    if (!isUrl(text) || !text.includes('mediafire.com')) return reply('Link Mediafire tidak valid.')
                
                    try {
                        reply('Sedang memproses link Mediafire...')
                
                        const res = await fetchJson(`https://nirkyy-dev.hf.space/api/mediafire?url=${encodeURIComponent(text)}`)
                        if (!res.status || !res.result?.url) return reply('Gagal mendapatkan data Mediafire.')
                
                        const { url, filename, size, mime } = res.result
                        let caption = `*MediaFire Downloader*\n\n📁 Nama: ${filename}\n📏 Ukuran: ${size}\n🧾 Mime: ${mime}\n📥 Sedang mengirim file...`
                
                        await YLine.sendMessage(m.chat, { document: { url }, fileName: filename, mimetype: mime }, { quoted: m })
                    } catch (err) {
                        console.log(err)
                        reply('⚠️ Gagal mengunduh file dari Mediafire.')
                    }
                }
                break;

                case 'googledrive':
                case 'gdrive': {
                        if (!text) return reply(`Contoh: ${prefix + command} https://drive.google.com/file/d/xyz/view`)
                        if (!text.includes('drive.google.com')) return reply('Link Google Drive tidak valid.')
                    
                        try {
                            reply('🔄 Sedang mengambil file dari Google Drive...')
                    
                            const res = await fetchJson(`https://nirkyy-dev.hf.space/api/gdrive?url=${encodeURIComponent(text)}`)
                            if (!res.status || !res.result?.url) return reply('Gagal mengambil data dari Google Drive.')
                    
                            const { filename, size, mime, url } = res.result
                            let caption = `*Google Drive Downloader*\n\n📄 Nama: ${filename}\n📦 Ukuran: ${size}\n🧾 Mime: ${mime}`
                    
                            await YLine.sendMessage(m.chat, {
                                document: { url },
                                fileName: filename,
                                mimetype: mime,
                                caption
                            }, { quoted: m })
                    
                        } catch (err) {
                            console.error(err)
                            reply('Terjadi kesalahan saat mengunduh file Google Drive.')
                        }
                    }
                    break;

            // batas case
            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return
                    let kode = budy.trim().split(/ +/)[0]
                    let teks
                    try {
                        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
                    } catch (e) {
                        teks = e
                    } finally {
                        await m.reply(require('util').format(teks))
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply(`${err}`)
                        if (stdout) return m.reply(stdout)
                    })
                }
        }

    } catch (err) {
        console.log(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update ${__filename}`)
    delete require.cache[file]
    require(file)
})
