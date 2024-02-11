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

app.use(
    '/api/*',
    jwt({
        secret: process.env.JWT_SECRET!!,
        cookie: 'jwt',
    })
)

// hacer middleware de empleado

app.route('/auth/employee', authEmployee)
app.route('/auth/guest', authGuest)
app.route('/api/admin/room', adminRooms)
app.route('/api/admin/books', adminBooks)


//Las rutas para las acciones de cliente desde android comienzan en /guest
//app.use('/guest/rooms/*', authMiddleware)

//guest/rooms/ rutas para acciones como reservar y listar habitaciones ,etc.
app.route('/guest/room', guest)
app.route('/guest', routesGuest)



const port = 8000
console.log(`Server is runn-ing on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
