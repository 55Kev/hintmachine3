import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

// dashboard => https://dashboard.emailjs.com/

  /* APPEL :
  <EmailSender
  handleBackToMenu={handleBackToMenu}
  enigmes={tabEnigmes}
  enigme={currentPage}
  />*/

export default function EmailSender({
    render,
    enigmes,
    enigme,
    eventCloseFormBugReport,
    showMessage,
    renderButton
}) {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
        .sendForm('service_9a2nt69', 'template_6vq660v', form.current, {
            publicKey: 'pLp-LNIZMYbpYlqhz',
        })
        .then(
            () => {
            console.log('SUCCESS!');
            eventCloseFormBugReport();
            showMessage("Retour transmis, merci de votre message !");
            },
            (error) => {
            console.log('FAILED...', error.text);
            },
        );
    };

    const page = () => {
        //console.log(enigme);
        if (typeof enigmes[enigme] === 'undefined') {
            //console.log('undefined');
            return 99;
        } else {
            //console.log(enigmes[enigme]);
            return enigmes[enigme].page;
        }
        
    };

    const desc_enigme = () => {
        //console.log(enigme);
        if (typeof enigmes[enigme] === 'undefined') {
            //console.log('undefined');
            return 99;
        } else {
            //console.log(enigmes[enigme]);
            return "page "+enigmes[enigme].page+" - "+enigmes[enigme].texteIndice[0]+" - "+enigmes[enigme].texteIndice[1];
        }
        
    };

    //{enigmes[enigme].page}

    const EmailSender = (e) => {
        if (render) {
            return (
                <div className="email-form">
                    <form ref={form} onSubmit={sendEmail}>
                    <input type="hidden" name="user_email" value="55exitgame@gmail.com"/>
                    <input type="hidden" name="caracteristiques" value={desc_enigme()} />
                    <p><label>Décrivez-nous en quelques mots ce qui cloche avec l'énigme de la page {page()} </label></p>
                    <p><textarea name="message" rows="4" cols="50" /></p>
                    <p><input type="submit" value="Envoyer la remarque" /></p>
                    </form>
                    <p>
                        <button
                            onClick={() => eventCloseFormBugReport()}
                            >
                            Fermer ce formulaire
                        </button>
                    </p>
                </div>
            );
        } else {
            return ("");
        }
        
    }
    return EmailSender();
};