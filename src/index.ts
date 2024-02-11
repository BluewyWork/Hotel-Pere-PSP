import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authEmployee from './routes/employee'

import adminRooms from './routes/room/admin'
import guest from './routes/room/guest'
import authGuest from './routes/guest'
import adminBooks from './routes/books/employee'

import mongoose from 'mongoose'
import 'dotenv/config'
import { jwt } from 'hono/jwt'

import routesGuest from './routes/guest/index'
import { authMiddleware } from './middleware/authMiddleware'

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
app.route('/api/admin/room', adminRooms)
app.route('/api/admin/books', adminBooks)

// guest operations
app.route('/guest', routesGuest)
app.route('/guest/room', guest)

// listen to incoming requests
const port = parseInt(process.env.PORT) || 8000

serve({
    fetch: app.fetch,
    port,
})

console.log(`API URL => http://localhost:${port}`)
