# Gunakan Node.js LTS
FROM node:20

# Buat folder kerja dalam container
WORKDIR /app

# Install dependensi sistem seperti ffmpeg, webp, dan imagemagick
RUN apt-get update && \
    apt-get install -y ffmpeg webp imagemagick && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Salin semua file proyek ke dalam container
COPY . .

# Install semua dependensi dari package.json
RUN npm install

# Jalankan bot via npm start
CMD ["npm", "start"]
