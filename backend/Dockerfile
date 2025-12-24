FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first for better caching
COPY composer.json ./

# Install dependencies without scripts (bootstrap files don't exist yet)
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts || \
    composer update --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy all application files
COPY . /var/www/html

# Now run composer scripts after all files are in place
RUN composer dump-autoload --optimize --no-interaction && \
    php artisan package:discover --ansi || true

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

