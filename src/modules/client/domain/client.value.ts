import { ClientEntity } from './client.entity'

export class ClientValue implements ClientEntity {
  name: string
  address: string
  phone: number
  s_ssn: string
  p_ssn: string
  agi: number
  refund_due: number
  package_id: number
  prep_id: number
  file_name: string
  constructor({
    name,
    address,
    phone,
    s_ssn,
    p_ssn,
    agi,
    refund_due,
    package_id,
    prep_id,
    file_name
  }: {
    name: string
    address: string
    phone: number
    s_ssn: string
    p_ssn: string
    agi: number
    refund_due: number
    package_id: number
    prep_id: number
    file_name: string
  }) {
    this.name = name
    this.address = address
    this.phone = phone
    this.s_ssn = s_ssn
    this.p_ssn = p_ssn
    this.agi = agi
    this.refund_due = refund_due
    this.package_id = package_id
    this.prep_id = prep_id
    this.file_name = file_name
  }
}
