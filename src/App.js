
import { useEffect, useMemo, useState } from "react";
//import { useSearchParams } from "react-router-dom";
import "./styles.css";
import Menu from "./components/Menu";
import ContentIndices from "./components/ContentIndices";
import AVI from "./const/avi";
import AIX from "./const/aix";
import SIF from "./const/sif";
import PANIER from "./const/panier";
import NIMES from "./const/nimes";
import VP from "./const/vp";
import Form2Numbers from "./components/Form2Numbers.jsx";
import FormLetters from "./components/FormLetters.jsx";
import TopMessage from "./components/TopMessage.jsx";
import TopPageLogo from "./components/TopPageLogo";


export default function App() {

  const params = new URLSearchParams(window.location.search);

  const enigmeParam = params.get("vi");
  const enigmeOptions = {
    "avi": AVI,
    "sif": SIF,
    "panier": PANIER,
    "aix": AIX,
    "nimes": NIMES,
    "vp" : VP
  };
  let tabEnigmes = (enigmeOptions.hasOwnProperty(enigmeParam)) ? enigmeOptions[enigmeParam] : NIMES;

  const [currentPage, setCurrentPage] = useState("");
  const [historyNav, setHistoryNav] = useState([0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
  const [menuToRender, setMenuToRender] = useState(true);
  const [contentIndicesToRender, setContentIndicesToRender] = useState(false);
  const [form2NumbersToRender, setForm2NumbersToRender] = useState(false);
  const [formLettersToRender, setFormLettersToRender] = useState(false);
  const [topMessageToRender, setTopMessageToRender] = useState(false);
  const [topMessageContent, setTopMessageContent] = useState("");


  const updateHistory = () => {
    //Copie de l'état puis re-import pour MAJ
    console.log(tabEnigmes[currentPage].texteIndice.length);
    console.log(historyNav);
    const hst = [...historyNav];
    if (historyNav[currentPage] < tabEnigmes[currentPage].texteIndice.length)
      hst[currentPage]++;
    setHistoryNav(hst);
  };

  const handleChoixEnigme = (index, enigme) => {
    setCurrentPage(index);
    setMenuToRender(false);
    if(enigme === 99) {
      setForm2NumbersToRender(true);
      setFormLettersToRender(false);
      setContentIndicesToRender(false);
    } else if(enigme === 98) {
      setForm2NumbersToRender(false);
      setFormLettersToRender(true);
      setContentIndicesToRender(false);
    } else {
      setForm2NumbersToRender(false);
      setFormLettersToRender(false);
      setContentIndicesToRender(true);
    }
  };

  let messageToShow = "";

  const handleShowTopMessage = (message) => {
    setTopMessageToRender(true);
    console.log("handleShowTopMessage Fired!");
    setTopMessageContent(message);
  }

  const handleBackToMenu = () => {
    setMenuToRender(true);
    setTopMessageToRender(false);
    //
    setForm2NumbersToRender(false);
    setFormLettersToRender(false);
    setContentIndicesToRender(false);
  };

  /*<TopPageLogo
        enigmes={tabEnigmes}
        enigme={currentPage}
      />*/

  return (
    
    <div className="App">
      <TopMessage
        render={topMessageToRender}
        message={topMessageContent}
      />
      <TopPageLogo
        enigmes={tabEnigmes}
        enigme={currentPage}
        showMessage={handleShowTopMessage}
        renderButton={contentIndicesToRender}
      />
      <Menu
        render={menuToRender}
        enigmes={tabEnigmes}
        enigme={currentPage}
        eventChoixEnigme={handleChoixEnigme}
      />
      <ContentIndices
        render={contentIndicesToRender}
        enigmes={tabEnigmes}
        enigme={currentPage}
        history={historyNav}
        handleBackToMenu={handleBackToMenu}
        handleShowHint={updateHistory}
      />
      <Form2Numbers 
        render={form2NumbersToRender}
        enigmes={tabEnigmes}
        enigme={currentPage}
        history={historyNav}
        handleBackToMenu={handleBackToMenu}
        handleShowHint={updateHistory}
      />
      <FormLetters
        render={formLettersToRender}
        enigmes={tabEnigmes}
        enigme={currentPage}
        history={historyNav}
        handleBackToMenu={handleBackToMenu}
        handleShowHint={updateHistory}
      />
    </div>
    
  );
}
