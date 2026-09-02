/**
 * Fonction Cloudflare Pages — POST /api/contact
 * Reçoit le formulaire de devis et l'envoie par courriel via Resend.
 *
 * Variables à définir dans Cloudflare → projet Pages → Settings → Variables and secrets
 * (environnement Production) :
 *   RESEND_API_KEY   (secret)  clé API Resend — nouvelle clé dédiée à ce site
 *   DESTINATAIRE     (texte)   adresse qui reçoit les demandes, ex. jonas@jonasmionnet.com
 *   EXPEDITEUR       (texte)   ex. "Assistant documentaire <site@jonasmionnet.com>"
 *                              le domaine après @ doit être vérifié dans Resend
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });

  let d;
  try {
    d = await request.json();
  } catch {
    return json({ success: false, error: "Corps invalide" }, 400);
  }

  const champ = (k, max = 500) => String(d[k] ?? "").trim().slice(0, max);
  const nom = champ("nom", 120);
  const entreprise = champ("entreprise", 120);
  const email = champ("email", 200);
  const site = champ("site", 200);
  const objet = champ("objet", 120);
  const message = champ("message", 4000);

  // Piège à robots : champ caché rempli = on répond OK sans rien envoyer.
  if (champ("_gotcha")) return json({ success: true });

  if (!nom || !entreprise || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json({ success: false, error: "Champs manquants" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ success: false, error: "Service non configuré" }, 503);
  }

  const destinataire = env.DESTINATAIRE || "jonas@jonasmionnet.com";
  const expediteur = env.EXPEDITEUR || "Assistant documentaire <site@jonasmionnet.com>";

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ligne = (k, v) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${esc(v || "—")}</td></tr>`;

  const html = `
    <p>Nouvelle demande depuis assistant-documentaire.com</p>
    <table style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">
      ${ligne("Entreprise", entreprise)}
      ${ligne("Contact", nom)}
      ${ligne("Courriel", email)}
      ${ligne("Site", site)}
      ${ligne("Demande", objet)}
    </table>
    <p style="font:14px/1.5 system-ui,sans-serif"><strong>Ce que leurs équipes cherchent le plus souvent :</strong><br>${esc(message || "—").replace(/\n/g, "<br>")}</p>`;

  const texte = [
    `Entreprise : ${entreprise}`, `Contact    : ${nom}`, `Courriel   : ${email}`,
    `Site       : ${site || "—"}`, `Demande    : ${objet || "—"}`, "",
    "Ce que leurs équipes cherchent le plus souvent :", message || "—",
  ].join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: expediteur,
      to: [destinataire],
      reply_to: email,
      subject: `Demande de devis — ${entreprise}`,
      html,
      text: texte,
    }),
  });

  if (!r.ok) {
    const err = await r.text().catch(() => "");
    console.error("Resend a refusé l'envoi :", r.status, err);
    return json({ success: false, error: "Envoi refusé" }, 502);
  }
  return json({ success: true });
}

// Toute autre méthode : 405.
export function onRequest() {
  return new Response("Méthode non autorisée", { status: 405, headers: { Allow: "POST" } });
}
