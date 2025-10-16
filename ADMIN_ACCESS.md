# Accès à la Page Admin

## 🔑 URL d'accès

### En production
- ✅ **URL correcte** : `https://boysakconstructionbois.fr/#/admin`
- ✅ **URL alternative** : `https://boysakconstructionbois.fr/admin` (redirige vers `/#/admin`)

### En développement local
- ✅ **URL** : `http://localhost:5173/#/admin`

## ⚠️ Erreur 404 : NOT_FOUND

Si vous obtenez une erreur 404, c'est que vous utilisez `/admin` sans le hash `#`.

### Solution
Utilisez toujours l'URL avec le hash : `/#/admin`

## 🔧 Configuration Vercel

Le fichier `vercel.json` contient :

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/#/admin",
      "permanent": false
    }
  ]
}
```

### Explications
- **rewrites** : Tous les chemins sont redirigés vers `index.html` (SPA)
- **redirects** : `/admin` redirige automatiquement vers `/#/admin`

## 🚀 Déploiement

Après modification du `vercel.json` :

```bash
git add vercel.json
git commit -m "Fix admin route configuration"
git push origin main
```

Vercel redéploiera automatiquement.

## 📱 Liens de navigation

### Dans l'application
- Depuis le site → Ajouter `#/admin` à l'URL
- Depuis l'admin → Clic sur "Retour au site"

### Bookmarks recommandés
Ajoutez ces favoris dans votre navigateur :
- 🏠 Site principal : `https://boysakconstructionbois.fr/`
- 🔐 Admin : `https://boysakconstructionbois.fr/#/admin`

## 🔒 Authentification

Une fois sur la page admin :
1. Entrez votre email Firebase
2. Entrez votre mot de passe
3. Cliquez sur "Se connecter"

## 📝 Notes techniques

### Pourquoi le hash (#) ?
L'application utilise le hash routing React :
- `main.tsx` vérifie `window.location.hash`
- Si hash === `#/admin` → affiche `<Admin />`
- Sinon → affiche `<App />`

### Architecture
```
URL: https://boysakconstructionbois.fr/#/admin
     └── domaine                         └── hash
```

Le serveur voit uniquement `https://boysakconstructionbois.fr/`
Le navigateur traite le hash `#/admin` côté client

## ✅ Vérification

Testez ces URLs :
- ✅ https://boysakconstructionbois.fr/ → Site principal
- ✅ https://boysakconstructionbois.fr/#/admin → Page admin
- ✅ https://boysakconstructionbois.fr/admin → Redirige vers `/#/admin`

---

**Dernière mise à jour :** Octobre 2025
