
import { useEffect, useMemo, useState, useReducer } from "react";
import "./styles.css";
import Menu from "./components/Menu";
import ContentIndices from "./components/ContentIndices";
import Form2Numbers from "./components/Form2Numbers.jsx";
import FormLetters from "./components/FormLetters.jsx";
import TopMessage from "./components/TopMessage.jsx";
import TopPageLogo from "./components/TopPageLogo";
import {getSession, isUpdateDatabaseNecessary, updateSession, SessionReducer} from "./components/Sessions.jsx";
import AdminResults from "./components/AdminResults.jsx"
import { createClient } from "@supabase/supabase-js";
import FormPhone from "./components/FormPhone.jsx";
import Form1stPuzzle from "./components/Form1stPuzzle.jsx";
import CONFIG from "./const/config.js";

const client = createClient(CONFIG.supabaseUrl, CONFIG.supabaseSecretKey);

export default function App() {

  const [session, setSession] = useReducer(SessionReducer, {});
  const [currentPage, setCurrentPage] = useState("");
  const [menuToRender, setMenuToRender] = useState(true);
  const [contentIndicesToRender, setContentIndicesToRender] = useState(false);
  const [form2NumbersToRender, setForm2NumbersToRender] = useState(false);
  const [formLettersToRender, setFormLettersToRender] = useState(false);
  const [topMessageToRender, setTopMessageToRender] = useState(false);
  const [topMessageContent, setTopMessageContent] = useState("");

  // Appel une seule fois (avec le trick "[]" ) pour créer la session
  useEffect(() => {
    getSession(client).then((data) => {setSession({session, type: 'creation', value: data })});
  }, []);

  // Si la session n'est pas récupérée on affiche rien ou erreur
  if ((session.length < 1) || (session.route == null))
    return null;

  console.log("APP.js - Session:");
  console.log({session});
  
  const handleShowNewClue = () => {
    const hst2 = [...session.history];
    console.log("hst2[currentPage]");
    console.log(hst2);
    if (session.history[currentPage] < session.route[currentPage].texteIndice.length) {
      hst2[currentPage] = hst2[currentPage] + 1;
      console.log("hst2[currentPage]");
      console.log(hst2);
    }
    setSession({session, type: 'newClue', value: hst2, client: client });
  }

  const handlePhoneUpdate = (phoneNumber) => {
    setSession({session, type: 'newPhone', value: phoneNumber, client: client });
  };

  const handleWin1stPuzzle = () => {
    setSession({session, type: 'nextStep', client: client });
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

  const handleAnswer = (enigme) => {
    if (enigme === session.route.length - 1 && session.step < 3) {
      console.log("DERNIER ENIGME ATTEINTE");
      const dateVictoire = new Date().toISOString();
      console.log(dateVictoire)
      setSession({session, type: 'victoire', value: dateVictoire, client: client});
    } 
    console.log("handleAnswer");
  };

  const isAdminToRender = () => {
    if (session.teamcode.toUpperCase() === 'ADMINZ') return true;
    return false;
  }

  switch (session.step) {
    case 0:
      return (<FormPhone handlePhoneUpdate={handlePhoneUpdate} />);
    
    case 1:
      return (<Form1stPuzzle handleWin1stPuzzle={handleWin1stPuzzle} />);
    
    default:
      break;
    }

  return (
          
    <div className="App">
      <AdminResults
        client={client}
        render={isAdminToRender()}
        session={session}
      />
      <TopMessage
        render={topMessageToRender}
        message={topMessageContent}
      />
      <TopPageLogo
        session={session}
        enigme={currentPage}
        showMessage={handleShowTopMessage}
        renderButton={contentIndicesToRender}
      />
      <Menu
        render={menuToRender}
        enigmes={session.route}
        enigme={currentPage}
        eventChoixEnigme={handleChoixEnigme}
      />
      <ContentIndices
        render={contentIndicesToRender}
        enigmes={session.route}
        enigme={currentPage}
        history={session.history}
        handleBackToMenu={handleBackToMenu}
        handleShowHint={handleShowNewClue}
      />
      <Form2Numbers 
        render={form2NumbersToRender}
        enigmes={session.route}
        enigme={currentPage}
        history={session.history}
        handleBackToMenu={handleBackToMenu}
        handleShowHint={handleShowNewClue}
        handleAnswer={handleAnswer}
      />
      <FormLetters
        render={formLettersToRender}
        enigmes={session.route}
        enigme={currentPage}
        history={session.history}
        handleBackToMenu={handleBackToMenu}
        handleAnswer={handleAnswer}
      />
    </div>
    
  );
  
}
