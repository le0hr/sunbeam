FROM python:3.12-slim

WORKDIR /app

# Системні залежності для Playwright
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libgtk-3-0 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libx11-xcb1 \
    libxcb1 \
    libxext6 \
    libx11-6 \
    libcups2 \
    libdbus-1-3 \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Встановлення браузера Playwright
RUN playwright install chromium
RUN playwright install-deps chromium

COPY . .
CMD ["python", "main.py"]