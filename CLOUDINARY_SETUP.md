# Configuration Cloudinary pour l'hébergement d'images

## 📝 Pourquoi Cloudinary ?

Cloudinary est un service d'hébergement d'images externe offrant :
- ✅ **15 GB de stockage gratuit** (largement suffisant)
- ✅ **Transformation d'images automatique** (redimensionnement, optimisation)
- ✅ **CDN mondial** (chargement rapide partout)
- ✅ **Pas de problèmes CORS**
- ✅ **Interface simple** pour gérer les images
- ✅ **Aucune carte bancaire requise** pour le plan gratuit

---

## 🚀 Configuration en 5 minutes

### Étape 1 : Créer un compte Cloudinary (GRATUIT)

1. Allez sur : https://cloudinary.com/users/register/free
2. Inscrivez-vous avec votre email (ou via Google/GitHub)
3. Confirmez votre email
4. ✅ Vous êtes connecté au dashboard Cloudinary

---

### Étape 2 : Récupérer votre Cloud Name

1. Sur le dashboard Cloudinary, vous verrez en haut votre **Cloud Name**
2. Exemple : `dxyz1234abc`
3. Copiez-le, vous en aurez besoin

---

### Étape 3 : Créer un Upload Preset (unsigned)

1. Dans le menu de gauche, cliquez sur **"Settings"** (⚙️ Paramètres)
2. Allez dans l'onglet **"Upload"**
3. Descendez jusqu'à **"Upload presets"**
4. Cliquez sur **"Add upload preset"**
5. Configurez :
   - **Signing Mode** : Sélectionnez **"Unsigned"** ⚠️ IMPORTANT
   - **Upload preset name** : Tapez `bcb_gallery` (ou votre choix)
   - **Folder** : Tapez `gallery` (pour organiser vos images)
6. Cliquez sur **"Save"**
7. ✅ Notez le nom de votre preset (exemple : `bcb_gallery`)

---

### Étape 4 : Configurer les variables d'environnement

1. Ouvrez le fichier `.env` à la racine du projet
2. Ajoutez/modifiez ces deux lignes :

```bash
VITE_CLOUDINARY_CLOUD_NAME=votre_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=bcb_gallery
```

Exemple réel :
```bash
VITE_CLOUDINARY_CLOUD_NAME=dxyz1234abc
VITE_CLOUDINARY_UPLOAD_PRESET=bcb_gallery
```

3. **Sauvegardez** le fichier `.env`

---

### Étape 5 : Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez-le
npm run dev
```

---

## ✅ Tester l'upload

1. Allez sur `http://localhost:5173/#/admin`
2. Connectez-vous avec vos identifiants Firebase
3. Uploadez une image de test
4. ✅ L'image devrait être uploadée sur Cloudinary
5. Vérifiez dans le dashboard Cloudinary → **Media Library** → dossier `gallery`

---

## 🔍 Vérification

### Dans Cloudinary Dashboard :

1. Allez dans **Media Library** (menu de gauche)
2. Cliquez sur le dossier **"gallery"**
3. Vous devriez voir vos images uploadées
4. Chaque image a une URL publique automatique

---

## 🎯 Avantages vs Firebase Storage

| Critère | Cloudinary | Firebase Storage |
|---------|-----------|------------------|
| Stockage gratuit | 15 GB | 5 GB |
| Setup | 5 minutes | Complex (CORS issues) |
| Transformations | ✅ Automatique | ❌ Manuel |
| CDN | ✅ Inclus | ✅ Inclus |
| Interface | ✅ Très simple | ⚠️ Complexe |
| Carte bancaire | ❌ Pas requise | ⚠️ Parfois demandée |

---

## 🔐 Sécurité

### Upload Preset "Unsigned"

- Permet l'upload **sans clé API** dans le code client
- **Sécurisé** car contrôlé par le preset
- Vous pouvez limiter :
  - Types de fichiers (images uniquement)
  - Taille maximale
  - Dimensions
  - Etc.

### Pour renforcer la sécurité (optionnel) :

1. Dans Settings → Upload → votre preset
2. Activez :
   - **"Allowed formats"** : jpg, png, webp, gif
   - **"Max file size"** : 5 MB
   - **"Max image dimensions"** : 4000 x 4000

---

## 📋 Résolution des problèmes

### Erreur : "Unauthorized" lors de l'upload

- ✅ Vérifiez que le **Signing Mode** est bien sur **"Unsigned"**
- ✅ Vérifiez le nom de votre **upload_preset** dans `.env`
- ✅ Redémarrez le serveur après modification du `.env`

### Erreur : "Invalid cloud name"

- ✅ Vérifiez votre **VITE_CLOUDINARY_CLOUD_NAME** dans `.env`
- ✅ Pas d'espaces, pas de caractères spéciaux
- ✅ Redémarrez le serveur

### Les images ne s'affichent pas

- ✅ Vérifiez que l'URL commence par `https://res.cloudinary.com/`
- ✅ Ouvrez l'URL directement dans le navigateur
- ✅ Vérifiez les logs de la console (F12)

---

## 🗂️ Gestion des images

### Voir toutes vos images :

1. Dashboard Cloudinary → **Media Library**
2. Dossier **"gallery"**
3. Vous pouvez :
   - Télécharger les images
   - Les supprimer manuellement
   - Voir les statistiques d'utilisation
   - Copier les URLs publiques

### Supprimer des images :

- Quand vous supprimez un projet dans l'admin, l'image reste sur Cloudinary
- Vous pouvez les supprimer manuellement depuis le dashboard
- Dans le plan gratuit, vous avez 15 GB, donc pas besoin de les supprimer souvent

---

## 💡 Conseils

1. **Optimisez vos images avant l'upload** :
   - Format recommandé : JPEG ou WebP
   - Taille : < 2 MB
   - Dimensions : < 2000x2000 px

2. **Organisez vos dossiers** :
   - Utilisez des presets différents pour différents types d'images
   - Exemple : `gallery`, `portfolio`, `blog`, etc.

3. **Surveillez votre quota** :
   - Dashboard → Usage
   - 15 GB = environ 5000 images HD

---

## 🔗 Liens utiles

- Dashboard Cloudinary : https://cloudinary.com/console
- Documentation : https://cloudinary.com/documentation
- Exemples de transformations : https://cloudinary.com/documentation/image_transformations

---

**Dernière mise à jour** : Octobre 2025

✅ **Configuration terminée ? Testez l'upload dans l'admin !**
