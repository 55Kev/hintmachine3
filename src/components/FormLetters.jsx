import React, { useState,useEffect } from 'react';
import Particules from "./Particules";

/*

    {
      page: 98,
      lib_page: "Test !",
      lib: "Vérifier la réponse à toute l'enquête - test !",
      reponse: "Totot"
    },

    */

export function FormLetters({
    render,
    enigmes,
    enigme,
    history,
    handleBackToMenu,
    handleAnswer
}) {
    const [formState, setFormState] = useState(1);
    const [reponse, setReponse] = useState('');
    const [message, setMessage] = useState('');
    const [affichage, setAffichage] = useState('');
  
    if (!render) return;

    if (typeof enigmes[enigme].reponse === 'undefined') {
        return ("Oups ! Erreur :(, la réponse n'est pas configurée");
    } else {
        var reponseAttendue = enigmes[enigme].reponse.toUpperCase();
        console.log(reponseAttendue.length);
        //setAffichage('_'.repeat(reponseAttendue.length));
        //setAffichage('_'.repeat(reponseAttendue.length);
    }

    const ResetAndBack = () => {
        Reset();
        handleBackToMenu();
    }

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

        if (typeof enigmes[enigme].lib === 'undefined') {
            var intro = "Vous avez terminé le parcours ? Quelle est la réponse à l'énigme ?";
        } else {
            var intro = enigmes[enigme].lib;
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
       
        if (formState === 2) {

            return (
                <div className="container text-center">
                    <div className="row boup confettis">
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

        } else {
            return (
                <div className="container">
                    <form id="reponseForm">
                        <h4>{intro}</h4>
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
                    <button
                        onClick={() => ResetAndBack()}
                        className="btn btn-primary btn-lg btn-block boop"
                    >
                        Revenir aux indices
                    </button>
                </div>
            );
        }   
    }
    return renderForm();
};
export default FormLetters;