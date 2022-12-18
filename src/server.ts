import {app} from './external/app'
import 'dotenv/config'

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
