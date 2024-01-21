import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from './routes/user'

const app = new Hono()

app.use(
    '/api/*',
    cors({
        origin: 'http://localhost:3000',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
        credentials: true,
    })
)

app.route('/api/', auth)

const port = 8000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
