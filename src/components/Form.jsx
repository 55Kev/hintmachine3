import React, { useState } from 'react';

export default function Form({
    render,
    enigmes,
    enigme,
    history,
    handleBackToMenu,
    handleShowHint
}) {
    
    const [formContent, setFormContent] = useState(1);
    const [firstNumber, setFirstNumber] = useState(1);
    const [secondNumber, setSecondNumber] = useState(1);
    const [showNewsletterForm, setShowNewsletterForm] = useState(false);
    const [message, setMessage] = useState('');
    
    if (!render) return;

    const handleFirstNumberChange = (e) => {
      setFirstNumber(parseInt(e));
    };
  
    const handleSecondNumberChange = (e) => {
      setSecondNumber(parseInt(e));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (firstNumber === enigmes[enigme].firstNumber && secondNumber === enigmes[enigme].secondNumber) {
        setMessage('Félicitations!');
        setShowNewsletterForm(true);
        setFormContent(2);
      } else {
        setMessage('Try again');
        setFormContent(3);
      }
    };
  
    const renderMessage = () => {
      return (
        <div>
          <p>{message}</p>
          {showNewsletterForm && <NewsletterForm />}
        </div>
      );
    };
  
    const NewsletterForm = () => {
      const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Logique pour soumettre le formulaire d'inscription à la newsletter
      };
  
      return (
        <form onSubmit={handleNewsletterSubmit}>
          {/* Formulaire d'inscription à la newsletter */}
          <button type="submit">S'inscrire à la newsletter</button>
        </form>
      );
    };

    const ResetAndBack = () => {
        Reset();
        handleBackToMenu();
    }

    const Reset = () => {
        setFormContent(1);
        setMessage('');
        setFirstNumber(0);
        setSecondNumber(0);
        setShowNewsletterForm(false);
    }

    const renderForm = () => {
        if (
                (typeof enigmes[enigme].firstNumber === 'undefined')
                || (typeof enigmes[enigme].secondNumber === 'undefined')
           )  {
            return ("Oups erreur :(");
        }    

        if (formContent === 2) {
            return (
                <div className="container text-center">
                    <div class="row boup">
                        <h1>Bravo ! Félicitations !</h1>
                    </div>
                    
                    <button
                        onClick={() => ResetAndBack()}
                        className="btn btn-primary btn-lg btn-block"
                    >
                        Revenir aux indices
                    </button>
                </div>

            );
        } else if (formContent === 3) {
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
                <div className="container text-center">
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
                                    <h4>Vérifier votre réponse</h4></button>
                        {message && renderMessage()}
                    </form>

                    <button
                        onClick={() => ResetAndBack()}
                        className="btn btn-primary btn-lg btn-block"
                    >
                        Revenir aux indices
                    </button>
                </div> 
            );
        }
    }

    return renderForm(formContent);
}