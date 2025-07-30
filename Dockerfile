# Gunakan Node.js image berbasis Debian Bullseye yang masih aktif
FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Copy semua file ke dalam container
COPY . .

# Install dependensi
RUN apt-get update && \
    apt-get install -y ffmpeg imagemagick webp && \
    rm -rf /var/lib/apt/lists/*

# Install npm dependencies
RUN npm install

# Jalankan bot
CMD ["npm", "start"]
