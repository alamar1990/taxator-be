import { app } from './external/app'
import { config } from './config'

const PORT = config.PORT || 5000

app.listen(PORT, () => {
  console.log(process.env)
  console.log(`🚀 Application Taxator-Backend running on PORT -> ${PORT}`)
})
