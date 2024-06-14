
import EmailSender from "./EmailSender";
import { useEffect, useMemo, useState } from "react";

export default function TopPageLogo({
    enigmes,
    enigme,
    showMessage,
    renderButton
}) {
    const [bugReportToRender, setBugReportToRender] = useState(false);

    const showForm = (e) => {
        setBugReportToRender(true);
      };

    const handleCloseFormBugReport = () => {
        setBugReportToRender(false);
      };

    const page = () => {
        //console.log(enigme);
        if (typeof enigmes[enigme] === 'undefined') {
            //console.log('undefined');
            return 99;
        } else {
            //console.log(enigmes[enigme]);
            console.log(enigmes[enigme].page);
            return enigmes[enigme].page;
        }
        
    };

    const showBugButton = () => {

        if (renderButton) {
            return (
                <div className="bloc-bug" onClick={() => showForm()}>
                    /!/ Signaler un problème dans l'énigme {page()}
                </div>
            );
        } else return ("");

    };
    
    const renderTopPageLogo = () => {
        return (
            <div className="hero">
                <EmailSender
                    render={bugReportToRender}
                    enigmes={enigmes}
                    enigme={enigme}
                    eventCloseFormBugReport={handleCloseFormBugReport}
                    showMessage={showMessage}
                />
                <div className="hero-content">

                    <div className="col">
                    
                    </div>
                    <div className="col logo">
                    
                    </div>
                    <div className="col">
                        {showBugButton()}
                    </div>
                </div>
            </div>
        );
    };

    return renderTopPageLogo();
}