import { DataTypes } from 'sequelize'
import { mysqlDB } from '../../../../external/db/mysql'

const ClientModel = mysqlDB.define('client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.BIGINT
  },
  p_ssn: {
    type: DataTypes.STRING,
    unique: true
  },
  s_ssn: {
    type: DataTypes.STRING,
    unique: true
  },
  agi: {
    type: DataTypes.INTEGER
  },
  refund_due: {
    type: DataTypes.DOUBLE
  },
  package_id: {
    type: DataTypes.INTEGER
  },
  prep_id: {
    type: DataTypes.INTEGER
  },
  file_name: {
    type: DataTypes.STRING
  }
})

export default ClientModel
