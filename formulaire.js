/* =========================================================================
   formulaire.js — envoi des demandes de devis via la fonction /api/contact
   (Cloudflare Pages Function → Resend). Aucune clé dans ce fichier : la clé
   Resend est un secret du projet Pages (Settings → Variables and secrets).

   Si la fonction répond en erreur (clé absente, panne), le formulaire ouvre
   le logiciel de messagerie du visiteur avec un message déjà rédigé : la
   demande arrive quand même.
   ========================================================================= */
(function () {
  "use strict";

  var DESTINATAIRE = "jonas@jonasmionnet.com";
  var ENDPOINT = "/api/contact";

  var form = document.getElementById("devis-form");
  if (!form) return;
  var etat = document.getElementById("f-etat");
  var bouton = form.querySelector('button[type=submit]');
  var libelle = bouton ? bouton.querySelector("span") : null;
  var libelleInitial = libelle ? libelle.textContent : "";

  function dire(texte, classe) {
    if (!etat) return;
    etat.textContent = texte;
    etat.className = "form__etat" + (classe ? " " + classe : "");
  }

  function valeur(nom) {
    var el = form.elements[nom];
    return el && el.value ? el.value.trim() : "";
  }

  function emailValide(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  function corpsLisible() {
    var l = [
      "Entreprise : " + valeur("entreprise"),
      "Contact    : " + valeur("nom"),
      "Courriel   : " + valeur("email"),
      "Site       : " + (valeur("site") || "—"),
      "Demande    : " + valeur("objet"),
      "",
      "Ce que leurs équipes cherchent le plus souvent :",
      valeur("message") || "—"
    ];
    return l.join("\n");
  }

  function replieVersMessagerie() {
    var sujet = "Demande de devis — " + (valeur("entreprise") || "assistant documentaire");
    var url = "mailto:" + DESTINATAIRE
      + "?subject=" + encodeURIComponent(sujet)
      + "&body=" + encodeURIComponent("Bonjour Jonas,\n\n" + corpsLisible() + "\n\nMerci.");
    window.location.href = url;
    dire("Votre logiciel de messagerie s'ouvre avec le message déjà rédigé. "
      + "Il ne reste qu'à l'envoyer. S'il ne s'ouvre pas, écrivez directement à "
      + DESTINATAIRE + ".", "ok");
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    /* piège à robots : rempli = on fait semblant d'accepter et on s'arrête */
    if (valeur("_gotcha")) { dire("Merci, votre demande est bien partie.", "ok"); return; }

    if (!valeur("nom") || !valeur("entreprise")) {
      dire("Il me manque votre nom et celui de votre entreprise.", "ko");
      (form.elements.nom.value ? form.elements.entreprise : form.elements.nom).focus();
      return;
    }
    if (!emailValide(valeur("email"))) {
      dire("Cette adresse électronique ne semble pas valide — je ne pourrais pas vous répondre.", "ko");
      form.elements.email.focus();
      return;
    }

    if (bouton) { bouton.disabled = true; }
    if (libelle) { libelle.textContent = "Envoi en cours…"; }
    dire("Envoi en cours…");

    var charge = {
      nom: valeur("nom"),
      entreprise: valeur("entreprise"),
      email: valeur("email"),
      site: valeur("site"),
      objet: valeur("objet"),
      message: valeur("message"),
      _gotcha: valeur("_gotcha")
    };

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(charge)
    })
      .then(function (r) { return r.json().catch(function () { return { success: r.ok }; }); })
      .then(function (d) {
        if (d && d.success) {
          form.reset();
          dire("C'est envoyé. Je vous réponds sous 48 h, souvent bien avant.", "ok");
        } else {
          if (window.console) { console.error("Formulaire : réponse de /api/contact", d); }
          dire("L'envoi a échoué. Je bascule sur votre messagerie…", "ko");
          setTimeout(replieVersMessagerie, 900);
        }
      })
      .catch(function (e) {
        if (window.console) { console.error("Formulaire : échec réseau", e); }
        dire("L'envoi a échoué. Je bascule sur votre messagerie…", "ko");
        setTimeout(replieVersMessagerie, 900);
      })
      .then(function () {
        if (bouton) { bouton.disabled = false; }
        if (libelle) { libelle.textContent = libelleInitial; }
      });
  });
})();
