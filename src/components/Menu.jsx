export default function Menu({ render, enigmes, eventChoixEnigme }) {
  //Etats

  //Comportements
  if (!render) return;

  //Affichage
  return (
    <div className="menu row text-center">
      <h4>Choisissez la page de l'énigme</h4>

      {enigmes.map((enigme, index) => (
        <button
          className="btn btn-default btn-lg"
          onClick={() => eventChoixEnigme(index)}
        >
          Page {enigme.page}
        </button>
      ))}
      <h5>Dossier "La fortune du Cap"</h5>
      <h5>Six-Fours-les-Plages</h5>
    </div>
  );
}
