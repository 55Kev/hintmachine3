export default function Menu({ render, enigmes, eventChoixEnigme }) {
  //Etats

  //Comportements
  if (!render) return;

  //Affichage
  return (
  <div className="menu">
    <div className="menu-titre text-center">
      <h4>Choisissez la page de l'énigme pour l'indice</h4>
    </div>
    <div className="menu-content text-center">
      {enigmes.map((enigme, index) => (
        <button
          key={enigme.page}
          className="btn btn-default btn-lg"
          onClick={() => eventChoixEnigme(index, enigme.page)}
        >
          {getButtonLabel(enigme.page, enigme.lib_page)}
        </button>
      ))}
    </div>
  </div>
  );
}

function getButtonLabel(index, libelle) {
  if (typeof libelle === 'undefined') {
    return ('Page '+index);
  } else {
    return (libelle);
  }
  //return index === 99 ?  "Vérifier  la réponse à toute l'enquête !" :  'Page '+index;
}
        