# 🚨 Guide Urgent : Créer le Preset Cloudinary Unsigned

## ⚠️ ERREUR ACTUELLE
```
Upload preset not found
```

Cela signifie que le preset `bcb_gallery` n'existe PAS dans votre compte Cloudinary ou n'est PAS en mode "Unsigned".

---

## 📋 CHECKLIST - Suivez ces étapes EXACTEMENT

### ✅ Étape 1 : Ouvrir Cloudinary Console

1. **Ouvrez ce lien** : https://console.cloudinary.com/
2. **Connectez-vous** avec votre compte

---

### ✅ Étape 2 : Accéder aux Paramètres d'Upload

1. En haut à droite, cliquez sur l'icône **⚙️ (Settings)**
2. Dans le menu déroulant, cliquez sur **"Upload"**

📍 Vous devriez voir cette page :
```
Settings > Upload
┌─────────────────────────────────────┐
│ Upload presets                       │
│ Add upload preset [+]               │
└─────────────────────────────────────┘
```

---

### ✅ Étape 3 : Ajouter un Nouveau Preset

1. Cliquez sur **"Add upload preset"**
2. Une nouvelle page s'ouvre

---

### ✅ Étape 4 : Configuration CRITIQUE ⚠️

Remplissez **EXACTEMENT** comme suit :

#### 🔴 Section 1 : "Preset settings"

```
Upload preset name:  bcb_gallery
Signing Mode:        Unsigned  ← ⚠️ TRÈS IMPORTANT !
```

**ATTENTION** : Le menu "Signing Mode" a 2 options :
- ❌ Signed (NE PAS choisir)
- ✅ **Unsigned** (CHOISIR CELUI-CI)

#### 🟢 Section 2 : "Storage and access"

```
Folder:              gallery
Use filename:        ☑ (coché)
Unique filename:     ☑ (coché)
```

#### 🟡 Section 3 : "Upload manipulations" (OPTIONNEL)

```
Allowed formats:     jpg,png,jpeg,webp,gif
Max file size:       5000000
Max image width:     4000
Max image height:    4000
```

---

### ✅ Étape 5 : Sauvegarder

1. En haut à droite, cliquez sur **"Save"**
2. Attendez la confirmation "Preset saved successfully"

---

### ✅ Étape 6 : Vérifier que le Preset Existe

1. Restez sur la page "Settings > Upload"
2. Dans la section "Upload presets", vous devriez voir :

```
┌────────────────────────────────────────────┐
│ bcb_gallery               Unsigned    [...] │
└────────────────────────────────────────────┘
                           ↑
                    Doit dire "Unsigned"
```

---

### ✅ Étape 7 : Redémarrer le Serveur

**Dans votre terminal :**

```bash
# Arrêtez le serveur avec Ctrl+C
# Puis relancez :
npm run dev
```

---

### ✅ Étape 8 : Tester l'Upload

1. Allez sur `http://localhost:5173/#/admin`
2. Connectez-vous
3. Uploadez une image de test
4. ✅ **Ça devrait fonctionner !**

---

## 🔍 Comment Vérifier si le Preset est Bien Créé

### Méthode 1 : Via l'Interface

1. Cloudinary Console → Settings → Upload
2. Cherchez `bcb_gallery` dans la liste
3. Vérifiez qu'il est marqué **"Unsigned"**

### Méthode 2 : Via l'API (Test rapide)

Ouvrez ce lien dans votre navigateur (remplacez votre cloud name) :

```
https://res.cloudinary.com/ddqajhsrd/image/list.json
```

Si ça renvoie des données JSON, votre compte est bien configuré.

---

## ❌ Erreurs Courantes

### Erreur : "Upload preset not found"
**Cause** : Le preset n'existe pas
**Solution** : Créez-le en suivant les étapes ci-dessus

### Erreur : "Invalid signature"
**Cause** : Le preset est en mode "Signed" au lieu de "Unsigned"
**Solution** : 
1. Allez dans Settings → Upload
2. Cliquez sur votre preset `bcb_gallery`
3. Changez "Signing Mode" de "Signed" à "Unsigned"
4. Sauvegardez

### Erreur : "Unauthorized"
**Cause** : Problème avec le cloud name
**Solution** : Vérifiez que `VITE_CLOUDINARY_CLOUD_NAME=ddqajhsrd` dans `.env`

---

## 📞 Aide Supplémentaire

Si après avoir suivi TOUTES ces étapes, ça ne fonctionne toujours pas :

1. **Vérifiez la console du navigateur** (F12)
2. Regardez l'erreur exacte dans l'onglet "Console"
3. Copiez-collez l'erreur complète

---

## ✅ Confirmation Visuelle

Une fois le preset créé, vous devriez voir dans Cloudinary Console :

```
Settings > Upload > Upload presets

┌─────────────────────────────────────────────────────┐
│ Name          Signing Mode    Actions               │
├─────────────────────────────────────────────────────┤
│ bcb_gallery   Unsigned        [Edit] [Delete]       │
└─────────────────────────────────────────────────────┘
```

**Le mot "Unsigned" DOIT être visible à côté de votre preset.**

---

## 🎯 Résumé en 3 points

1. ⚙️ **Cloudinary Console** → Settings → Upload → Add upload preset
2. 📝 **Configurez** : Name = `bcb_gallery`, Signing Mode = **Unsigned**, Folder = `gallery`
3. 💾 **Sauvegardez** et redémarrez votre serveur

**C'est tout ! Maintenant créez ce preset et testez.** 🚀
