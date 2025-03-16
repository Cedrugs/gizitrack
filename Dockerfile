FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring xml gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application files
COPY . .

# Configure Git to trust this directory
RUN git config --global --add safe.directory /var/www

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install Node.js & dependencies
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

# Install front-end dependencies
RUN npm install && npm run build

# Expose ports
EXPOSE 5173 8000

# Set permissions
RUN chown -R www-data:www-data /var/www

# Start Laravel & Vite
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=8000 & composer run dev -- --host 0.0.0.0"]
