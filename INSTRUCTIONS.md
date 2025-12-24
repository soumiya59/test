# 📖 Instructions Complètes

## 🎯 Objectif du Projet

Application web complète de gestion de recettes de cuisine avec :
- Interface utilisateur moderne et responsive
- Dashboard administrateur pour la gestion des recettes
- API REST backend fonctionnelle
- Conteneurisation Docker complète

## ✅ Fonctionnalités Implémentées

### Interface Utilisateur
- ✅ Page de liste des recettes avec affichage en grille
- ✅ Barre de recherche (titre et description)
- ✅ Filtres par catégorie et difficulté
- ✅ Vue détaillée d'une recette complète
- ✅ Design responsive (mobile, tablette, desktop)

### Dashboard Admin
- ✅ Liste de toutes les recettes dans un tableau
- ✅ Formulaire pour ajouter une nouvelle recette
- ✅ Formulaire pour modifier une recette existante
- ✅ Suppression de recettes avec confirmation
- ✅ Gestion dynamique des ingrédients

### Backend API
- ✅ Endpoints REST complets (GET, POST, PUT, DELETE)
- ✅ Recherche et filtrage avancés
- ✅ Validation des données
- ✅ Gestion des erreurs
- ✅ CORS configuré pour le frontend

## 🚀 Démarrage Rapide

### 1. Lancer l'application

```bash
docker-compose up --build
```

**Temps estimé**: 5-10 minutes pour le premier démarrage (installation des dépendances)

### 2. Accéder à l'application

Une fois tous les services démarrés, accédez à :

- **Frontend**: http://localhost:3000
- **Dashboard Admin**: http://localhost:3000/admin
- **API Backend**: http://localhost:8000/api

### 3. Tester les fonctionnalités

#### Interface Utilisateur
1. Visitez http://localhost:3000
2. Utilisez la barre de recherche pour trouver des recettes
3. Filtrez par catégorie ou difficulté
4. Cliquez sur une recette pour voir les détails complets

#### Dashboard Admin
1. Visitez http://localhost:3000/admin
2. Cliquez sur "Ajouter une recette"
3. Remplissez le formulaire :
   - Titre et description
   - Ajoutez des ingrédients (un par un)
   - Instructions de préparation
   - Temps de préparation et cuisson
   - Nombre de portions
   - Difficulté et catégorie
   - URL de l'image (optionnel)
4. Cliquez sur "Créer"
5. Testez la modification et la suppression

## 🔧 Configuration

### Ports Utilisés
- **3000**: Frontend React
- **8000**: Backend Laravel API
- **3306**: MySQL Database

### Variables d'Environnement

Les variables sont configurées dans `docker-compose.yml` :

**Backend**:
- `DB_HOST`: mysql
- `DB_DATABASE`: cooking_db
- `DB_USERNAME`: cooking_user
- `DB_PASSWORD`: cooking_password

**Frontend**:
- `REACT_APP_API_URL`: http://localhost:8000/api

## 📡 API Endpoints

### Liste des recettes
```
GET /api/recipes
```

Paramètres optionnels :
- `search`: Recherche par titre ou description
- `category`: Filtre par catégorie
- `difficulty`: Filtre par difficulté (easy, medium, hard)
- `sort_by`: Champ de tri (created_at, title, etc.)
- `sort_order`: Ordre de tri (asc, desc)

Exemple :
```
GET /api/recipes?search=pasta&category=Italien&difficulty=easy
```

### Détails d'une recette
```
GET /api/recipes/{id}
```

### Créer une recette
```
POST /api/recipes
Content-Type: application/json

{
  "title": "Titre de la recette",
  "description": "Description",
  "ingredients": ["Ingrédient 1", "Ingrédient 2"],
  "instructions": "Instructions détaillées",
  "prep_time": 15,
  "cook_time": 30,
  "servings": 4,
  "difficulty": "medium",
  "category": "Catégorie",
  "image_url": "https://example.com/image.jpg"
}
```

### Modifier une recette
```
PUT /api/recipes/{id}
Content-Type: application/json

{ ... mêmes champs que POST ... }
```

### Supprimer une recette
```
DELETE /api/recipes/{id}
```

### Liste des catégories
```
GET /api/recipes/categories
```

## 🐳 Commandes Docker

### Arrêter l'application
```bash
docker-compose down
```

### Arrêter et supprimer les volumes (réinitialiser la DB)
```bash
docker-compose down -v
```

### Voir les logs
```bash
# Tous les services
docker-compose logs -f

# Un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Redémarrer un service
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Reconstruire un service
```bash
docker-compose build backend
docker-compose up -d backend
```

## 🐛 Dépannage

### Le backend ne démarre pas

1. Vérifier que MySQL est démarré :
   ```bash
   docker-compose ps mysql
   ```

2. Vérifier les logs :
   ```bash
   docker-compose logs backend
   ```

3. Attendre que MySQL soit complètement prêt (healthcheck)

4. Vérifier que le port 8000 n'est pas utilisé :
   ```bash
   lsof -i :8000
   ```

### Le frontend ne démarre pas

1. Vérifier que le port 3000 n'est pas utilisé :
   ```bash
   lsof -i :3000
   ```

2. Vérifier les logs :
   ```bash
   docker-compose logs frontend
   ```

3. Attendre que les dépendances npm soient installées

### Erreurs de connexion à la base de données

1. Vérifier que MySQL est démarré et healthy :
   ```bash
   docker-compose ps mysql
   ```

2. Attendre quelques secondes après le démarrage de MySQL

3. Vérifier les variables d'environnement dans `docker-compose.yml`

4. Réinitialiser la base de données :
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

### Réinitialisation complète

Si vous rencontrez des problèmes persistants :

```bash
# Arrêter tous les conteneurs et supprimer les volumes
docker-compose down -v

# Supprimer les images (optionnel)
docker-compose down --rmi all

# Reconstruire et redémarrer
docker-compose up --build
```

## 📊 Données de Démonstration

L'application est préchargée avec 5 recettes :
1. Spaghetti Carbonara (Italien, Moyen)
2. Salade César (Salade, Facile)
3. Bœuf Bourguignon (Français, Difficile)
4. Tacos Mexicains (Mexicain, Facile)
5. Sushi Rolls (Japonais, Difficile)

## 🎨 Design

L'application utilise un design moderne avec :
- Palette de couleurs dégradée (violet/bleu)
- Cartes avec effet hover
- Interface responsive
- Badges pour la difficulté et les catégories
- Modales pour les formulaires admin

## 📝 Notes Importantes

1. **Premier démarrage**: Peut prendre 5-10 minutes pour installer toutes les dépendances
2. **MySQL**: Attendez que le healthcheck soit vert avant que le backend ne se connecte
3. **Hot Reload**: Les modifications du code sont automatiquement rechargées grâce aux volumes Docker
4. **Données**: Les données sont persistantes grâce au volume Docker `mysql_data`

## 🔐 Sécurité

Pour la production, pensez à :
- Changer les mots de passe par défaut
- Configurer HTTPS
- Ajouter une authentification pour le dashboard admin
- Valider et sanitizer toutes les entrées utilisateur
- Configurer CORS de manière plus restrictive

## 📚 Ressources

- [Documentation Laravel](https://laravel.com/docs)
- [Documentation React](https://react.dev)
- [Documentation Docker](https://docs.docker.com)

---

**Bon développement ! 🍳**

