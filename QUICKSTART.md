# 🚀 Guide de Démarrage Rapide

## Lancement en une commande

```bash
docker-compose up --build
```

## Accès à l'application

- **Frontend**: http://localhost:3000
- **Dashboard Admin**: http://localhost:3000/admin
- **API Backend**: http://localhost:8000/api

## Arrêt de l'application

```bash
docker-compose down
```

## Réinitialisation complète

```bash
docker-compose down -v
docker-compose up --build
```

## Vérification des services

```bash
docker-compose ps
```

## Logs

```bash
# Tous les services
docker-compose logs

# Un service spécifique
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

## Notes importantes

1. Le premier démarrage peut prendre 5-10 minutes (installation des dépendances)
2. Attendez que MySQL soit complètement démarré avant que le backend ne se connecte
3. Les données de démonstration sont chargées automatiquement au premier démarrage

