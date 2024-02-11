import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import { jwt } from 'hono/jwt'

import authEmployee from './routes/authEmployee'
import authGuest from './routes/authGuest'

import roomEmployee from './routes/roomEmployee'
import roomGuest from './routes/roomGuest'

import bookEmployee from './routes/bookEmployee'
import bookGuest from './routes/bookGuest'

import tableGuest from './routes/tableGuest'

if (!process.env.DATABASE_URL || !process.env.PORT || !process.env.JWT_SECRET) {
    throw new Error('HOLD UP => MISSING ENV VARIABLES')
}

mongoose.connect(process.env.DATABASE_URL)
console.log(`MongoDB URL => ${process.env.DATABASE_URL}`)

const app = new Hono()

app.use(
    '/api/*',
    cors({
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
        credentials: true,
    })
)

app.use(
    '/api/*',
    jwt({
        secret: process.env.JWT_SECRET!!,
        cookie: 'jwt',
    })
)

// authentication stuff
app.route('/auth/employee', authEmployee)
app.route('/auth/guest', authGuest)

// admin operations
app.route('/api/admin/room', roomEmployee)
app.route('/api/admin/books', bookEmployee)

// guest operations
app.route('/guest', tableGuest)
app.route('/guest/room', roomGuest)
app.route('/guest/book', bookGuest)

// listen to incoming requests
const port = parseInt(process.env.PORT) || 8000

serve({
    fetch: app.fetch,
    port,
})

console.log(`API URL => http://localhost:${port}`)
