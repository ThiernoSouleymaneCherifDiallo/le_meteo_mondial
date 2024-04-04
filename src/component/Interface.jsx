import { useState, useEffect } from 'react'

 import axios from 'axios'
function Interface() {
    const [ville, setVille] = useState('')
    const [selection, setSelection] = useState([])
    const [temp, setTemp]= useState(0)
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [precision, setPrecision] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [icon, setIcon] = useState(0)
    const [printVille, setPrintVille] = useState('')

    useEffect(() => {
        const newTab = JSON.parse(localStorage.getItem('ville selectionne'))
        if (newTab) {
            setSelection(newTab);
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(selection));
    }, [selection])



    const handleChange = (e) => {
        setVille(e.target.value)
        console.log(ville)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ville.trim()) {
            setSelection([...selection, ville])
            setVille('')
            console.log(ville)
        }

    }
    const handleDelete = (index) => {
        const newtodos =[...selection];
        newtodos.splice(index,1);
        setSelection(newtodos)
    }

    const printInformation =(ville)=>{
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=Metric&appid=d71b748f8521e528e834078b0a34eacf`
            )
            .then(response => {
                console.log(response.data)
                setTemp(response.data.main.temp)
                setLat(response.data.coord.lat)
                setHumidity(response.data.main.humidity)
                setLon(response.data.coord.lon)
                setPrecision(response.data.main.pressure)
                setIcon(response.data.main.icon)
                setPrintVille(ville)
            } )
    }


    return (
        <div>

            <div className='container'>
                <h1>Méteo</h1>
                <br />
                <br />
                <form>
                    <input type="text" value={ville} onChange={handleChange} />
                    <button type='submit' onClick={handleSubmit}>Ajouter </button>
                </form>
                <div className="row" >
                    <div className="bg-primary m-6" style={{width:"300px"}}>
                        <h5 style={{textAlign:"center"}}>Favoris</h5>
                        <ul >
                            {selection.map((ville, index) => (
                                <li key={index}>
                                    <button  onClick={() =>printInformation(ville)}>{ville}</button>
                                    <button bg-secondary onClick={() => handleDelete(index)}>Supprimer</button>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="bg-secondary m-2"style={{width:"300px",  backgroundImage:"url('./../../../public/backgroud.jpg')"}} >
                        <h2 style={{textAlign:"center"}}>{printVille}</h2>
                        <p>Temperature: {temp}°C</p>
                        <p>Latitude: {lat}</p>
                        <p>Longitude: {lon}</p>
                        <p>humidité: {humidity}</p>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Interface