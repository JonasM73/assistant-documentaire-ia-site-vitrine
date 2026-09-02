# Site vitrine — assistant-documentaire.com

Site statique (aucun build), dépôt **séparé** de la solution (`rag-demo`).
Déployé sur **Cloudflare Pages**, branché sur ce dépôt GitHub : chaque `git push`
sur `main` redéploie le site.

## Mise en place (une fois)

1. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → ce dépôt, branche `main`.
2. Réglages : Framework preset **None**, Build command *(vide)*, Build output directory **`/`**.
3. Save and Deploy → vérifier `<projet>.pages.dev` : `index.html`, `simulation.html`,
   `mentions-legales.html`, `partage.png`.
4. **Custom domains** → ajouter `assistant-documentaire.com` et `www.assistant-documentaire.com`
   (domaine chez Cloudflare : les DNS se créent seuls).

## Ensuite

`git add . && git commit -m "site : ..." && git push` — c'est tout.

## Reste à faire

- Clé Web3Forms dans `formulaire.js` (voir l'en-tête du fichier) ; sans clé le formulaire ouvre le client mail.
- `portrait.jpg` à déposer à la racine pour le bloc « Qui construit ».
- L'adresse `jonas@jonasmionnet.com` reste valable (domaine du portfolio).
- `_headers` : en-têtes de sécurité et de cache, lus automatiquement par Pages.
