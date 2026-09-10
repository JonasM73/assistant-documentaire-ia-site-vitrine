# Site vitrine — projet lié à l'assistant documentaire

Projet personnel. Le site marchand conçu pour présenter une offre de service
autour de l'[assistant documentaire](https://github.com/JonasM73/assistant-documentaire-ia).
Site statique, sans framework et sans étape de build, déployé sur Cloudflare
Pages. **Il n'est plus en ligne** : l'offre commerciale a été arrêtée, le dépôt
est conservé comme travail de conception web et éditorial.

---

## Ce qu'il y avait à résoudre

Vendre un service technique à des dirigeants de PME qui n'ont ni le temps ni
l'envie de comprendre la technique. Trois contraintes : dire le prix
franchement plutôt que le cacher derrière un formulaire, expliquer un système
d'IA sans jargon, et rendre crédible une promesse — « il refuse quand il ne
sait pas » — qui ne se démontre pas avec un argument mais avec une méthode.

## Ce que le site fait

Une page d'accueil qui pose le prix dès le premier écran, montre deux exemples
de réponse — une réponse sourcée et **un refus** — et annonce ses limites au
lieu de les dissimuler.

Un **simulateur** où le visiteur entre ses propres chiffres : trois curseurs,
un seul résultat, et toutes les hypothèses écrites en clair sous le calcul. Sa
particularité est qu'il peut conclure contre le vendeur — en dessous d'un
certain volume de recherches, la page affiche « à ce volume, je vous dirais de
ne pas l'acheter ». Cette honnêteté était l'argument commercial principal, pas
une concession.

Des pages légales complètes : mentions légales et politique de confidentialité
avec les traitements, leurs bases légales, les destinataires, les durées de
conservation et les voies de recours. Y compris le point que la plupart des
sites d'IA escamotent : héberger une instance en Europe ne suffit pas à rendre
européen l'ensemble du traitement, dès lors que les requêtes partent chez un
fournisseur de modèle.

## Comment c'est fait

HTML, CSS et JavaScript écrits à la main, aucune dépendance de build. Le
système de design — typographie très serrée, surfaces posées par la lumière
plutôt que cernées de bordures, palette émeraude sur fond encre — vit dans une
feuille unique partagée par toutes les pages.

Les animations sont progressives : révélations au défilement, parallaxe,
compteurs, défilement inertiel. Le site reste entièrement lisible sans
JavaScript, et `prefers-reduced-motion` neutralise tout.

Le formulaire de contact passe par une **Pages Function** côté serveur, avec
validation double, piège à robots, échappement des entrées et repli automatique
vers le client mail du visiteur si l'envoi échoue. Aucun secret côté navigateur.

Accessibilité soignée : un seul `h1` par page, hiérarchie de titres respectée,
tous les champs étiquetés, zones dynamiques annoncées, `alt` sur chaque image,
et contrastes vérifiés y compris sur la couleur la plus faible du thème sombre.

## Statut et réutilisation

**Projet personnel, présenté à titre de démonstration.** Le site n'est plus
déployé, le domaine n'est plus renouvelé, et le formulaire n'est plus relié à
aucun service d'envoi. Les prix, délais et conditions qui figurent dans ces
pages sont **caducs** et n'ont plus aucune valeur d'offre.

**Tous droits réservés.** Ce dépôt ne comporte aucune licence : le code et les
textes sont consultables, ils ne sont pas réutilisables.
