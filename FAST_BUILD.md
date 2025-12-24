# Build Rapide - Instructions

Si le build Docker prend trop de temps, voici des solutions :

## Option 1 : Installer les dépendances localement d'abord (RECOMMANDÉ)

```bash
# Dans le dossier frontend
cd frontend
npm install

# Puis relancer Docker
cd ..
docker compose up --build
```

Cela permettra à Docker d'utiliser le cache des node_modules.

## Option 2 : Utiliser BuildKit pour un build plus rapide

```bash
DOCKER_BUILDKIT=1 docker compose build frontend
docker compose up
```

## Option 3 : Construire uniquement le frontend

```bash
docker compose build frontend
docker compose up
```

## Option 4 : Si vous avez déjà node_modules localement

Le volume `/app/node_modules` dans docker-compose.yml devrait préserver les node_modules entre les builds.

## Note

La première installation de `react-icons` peut prendre 5-10 minutes car c'est une bibliothèque volumineuse. Les builds suivants seront beaucoup plus rapides grâce au cache Docker.

