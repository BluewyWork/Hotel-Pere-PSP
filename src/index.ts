import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from './routes/employee'

import admin from './routes/room/admin'
import client from './routes/room/client'
import customer from './routes/customer'
import employee from './routes/employee'

import mongoose from 'mongoose'
import 'dotenv/config'
import { jwt } from 'hono/jwt'

import userRoutes from './routes/client/index'

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

app.route('/auth', auth)
app.route('/api/admin/room', admin)
app.route('/api/client/room', client)
app.route('/api/customers', customer)
app.route('/api/employee', employee)

app.route('/api/user', userRoutes)

const port = 8000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
