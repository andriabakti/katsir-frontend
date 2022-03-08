// package: numeral
import numeral from 'numeral'
import 'numeral/locales'

export const formatPrice = (number) => {
  numeral.locale('es')
  return numeral(number).format('0,0')
}