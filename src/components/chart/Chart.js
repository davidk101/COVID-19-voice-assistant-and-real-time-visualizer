import React, {useState, useEffect} from 'react'
import { fetchDailyData } from "../../api";
import { Line } from 'react-chartjs-2' // react wrapper for Chart.js
import styles from './Chart.module.css'

const Chart = () => {

    const [dailyData, setDailyData] = useState([]) // once data is fetched, it is set to the state using hooks

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData()
            setDailyData(dailyData)
        }

        fetchAPI()
    })

    // returns an array with 71 objects from dailyData API call
    const lineChart = (

        dailyData[0] ? (<Line >
                data = {{ // two braces for dynamic object
                labels: dailyData.map(({date}) => date), // returns an array -  displaying dates from dailyData and displaying them as labels after destructuring the date
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed), // note: dailyData is not a function but rather an array and hence we map
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill:true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: '#(255,0,0,0.5)',
                    fill:true
                }],
                }}
            </Line>) : null
    )
/* class-based equivalent
    state = {
        dailyData: {}
    }
*/

    return (
        <div className = {styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart