import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from './routes/user'

import admin from './routes/room/admin'
import client from './routes/room/client'
import customer from './routes/customer'

import mongoose from 'mongoose'
import 'dotenv/config'

const app = new Hono()
console.log(process.env.DATABASE_URL!!)
mongoose.connect(process.env.DATABASE_URL!!)

app.use(
    '/api/*',
    cors({
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
        credentials: true,
    })
)

app.route('/api/', auth)
app.route('/api/admin/room/', admin)
app.route('api/client/room', client)
app.route('api/customers', customer)

const port = 8000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
