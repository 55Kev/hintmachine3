
import { useEffect, useMemo, useState } from "react";
//import { useSearchParams } from "react-router-dom";
import "./styles.css";
import Menu from "./components/Menu";
import Content from "./components/Content";
import AVI from "./const/avi";
import AIX from "./const/aix";
import SIF from "./const/sif";
import PANIER from "./const/panier";
import NIMES from "./const/nimes";
import VP from "./const/vp";
import Form from "./components/Form";
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
  const [contentToRender, setContentToRender] = useState(false);
  const [formToRender, setFormToRender] = useState(false);
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
      setFormToRender(true);
      setContentToRender(false);
    } else {
      setContentToRender(true);
      setFormToRender(false);
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
    setContentToRender(false);
    setFormToRender(false);
    setTopMessageToRender(false);
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
        renderButton={contentToRender}
      />
      <Menu
        render={menuToRender}
        enigmes={tabEnigmes}
        enigme={currentPage}
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
      <Form 
        render={formToRender}
        enigmes={tabEnigmes}
        enigme={currentPage}
        history={historyNav}
        handleBackToMenu={handleBackToMenu}
        handleShowHint={updateHistory}
      />
    </div>
    
  );
}
