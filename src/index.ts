import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import { jwt } from 'hono/jwt'

import employeeAuth from './routes/employeeAuth'
import guestAuth from './routes/guestAuth'

import employeeRoom from './routes/employeeRoom'
import guestRoom from './routes/guestRoom'

import employeeBook from './routes/employeeBook'
import guestBook from './routes/guestBook'

import guestTable from './routes/guestTable'
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
app.route('/auth/employee', employeeAuth)
app.route('/auth/guest', guestAuth)

// admin operations
app.route('/api/admin/room', employeeRoom)
app.route('/api/admin/books', employeeBook)

// guest operations
app.use('/guest/', authMiddleware)
app.route('/guest', guestTable)

app.use('/guest/book/', authMiddleware)
app.route('/guest/book', guestBook)

app.route('/guest/room', guestRoom)

// listen to incoming requests
const port = parseInt(process.env.PORT) || 8000

serve({
    fetch: app.fetch,
    port,
})

console.log(`API URL => http://localhost:${port}`)
