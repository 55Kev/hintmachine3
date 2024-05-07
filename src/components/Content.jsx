
export default function Content({
  render,
  enigmes,
  enigme,
  history,
  handleBackToMenu,
  handleShowHint
}) {
  //Etats

  let contenu = [];

  //Comportements
  if (!render) return;

  const affEnigme = () => {
    console.log(enigme);
    console.log(history);
    for (let i = 0; i < history[enigme]; i++) {
      if (i === enigmes[enigme].texteIndice.length - 1)
        contenu.push("La solution :");
      contenu.push(enigmes[enigme].texteIndice[i] + ".");
    }
    //if historyNav[index] > 1
    //setCurrentIndice(tabEnigmes[index].texteIndice[historyNav[index]]);
    //Copie de l'état puis re-import pour MAJ
    //const hst = [...history];
    //if (history[enigme] < enigmes[enigme].texteIndice.length) hst[enigme]++;
    //setHistoryNav(hst);

    return contenu;
  };

  const affLib = () => {
    const urlOrText = enigmes[enigme].lib;
    
    if (urlOrText.length > 25) {
      /*return (
        <img className="img_full"
            src = 'https://www.exitgame.fr/wp-content/uploads/2023/03/logor_trou.png'
        />
      );*/
      return (
        <img
          className="img_full"
          src = {urlOrText}
          alt="page"
        />
      );
    } else {
      return (
        <div>
          <h3 className="text-center">page n°{enigmes[enigme].page}</h3>
          <h4 className="text-center">{urlOrText}</h4>
        </div>
      );
    }
  };

  const affLibButtonHint = () => {
    let ret = "";

    if (history[enigme] === enigmes[enigme].texteIndice.length) {
        ret = "Passez à l'étape suivante !";
      }
    else if (history[enigme] === enigmes[enigme].texteIndice.length - 1)
      ret = "Afficher la solution";
    else {
      ret =
        "Afficher un indice " +
        history[enigme] +
        "/" +
        (enigmes[enigme].texteIndice.length - 1);
    }

    return (
      <button
        onClick={() => handleShowHint()}
        className="btn btn-primary btn-lg btn-block buttonGetIndice"
         >
         {ret}
      </button>
    );
  };

  //Affichage
  return (
    <div className="content">
      {affLib()}
      <button
        onClick={() => handleBackToMenu()}
        className="btn btn-primary btn-lg btn-block"
      >
        Choisir une autre énigme
      </button>
      <div className="contentIndice text-center">
        {affEnigme().map((tab, index) => (
          <p>
            <h3>{tab}</h3>
          </p>
        ))}
      </div>
      {affLibButtonHint()}
    </div>
  );
}
