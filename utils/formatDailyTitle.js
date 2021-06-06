import moment from 'moment'

const formatDate = (date) => {
    return moment(date?.dt_txt).format("MM-DD-YYYY")
}

const formatDailyTitle = (date, index) => {
    switch (index) {
        case 1:
            return `${formatDate(date[1])} -  Tomorrow`
        case 2:
            return `${formatDate(date[2])} -  2 day later`
        case 3:
            return `${formatDate(date[3])} -  3 day later`
        case 4:
            return `${formatDate(date[4])} -  4 day later`
        default:
            return `${formatDate(date[0])} -  Today`
    }
}


export default formatDailyTitle