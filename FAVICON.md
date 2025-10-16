# Favicon Configuration

## Fichiers créés

### `/public/favicon.svg`
Favicon principal au format SVG (64x64px). Icône de marteau sur fond vert (#7ED957) pour représenter la construction en bois.

### `/public/favicon.ico`
Favicon de fallback au format ICO (32x32px) pour les navigateurs plus anciens.

### `/public/apple-touch-icon.png`
Icône pour les appareils Apple (180x180px) avec un design détaillé du marteau.

## Intégration HTML

Les favicons sont déclarés dans `index.html` :

```html
<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## Design

- **Symbole** : Marteau (outil de construction)
- **Couleur principale** : Vert #7ED957 (couleur de la marque)
- **Couleur secondaire** : Brun #8B4513 (manche du marteau)
- **Détails** : Tête métallique grise/noire avec effets de brillance

## Compatibilité

- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge) : SVG
- ✅ Navigateurs anciens (IE) : ICO
- ✅ Appareils iOS : Apple Touch Icon
- ✅ PWA et applications web

## Déploiement

Les fichiers sont placés dans `/public/` et seront automatiquement déployés avec l'application.
Le favicon sera visible à l'URL : `https://boysakconstructionbois.fr/favicon.svg`
