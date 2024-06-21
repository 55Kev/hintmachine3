import React, { useState } from 'react';
import Particules from "./Particules";

export default function Form2Numbers({
    render,
    enigmes,
    enigme,
    history,
    handleBackToMenu,
    handleShowHint
}) {
    
    const [formContent, setFormContent] = useState('');
    const [firstNumber, setFirstNumber] = useState(1);
    const [secondNumber, setSecondNumber] = useState(1);
    
    if (!render) return;

    const handleFirstNumberChange = (e) => {
      setFirstNumber(parseInt(e));
    };
  
    const handleSecondNumberChange = (e) => {
      setSecondNumber(parseInt(e));
    };
  
    const handleSubmit = (e) => {
      console.log("handleSubmit");
      e.preventDefault();
      if (firstNumber === enigmes[enigme].firstNumber && secondNumber === enigmes[enigme].secondNumber) {
        setFormContent("win");
      } else {
        setFormContent('tryAgain');
      }
    };

    const ResetAndBack = () => {
        Reset();
        handleBackToMenu();
    }

    const Reset = () => {
        setFormContent(1);
        setFirstNumber(0);
        setSecondNumber(0);
    }

            //lib_win_title: "Félicitations!",
        //lib_win_texte: "Vous avez identifié le vrai coupable !"

    const renderForm = () => {
        //console.log (`isWin = ${isWin} isTryAgain = ${isTryAgain}`);
        if (
                (typeof enigmes[enigme].firstNumber === 'undefined')
                || (typeof enigmes[enigme].secondNumber === 'undefined')
           )  {
            return ("Oups erreur :(");
        }

        if (typeof enigmes[enigme].lib_win_title === 'undefined') {
            var title = "Bravo ! Félicitations !";
        } else {
            var title = enigmes[enigme].lib_win_title;
        }

        if (typeof enigmes[enigme].lib_win_texte === 'undefined') {
            var texte = "Vous avez identifié le bon coupable !";
        } else {
            var texte = enigmes[enigme].lib_win_texte;
        }

        if ( formContent === "win" ) {
            return (
                <div className="container text-center">
                    <div class="row boup confettis">
                        <h1>{title}</h1>
                        <h4>{texte}</h4>
                    </div>
                    <Particules/>
                    <button
                        onClick={() => ResetAndBack()}
                        className="btn btn-primary btn-lg btn-block"
                    >
                        Revenir aux indices
                    </button>
                </div>

            );
        } else if ( formContent === "tryAgain" ) {
            return (
                <div className="container text-center">
                    <div class="row boup">
                        <h1>Mauvaise réponse !</h1>
                    </div>
                    <button
                        onClick={() => Reset()}
                        className="btn btn-primary btn-lg btn-block"
                    >
                        Tenter une nouvelle vérification
                    </button>
                    <button
                        onClick={() => ResetAndBack()}
                        className="btn btn-primary btn-lg btn-block"
                    >
                        Revenir aux indices
                    </button>
                </div>
            );
        } else {
            return (
                <div className="container text-center confettis">
                    <div class="row boup">
                        <h3>Vous avez terminé le parcours ? Vérifiez votre enquête !</h3>
                    </div>
                    <div class="row">
                        <h4>Quel est le numéro de suspect du coupable ?</h4>
                    </div>
                    <div class="row boup">
                        <button
                            className="btn btn-default btn-lg compteur"
                            onClick={() => handleFirstNumberChange(firstNumber-1)}
                        >
                        -
                        </button>

                        <span className='chiffre-central-compteur'>
                            {firstNumber}
                        </span>
                        <button
                            className="btn btn-default btn-lg compteur"
                            onClick={() => handleFirstNumberChange(firstNumber+1)}
                        >
                        +
                        </button>
                    </div>

                    <div class="row">
                        <h4>Combien de mots raturés dans son texte ?</h4>
                    </div>
                    <div class="row boup">
                        <button
                            className="btn btn-default btn-lg compteur"
                            onClick={() => handleSecondNumberChange(secondNumber-1)}
                        >
                        -
                        </button>

                        <span className='chiffre-central-compteur'>
                            {secondNumber}
                        </span>
                        <button
                            className="btn btn-default btn-lg compteur"
                            onClick={() => handleSecondNumberChange(secondNumber+1)}
                        >
                        +
                        </button>
                    </div>

                    
                    <form class="row boup" onSubmit={handleSubmit}>
                        <button className="btn btn-default btn-lg"
                                type="submit">
                                    <h4>Vérifier votre réponse</h4>
                        </button>
                    </form>

                    <button
                        onClick={() => ResetAndBack()}
                        className="btn btn-primary btn-lg btn-block">
                        Revenir aux indices
                    </button>
                </div> 
            );
        }
    }

    return renderForm();
}