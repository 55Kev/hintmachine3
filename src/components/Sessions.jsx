import AVI from "../const/avi";
import AVI2 from "../const/avi2";
import AIX from "../const/aix";
import SIF from "../const/sif";
import PANIER from "../const/panier";
import PANIERB2B from "../const/panierB2B";
import NIMES from "../const/nimes";
import VP from "../const/vp";

export async function getSession(client) {

    const session = {};
    const teamcode = getTeamCode();

    if (!hasNumber(teamcode)) {
        session.route = getParcours(teamcode);
        console.log("Code parcours générique, pas de sessions vérifiée.");
        return session;
    }

    const date = new Date();
    date.setHours(date.getHours() - 3);
    const dateString = date.toISOString();
    
    console.log(dateString);

    const { data, error } = await client.from("Sessions").select().order('datecreation', { ascending: false }).eq('teamcode', teamcode);
    console.log(data);

    if (error != null) {
        alert("Aïe Aïe Aïe :( \n Il semble que vous ne captez pas internet \n"+error.message);
        return null;
    }

    if (data.length < 1) {
        alert("Aïe Aïe Aïe :( \n Code d'équipe incorrect");
        return null;
    } else {
        if (new Date(data[0].datecreation) > date) {
            console.log("Session déjà en cours");
            session.data = data;
        } else {
            console.log("Session non démarée, création...");
            signInAnonymously(client);
            session.data = await createSession(client, getTeamCode(), new Date().toISOString());
        }
        
    }

    if (session.data[0].parcours != null) session.route = getParcours(session.data[0].parcours);
    else alert("Aïe Aïe Aïe :( \n Parcours de la session inconnu");
    
    console.log("RETOUR getSession");
    console.log(session);
    return session;
}

function getTeamCode() {
 
    const params = new URLSearchParams(window.location.search);

    return params.get("vi");

}

async function signInAnonymously(client) {
    const { data, error } = await client.auth.signInAnonymously();
}

async function createSession(client, code, dateString) {
    
    const { data, error } = await client
    .from('Sessions')
    .insert([
      { teamcode: code,
        datecreation: dateString
       },
    ])
    .select()

    if (error != null) alert("Aïe Aïe Aïe :( \n Il semble que vous ne captez pas internet, creation du jeu impossible \n"+error.message);

    return data;
}

function getParcours(teamcode) {
 
    const enigmeOptions = {
      "AVI": AVI,
      "AVII": AVI2,
      "SIF": SIF,
      "PANIER": PANIER,
      "PANIERBIZ": PANIERB2B,
      "AIX": AIX,
      "NIMES": NIMES,
      "VP" : VP
    };

    return (enigmeOptions.hasOwnProperty(teamcode.toUpperCase())) ? enigmeOptions[teamcode.toUpperCase()] : NIMES;

}

function hasNumber(myString) {
    return /\d/.test(myString);
}