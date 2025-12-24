# 📁 Structure des Images

## Organisation des dossiers

```
public/images/
├── icons/          # Icônes et symboles
│   ├── fire.png
│   ├── clock.png
│   ├── heart.png
│   ├── fork.png
│   ├── breakfast.png
│   ├── healthy.png
│   ├── meat.png
│   ├── dessert.png
│   ├── lunch.png
│   ├── chocolate.png
│   ├── chef.png
│   ├── salad.png
│   ├── tomato.png
│   └── herbs.png
├── foods/          # Images de recettes et plats
│   ├── hero-placeholder.jpg
│   ├── recipe-1.jpg
│   ├── recipe-2.jpg
│   ├── recipe-3.jpg
│   ├── instagram-1.jpg
│   ├── instagram-2.jpg
│   └── instagram-3.jpg
└── placeholders/   # Images de remplacement
    └── recipe-placeholder.jpg
```

## Images utilisées dans l'application

### Icônes (`/images/icons/`)
- `fire.png` - Icône feu pour "Hot Recipes"
- `clock.png` - Icône horloge pour le temps
- `heart.png` - Icône cœur pour les favoris
- `fork.png` - Icône fourchette pour les catégories
- `breakfast.png` - Icône petit-déjeuner
- `healthy.png` - Icône healthy
- `meat.png` - Icône viande
- `dessert.png` - Icône dessert
- `lunch.png` - Icône déjeuner
- `chocolate.png` - Icône chocolat
- `chef.png` - Icône chef
- `salad.png` - Icône salade
- `tomato.png` - Icône tomate
- `herbs.png` - Icône herbes

### Images de recettes (`/images/foods/`)
- `hero-placeholder.jpg` - Image pour la section hero
- `recipe-1.jpg` à `recipe-5.jpg` - Images de recettes
- `instagram-1.jpg` à `instagram-4.jpg` - Images pour la section Instagram

## Fallback automatique

L'application utilise automatiquement des emojis si les images ne sont pas trouvées :
- 🔥 pour fire
- ⏱️ pour clock
- ❤️ pour heart
- 🍴 pour fork
- 🍙 pour breakfast
- 🌿 pour healthy
- etc.

## Comment ajouter vos images

1. Placez vos images dans les dossiers appropriés
2. Utilisez des noms de fichiers descriptifs
3. Formats recommandés : PNG pour icônes, JPG pour photos
4. Optimisez les images avant de les ajouter (compression)

## Exemple d'utilisation

Les images sont automatiquement chargées depuis `/images/` et si elles ne sont pas trouvées, l'application utilise des emojis comme fallback.

