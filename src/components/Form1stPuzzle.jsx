

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
    const reponseAttendue = '0078';
    const titre_intro = "Étape n°2 : Enigme de qualification";
    const intro = "Trouvez la solution aux énigmes sur la fiche avec le QR Code et entrez là ci-dessous";
    const title = "Bonne réponse !";
    const texte = "Montrez cet écran à l'animateur pour recevoir le dossier d'enquête !";
    const [formState, setFormState] = useState(1);
    const [reponse, setReponse] = useState('');
    const [message, setMessage] = useState('');
    const [affichage, setAffichage] = useState('_'.repeat(4));

    const Reset = () => {
        setFormState(1);
        setReponse('');
        setAffichage('');
        setMessage('');
    }

    const handleChange = (e) => {
        const text = e.target.value;
        setReponse(text);
        let nouveauAffichage = '';
        for (let i = 0; i < reponseAttendue.length; i++) {
            setMessage('');
            if (text.length > i) {
            nouveauAffichage += text[i].toUpperCase();
            } else {
            nouveauAffichage += '_';
            }
        }
        setAffichage(nouveauAffichage);
        if ( text.toString().length === reponseAttendue.length ) {
            if (text.toString().toUpperCase() === reponseAttendue) {
                setMessage('Bravo ! Vous avez trouvé la bonne réponse.');
                setFormState(2);
            } else {
                setMessage('Désolé, ce n\'est pas la bonne réponse. Réessayez !');
                setReponse('');
            }
        }

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