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

- **Formulaire de contact** : `functions/api/contact.js` (Pages Function) envoie via Resend.
  Dans Cloudflare → projet Pages → Settings → Variables and secrets (Production), définir :
  `RESEND_API_KEY` (secret, clé dédiée à ce site), `DESTINATAIRE` (ex. jonas@jonasmionnet.com),
  `EXPEDITEUR` (ex. `Assistant documentaire <site@jonasmionnet.com>` — domaine vérifié dans Resend).
  Redéployer après (Deployments → Retry). Sans clé, le formulaire ouvre le client mail du visiteur.
- `portrait.jpg` à déposer à la racine pour le bloc « Qui construit ».
- L'adresse `jonas@jonasmionnet.com` reste valable (domaine du portfolio).
- `_headers` : en-têtes de sécurité et de cache, lus automatiquement par Pages.
