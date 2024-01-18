import { useState } from "react";
//import { useSearchParams } from "react-router-dom";
import "./styles.css";
import Menu from "./components/Menu";
import Content from "./components/Content";

export default function App() {

const aix = [
  {
    page: 6,
    lib: "Première énigme !",
    texteIndice: ["patronyme", "tout se nomme", "un nom de famille"]
  },
  {
    page: 9,
    lib: "A bien voir...",
    texteIndice: ["Regardez bien", "Comparez avec le réel", "Un 'chat' au milieu de la page"]
  },
  {
    page: 13,
    lib: "Le mouton",
    texteIndice: [
      "Origami",
      "Pliez vous à l'exercice",
      "La lettre 'i' (pliez la page pour 3+6=9)"
    ]
  },
  {
    page: 16,
    lib: "Témoignages",
    texteIndice: [
      "Pas de second étage",
      'Pas de n°4 dans la rue',
      "La lettre 'Z'"
    ]
  },
  {
    page: 18,
    lib: "Le tournant de l'affaire",
    texteIndice: ["Trouvez sur la façade", "Les chiffres deviennent des lettres","Windows"]
  },
  {
    page: 21,
    lib: "Les visages",
    texteIndice: ["Pas des visages au milieu", "C'est une fontaine", "La lettre 'M', 1912 sur fontaine"]
  },
  {
    page: 24,
    lib: "Les arches",
    texteIndice: ["Phare et Os", "Parfumeur", "Sephora"]
  },
  {
    page: 26,
    lib: "Couvre chef",
    texteIndice: ["Façade derrière vous", "C'est presque effacé", "Chappelerie"]
  },
  {
    page: 31,
    lib: "Les croix",
    texteIndice: ["Comptez les croix", "N'oubliez pas celle sur la fontaine", "La lettre V, 5 croix"]
  },
  {
    page: 32,
    lib: "Cardinal",
    texteIndice: ["L'hôtel", "Bouchez les trous", "Chataignier"]
  },
  {
    page: 34,
    lib: "Botanique",
    texteIndice: ["Fruit sculpté", "Pas l'hôtel", "Le pin"]
  },
  {
    page: 36,
    lib: "La mousse",
    texteIndice: ["C'est rapide!", "Je double", "La lettre L, le mois prochain"]
  },
  {
    page: 38,
    lib: "Mots croisés",
    texteIndice: ["René", "Monoprix, Durance ", "Défi"]
  },
  {
    page: 41,
    lib: "La carte",
    texteIndice: ["Utilisez la carte", "Superposez", "Partage"]
  },
  {
    page: 43,
    lib: "La question",
    texteIndice: ["Réponse dans le texte", "Lecture verticale", "La lettre N"]
  },
  {
    page: 45,
    lib: "La rotonde",
    texteIndice: ["Ce n'est pas la 'Q'", "Ni la 'S'", "La lettre R"]
  },
  {
    page: 47,
    lib: "La video-surveillance",
    texteIndice: ["Objet à trouver", "Un cadenas", "La lettre T"]
  },
  {
    page: 49,
    lib: "Dernière énigme !",
    texteIndice: ["Vous avez la réponse en main", "1ere étape: Le stylo", "Dévissez le stylo !"]
  }
];

const panier = [
    {
      page: 8,
      lib: "Première énigme !",
      texteIndice: ["coordonnées", "coordonnées des mots - lettres", "Bocal"]
    },
    {
      page: 10,
      lib: "A bien voir...",
      texteIndice: [
        "voir commerce",
        "restaurant au  nom  bleu",
        "Hippocampe"
      ]
    },
    {
      page: 14,
      lib: "Liaisons dangereuses",
      texteIndice: [
        "molosse = Cabot",
        "reliez",
        "La  lettre   T"
      ]
    },
    {
      page: 18,
      lib: "Dessins trompeurs",
      texteIndice: [
        "Un supplément",
        "Utilisez  la  fiche alphabet fournie",
        "Pavill (on Daviel)"
      ]
    },
    {
      page: 20,
      lib: "Ce n'est pas un jeu, c'est une énigme",
      texteIndice: [
        "réutilisez",
        "l'alphabet",
        "Jaune"
      ]
    },
    {
      page: 24,
      lib: "Diapason",
      texteIndice: ["Chanson", "Hymne", "Allons enfants de la patrie..."]
    },
    {
      page: 27,
      lib: "Invitation",
      texteIndice: [
        "Regardez  par la fenetre  !",
        "Et retournez",
        "Projet"
      ]
    },
    {
      page: 30,
      lib: "Goûts & couleurs",
      texteIndice: [
        "Rose, noir",
        "Vert, bleu",
        "Lettres entourées réponse: suivre"
      ]
    },
    {
      page: 34,
      lib: "Graffiti poête",
      texteIndice: [
        "Suivez l’indication du dessin",
        "Tournez",
        "Pagnol"
      ]
    },
    {
      page: 36,
      lib: "N'y tombez pas !",
      texteIndice: [
        "Trouvez le puit devant la vielle charité",
        "Un  puit grec entre 2 et 3 metres",
        "La lettre D"
      ]
    },
    {
      page: 39,
      lib: "Des fenêtres",
      texteIndice: [
        "Quand c'est bouché la lumière ne passe pas",
        "Gardez les vrais fenêtres pour les vrais lettres",
        "miaulement"
      ]
    },
    {
      page: 41,
      lib: "Des hôtels",
      texteIndice: [
        "3: Ville (Hôtel de.)",
        "5: Vielle charité",
        "Olive"
      ]
    },
    {
      page: 43,
      lib: "Coin coin",
      texteIndice: ["Faux noms", "Des plaques inversés ?", "bonneterie"]
    },
    {
      page: 50,
      lib: "Promenade dans le temps",
      texteIndice: [
        "Trouvez la maquette",
        "Suivez le chemin sans bouger !",
        "La terrasse funéraire"
      ]
    },
    {
      page: 52,
      lib: "Une énigme marquante",
      texteIndice: ["Deux points communs", "Des commerces", "Trabuc"]
    },
    {
      page: 53,
      lib: "Un peu de géographie",
      texteIndice: [
        "Trouvez une caisse en bois",
        "Avec un gros globe terrestre dedans",
        "La lettre A"
      ]
    },
    {
      page: 55,
      lib: "Avant dernière énigme !",
      texteIndice: [
        "L'arme était Excalibur",
        "L'epée plantée",
        "A.Lauro"
      ]
    },
    {
      page: 57,
      lib: "Dernière énigme !",
      texteIndice: [
        "Trouvez les points communs",
        "A chaque syllabe de la réponse correspond un point commun",
        "Jo est à Porto Vecchio !"
      ]
    }
  ];

const avi = [
    {
      page: 9,
      lib: "Première énigme !",
      texteIndice: ["Gardez les lettres", "ab - a = b", "Sacs"]
    },
    {
      page: 12,
      lib: "L'Hôtel des Monnaies",
      texteIndice: [
        "Comparez avec le réel",
        "Une erreur sur la photo",
        "Chat"
      ]
    },
    {
      page: 14,
      lib: "Le palais des Papes",
      texteIndice: [
        "Des exemples sont données sur l'énigme",
        "Fenêtres",
        "Arrivée (le nombre de fenetres dans chaque arche donne une lettre)"
      ]
    },
    {
      page: 19,
      lib: "La gravure",
      texteIndice: [
        "Chantez maintenant",
        "Ces gens sont sur un pont",
        "La lettre D"
      ]
    },
    {
      page: 21,
      lib: "La vigne",
      texteIndice: [
        "Deux outils à combiner, déjà fournis",
        "Le stylo et la vigne",
        "Cage (Entourez le stylo)"
      ]
    },
    {
      page: 23,
      lib: "Le jardin",
      texteIndice: ["Cherchez la fraicheur", "La fontaine", "Meuse (plaque sous cygne)"]
    },
    {
      page: 25,
      lib: "Le nom de la rue",
      texteIndice: [
        "Proche de la plaque",
        "Gravure sous plaque de rue",
        "Rue des ciseaux d'or"
      ]
    },
    {
      page: 28,
      lib: "Le blason",
      texteIndice: [
        "Eliminez les mauvaises",
        "Les mauvaises couleurs",
        "Forums"
      ]
    },
    {
      page: 30,
      lib: "Le blason",
      texteIndice: [
        "Formez un seul mot",
        "Un restaurant de la palce",
        "Cloitre"
      ]
    },
    {
      page: 33,
      lib: "Les clés",
      texteIndice: [
        "Outil fournis en plus du carnet",
        "Pliez les clés",
        "Boucherie"
      ]
    },
    {
      page: 36,
      lib: "Les dés",
      texteIndice: [
        "Imaginez les dés posés sur un plaque en verre",
        "Additionnez est inversé, lisible du dessous",
        "Trois"
      ]
    },
    {
      page: 39,
      lib: "Mots croisés",
      texteIndice: [
        "1: Clément",
        "2: Doms, 3: Salamandre",
        "Moustaches"
      ]
    },
    {
      page: 41,
      lib: "Indice",
      texteIndice: ["Cherchez sur place", "Cadenas au niveau du poteau", "Combien (visible sur cadenas)"]
    },
    {
      page: 44,
      lib: "Le jardin",
      texteIndice: [
        "Melangez",
        "Jaune et bleu donne du vert",
        "Jarre (car fond vert)"
      ]
    },
    {
      page: 47,
      lib: "Ginette & Marcel",
      texteIndice: ["Nord vaut 'N'", "Ginette & Marcel sont au nord", "Nonnes"]
    },
    {
      page: 49,
      lib: "Les corps saints",
      texteIndice: [
        "Des fruits de pierre",
        "Qui parfois contiennent des pignons",
        "Pin"
      ]
    },
    {
      page: 52,
      lib: "Les arches",
      texteIndice: [
        "Trouvez la plaque qui ressemble au dessin",
        "Six lettres à déduire",
        "Maison"
      ]
    },
    {
      page: 54,
      lib: "Dernière énigme !",
      texteIndice: [
        "Plus je suis chaud, plus je suis frais. On me mange.",
        "Un aliment quotidien bien français",
        "Le pain !"
      ]
    }
  ];
const sif = [
      {
        page: 5,
        lib: "Une 1ere énigme",
        texteIndice: ["Une enseigne", "Immobilière", "Le sel de la vie"]
      },
      {
        page: 7,
        lib: "Un panneau codé",
        texteIndice: [
          "Trouvez de quoi se désaltérer",
          "Un écriteau sur la fontaine, inspirez-vous en",
          "Félicitations continuez"
        ]
      },
      {
        page: 9,
        lib: "Des points bizarres",
        texteIndice: [
          "Regardez vos pieds",
          "Re-dessinez le cygne au sol",
          "La maison du cygne"
        ]
      },
      {
        page: 11,
        lib: "Un portail vers la verité",
        texteIndice: [
          "Cherchez la pièce manquante",
          "elle est en métal sur le portail",
          "Quête"
        ]
      },
      {
        page: 13,
        lib: "Orthografik",
        texteIndice: [
          "Trouvez sur le panneau",
          "Père ou pair ?",
          "La maison du cygne et le patio"
        ]
      },
      {
        page: 15,
        lib: "Ne pas être borné",
        texteIndice: ["Parfois en anglais", "Four(s) = 4 en anglais", "Fada"]
      },
      {
        page: 17,
        lib: "Le plan",
        texteIndice: [
          "Trouvez sur le panneau",
          "Les points dessinent",
          "La lettre 'T'"
        ]
      },
      {
        page: 19,
        lib: "Ecran ou nacre ?",
        texteIndice: [
          "Anagramme",
          "Restez prês de la capitainerie",
          "Trouvez l'ancre où est noté 'SLN'"
        ]
      },
      {
        page: 21,
        lib: "La devinette",
        texteIndice: [
          "De qui/quoi parle-t-on ?",
          "Les pavillons !",
          "Un drapeau (donc 'bleu blanc rouge')"
        ]
      },
      {
        page: 23,
        lib: "L'éléphant",
        texteIndice: [
          "Pas d'animal à trouver",
          "Plutôt une grande plante ressemblant à des pieds d'éléphants",
          "'Californie' d'où viennent les yuccas selon le panneau"
        ]
      },
      {
        page: 25,
        lib: "Les clés",
        texteIndice: [
          "Pas besoin de chercher un trou de serrure",
          "Comparez les formes",
          "La clé 'U' est en forme du batiment"
        ]
      },
      {
        page: 27,
        lib: "Paysage codé",
        texteIndice: [
          "Je signale les gros cailloux",
          "Les couleurs de bouées cardinales",
          "'Solution' en gardant couleurs jaune & noire"
        ]
      },
      {
        page: 29,
        lib: "Batterie",
        texteIndice: ["Regardez dans l'axe", "du canon", "Maquis"]
      },
      {
        page: 31,
        lib: "La plante",
        texteIndice: [
          "Aidez-vous du panneau",
          "Quelqu'un qui a peur de l'Europe",
          "Euphorbes"
        ]
      },
      {
        page: 33,
        lib: "L'origami",
        texteIndice: ["Pliez selon instructions", "réponse sur l'aile", "Paquet"]
      },
      {
        page: 34,
        lib: "L'héritier - dernière énigme !",
        texteIndice: [
          "Les balades",
          "Les plages de galets",
          "C'est Caroline la petite-fille !"
        ]
      }
    ];

const vide = [
    {
      page: 0,
      lib: "Oups!",
      texteIndice: ["Indice1", "indice2", "Reponse"]
    },
  ];
const params = new URLSearchParams(window.location.search);
//const tabEnigmes = ((params.get("vi") === "avi") ? avi : sif);

const enigmeParam = params.get("vi");
const enigmeOptions = {
  "avi": avi,
  "sif": sif,
  "panier": panier,
  "aix": aix,
  "": vide
};
let tabEnigmes = (enigmeOptions.hasOwnProperty(enigmeParam)) ? enigmeOptions[enigmeParam] : "avi";
if (!tabEnigmes) {
  tabEnigmes = enigmeOptions.vide; // Valeur par défaut si aucune option valide n'est spécifiée
}

const [currentPage, setCurrentPage] = useState("");
const [historyNav, setHistoryNav] = useState([
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
]);
const [menuToRender, setMenuToRender] = useState(true);
const [contentToRender, setContentToRender] = useState(false);



  const updateHistory = () => {
    //Copie de l'état puis re-import pour MAJ
    console.log(tabEnigmes[currentPage].texteIndice.length);
    console.log(historyNav);
    const hst = [...historyNav];
    if (historyNav[currentPage] < tabEnigmes[currentPage].texteIndice.length)
      hst[currentPage]++;
    setHistoryNav(hst);
  };

  const handleChoixEnigme = (index) => {
    setCurrentPage(index);
    setMenuToRender(false);
    setContentToRender(true);
  };

  const handleBackToMenu = () => {
    setMenuToRender(true);
    setContentToRender(false);
  };

  return (
    <div className="App">
      <div className="hero">
        <h1 className="text-center">.</h1>
      </div>
      <Menu
        render={menuToRender}
        enigmes={tabEnigmes}
        eventChoixEnigme={handleChoixEnigme}
      />
      <Content
        render={contentToRender}
        enigmes={tabEnigmes}
        enigme={currentPage}
        history={historyNav}
        handleBackToMenu={handleBackToMenu}
        handleShowHint={updateHistory}
      />
    </div>

  );
}
