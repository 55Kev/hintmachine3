import { useState, useEffect } from 'react';
import { Calendar } from "lucide-react";


const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
    },
    formGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    label: {
      fontSize: '1.5rem',
      fontWeight: '500',
    },
    inputWrapper: {
      position: 'relative',
    },
    dateInput: {
      paddingLeft: '2rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #e2e8f0',
      borderRadius: '0.375rem',
      width: '200px',
    },
    calendarIcon: {
      position: 'absolute',
      left: '0.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280',
    },
    tableWrapper: {
      position: 'relative',
      overflow: 'auto',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
    },
    table: {
      width: '100%',
      textAlign: 'left',
      borderCollapse: 'collapse',
      fontSize: '1.1rem',
    },
    thead: {
      backgroundColor: '#f3f4f6',
    },
    th: {
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      color: 'black',
    },
    td: {
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #e5e7eb',
    },
    tr: {
      backgroundColor: 'black',
    },
    trHover: {
      '&:hover': {
        backgroundColor: '#f9fafb',
      }
    },
    noData: {
      textAlign: 'center',
      padding: '1rem',
      color: '#6b7280',
    }
  };

export function AdminResults({client, render, session}) {
  const today = new Date().toISOString().split('T')[0];
  const ptsParIndice = 5;
  const indicesParEnigme = 3;
  const [selectedDate, setSelectedDate] = useState(today);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
        // Dans un cas réel, ce serait un appel API
        //const filtered = mockData.filter(item => item.date === selectedDate);
        const date = new Date(selectedDate);
        const dateDebut = date.toISOString();
        date.setHours(date.getHours() + 24);
        const dateFin = date.toISOString();

        const { data, error } = await client.from("Sessions")
            .select('teamcode, numTel, parcours, datefin, historique, datecreation')
            .order('datecreation', { ascending: false })
            .lt('datecreation', dateFin)
            .gt('datecreation', dateDebut);
        console.log(data);
        setFilteredData(data);
    };

    fetchData();
  }, [selectedDate]);

  if (!render) return;

  if (filteredData == null) {console.log("ADMIN: pas de data!");return;}

  // Obtenir les noms des colonnes à partir du premier enregistrement

  /*const columns = filteredData.length > 0 
    ? Object.keys(filteredData[0])
    : [];
*/
    let data = new Array();

   if (filteredData.length > 0) {
        for (const session of filteredData ) {
            console.log(session.historique);
            let sumWithInitial = 0;
            if (session.historique !== null) {
                const initialValue = 0;
                sumWithInitial = session.historique.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                initialValue,
                );
                sumWithInitial = (session.historique.length * indicesParEnigme * ptsParIndice) - ( sumWithInitial * ptsParIndice );
            }
            const dateDepart = new Date(session.datecreation);
            let tpsParcours = "Pas arrivée";
            if (session.datefin !== null) {
                const dateArrivee = new Date(session.datefin);
                const tps = new Date(dateArrivee - dateDepart);
                tpsParcours = tps.getHours()+"h"+tps.getMinutes();
            }

            //select('teamcode, numTel, parcours, datefin, historique')
            data.push({
                Team: session.parcours+" - "+session.teamcode,
                NumTel: session.numTel,
                HeureDepart: dateDepart.getHours()+"h"+dateDepart.getMinutes(),
                TempsParcours: tpsParcours,
                NbIndices: sumWithInitial+" pts ",
                Historique: session.historique
            })
        }
    }

    const columns = data.length > 0 
    ? Object.keys(data[0])
    : [];

    return (
        <div style={styles.container}>
          <div style={styles.formGroup}>
            <label htmlFor="date-select" style={styles.label}>
              Sélectionner une date:
            </label>
            <div style={styles.inputWrapper}>
              <input
                id="date-select"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={styles.dateInput}
              />
              <Calendar style={styles.calendarIcon} size={16} />
            </div>
          </div>
    
          {data.length > 0 ? (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    {columns.map((column) => (
                      <th key={column} style={styles.th}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} style={{...styles.tr, ...styles.trHover}}>
                      {columns.map((column) => (
                        <td key={`${row.id}-${column}`} style={styles.td}>
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.noData}>
              Aucun enregistrement trouvé pour cette date
            </div>
          )}
        </div>
      );
};
export default AdminResults;
