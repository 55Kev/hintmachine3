import React, { useState } from 'react';

const FormPhone = ({
    handlePhoneUpdate
}) => {
      const [phoneNumber, setPhoneNumber] = useState('');
      const [error, setError] = useState('');
    
      const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
        setError('');
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (phoneNumber.length < 10) {
          setError('Le numéro de téléphone doit contenir au moins 10 chiffres.');
        } else {
          setError('');
          handlePhoneUpdate(phoneNumber);
        }
      };
    
      const styles = {
        form: {
          maxWidth: '90%',
          margin: '2rem auto',
          padding: '1rem',
          backgroundColor: 'black',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        formGroup: {
          marginBottom: '1rem',
        },
        label: {
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 'bold',
          color: 'white',
          fontSize: '2rem',
        },
        input: {
          width: '60%',
          marginTop: '70px',
          marginBottom: '20px',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '2rem',
        },
        errorMessage: {
          color: 'red',
          fontSize: '2rem',
          marginTop: '0.5rem',
        },
        button: {
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '0.75rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '2rem',
          transition: 'background-color 0.3s',
        },
      };
    
      return (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="phoneNumber" style={styles.label}>
              <h2>Étape n°1 :</h2>
              <p>Indiquez le numéro de téléphone d’un membre de votre équipe.</p>
              <h5>Il sera uniquement utilisé aujourd’hui si nous avons absolument besoin de vous contacter. Ce numéro n’est pas conservé par ExitGame. Il ne sera jamais utilisé pour vous spammer ou pour d'autres communications.</h5>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              style={styles.input}
              placeholder="Numéro de téléphone"
            />
          </div>
          {error && <p style={styles.errorMessage}>{error}</p>}
          <button type="submit" style={styles.button}>
            Valider
          </button>
        </form>
      );
    };
    
export default FormPhone;