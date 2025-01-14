import {useState} from 'react';
import './App.css';
import WeatherApp from "./components/weather/index.jsx";

function App() {
  // État de la valeur du champ de saisie
  const [inputValue, setInputValue] = useState("");

  // État du lieu entré dans le champ de saisie
  const [lieu, setLieu] = useState("");

  // Fonction pour traiter l'insertion d'un lieu dans le champ de saisie
  const handleFormSubmit = (e) =>
  {
    e.preventDefault();
    setLieu(inputValue);
  }

  return (
    <div>

      {/* Formulaire de saisie du lieu */}
      <form onSubmit={handleFormSubmit}>

        <input type="text" id="lieu" value={inputValue} placeholder="Lieu" 
          onChange={(e) => {setInputValue(e.target.value)}} maxLength={40}/>

          <button type="submit">&#128269;</button>

      </form>

      <WeatherApp lieu={lieu}/>
    </div>
    
  );
}

export default App;