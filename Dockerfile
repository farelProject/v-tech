FROM node:20

# Set timezone (opsional)
ENV TZ=Asia/Jakarta

# Direktori kerja
WORKDIR /app

# Install dependensi sistem
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ffmpeg \
    imagemagick \
    libwebp-dev \
    && rm -rf /var/lib/apt/lists/*

# Salin semua file ke dalam container
COPY . .

# Install dependensi Node.js
RUN npm install

# Jalankan bot
CMD ["npm", "start"]
