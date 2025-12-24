# 🍳 Application de Gestion de Recettes de Cuisine

Application web complète pour la gestion de recettes de cuisine avec interface utilisateur moderne, dashboard administrateur et API REST.

## 📋 Fonctionnalités

- ✅ **Page de liste des recettes** avec affichage en grille
- ✅ **Barre de recherche** pour rechercher par titre ou description
- ✅ **Filtres** par catégorie et difficulté
- ✅ **Vue détaillée** d'une recette avec tous les détails
- ✅ **Dashboard admin** pour gérer les recettes (CRUD complet)
- ✅ **Design responsive** adapté à tous les écrans
- ✅ **API REST** complète avec Laravel
- ✅ **Base de données MySQL** avec migrations et seeders

## 🛠️ Technologies Utilisées

- **Frontend**: React 18, React Router, Axios
- **Backend**: Laravel 10, PHP 8.2
- **Base de données**: MySQL 8.0
- **Conteneurisation**: Docker & Docker Compose

## 📁 Structure du Projet

```
.
├── backend/              # Application Laravel
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── Dockerfile
├── frontend/             # Application React
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── Dockerfile
├── docker-compose.yml    # Configuration Docker Compose
└── README.md
```

## 🚀 Installation et Lancement

### Prérequis

- Docker et Docker Compose installés sur votre machine
- Git (optionnel)

### Étapes d'installation

1. **Cloner ou télécharger le projet** (si nécessaire)

2. **Lancer l'application avec Docker Compose**

   ```bash
   docker-compose up --build
   ```

   Cette commande va :
   - Construire les images Docker pour le frontend et le backend
   - Démarrer les conteneurs MySQL, Laravel et React
   - Installer les dépendances
   - Exécuter les migrations de base de données
   - Charger les données de démonstration

3. **Attendre que tous les services soient prêts**

   Vous verrez des messages indiquant que les services sont démarrés. Le backend peut prendre quelques instants pour installer les dépendances Composer.

4. **Accéder à l'application**

   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000/api
   - **Dashboard Admin**: http://localhost:3000/admin

## 🧪 Tester les Fonctionnalités

### Interface Utilisateur

1. **Page d'accueil** (`http://localhost:3000`)
   - Visualiser toutes les recettes
   - Utiliser la barre de recherche
   - Filtrer par catégorie ou difficulté
   - Cliquer sur une recette pour voir les détails

2. **Vue détaillée d'une recette**
   - Voir tous les détails (ingrédients, instructions, temps, etc.)
   - Utiliser le bouton "Retour" pour revenir à la liste

### Dashboard Admin

1. **Accéder au dashboard** (`http://localhost:3000/admin`)

2. **Ajouter une recette**
   - Cliquer sur "Ajouter une recette"
   - Remplir le formulaire
   - Ajouter des ingrédients un par un
   - Cliquer sur "Créer"

3. **Modifier une recette**
   - Cliquer sur "Modifier" sur une recette existante
   - Modifier les champs souhaités
   - Cliquer sur "Modifier"

4. **Supprimer une recette**
   - Cliquer sur "Supprimer" sur une recette
   - Confirmer la suppression

## 📡 API Endpoints

L'API est accessible à `http://localhost:8000/api`

### Liste des endpoints

- `GET /api/recipes` - Liste toutes les recettes
  - Paramètres optionnels: `search`, `category`, `difficulty`, `sort_by`, `sort_order`
- `GET /api/recipes/categories` - Liste toutes les catégories
- `GET /api/recipes/{id}` - Détails d'une recette
- `POST /api/recipes` - Créer une nouvelle recette
- `PUT /api/recipes/{id}` - Modifier une recette
- `DELETE /api/recipes/{id}` - Supprimer une recette

### Exemple de requête

```bash
# Récupérer toutes les recettes
curl http://localhost:8000/api/recipes

# Rechercher des recettes
curl http://localhost:8000/api/recipes?search=pasta

# Filtrer par catégorie
curl http://localhost:8000/api/recipes?category=Italien
```

## 🐳 Commandes Docker Utiles

### Arrêter l'application

```bash
docker-compose down
```

### Arrêter et supprimer les volumes (réinitialiser la base de données)

```bash
docker-compose down -v
```

### Voir les logs

```bash
# Tous les services
docker-compose logs

# Un service spécifique
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### Redémarrer un service

```bash
docker-compose restart backend
docker-compose restart frontend
```

### Accéder au shell d'un conteneur

```bash
# Backend Laravel
docker-compose exec backend bash

# Frontend React
docker-compose exec frontend sh
```

## 🔧 Configuration

### Variables d'environnement

Les variables d'environnement sont configurées dans `docker-compose.yml`. Pour modifier la configuration :

1. Modifier `docker-compose.yml` pour les variables de base de données
2. Pour le frontend, modifier `REACT_APP_API_URL` si nécessaire

### Base de données

- **Host**: mysql (dans Docker) ou localhost:3306 (depuis l'extérieur)
- **Database**: cooking_db
- **Username**: cooking_user
- **Password**: cooking_password
- **Root Password**: root_password

## 📝 Données de Démonstration

L'application est préchargée avec 5 recettes de démonstration :
- Spaghetti Carbonara
- Salade César
- Bœuf Bourguignon
- Tacos Mexicains
- Sushi Rolls

## 🐛 Dépannage

### Le backend ne démarre pas

- Vérifier que MySQL est démarré : `docker-compose ps`
- Vérifier les logs : `docker-compose logs backend`
- S'assurer que le port 8000 n'est pas utilisé

### Le frontend ne démarre pas

- Vérifier que le port 3000 n'est pas utilisé
- Vérifier les logs : `docker-compose logs frontend`
- Attendre que les dépendances npm soient installées

### Erreurs de connexion à la base de données

- Vérifier que MySQL est démarré
- Attendre quelques secondes après le démarrage de MySQL
- Vérifier les variables d'environnement dans `docker-compose.yml`

### Réinitialiser complètement

```bash
docker-compose down -v
docker-compose up --build
```

## 📄 Licence

Ce projet est fourni à des fins éducatives et de démonstration.

## 👤 Auteur

Développé dans le cadre d'un projet de gestion de recettes de cuisine.

---

**Bon appétit ! 🍽️**

