import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  FileSearch,
  FileText,
  KeyRound,
  Landmark,
  Network,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  Store,
  Stethoscope,
  Warehouse,
  XCircle,
} from "lucide-react";

import { contacts, eur, offre } from "@/data/offre";
import { calculer, ENTREES_PAR_DEFAUT, heures, nb } from "@/lib/simulateur";
import { usePageMeta } from "@/lib/usePageMeta";
import { Aurora, DotGrid, Reveal, RevealItem, SectionHeader, useCanAnimate } from "@/components/ui";
import Slider from "@/components/Slider";
import ContactForm from "@/components/ContactForm";
import DemoAccess from "@/components/DemoAccess";
import { ParallaxBand, ParallaxImage } from "@/components/Parallax";

export default function HomePage() {
  usePageMeta(
    "Assistant IA sur vos documents — réponses sourcées pour PME | Jonas Mionnet",
    `Vos équipes retrouvent la bonne réponse en quelques secondes, dans vos propres documents, source citée. Livré en ${offre.delaiJoursOuvrables} jours ouvrables, ${eur(offre.miseEnPlace)} tout compris.`,
  );

  return (
    <main className="overflow-x-clip">
      <Hero />
      <CostToday />
      <Sectors />
      <BandLecture />
      <Demo />
      <Offer />
      <BandSource />
      <Pricing />
      <Process />
      <Who />
      <Faq />
      <Contact />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const canAnimate = useCanAnimate();
  const spotRef = useRef<HTMLDivElement>(null);

  const moveSpot = (event: React.PointerEvent<HTMLElement>) => {
    const spot = spotRef.current;
    if (!spot || event.pointerType !== "mouse") return;
    const b = event.currentTarget.getBoundingClientRect();
    spot.style.setProperty("--mx", `${event.clientX - b.left}px`);
    spot.style.setProperty("--my", `${event.clientY - b.top}px`);
  };
  const hideSpot = () => spotRef.current?.style.setProperty("--mx", "-9999px");

  const appear = (delay: number) => ({
    initial: canAnimate ? { opacity: 0, y: 16 } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden" onPointerMove={moveSpot} onPointerLeave={hideSpot}>
      <DotGrid className="opacity-70" />
      <div ref={spotRef} aria-hidden className="dot-grid dot-spot pointer-events-none absolute inset-0 -z-10" />
      <Aurora />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-40">
        <div className="min-w-0">
          <motion.p {...appear(0)} className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-2 sm:text-sm">
            Assistant IA sur vos documents · PME · France
          </motion.p>

          <motion.h1 {...appear(0.08)} className="hero-title mt-5 font-display font-bold text-ink">
            Vos équipes perdent des heures à chercher.{" "}
            <span className="text-signal">L'assistant répond en quelques secondes.</span>
          </motion.h1>

          <motion.p {...appear(0.16)} className="mt-6 max-w-xl text-lg leading-8 text-ink-2">
            Branché sur vos procédures, barèmes, catalogues et contrats, il retrouve la réponse,{" "}
            <strong className="font-semibold text-ink">cite le document source</strong> et dit quand l'information n'y est
            pas. Installé sur vos propres comptes en {offre.delaiJoursOuvrables} jours ouvrables, pour{" "}
            <strong className="font-semibold text-ink">{eur(offre.miseEnPlace)}</strong>.
          </motion.p>

          <motion.div {...appear(0.26)} className="hero-actions mt-9 flex flex-wrap gap-3">
            <Link to="/#devis" className="btn-primary group">
              Voir le résultat sur mes documents
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/simulation" className="btn-ghost">
              <Calculator className="h-4 w-4" />
              Calculer ce que ça me rapporte
            </Link>
          </motion.div>

          <motion.ul {...appear(0.36)} className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
            <li className="inline-flex items-center gap-2"><FileSearch className="h-4 w-4 text-accent" aria-hidden />Chaque réponse cite son document</li>
            <li className="inline-flex items-center gap-2"><XCircle className="h-4 w-4 text-accent" aria-hidden />Si l'info n'y est pas, il le dit</li>
            <li className="inline-flex items-center gap-2"><KeyRound className="h-4 w-4 text-accent" aria-hidden />Sur vos comptes — vous gardez les clés</li>
          </motion.ul>
        </div>

        <motion.div
          initial={canAnimate ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}

/** Aperçu du produit — extrait de la démonstration Horizon Immobilier (réseau fictif) */
function ChatMockup() {
  const canAnimate = useCanAnimate();
  const bubble = (delay: number) => ({
    initial: canAnimate ? { opacity: 0, y: 12 } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="glass glass-solid relative overflow-hidden p-5 sm:p-6">
      <div
        aria-hidden
        className="soft-glow pointer-events-none absolute -right-20 -top-24 h-64 w-80 rounded-full"
        style={{ "--glow-color": "rgba(52, 211, 153, 0.22)" } as React.CSSProperties}
      />
      <div className="relative flex items-center justify-between text-xs text-ink-3">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Assistant interne · Horizon Immobilier
        </span>
        <span className="rounded-full border border-white/10 px-2.5 py-1">Démonstration — réseau fictif</span>
      </div>

      <div className="relative mt-5 space-y-3">
        <motion.div {...bubble(0.5)} className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-accent/15 px-4 py-3 text-sm leading-6 text-ink">
          Un appartement part à 320 000 € à Orléans Centre, sous mandat exclusif. Quels honoraires ?
        </motion.div>

        <motion.div {...bubble(1.1)} className="max-w-[92%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-ink-2">
          <p>
            <strong className="text-ink">L'agence d'Orléans Centre est en zone A.</strong> Pour la tranche 250 001 à
            400 000 €, le barème applique 4,5 %. Le mandat exclusif ouvre droit à une remise de 0,5 point : le taux
            retenu est de 4,0 %, soit <strong className="text-ink">12 800 € d'honoraires</strong>.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent-2">
              <FileText className="h-3.5 w-3.5" /> 01_bareme-honoraires-2026.pdf · p. 1
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent-2">
              <FileText className="h-3.5 w-3.5" /> 02_guide-des-mandats.pdf
            </span>
          </div>
        </motion.div>

        <motion.div {...bubble(1.7)} className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-accent/15 px-4 py-3 text-sm leading-6 text-ink">
          Et pour un local commercial à Tours ?
        </motion.div>

        <motion.div {...bubble(2.3)} className="max-w-[92%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-ink-2">
          <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
            <XCircle className="h-4 w-4 text-lime" /> Je ne trouve pas cette information dans vos documents.
          </span>{" "}
          Le barème 2026 ne couvre que les locaux d'habitation et aucune agence de Tours n'y figure. Je préfère ne
          pas deviner.
        </motion.div>
      </div>

      <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-3">
        <span className="caret">Posez votre question</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ce que ça vous coûte aujourd'hui — mini simulateur                  */
/* ------------------------------------------------------------------ */

function CostToday() {
  const [q, setQ] = useState(ENTREES_PAR_DEFAUT.questionsParJour);
  const [min, setMin] = useState(ENTREES_PAR_DEFAUT.minutesParQuestion);
  const [taux, setTaux] = useState(ENTREES_PAR_DEFAUT.coutHoraire);
  const r = useMemo(
    () => calculer({ ...ENTREES_PAR_DEFAUT, questionsParJour: q, minutesParQuestion: min, coutHoraire: taux, partPerdue: 0 }),
    [q, min, taux],
  );

  const pains = [
    {
      icon: <FileSearch className="h-5 w-5" />,
      title: "La réponse dort dans un PDF",
      text: "Que trois personnes savent ouvrir. Les autres demandent, attendent, ou improvisent.",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "La même question revient chaque semaine",
      text: "Et mobilise à chaque fois quelqu'un qui a mieux à faire que de rechercher un tarif.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Le document a changé, la version qui circule non",
      text: "Et c'est un devis à refaire, une réponse client à corriger, une remise oubliée.",
    },
  ];

  return (
    <section id="cout" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeader
          badge="Ce que ça vous coûte aujourd'hui"
          title={
            <>
              La réponse existe déjà. Ce que vous payez, c'est{" "}
              <span className="mark-under">le temps de la trouver</span>.
            </>
          }
          text="Des heures déjà salariées, dispersées en petites recherches que personne ne compte. Trois versions du même barème, la bonne dans un mail, et la réponse qui attend."
        />
        <Reveal delay={0.1}>
          <ParallaxImage
            src="/images/documents-chaos.webp"
            alt="Avant : cinq versions du même document et des points d'interrogation. Après : une réponse, sa source citée."
            width={1400}
            height={1000}
            amount={24}
            className="glass aspect-[7/5] !rounded-[2rem]"
          />
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pains.map((p, i) => (
          <RevealItem key={p.title} index={i}>
            <div className="glass card-line relative h-full p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                {p.icon}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{p.text}</p>
            </div>
          </RevealItem>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div className="glass glass-solid grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">Vos chiffres</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink">Combien d'heures partent en recherche ?</h3>
            <div className="mt-6 space-y-6">
              <Slider label="Questions par jour dont la réponse est écrite quelque part" value={q} min={2} max={60} onChange={setQ} display={`${q}`} />
              <Slider label="Minutes pour retrouver la réponse (interruption comprise)" value={min} min={2} max={30} onChange={setMin} display={`${min} min`} />
              <Slider label="Coût horaire chargé de la personne qui cherche" value={taux} min={18} max={90} onChange={setTaux} display={`${taux} €`} />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-accent/20 bg-accent/[0.06] p-7">
            <div>
              <p className="text-sm text-ink-2">Chaque semaine, vos équipes passent</p>
              <p className="mt-1 font-display text-5xl font-bold text-signal">{heures(r.heuresParSemaine)}</p>
              <p className="mt-1 text-sm text-ink-2">à chercher — soit {nb(Math.round(r.heuresParAn))} h sur l'année.</p>
              <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-2">Ce que ces heures vous coûtent en salaire</dt>
                  <dd className="font-semibold text-ink">{eur(r.coutParAn)} / an</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-2">Temps rendu si l'assistant évite 70 % des recherches</dt>
                  <dd className="font-semibold text-accent-2">{eur(r.gainTemps)} / an</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-2">Ce que l'assistant coûte la première année, au plus haut</dt>
                  <dd className="font-semibold text-ink">{eur(r.coutAn1)}</dd>
                </div>
              </dl>
            </div>
            <Link to="/simulation" className="btn-ghost mt-7 w-full">
              Le calcul complet, avec vos demandes clients
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-ink-3">
          Année de {46} semaines travaillées et de 5 jours ouvrés. Le coût retenu est volontairement le plus élevé :
          mise en place, maintenance facultative et frais techniques compris. Ce sont vos hypothèses, pas une promesse.
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pour qui                                                           */
/* ------------------------------------------------------------------ */

function Sectors() {
  const sectors = [
    { icon: <Building2 className="h-5 w-5" />, name: "Réseaux d'agences immobilières", q: "Quels honoraires pour cette tranche et cette zone ?" },
    { icon: <Network className="h-5 w-5" />, name: "Franchises & réseaux", q: "Que dit le manuel réseau sur ce cas ?" },
    { icon: <Warehouse className="h-5 w-5" />, name: "Distributeurs & négoce", q: "Quelle garantie sur cette référence ?" },
    { icon: <Landmark className="h-5 w-5" />, name: "Cabinets comptables & juridiques", q: "Quel taux s'applique à ce dossier ?" },
    { icon: <Stethoscope className="h-5 w-5" />, name: "Cabinets et cliniques", q: "Que dit notre procédure d'accueil ?" },
    { icon: <Store className="h-5 w-5" />, name: "Commerces & e-commerce", q: "Quelles sont nos conditions de retour ?" },
  ];

  return (
    <section id="pourqui" className="relative overflow-hidden py-24">
      <DotGrid className="opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          badge="Pour qui"
          title="Les entreprises dont les réponses dorment dans des documents."
          text="Un assistant interne d'abord : vos collaborateurs interrogent vos procédures, barèmes, catalogues et contrats. Le même assistant peut ensuite répondre à vos clients, sur votre site, si vous le décidez."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <RevealItem key={s.name} index={i}>
              <div className="glass glow-hover flex h-full items-start gap-4 p-6">
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                  {s.icon}
                </span>
                <div>
                  <h3 className="font-display font-bold text-ink">{s.name}</h3>
                  <p className="mt-1.5 text-sm italic leading-6 text-ink-2">« {s.q} »</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  La démo                                                            */
/* ------------------------------------------------------------------ */

function Demo() {
  const points = [
    {
      icon: <FileSearch className="h-5 w-5" />,
      title: "Réponse sourcée",
      text: "Chaque réponse cite le document dont elle est tirée, ouvrable en un clic. Vos équipes vérifient, elles ne croient pas sur parole.",
    },
    {
      icon: <XCircle className="h-5 w-5" />,
      title: "Refus si l'information manque",
      text: "Quand vos documents ne contiennent pas la réponse, il le dit plutôt que de deviner. C'est vérifié à la livraison, question par question.",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Mise à jour en autonomie",
      text: "Vous ajoutez ou remplacez vos fichiers depuis une page de gestion ; l'assistant suit, sans commande technique ni intervention de ma part.",
    },
  ];

  return (
    <section id="demo" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeader badge="La démo" title="Réponse, source et refus — en deux minutes." text="Une question, la réponse et son document, une question de suivi, puis un refus quand l'information n'existe pas. Rien de plus, rien de caché." />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="glass relative flex aspect-video flex-col justify-end overflow-hidden p-6 sm:p-8">
            <img
              src="/images/appareils.webp"
              alt="L'assistant sur ordinateur et sur téléphone : question, réponse, document cité."
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-top"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-paper via-paper/50 to-transparent" />
            <span className="absolute left-1/2 top-[38%] inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/40 bg-paper/70 text-accent shadow-lg shadow-accent/20 backdrop-blur">
              <PlayCircle className="h-8 w-8" />
            </span>
            <p className="font-display text-xl font-bold text-ink">Vidéo en préparation</p>
            <p className="mt-1.5 max-w-md text-sm leading-6 text-ink-2">
              Démonstration filmée sur le réseau fictif Horizon Immobilier — barème d'honoraires, mandats,
              diagnostics. En attendant, la démonstration sur vos propres documents reste le meilleur moyen de juger.
            </p>
            {/* Une fois la vidéo publiée : remplacer ce bloc par
                <iframe src="https://www.youtube-nocookie.com/embed/ID?rel=0&modestbranding=1" title="Démonstration" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" className="absolute inset-0 h-full w-full" /> */}
          </div>
        </Reveal>

        <Reveal stagger className="space-y-4">
          {points.map((p) => (
            <div key={p.title} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                {p.icon}
              </span>
              <div>
                <h3 className="font-display font-bold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-2">{p.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
        <RevealItem index={0} className="glass p-6">
          <p className="font-display text-4xl font-bold text-signal">{offre.questionsRecette} questions</p>
          <p className="mt-1 text-sm leading-6 text-ink-2">
            de recette arrêtées avec vous avant le test, dont plusieurs sans réponse. Une réponse inventée est un
            défaut bloquant.
          </p>
        </RevealItem>
        <RevealItem index={1} className="glass p-6">
          <p className="font-display text-4xl font-bold text-signal">{offre.delaiJoursOuvrables} jours</p>
          <p className="mt-1 text-sm leading-6 text-ink-2">
            ouvrables entre la réception de vos documents, l'ouverture de vos comptes, et un lien fonctionnel.
          </p>
        </RevealItem>
        <RevealItem index={2} className="flex flex-col items-start gap-2 sm:items-end">
          <p className="text-xs text-ink-3">Vous avez reçu un code lors de notre échange ?</p>
          <DemoAccess />
        </RevealItem>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Bandes illustrées                                                  */
/* ------------------------------------------------------------------ */

function BandLecture() {
  return (
    <ParallaxBand src="/images/band-lecture.webp" width={2000} height={900} position="100% 50%" className="py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal stagger className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">Le principe</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.1]">
            Vos documents ont déjà la réponse. <span className="text-signal">L'assistant, lui, les a tous lus.</span>
          </h2>
          <p className="mt-4 leading-7 text-ink-2">
            Barèmes, procédures, catalogues, contrats : il retrouve le bon passage, le résume et cite le document.
            Et quand l'information n'y est pas, il le dit — au lieu de deviner.
          </p>
          <Link to="/#devis" className="btn-primary group mt-7">
            Voir le résultat sur mes documents
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </ParallaxBand>
  );
}

function BandSource() {
  return (
    <ParallaxBand src="/images/band-source.webp" width={2000} height={800} position="100% 50%" className="py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal stagger className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">Vérifiable</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.1]">
            Chaque réponse cite son document, <span className="text-signal">ouvrable en un clic.</span>
          </h2>
          <p className="mt-4 leading-7 text-ink-2">
            Vos équipes n'ont pas à croire l'assistant sur parole : la source est là, à la page près. C'est ce qui
            est vérifié à la livraison, sur au moins {offre.questionsRecette} questions arrêtées avec vous.
          </p>
        </Reveal>
      </div>
    </ParallaxBand>
  );
}

/* ------------------------------------------------------------------ */
/*  Ce que vous obtenez                                                */
/* ------------------------------------------------------------------ */

function Offer() {
  const included = [
    `Vos PDF, Word et textes deviennent interrogeables — jusqu'à ${offre.fichiersInclus} fichiers ou ${offre.pagesIncluses} pages, tableaux et barèmes compris.`,
    "Une interface interne à vos couleurs, ou un widget sur votre site si vous ouvrez l'assistant à vos clients.",
    "Des réponses vérifiables : chaque réponse cite son document, ouvrable en un clic.",
    "Une instance dédiée, sur les comptes que vous créez à votre nom, en région européenne — je la configure avec vous ; accès, factures et contrôle restent les vôtres.",
    `Une recette d'au moins ${offre.questionsRecette} questions passées sur vos propres documents, procès-verbal remis avant le règlement du solde.`,
    `Prise en main de 30 minutes, documentation d'exploitation, ${offre.suiviInclusJours} jours de suivi et un aller-retour d'ajustement après la livraison.`,
  ];
  const options = [
    "Maintenance mensuelle : surveillance, réindexation, corrections et mises à jour du socle.",
    "Tableau de bord d'usage : ce qu'on demande vraiment à l'assistant, et les questions restées sans réponse — les documents qui vous manquent encore.",
    "Intégrations à vos logiciels internes (intranet, CRM), OCR de PDF scannés, volumes massifs : sur devis séparé.",
  ];

  return (
    <section id="offre" className="relative overflow-hidden py-24">
      <Aurora className="opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader badge="Ce que vous obtenez" title="Un périmètre écrit noir sur blanc." text="Tout est dans le devis — jamais de facture surprise, et ce qui n'est pas couvert est dit avant." />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="glass h-full p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">Inclus dans la mission</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">Livré, installé, fonctionnel</h3>
              <ul className="mt-6 space-y-3.5">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-ink-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="glass flex-1 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">En option, si vous le voulez</p>
              <ul className="mt-5 space-y-3.5">
                {options.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-ink-2">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 p-6 text-sm leading-6 text-ink-2">
              <strong className="text-ink">Non couvert aujourd'hui</strong>, et je préfère le dire avant le devis :
              classeurs Excel, boîtes mail, connexion directe à SharePoint ou Drive.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Prix                                                               */
/* ------------------------------------------------------------------ */

function Pricing() {
  return (
    <section id="prix" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeader
        badge="Prix — publié, pas sur demande"
        title={
          <>
            Un prix fixe, connu avant de commencer.{" "}
            <span className="text-signal">Rien à payer chaque mois par obligation.</span>
          </>
        }
        text="Vous payez la mise en place. Les frais techniques sont les vôtres, chez vos fournisseurs, sans marge. La maintenance existe si vous la voulez."
        wide
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="glass card-line relative h-full overflow-hidden p-8 sm:p-10">
            <div
              aria-hidden
              className="soft-glow pointer-events-none absolute -right-24 -top-24 h-72 w-96 rounded-full"
              style={{ "--glow-color": "rgba(52, 211, 153, 0.2)" } as React.CSSProperties}
            />
            <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">Mise en place — tout compris</p>
            <p className="relative mt-3 font-display text-6xl font-bold text-ink">
              {eur(offre.miseEnPlace)}
            </p>
            <p className="relative mt-3 max-w-lg leading-7 text-ink-2">
              Conception, lecture de vos documents, interface à vos couleurs, recette de {offre.questionsRecette} questions,
              prise en main, {offre.suiviInclusJours} jours de suivi et un aller-retour d'ajustement. Jusqu'à{" "}
              {offre.fichiersInclus} fichiers ou {offre.pagesIncluses} pages, livré en {offre.delaiJoursOuvrables} jours
              ouvrables à compter de la réception de vos documents et de l'ouverture de vos comptes.
            </p>
            <ul className="relative mt-6 grid gap-2.5 text-sm text-ink-2 sm:grid-cols-2">
              {[
                `Acompte de ${offre.acomptePourcent} %, solde après validation de la recette`,
                "Frais techniques à part, sur vos comptes, sans marge",
                "Aucun abonnement obligatoire",
                "TVA non applicable, art. 293 B du CGI",
              ].map((l) => (
                <li key={l} className="flex gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Link to="/#devis" className="btn-primary group">
                Voir le résultat sur mes documents
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/simulation" className="btn-ghost">
                Calculer ce que ça rapporte
              </Link>
            </div>
            <p className="relative mt-6 text-xs leading-5 text-ink-3">
              Tarif de lancement consenti aux {offre.referencesTarifLancement} premières entreprises, en échange d'un
              retour d'expérience écrit ; la mise en place passe ensuite à {eur(offre.miseEnPlaceApresReferences)}.
            </p>
          </div>
        </Reveal>

        <Reveal stagger delay={0.1} className="flex flex-col gap-4">
          <div className="glass p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display font-bold text-ink">Vos frais techniques</h3>
              <span className="shrink-0 text-sm font-semibold text-accent-2">quelques dizaines d'€ / mois</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-2">
              Hébergement et modèle de langage, facturés directement par vos fournisseurs selon votre usage réel, sur
              les comptes ouverts à votre nom. Dépense plafonnable, aucune marge de ma part.
            </p>
          </div>
          <div className="glass p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display font-bold text-ink">Maintenance — facultative</h3>
              <span className="shrink-0 text-sm font-semibold text-accent-2">{eur(offre.maintenanceMensuelle)} / mois</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-2">
              Surveillance, réindexation, corrections et mises à jour. Sans engagement, préavis 30 jours, jamais par
              reconduction automatique. L'assistant fonctionne sans.
            </p>
          </div>
          <div className="glass p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display font-bold text-ink">Tableau de bord d'usage — option</h3>
              <span className="shrink-0 text-sm font-semibold text-accent-2">+ {eur(offre.tableauDeBord)}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-2">
              Installé en même temps. Les sujets qui reviennent et les questions restées sans réponse.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Comment ça se passe                                                */
/* ------------------------------------------------------------------ */

function Process() {
  const steps = [
    {
      title: `Vous m'écrivez, je réponds sous ${offre.reponseSousHeures} h`,
      text: "Le formulaire en bas de page suffit. Je vous dis si vos documents s'y prêtent et, si oui, vous m'envoyez deux ou trois fichiers représentatifs — pas les plus sensibles, ceux qui reviennent le plus.",
    },
    {
      title: "Démonstration sur vos documents, puis devis",
      text: "Je monte l'assistant sur vos fichiers et je vous montre le résultat en direct, gratuitement. Si ça vaut le coup chez vous, le devis formalise le périmètre au prix affiché ; sinon je vous le dis.",
    },
    {
      title: "Construction, recette, livraison",
      text: `Vous créez vos deux comptes techniques, je les configure avec vous, puis je construis l'assistant sur l'ensemble de vos documents : ${offre.delaiJoursOuvrables} jours ouvrables. Recette d'au moins ${offre.questionsRecette} questions arrêtées ensemble, procès-verbal remis, un tour d'ajustement — et le solde n'est dû que si les critères convenus sont atteints (sinon : corrections sans supplément sous dix jours ouvrables, deux cycles au plus ; au-delà, vous pouvez arrêter, solde non dû et acompte restitué).`,
    },
  ];

  return (
    <section id="parcours" className="relative overflow-hidden py-24">
      <DotGrid className="opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          badge="Comment ça se passe"
          title="Vous voyez le résultat sur vos documents avant de vous engager."
          text="Un seul parcours, dans cet ordre. Rien n'est signé avant la démonstration, et rien n'est payé en totalité avant la recette."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {steps.map((s, i) => (
            <RevealItem key={s.title} index={i}>
              <div className="glass relative h-full p-7">
                <span className="font-display text-5xl font-bold text-signal">0{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">{s.text}</p>
              </div>
            </RevealItem>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
          <Link to="/#devis" className="btn-primary group">
            Voir le résultat sur mes documents
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={contacts.rendezVous} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <CalendarClock className="h-4 w-4" />
            Je préfère en parler 15 minutes
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Qui construit                                                      */
/* ------------------------------------------------------------------ */

function Who() {
  const guarantees = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "La recette est écrite au contrat",
      text: `${offre.questionsRecette} questions arrêtées avec vous avant le test, procès-verbal remis, solde conditionné aux critères convenus — délai et cycles de correction écrits au devis.`,
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Une annexe RGPD à chaque devis",
      text: `Ce que je fais de vos documents, combien de temps, avec quelles mesures. Mes copies de travail sont supprimées dans les ${offre.suppressionCopiesJours} jours suivant la livraison, attestation sur demande.`,
    },
    {
      icon: <KeyRound className="h-5 w-5" />,
      title: "Vous conservez les comptes, les données et les accès",
      text: "La documentation d'exploitation remise à la livraison permet à un autre prestataire d'administrer l'instance.",
    },
  ];

  return (
    <section id="qui" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeader
          badge="Qui construit"
          title="Vous parlez à la personne qui livre."
          text={
            <>
              Je m'appelle Jonas Mionnet. Je conçois, j'installe et je teste personnellement chaque assistant — ni
              agence, ni sous-traitant, ni service commercial entre vous et moi, du premier fichier reçu jusqu'à la
              livraison, et après. Développeur Data/BI et solutions IA, en cursus ingénieur informatique et en
              alternance dans une entreprise de services numériques, je travaille en indépendant depuis la France, avec
              volontairement peu de clients à la fois : la recette de livraison prend du temps, et c'est elle qui fait
              la différence.
              <a
                href={contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-2 underline-offset-4 hover:underline"
              >
                Mon profil LinkedIn <ArrowRight className="h-4 w-4" />
              </a>
            </>
          }
        />
        <Reveal stagger className="space-y-4">
          {guarantees.map((g) => (
            <div key={g.title} className="glass flex gap-4 p-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                {g.icon}
              </span>
              <div>
                <h3 className="font-display font-bold text-ink">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">{g.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const FAQ = [
  {
    q: "Où sont stockés nos documents ?",
    a: `Sur une instance dédiée, sur le compte d'hébergement que vous créez à votre nom, en région européenne. Le compte, le moyen de paiement et les accès vous appartiennent ; l'instance n'est partagée avec aucun autre client. Au moment de répondre, seuls les extraits pertinents sont transmis au fournisseur du modèle de langage, via votre propre clé, et il ne les utilise pas pour entraîner ses modèles sur ses offres professionnelles. Mes copies de travail sont supprimées dans les ${offre.suppressionCopiesJours} jours suivant la livraison, attestation sur demande.`,
  },
  {
    q: "Et s'il invente une réponse ?",
    a: "Je ne vous demande pas de me croire sur parole. Il répond uniquement à partir de vos documents, chaque réponse cite sa source, et quand l'information n'y figure pas il le dit plutôt que de deviner. La recette de livraison comprend plusieurs questions dont la réponse ne se trouve pas dans vos documents : réponses, refus et sources sont vérifiés un par un, et le procès-verbal vous est remis. Aucun système n'est infaillible — c'est précisément pour ça que la vérification est écrite au contrat.",
  },
  {
    q: "Pourquoi pas simplement ChatGPT ?",
    a: "Un outil généraliste peut lire des fichiers ponctuellement, et il le fait de mieux en mieux. La différence n'est pas là. Ici, l'assistant est déployé pour votre entreprise, alimenté par un corpus que vous maîtrisez et mettez à jour depuis une page de gestion. Vos équipes n'ont rien à téléverser ni à savoir quel fichier ouvrir, chaque réponse cite sa source, et une recette écrite vérifie tout ça avant la livraison.",
  },
  {
    q: "Combien ça coûte par mois après la livraison ?",
    a: `Quelques dizaines d'euros par mois, payés directement à vos fournisseurs : l'hébergement de votre instance, et l'usage du modèle de langage, facturé à la question posée. Vous voyez la consommation en direct et vous pouvez fixer un plafond. Rien ne transite par moi. La maintenance à ${eur(offre.maintenanceMensuelle)} par mois s'ajoute seulement si vous le voulez, sans engagement.`,
  },
  {
    q: "Nos documents changent souvent.",
    a: "L'assistant suit, tout seul. Vous ajoutez, remplacez ou retirez vos fichiers depuis une page de gestion protégée — mise à jour automatique, aucune commande technique. Et si vous préférez déléguer, c'est compris dans la maintenance facultative.",
  },
  {
    q: "Faut-il être technique de notre côté ?",
    a: "Non — rien à installer, rien à apprendre. Vous fournissez vos documents en PDF, Word ou texte, tableaux et grilles tarifaires compris. Je livre un lien fonctionnel, vos équipes posent leurs questions en langage normal. Si vos tarifs vivent dans un classeur Excel, on l'exporte une fois en PDF ou en Word et l'assistant le lit.",
  },
  {
    q: "Que se passe-t-il si la recette ne passe pas ?",
    a: "Les critères, le délai et le nombre de cycles sont écrits au devis : si les critères convenus ne sont pas atteints, je corrige sans supplément, sous dix jours ouvrables, dans la limite de deux cycles. Passé ce délai sans atteinte des critères, vous pouvez mettre fin à la mission — le solde n'est pas dû et l'acompte est restitué.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative overflow-hidden py-24">
      <DotGrid className="opacity-40" />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeader badge="Vos questions" title="Ce qu'on me demande à chaque appel." center />
        <Reveal className="mt-12 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.02]">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-base font-bold text-ink transition hover:text-accent-2 sm:text-lg"
                >
                  {item.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-ink-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-7 text-ink-2">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section id="devis" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 pb-28 pt-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeader
            badge="La suite"
            title="Voyons ce que ça donne sur vos documents."
            text={`Laissez-moi votre entreprise et le type de documents concernés : je vous réponds sous ${offre.reponseSousHeures} h pour vous dire si vos documents s'y prêtent, puis je monte la démonstration sur deux ou trois de vos fichiers. Le devis n'arrive qu'après — vous verrez le résultat avant de vous engager.`}
          />
          <Reveal stagger delay={0.15} className="mt-8 space-y-3">
            {[
              `Réponse sous ${offre.reponseSousHeures} h`,
              "Démonstration gratuite, sans engagement",
              "Le devis n'arrive qu'après la démonstration",
            ].map((l) => (
              <p key={l} className="flex items-center gap-3 text-sm text-ink-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {l}
              </p>
            ))}
            <p className="pt-4 text-sm text-ink-2">
              Vous préférez en parler de vive voix ?{" "}
              <a href={contacts.rendezVous} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-2 underline-offset-4 hover:underline">
                Réserver 15 minutes
              </a>{" "}
              ou{" "}
              <a href={`mailto:${contacts.email}`} className="font-semibold text-accent-2 underline-offset-4 hover:underline">
                m'écrire directement
              </a>
              .
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="glass glass-solid p-7 sm:p-9">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
