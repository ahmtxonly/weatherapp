import _ from 'lodash'

import styles from 'Styles/Home.module.scss'

import { formatDailyTitle } from 'Utils'
import { MultiResult } from 'components'

const fiveDailyResult = ({ data }) => {
    return (
        <>
            <div className={styles.five_daily_result}>
                {
                    _.chunk(data, 8)?.map((day, index) => {
                        return <div key={index} className={styles.daily_result}>
                            <div className={styles.five_daily_title}>{formatDailyTitle(day, index)}</div>
                            <div className={styles.hours}>
                                {day?.map((hourly, hourlyIndex) => <MultiResult key={hourlyIndex} hourly={hourly} />)}
                            </div>
                        </div>
                    })
                }
            </div>


        </>
    )
}


export default fiveDailyResult