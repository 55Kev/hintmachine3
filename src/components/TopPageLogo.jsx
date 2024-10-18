
import EmailSender from "./EmailSender";
import { useEffect, useMemo, useState } from "react";
import Timer from "./Timer.jsx";

export default function TopPageLogo({
    session,
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
        if (typeof session.route[enigme] === 'undefined') {
            //console.log('undefined');
            return 99;
        } else {
            //console.log(enigmes[enigme]);
            console.log(session.route[enigme].page);
            return session.route[enigme].page;
        }
        
    };

    const showBugButton = () => {

        if (renderButton) {
            return (
                <div className="bloc-bug" onClick={() => showForm()}>
                    Signaler un problème dans l'énigme
                </div>
            );
        } else return ("");

    };
    
    const renderTopPageLogo = () => {
        return (
            <div className="hero">
                <EmailSender
                    render={bugReportToRender}
                    enigmes={session.route}
                    enigme={enigme}
                    eventCloseFormBugReport={handleCloseFormBugReport}
                    showMessage={showMessage}
                />
                <div className="hero-content">

                    <div className="col">
                    
                    </div>
                    <div className="col logo">
                        <Timer
                            datedepart={session.datedepart}
                        />
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