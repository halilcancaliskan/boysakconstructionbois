# Configuration du Domaine Personnalisé - boysakconstructionbois.fr

## ✅ Changements effectués

Toutes les URL ont été mises à jour de `https://boysakconstructionbois.vercel.app/` vers `https://boysakconstructionbois.fr/`

### Fichiers modifiés :
1. ✅ `index.html` - Meta tags Open Graph et Twitter
2. ✅ `src/SEOSchema.tsx` - Schema.org JSON-LD
3. ✅ `public/sitemap.xml` - URLs du sitemap
4. ✅ `public/robots.txt` - URL du sitemap
5. ✅ `FAVICON.md` - Documentation
6. ✅ `vercel.json` - Configuration des redirections

## Configuration Vercel

### 1. Ajouter le domaine dans Vercel

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `boysakconstructionbois`
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **Add Domain**
5. Entrez : `boysakconstructionbois.fr`
6. Cliquez sur **Add**

### 2. Configuration DNS

Vercel va vous demander de configurer vos enregistrements DNS. Ajoutez ces enregistrements chez votre registrar (OVH, Gandi, etc.) :

#### Option A : Avec sous-domaine www

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Option B : Sans sous-domaine www

```
Type: A
Name: @
Value: 76.76.21.21
```

### 3. Activer HTTPS

Vercel va automatiquement :
- ✅ Générer un certificat SSL Let's Encrypt
- ✅ Activer HTTPS
- ✅ Rediriger HTTP vers HTTPS

**Délai :** 24-48h pour la propagation DNS

## Configuration avec www

Si vous souhaitez que `www.boysakconstructionbois.fr` redirige vers `boysakconstructionbois.fr` :

1. Ajoutez `www.boysakconstructionbois.fr` comme domaine dans Vercel
2. Vercel créera automatiquement une redirection 301

## Vérification

Une fois configuré, testez :

1. **Principal** : https://boysakconstructionbois.fr
2. **Avec www** : https://www.boysakconstructionbois.fr (devrait rediriger)
3. **Ancien domaine** : https://boysakconstructionbois-8k8v.vercel.app (devrait rediriger)

## Fichier vercel.json

Le fichier `vercel.json` contient :
- ✅ Redirection automatique de l'ancien domaine Vercel vers le nouveau domaine
- ✅ En-têtes de sécurité (HSTS, XSS Protection, etc.)

## Test SEO

Après le déploiement, vérifiez :

1. **Google Search Console**
   - Ajoutez la propriété `https://boysakconstructionbois.fr`
   - Soumettez le sitemap : `https://boysakconstructionbois.fr/sitemap.xml`

2. **Robots.txt**
   - Vérifiez : `https://boysakconstructionbois.fr/robots.txt`

3. **Sitemap.xml**
   - Vérifiez : `https://boysakconstructionbois.fr/sitemap.xml`

4. **Open Graph**
   - Testez avec [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - URL : `https://boysakconstructionbois.fr`

5. **Twitter Cards**
   - Testez avec [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Commandes Git

Pour déployer les changements :

```bash
git add .
git commit -m "Update domain to boysakconstructionbois.fr"
git push origin main
```

Vercel va automatiquement déployer les changements.

## Support

Si vous rencontrez des problèmes :
- 📧 Support Vercel : https://vercel.com/support
- 📚 Documentation : https://vercel.com/docs/concepts/projects/custom-domains

---

**Dernière mise à jour :** Octobre 2025
