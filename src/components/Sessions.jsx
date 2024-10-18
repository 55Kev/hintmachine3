import AVI from "../const/avi";
import AVI2 from "../const/avi2";
import AIX from "../const/aix";
import SIF from "../const/sif";
import PANIER from "../const/panier";
import PANIERB2B from "../const/panierB2B";
import NIMES from "../const/nimes";
import VP from "../const/vp";

export async function updateSession(client, session) {

    signInAnonymously(client);
    
    const { data, error } = await client
    .from('Sessions')
    .update([
      { 
        historique: session.history,
        numTel: session.phone,
        step: session.step,
        //datefin: session.datefin
       },
    ])
    .eq('id', session.id)
    .select();
    console.log("*** UpdateSession: Data mis à jour en ligne:");
    console.log(data);

    if (error != null) alert("Aïe Aïe Aïe :( \n Il semble que vous ne captez pas internet, creation du jeu impossible \n"+error.message);

    return data;
}

export async function getSession(client) {

    const session = {};
    session.teamcode = getTeamCode();

    if (!hasNumber(session.teamcode)) {
        session.route = getParcours(session.teamcode);
        session.datedepart = null;
        session.timer = false;
        session.history = new Array(session.route.length).fill(0);
        session.step = 3;
        console.log("Code parcours générique, pas de sessions vérifiée.");
        return session;
    }

    const date = new Date();
    date.setHours(date.getHours() - 3);
    const dateString = date.toISOString();
    
    console.log(dateString);

    const { data, error } = await client.from("Sessions").select().order('datecreation', { ascending: false }).eq('teamcode', session.teamcode);
    console.log(data);

    if (error != null) {
        alert("Aïe Aïe Aïe :( \n Il semble que vous ne captez pas internet \n"+error.message);
        return null;
    }

    if (data.length < 1) {
        alert("Aïe Aïe Aïe :( \n Code d'équipe incorrect");
        return null;
    } else {

        session.timer = true;

        if (data[0].parcours != null) {
            session.route = getParcours(data[0].parcours);
        } else {
            alert("Aïe Aïe Aïe :( \n Parcours de la session inconnu");
            return null;
        }

        if (data[0].enigme_depart != null) {
            session.enigme_depart = data[0].enigme_depart;
        } else {
            session.enigme_depart = true;
        }

        if (new Date(data[0].datecreation) > date) {
            console.log("Session déjà en cours");
            session.data = data;
            session.datedepart = data[0].datecreation;
            session.id = data[0].id;
            session.step = data[0].step;
            session.phone = data[0].numTel;
            //Correction automatique de la base de donnée si historique manquant...
            if (data[0].historique == null) {
                console.log("History null");
                session.history = new Array(session.route.length).fill(0);
            }
                
            else
                session.history = data[0].historique;
            
            console.log("History en BDD");
            console.log(data[0].historique);
        } else {
            console.log("Session non démarrée, création...");
            session.datedepart = new Date().toISOString();
            session.step = 0;
            session.phone = 0;
            session.data = await createSession(client, session.teamcode, session.datedepart, data[0].parcours);
            session.id = session.data[0].id;
            session.history = new Array(session.route.length).fill(0);
        }
    }
    
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

async function createSession(client, code, dateString, route) {

    await signInAnonymously(client);
    
    const { data, error } = await client
    .from('Sessions')
    .insert([
      { teamcode: code,
        datecreation: dateString,
        parcours: route,
        step: 0
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

export function SessionReducer(state, action) {
    let st = {};
    switch (action.type) {
        case "nextStep":
            st = { ...state, step: state.step + 1 };
            if (state.timer) updateSession(action.client, st);
            return st;
            
        case "newPhone":
            st = { ...state, phone: action.value, step: state.step + 1 };
            if (state.timer) updateSession(action.client, st);
            return st;

        case "creation":
            return action.value;

        case "newClue":
            st = { ...state, history: action.value };
            if (state.timer) updateSession(action.client, st);
            return st;

        case "victoire":
            st = { ...state, datefin: action.value  };
            if (state.timer) updateSession(action.client, st);
            return st;

        default:
            return "SessionReducer: Unrecognized command";
    }
  }

  export function isUpdateDatabaseNecessary(session, prevSession){
    //historique: session.history,
    if ((prevSession.step !== session.step) || 
            (prevSession.phone !== session.phone) || 
            (prevSession.history !== session.history) || 
            (prevSession.datefin !== session.datefin)) {
        return true;
    }
    return false;
  }