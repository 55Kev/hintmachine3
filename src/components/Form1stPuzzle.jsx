

import React, { useState } from 'react';
import Particules from "./Particules";

/*

    {
      page: 98,
      lib_page: "Test !",
      lib: "Vérifier la réponse à toute l'enquête - test !",
      reponse: "Totot"
    },

    */

export function Form1stPuzzle({
    handleWin1stPuzzle,
    handleNextStep
}) {
    const reponseAttendue = '00';
    const titre_intro = "Étape n°2 : Enigme de qualification";
    const intro = "Trouvez la solution à l'énigme donnée par l'animateur et entrez là ci-dessous";
    const title = "Bonne réponse !";
    const texte = "Montrez cet écran à l'animateur pour recevoir le dossier d'enquête !";
    const [formState, setFormState] = useState(1);
    const [reponse, setReponse] = useState('');
    const [message, setMessage] = useState('');
    const [affichage, setAffichage] = useState('_'.repeat(2));

    const Reset = () => {
        setFormState(1);
        setReponse('');
        setAffichage('');
        setMessage('');
    }

    const handleChange = (e) => {
        let text = e.target.value;  
        let nouvelAffichage = '';
        let message = '';
        for (let i = 0; i < reponseAttendue.length; i++) {
            if (text.length > i) {
                nouvelAffichage += text[i].toUpperCase();
            } else {
                nouvelAffichage += '_';
            }
        }
        
        if ( text.toString().length === reponseAttendue.length ) {
            if (text.toString().toUpperCase() === reponseAttendue) {
                message = 'Bravo ! Vous avez trouvé la bonne réponse.';
                setFormState(2);
            } else {
                message = text+' n\'est pas la bonne réponse. Réessayez !';
                nouvelAffichage = '_'.repeat(reponseAttendue.length);
                text = '';
            }
        }
        setReponse(text);
        setAffichage(nouvelAffichage);
        setMessage(message);
    };

    const renderForm = () => {

        if (formState === 2) {

            return (
                <div className="container text-center vert">
                    <div className="row boup confettis">
                        <h2>{title}</h2>
                        <h4>{texte}</h4>
                    </div>
                    <div className="row boup confettis">

                    </div>
                    <Particules/>
                    <button
                        onClick={() => handleWin1stPuzzle()}
                        className="btn btn-primary btn-lg btn-block"
                    >
                        <p>Montrez cet écran à l'animateur</p><p>puis cliquez ici</p>
                    </button>
                </div>
            );

        } else {
            return (
                <div className="container">
                    <form id="reponseForm" className="firstPuzzle">
                        <div className="boup confettis">
                            <h2>{titre_intro}</h2>
                            <h4>{intro}</h4>
                        </div>
                        <div className='message'>{message}</div>
                        <div className='reponse'>{affichage}</div>
                        <div className='input'>
                            <input
                                type="text"
                                value={reponse}
                                onChange={handleChange}
                                maxLength={reponseAttendue.length}
                                autoCapitalize="characters"
                                placeholder='Entrez votre réponse'
                            />
                        </div>
                    </form>
                </div>
            );
        }   
    }
    return renderForm();
};
export default Form1stPuzzle;