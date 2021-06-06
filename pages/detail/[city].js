import Link from 'next/link'
import { useRouter } from 'next/router'
import _ from 'lodash'

import { FiveDailyResult } from 'components'
import { slug } from 'Utils'

import styles from 'Styles/Home.module.scss'

const FiveDailySearch = (props) => {
    const router = useRouter()
    const { city } = router.query
    const { data } = props;

    return (
        <div className={styles.container}>
            <Link href="/">
                <a className={styles.backHome}><img src="/back.svg" /></a>
            </Link>
            <h1 className={styles.title}>Weather App</h1>
            <p><b>{city}</b> 5-day weather forecast</p>

            <FiveDailyResult data={data?.list} />
        </div>
    )

}

export async function getServerSideProps(ctx) {
    const res = await fetch(`${process.env.apiUrl}/forecast?q=${slug(ctx?.query?.city)}&appid=${process.env.apiKey}&units=metric`)
    const data = await res.json()
    return { props: { data } }
}

export default FiveDailySearch;