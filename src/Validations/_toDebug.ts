import { ShortDate, shortDateFormat } from '../ValueObjects/Date/ShortDate.type';

const date = '2023-10-26T10:00:00.000Z'

const firstReleaseDate = new ShortDate(date, 'first release date', 'yyyy-MM-dd')
const formatedDate = firstReleaseDate.isValid ? shortDateFormat(date, 'yyyy-MM-dd') : ''
const dateDay = new Date(date.trim()).getUTCDate()
const firstReleaseDateDay = new Date(firstReleaseDate.value).getUTCDate()
const formatedDateDay = new Date(formatedDate).getUTCDate()

console.log(date, firstReleaseDate, formatedDate, dateDay, firstReleaseDateDay, formatedDateDay)