/*			
2	Devinette Savon autre boutique		A	Soixante-douze		
4	Reflet de l’ombrière,	Oui	O	Maison		
6	Charade commerce		V	Savonnette		
8	Pliage pour amener la flamme		I	CHAVIRER
10	Parking mairie		N	Lettre N		
12	FINAL		R	AVI(R)ON
*/

const HUITMAI_B = [
    {
        page: 2,
        lib: "Recherche de propreté",
        texteIndice: ["Un cube qui mousse", "Inscrit dessus, trouvez la boutique", "Soixante-Douze (% gravé dans le savon)"]
      },
      {
        page: 4,
        lib: "Vision",
        texteIndice: [
          "Placez la page bien à plat",
          "Sous l'ombrière",
          "Maison"
        ]
      },
      {
        page: 6,
        lib: "Charade",
        texteIndice: [
            "De qui parle-t-on ?",
            "De quoi parle-t-on ?",
            "Savonnette"
        ]
      },
      {
        page: 8,
        lib: "Epreuve Olympique",
        texteIndice: [
          "Suivez à la lettre la consigne",
          "Pliez la page, la réponse apparaitrat",
          "Chavirer"
        ]
      },
      {
        page: 10,
        lib: "Devinette",
        texteIndice: [
          "Suivez bien le chemin de la devinette",
          "Un cabot est un chien",
          "N (la lettre N)"
        ]
      },
      {
        page: 12,
        lib: "Dernière énigme",
        texteIndice: ["Vous devez avoir eu les lettres A,O,V", "Puis les lettres I, N, R", "AVIRON"]
      }
    ];

export default HUITMAI_B;