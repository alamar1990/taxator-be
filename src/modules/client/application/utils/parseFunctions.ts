export function parseAll(input: string) {
  // Address
  const ssnIndex = input.indexOf('SSN:')
  const start = input.lastIndexOf('\r\n', ssnIndex)
  const address = input.substring(start, ssnIndex).trim()
  const phoneIndex = input.indexOf('Phone:')
  const startPhone = input.lastIndexOf('\r\n', phoneIndex)
  const address2nd = input.substring(startPhone, phoneIndex).trim()

  //Name
  const addressIndex = input.indexOf(address)
  const fromBeggininToAddress = input.substring(0, addressIndex)
  const lastNumber = fromBeggininToAddress.match(/(\d+)(?=[^\d]+$)/g)[0]
  const name = input.substring(input.indexOf(lastNumber) + 2, addressIndex).trim()

  // Phone
  const dIndex = input.indexOf('(D)')
  const phone = input.substring(phoneIndex + 11, dIndex).trim()

  // SSN
  const pIndex = input.indexOf('(P)')
  const sIndex = input.indexOf('(S)')
  const p_ssn = input.substring(pIndex + 3, sIndex).trim()
  const address2ndIndex = input.indexOf(address2nd)
  const s_ssn = input.substring(sIndex + 3, address2ndIndex).trim()

  // AGI
  const agiIndex = input.indexOf('AGI:')
  const compTaxIndex = input.indexOf('Computed Tax:')
  const agi = input.substring(agiIndex + 4, compTaxIndex).trim()

  // Refund Due
  const rDueIndex = input.indexOf('Refund (Due):')
  const retIndex = input.indexOf('Return Information')
  const refund_due = input
    .substring(rDueIndex, retIndex - 5)
    .trim()
    .replace('Refund (Due): ', '')
    .trim()

  // Package
  const packIndex = input.indexOf('Package:')
  const eFileIndex = input.indexOf('eFile Status:')
  const packageId = input.substring(packIndex, eFileIndex).trim().replace('Package:', '').replace('|', '').trim()

  // PrepId
  const PIdIndex = input.indexOf('Prep ID:')
  const irsDepIndex = input.indexOf('IRS Dep Date:')
  const prep_id = input
    .substring(PIdIndex, irsDepIndex)
    .trim()
    .replace('Prep ID:', '')
    .replace('|', '')
    .replace('|', '')
    .trim()

  // fileName
  const fileNameIndex = input.indexOf('File Name:')
  const RTNIndex = input.indexOf('RTN:')
  const file_name = input.substring(fileNameIndex, RTNIndex).trim().replace('File Name:', '').replace('|', '').trim()

  return {
    name,
    address: `${address} ${address2nd}`,
    phone,
    p_ssn,
    s_ssn,
    agi,
    refund_due,
    packageId,
    prep_id,
    file_name
  }
}

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
