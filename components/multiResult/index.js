import moment from 'moment'
import { useRouter } from 'next/router'

import { slug } from 'Utils'
import styles from 'Styles/Home.module.scss'

const multiResult = ({ hourly, home }) => {
    const router = useRouter()

    const clickHandler = (e) => {
        e.preventDefault()
        home && router.push(`/detail/${slug(hourly?.name)}`)
    }
    return (
        <div className={`${styles.multiple_result} ${home && styles.multiple_result_home}`} onClick={clickHandler}>
            {!home && <div className={styles.tooltip}>{hourly?.weather[0]?.description}</div>}
            {home && <div className={styles.multiple_result_home_title}>{hourly?.name}</div>}
            <img src={`http://openweathermap.org/img/wn/${hourly?.weather[0]?.icon}@2x.png`} />
            {!home && moment(hourly?.dt_txt).format("hh:mm")}
            <div className={styles.temp}>
                {Math.round(hourly?.main?.temp)}°С
            </div>
        </div>
    )
}

export default multiResult;