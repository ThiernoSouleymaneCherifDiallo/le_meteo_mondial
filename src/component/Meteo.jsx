import React, { useState, useEffect } from 'react'
import axios from "axios"
import logo from "./../assets/logo.jpeg"
import humidity_img from "./../assets/humidity.png"
import precision_img from "./../assets/pression.png"
import tempmin_img from "./../assets/tempmin.png"
import PageNotFound from './PageNotFound'



export default function Meteo() {

    const [search, setSearch] = useState('Conakry')
    const [temp, setTemp] = useState(0)
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [precision, setPrecision] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [tempmin, setTempmin] = useState(0)
    const [icon, setIcon] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        setSearch(document.querySelector('input').value)
        console.log(search)
        searchInformation(search)
        console.log("valeur : " + search)
    }

    {/*const handleChange = (e)=>{
        setSearch( e.target.value )
    }*/}

    useEffect(() => {
        searchInformation(search)
    })

    function searchInformation(pays) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${pays}&units=Metric&appid=d71b748f8521e528e834078b0a34eacf`)
            .then(response => {
                console.log(response.data)
                setTemp(response.data.main.temp)
                setLat(response.data.coord.lat)
                setLon(response.data.coord.lon)
                setTempmin(response.data.main.temp_min)
                setHumidity(response.data.main.humidity)
                setPrecision(response.data.main.pressure)
            })
            .catch(err => {
                setTemp("null")
            })
    }

    return (
        <div style={{ width: "450px", border: "1px solid", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "10px" }}>
            <h2 style={{ textAlign: "center" }} >Meteo</h2>

            <form action="#" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                <input type="text" style={{ padding: "10px", fontSize: "18px", width: "calc(100% - 30px )", borderRadius: "10px" }} className="border-2" id="search" />
                <label htmlFor="search"></label>
                <button onClick={handleClick} style={{ width: 'auto', height: "40px", cursor: "pointer" }}>Rechercher</button>
            </form>

            {temp === "null" ? <PageNotFound /> : <div>

                <h2 style={{ textAlign: "center" }} >{search}</h2>

                <div className="content">
                    <img style={{ objectFit: "cover", width: "120px", height: "120px", margin: 'auto', display: "block" }} src={logo} alt="" />

                    <p style={{ textAlign: "center" }}>{temp}</p>

                    <div style={{ display: "flex", justifyContent: 'center', gap: "20px" }}>
                        <p>Longitude : {lat}</p>
                        <p>Latitude : {lon}</p>
                    </div>

                    <img style={{ objectFit: "cover", width: "40px", height: "40px", display: "block", margin: "auto" }} src={precision_img} alt="" />


                </div>



                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr", gap: "10px" }}>


                    <div style={{ border: "1px solid", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="field">
                        <p>Pression</p>
                        <div>
                            <p>{precision}</p>
                            <img style={{ objectFit: "cover", width: "40px", height: "40px" }} src={precision_img} alt="" />
                        </div>
                    </div>

                    <div style={{ border: "1px solid", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="field">
                        <p>Humidite</p>
                        <div>
                            <p>{humidity}</p>
                            <img style={{ objectFit: "cover", width: "40px", height: "40px" }} src={humidity_img} alt="" />
                        </div>
                    </div>

                    <div style={{ border: "1px solid", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="field">
                        <p>Temp min</p>
                        <div>
                            <p>{tempmin}</p>
                            <img style={{ objectFit: "cover", width: "40px", height: "40px" }} src={tempmin_img} alt="" />
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}
