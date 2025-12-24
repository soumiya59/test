# 📁 Guide des Images

## Structure des dossiers d'images

L'application utilise deux emplacements pour les images :

### 1. `/public/images/` - Images publiques statiques

**Emplacement :** `frontend/public/images/`

**Usage :** Images accessibles directement via URL
- Logos
- Icônes statiques
- Images de placeholder
- Assets qui ne changent pas

**Accès dans le code :**
```jsx
// Dans JSX
<img src="/images/logo.png" alt="Logo" />

// Dans CSS
background-image: url('/images/background.jpg');
```

**URL finale :** `http://localhost:3000/images/nom-image.jpg`

### 2. `/src/assets/images/` - Images importées dans les composants

**Emplacement :** `frontend/src/assets/images/`

**Usage :** Images importées directement dans les composants React
- Images optimisées par webpack
- Images avec hash pour le cache
- Meilleure gestion des erreurs

**Accès dans le code :**
```jsx
// Import dans le composant
import logoImage from '../assets/images/logo.png';
import heroImage from '../assets/images/hero.jpg';

// Utilisation
<img src={logoImage} alt="Logo" />
```

## Recommandations

### Images publiques (`/public/images/`)
- ✅ Logos et favicons
- ✅ Images de placeholder
- ✅ Assets statiques
- ✅ Images référencées dans le HTML

### Images importées (`/src/assets/images/`)
- ✅ Images utilisées dans les composants React
- ✅ Images qui changent selon l'environnement
- ✅ Images optimisées par webpack
- ✅ Images avec lazy loading

## Exemples d'utilisation

### Exemple 1 : Logo dans le Header
```jsx
// Option 1 : Image publique
<img src="/images/logo.png" alt="Foodieland" />

// Option 2 : Image importée
import logo from '../assets/images/logo.png';
<img src={logo} alt="Foodieland" />
```

### Exemple 2 : Image de recette avec fallback
```jsx
import placeholderImage from '../assets/images/recipe-placeholder.jpg';

<img 
  src={recipe.image_url || placeholderImage} 
  alt={recipe.title}
  onError={(e) => {
    e.target.src = placeholderImage;
  }}
/>
```

### Exemple 3 : Image de background en CSS
```css
.hero-section {
  background-image: url('/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
}
```

## Formats recommandés

- **Photos :** JPG, WebP (meilleure compression)
- **Logos/Icônes :** SVG, PNG (transparence)
- **Illustrations :** SVG, PNG
- **Placeholders :** JPG, PNG

## Optimisation

Pour optimiser les images avant de les ajouter :

1. **Compression :**
   - Utiliser des outils comme TinyPNG, ImageOptim
   - Format WebP pour meilleure compression

2. **Dimensions :**
   - Images hero : 1200x600px max
   - Images de recettes : 800x500px max
   - Thumbnails : 300x300px max

3. **Lazy Loading :**
   ```jsx
   <img 
     src={image} 
     loading="lazy" 
     alt="Description" 
   />
   ```

## Structure recommandée

```
frontend/
├── public/
│   └── images/
│       ├── logo.png
│       ├── favicon.ico
│       └── placeholders/
│           └── recipe-placeholder.jpg
└── src/
    └── assets/
        └── images/
            ├── hero/
            ├── categories/
            └── recipes/
```

## Notes importantes

- Les images dans `/public/images/` sont copiées telles quelles lors du build
- Les images dans `/src/assets/images/` sont optimisées et hashées par webpack
- Utilisez des noms de fichiers descriptifs et en minuscules avec tirets
- Exemple : `chicken-carbonara.jpg` au lieu de `IMG_1234.jpg`

