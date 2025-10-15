# Configuration Admin Firebase Authentication

## 📝 Instructions de configuration (À SUIVRE DANS L'ORDRE)

### Étape 1 : Activer Firebase Authentication

1. Allez dans la console Firebase : https://console.firebase.google.com/
2. Sélectionnez votre projet `boysakconstructionbois-4ddb8`
3. Dans le menu latéral gauche, cliquez sur **"Authentication"** (🔐 Authentification)
4. Si c'est la première fois, cliquez sur **"Get started"** (Commencer)
5. Dans l'onglet **"Sign-in method"** (Méthodes de connexion), trouvez **"Email/Password"**
6. Cliquez sur la ligne **"Email/Password"**
7. **⚠️ IMPORTANT** : Activez le premier interrupteur "Enable" (Activer)
   - NE PAS activer "Email link (passwordless sign-in)"
   - Juste le premier interrupteur en haut
8. Cliquez sur **"Save"** (Enregistrer)
9. ✅ Vérifiez que le statut indique "Enabled" (Activé) en vert

---

### Étape 2 : Activer Firebase Storage

1. Dans la console Firebase, cliquez sur **"Storage"** (📦) dans le menu latéral
2. Cliquez sur **"Get started"** (Commencer)
3. Dans la popup, cliquez sur **"Next"** (Suivant) - gardez les règles par défaut pour l'instant
4. Sélectionnez votre région : **"europe-west"** (ou europe-west1)
5. Cliquez sur **"Done"** (Terminé)
6. Attendez que le Storage soit créé (quelques secondes)
7. Une fois créé, allez dans l'onglet **"Rules"** (Règles)
8. **Remplacez tout le contenu** par ces règles :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

9. Cliquez sur **"Publish"** (Publier)
10. ✅ Vérifiez que les règles sont bien publiées

---

### Étape 3 : Créer un utilisateur admin

1. Retournez dans **"Authentication"** (menu latéral)
2. Cliquez sur l'onglet **"Users"** (Utilisateurs) en haut
3. Cliquez sur **"Add user"** (Ajouter un utilisateur)
4. Dans la popup, entrez :
   - **Email** : `admin@boysakconstructionbois.com` (ou votre email)
   - **Password** : Choisissez un mot de passe **fort** (minimum 6 caractères)
     - Exemple : `BCB2024Secure!`
5. Cliquez sur **"Add user"** (Ajouter un utilisateur)
6. ✅ Vérifiez que l'utilisateur apparaît dans la liste avec son email et un UID

---

### Étape 4 : Configurer Realtime Database (si pas encore fait)

1. Dans la console Firebase, cliquez sur **"Realtime Database"** dans le menu latéral
2. Si ce n'est pas encore créé, cliquez sur **"Create Database"**
3. Sélectionnez votre région (même que Storage)
4. Choisissez "Start in **locked mode**" puis "Enable"
5. Allez dans l'onglet **"Rules"** (Règles)
6. **Remplacez tout le contenu** par :

```json
{
  "rules": {
    "galleryProjects": {
      ".read": true,
      ".write": "auth != null"
    },
    "contactMessages": {
      ".read": "auth != null",
      ".write": true
    }
  }
}
```

7. Cliquez sur **"Publish"** (Publier)
8. ✅ Vérifiez que les règles sont publiées

---

### Étape 5 : Tester la connexion

1. Allez sur `http://localhost:5173/#/admin`
2. Entrez l'email et le mot de passe créés à l'étape 3
3. Cliquez sur "Se connecter"
4. ✅ Vous devriez être connecté et voir le panneau d'administration

---

## 🔍 Résolution des problèmes

### Erreur : "Email ou mot de passe incorrect"

- ✅ Vérifiez que Email/Password est **Enabled** dans Authentication > Sign-in method
- ✅ Vérifiez que l'utilisateur existe dans Authentication > Users
- ✅ Essayez de réinitialiser le mot de passe de l'utilisateur dans la console
- ✅ Assurez-vous d'utiliser le bon email (celui affiché dans Users)

### Erreur : "CORS policy" ou "ERR_FAILED" lors de l'upload

- ✅ Vérifiez que Storage est bien créé et accessible
- ✅ Vérifiez que les règles Storage sont publiées (étape 2)
- ✅ Reconnectez-vous pour rafraîchir le token d'authentification
- ✅ Videz le cache du navigateur (Ctrl+Shift+Del)

### Erreur : "Permission denied" dans Database

- ✅ Vérifiez que les règles Realtime Database sont publiées (étape 4)
- ✅ Vérifiez que vous êtes bien connecté (étape 5)

---

## 📋 Checklist finale

Avant de commencer à utiliser l'admin, vérifiez :

- [ ] ✅ Firebase Authentication est activé
- [ ] ✅ Email/Password est **Enabled** (statut vert)
- [ ] ✅ Firebase Storage est créé avec les bonnes règles
- [ ] ✅ Un utilisateur admin existe dans Authentication > Users
- [ ] ✅ Realtime Database est configuré avec les bonnes règles
- [ ] ✅ Vous pouvez vous connecter sur `/#/admin`
- [ ] ✅ Vous pouvez uploader une image de test

---

## 🔐 Sécurité

### Avantages de Firebase Auth :

- ✅ Mots de passe hashés automatiquement
- ✅ Gestion de session sécurisée
- ✅ Possibilité d'ajouter plusieurs admins
- ✅ Support de la réinitialisation de mot de passe
- ✅ Logs d'authentification disponibles

### Bonnes pratiques :

- 🔒 Utilisez un mot de passe fort (min. 12 caractères, majuscules, chiffres, symboles)
- 🔒 Ne partagez jamais vos identifiants
- 🔒 Changez le mot de passe régulièrement
- 🔒 Activez la vérification en 2 étapes si disponible
- 🔒 Vérifiez les logs d'authentification régulièrement

---

## 🎯 Fonctionnalités disponibles

Une fois connecté, vous pourrez :

- ✅ Uploader des images de projets
- ✅ Ajouter des descriptions personnalisées
- ✅ Définir la localisation (Nord, Lille, etc.)
- ✅ Voir tous les projets existants
- ✅ Supprimer des projets
- ✅ Les changements sont visibles en temps réel sur le site

---

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez la checklist ci-dessus
2. Consultez la section "Résolution des problèmes"
3. Vérifiez les logs dans la console du navigateur (F12)
4. Vérifiez les logs Firebase dans la console Firebase

---

**Dernière mise à jour** : Octobre 2025
