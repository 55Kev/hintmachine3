export default function Menu({ render, enigmes, eventChoixEnigme }) {
  //Etats

  //Comportements
  if (!render) return;

  //Affichage
  return (
  <div className="menu">
    <div className="menu-titre text-center">
      <h4>Choisissez la page de l'énigme</h4>
    </div>
    <div className="menu-content text-center">
      {enigmes.map((enigme, index) => (
        <button
          className="btn btn-default btn-lg"
          onClick={() => eventChoixEnigme(index)}
        >
          Page {enigme.page}
        </button>
      ))}
    </div>
  </div>
  );
}
