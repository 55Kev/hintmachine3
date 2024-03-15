import { useState } from "react";
//import { useSearchParams } from "react-router-dom";
import "./styles.css";
import Menu from "./components/Menu";
import Content from "./components/Content";
import AVI from "./const/avi";
import AIX from "./const/aix";
import SIF from "./const/sif";
import PANIER from "./const/panier";
import NIMES from "./const/nimes";

export default function App() {

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
    "avi": AVI,
    "sif": SIF,
    "panier": PANIER,
    "aix": AIX,
    "nimes": NIMES,
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
