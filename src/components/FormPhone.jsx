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
          maxWidth: '300px',
          margin: '2rem auto',
          padding: '1rem',
          backgroundColor: '#f9f9f9',
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
          color: '#333',
        },
        input: {
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '1rem',
        },
        errorMessage: {
          color: '#d32f2f',
          fontSize: '0.875rem',
          marginTop: '0.5rem',
        },
        button: {
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '0.75rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background-color 0.3s',
        },
      };
    
      return (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="phoneNumber" style={styles.label}>
            <p>Étape n°1 :</p>
            <p>Indiquez-nous le numéro de téléphone d’un des membres de votre équipe.</p>
            <p>Il est uniquement utilisé aujourd’hui si nous avons besoin de vous joindre en urgence. Ce numéro n’est pas conservé par ExitGame. Il ne sera jamais utilisé pour vous spammer.</p>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              style={styles.input}
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>
          {error && <p style={styles.errorMessage}>{error}</p>}
          <button type="submit" style={styles.button}>
            Soumettre
          </button>
        </form>
      );
    };
    
export default FormPhone;