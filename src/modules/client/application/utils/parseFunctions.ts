export function parseName(line: string) {
  const name = line
    .split(' ')
    .filter((s) => s !== '')
    .join(' ')
  return name
}

export function parseAddressAndSsn(line: string) {
  const ssnIndex = line.indexOf('SSN:')
  const pIndex = line.indexOf('(P)')
  const sIndex = line.indexOf('(S)')

  const textBetweenPAndS = line.substring(pIndex + 3, sIndex).trim()
  const textAfterS = line.substring(sIndex + 3).trim()
  const textBeforeSsn = line.substring(0, ssnIndex).trim()
  return { address: textBeforeSsn, p_ssn: textBetweenPAndS, s_ssn: textAfterS }
}

export function parsePhone(line: string) {
  const eIndex = line.indexOf('(E)')
  const dIndex = line.indexOf('(D)')
  const phoneIndex = line.indexOf('Phone:')

  const textBetweenEAndD = line.substring(eIndex + 3, dIndex).trim()
  const textBeforePhone = line.substring(0, phoneIndex).trim()
  return { address2ndSection: textBeforePhone, phone: textBetweenEAndD }
}

export function agiParse(line: string) {
  const agiIndex = line.indexOf('AGI:')
  const compTaxIndex = line.indexOf('Computed Tax:')

  const textBetweenAgiAndCompTax = line.substring(agiIndex + 4, compTaxIndex).trim()
  return { agi: textBetweenAgiAndCompTax }
}

export function refundDueParse(line: string) {
  const refDueIndex = line.indexOf('Refund (Due):')

  const textAfterRefDueIndex = line.substring(refDueIndex + 13).trim()
  return { refundDue: textAfterRefDueIndex }
}
