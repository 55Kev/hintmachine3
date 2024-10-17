
export default function ContentIndices({
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

  if (history == null) {
    console.log("Erreur : history est null");
    return;
  }

  if (enigmes == null) {
    console.log("Erreur : enigmes est null");
    return;
  }

  const affEnigme = () => {
    for (let i = 0; i < history[enigme]; i++) {
      if (i === enigmes[enigme].texteIndice.length - 1)
        contenu.push("La solution :");
      contenu.push(enigmes[enigme].texteIndice[i] + ".");
    }
    return contenu;
  };

  const affLib3 = () => {

    if (typeof enigmes[enigme].lib === 'undefined') {
      return (
        <div>
          <h3 className="text-center">page n°{enigmes[enigme].page}</h3>
        </div>
      );
    } else {
      const urlOrText = enigmes[enigme].lib;
      
      if (urlOrText.length > 25) {

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
    }
  };

  const affLibButtonHint = () => {
    let ret = "";
    let classSupp = "btn btn-primary btn-lg btn-block buttonGetIndice";

    if (history[enigme] === enigmes[enigme].texteIndice.length) {
        ret = "Solution affichée";
        classSupp = "btn btn-primary btn-lg btn-block buttonGetIndice btn-disabled"
    } else if (history[enigme] === enigmes[enigme].texteIndice.length - 1)
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
        className={classSupp}
         >
         {ret}
      </button>
    );
  };

  //Affichage
  return (
    <div className="content">
      {affLib3()}
      <button
        onClick={() => handleBackToMenu()}
        className="btn btn-primary btn-lg btn-block"
      >
        Choisir une autre énigme
      </button>
      <div className="contentIndice text-center">
        {affEnigme().map((tab, index) => (
            <h3 key={index}>{tab}</h3>
        ))}
      </div>
      {affLibButtonHint()}
    </div>
  );
}
