import React, {useEffect, useState} from 'react'
import axios from "axios"

// Importation des images
import {ReactComponent as Soleil} from "../../assets/SVG/soleil.svg"
import {ReactComponent as Lune} from "../../assets/SVG/lune.svg"

const WeatherApp = ({lieu}) => {
  // État des données météo
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if(lieu.length){
      
        // Appel à l'API Open Weather Map pour obtenir les données météo du lieu saisie
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${lieu}&appid=0d411f3f974b68b6a8ccddda8966f841&units=metric&lang=fr`)
        .then(response => {
          setWeatherData(response.data)

        // Échec de l'appel
        }).catch(error => {
            console.error("Erreur pendant l'appel à l'API Open Weather Map: ", error)
        })
      }
    }, [lieu]) // Le deuxième argument doit être un array

    // S'il n'y a pas encore de données météo
    if(!weatherData)
    {
      // Afficher un écran de chargement
      return <div>Chargement...</div>
    }

    const heureUTC = new Date().getTime()/1000
    const heureLocale = heureUTC + weatherData.timezone

    // Booléen qui retourne vrai s'il fait jour
    const jourB = heureLocale > weatherData.sys.sunrise && heureLocale < weatherData.sys.sunset

    // ---- MISE EN MAJUSCULE DE LA PREMIÈRE LETTRE DE LA DESCRIPTION ---- //
    // Description du climat
    const climat = weatherData.weather[0].description

    // Groupe de lettres de la description du climat
    let lettresClimat = [];

    // Pour toutes les lettres de la description
    for(let i = 0; i < climat.length; i++)
    {
      // Si c'est la première lettre
      if(i == 0)
      {
        // Mettre cette lettre mise en majuscule dans le groupe de lettres
        lettresClimat.push(climat[i].toUpperCase());

        // Passer à la lettre suivante
        continue
      }

      // Mettre cette lettre dans le groupe de lettres
      lettresClimat.push(climat[i]);
    }

    // Fusion de toutes les lettres en un mot
    const climatFusion = lettresClimat.join("");

  // Présentation des données météo obtenu
  return (
    
    <div className="grand_conteneur">

    {/* Affichage du Soleil ou de la Lune en fonction de l'heure locale */}
    {jourB ? <Soleil className="soleil"/> : <Lune className="lune"/>}

        {/* Ensemble des données */}
        <div className="lieu, info">{weatherData.name}</div>
        <div className="temperature, info">{Math.round(weatherData.main.temp)}°C</div>
        <div className="climat, info">{climatFusion}</div>
        <div className="min_max, info">Min: {Math.round(weatherData.main.temp_min)}°C / Max: {Math.round(weatherData.main.temp_max)}°C</div>
        <div className="ressenti, info">Ressenti: {Math.round(weatherData.main.feels_like)}°C</div>
        <div className="humidite, info">Humidité: {weatherData.main.humidity}%</div>

    </div>
  )
}

export default WeatherApp