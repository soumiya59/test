# Instructions - Foodieland

## Lancer l'application localement

### Prérequis

- Docker et Docker Compose installés sur votre machine
- Ports 3000 (frontend) et 8000 (backend) disponibles

### Étapes

1. **Cloner le projet** (si ce n'est pas déjà fait)

   ```bash
   git clone https://github.com/soumiya59/test.git
   cd test
   ```

2. **Lancer l'application avec Docker Compose**

   ```bash
   docker-compose up --build
   ```

   Cette commande va :

   - Construire les images Docker 
   - Démarrer les conteneurs (frontend, backend, database)
   - Installer les dépendances automatiquement

3. **Accéder à l'application**
   - Frontend (React) : http://localhost:3000
   - Dashboard Admin: http://localhost:3000/admin
   - Backend API (Laravel) : http://localhost:8000/api

### Commandes utiles

**Lancer en arrière-plan :**

```bash
docker-compose up -d
```

**Voir les logs :**

```bash
docker-compose logs -f
```

**Arrêter l'application :**

```bash
docker-compose down
```

**Réinitialiser la base de données :**

```bash
docker-compose exec backend php artisan migrate:fresh --seed
```

**Redémarrer un service spécifique :**

```bash
docker-compose restart frontend
# ou
docker-compose restart backend
```

---

## Tester les fonctionnalités

### 1. Page d'accueil (HomePage)

**URL :** http://localhost:3000

### 2. Liste des recettes (RecipeList)

**URL :** http://localhost:3000/recipes 

### 3. Détails d'une recette (RecipeDetail)

**URL :** http://localhost:3000/recipe/:id

### 4. API Backend

**Base URL :** http://localhost:8000/api

**Endpoints à tester :**

**GET /recipes**

```bash
curl http://localhost:8000/api/recipes
```

- Retourne toutes les recettes
- Vérifier que les 9 recettes sont présentes

**GET /recipes/:id**

```bash
curl http://localhost:8000/api/recipes/1
```

- Retourne une recette spécifique
- Vérifier les champs : title, description, ingredients, instructions, prep_time, cook_time, category, image_url

**GET /recipes/categories**

```bash
curl http://localhost:8000/api/recipes/categories
```

- Retourne toutes les catégories uniques
- Vérifier : ["Breakfast", "Healthy", "Meat", "Dessert", "Lunch", "Chocolate"]

### 5. Fonctionnalités de recherche et filtrage

**Dans RecipeList :**

1. Taper dans la barre de recherche → les recettes se filtrent en temps réel
2. Sélectionner une catégorie → seules les recettes de cette catégorie s'affichent
3. Sélectionner une difficulté → seules les recettes de cette difficulté s'affichent
4. Combiner plusieurs filtres → les filtres fonctionnent ensemble
5. Cliquer sur "Clear Filters" → tous les filtres sont réinitialisés
6. Cliquer sur le X d'un badge de filtre actif → ce filtre est supprimé

### 6. Vérifications techniques

**Logs Docker :**

```bash
docker-compose logs frontend
docker-compose logs backend
```

- Vérifier qu'il n'y a pas d'erreurs
- Vérifier que les services démarrent correctement

**Connexion à la base de données :**

```bash
docker-compose exec backend php artisan migrate:status
```

- Vérifier que toutes les migrations sont appliquées

**Dépendances :**

- Frontend : React, Tailwind CSS, Axios, React Router
- Backend : Laravel 10, MySQL

---

## Dépannage

### Le frontend ne se charge pas

- Vérifier que le port 3000 n'est pas utilisé : `lsof -i :3000`
- Vérifier les logs : `docker-compose logs frontend`
- Redémarrer : `docker-compose restart frontend`

### Le backend ne répond pas

- Vérifier que le port 8000 n'est pas utilisé : `lsof -i :8000`
- Vérifier les logs : `docker-compose logs backend`
- Vérifier la connexion à la base de données : `docker-compose exec backend php artisan migrate:status`

### Les recettes ne s'affichent pas

- Vérifier que la base de données est peuplée : `docker-compose exec backend php artisan tinker --execute="echo App\Models\Recipe::count();"`
- Si 0, réensemencer : `docker-compose exec backend php artisan db:seed --class=RecipeSeeder`

### Erreurs de proxy API

- Vérifier que `setupProxy.js` est correctement configuré
- Vérifier que `REACT_APP_API_URL` est défini dans `docker-compose.yml`

---

## Structure du projet

```
test/
├── frontend/          # Application React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── HomePage.js
│   │   │   ├── RecipeList.js
│   │   │   └── RecipeDetail.js
│   │   └── App.js
│   └── package.json
├── backend/          # API Laravel
│   ├── app/
│   ├── database/
│   │   └── seeders/
│   │       └── RecipeSeeder.php
│   └── routes/
│       └── api.php
└── docker-compose.yml
```

## Notes importantes

1. Le premier démarrage peut prendre 5-10 minutes (installation des dépendances)
2. Attendez que MySQL soit complètement démarré avant que le backend ne se connecte
3. Les données de démonstration sont chargées automatiquement au premier démarrage
