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
    const [affichage, setAffichage] = useState('_'.repeat(5));
  
    if (!render) return;

    if (typeof enigmes[enigme].reponse === 'undefined') {
        return ("Oups ! Erreur :(, la réponse n'est pas configurée");
    } else {
        var reponseAttendue = enigmes[enigme].reponse.toUpperCase();
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
                handleAnswer(enigme);
                setFormState(2);
            } else {
                setMessage('Désolé, ce n\'est pas la bonne réponse. Réessayez !');
                setReponse('');
            }
        }

    };

    const renderForm = () => {

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

        } else {
            return (
                <div className="container">
                    <form id="reponseForm">
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