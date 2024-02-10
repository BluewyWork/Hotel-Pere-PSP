import { Hono } from 'hono'
import { showOneGuest } from '../../controllers/guest/guest/showOneGuest'
import { showMyself } from '../../controllers/guest/guest/showMyself'
import { authMiddleware } from '../../middleware/authMiddleware'

const app = new Hono()

//Esta ruta no empieza por api debido a que se le aplica otro middleware diferent de auth
// que es mediante headers
// La ruta para testear:
//http://localhost:8000/guest/me (GET)

app.use('/me', authMiddleware)
app.get('/me', async (c) => {
    const result = await showMyself(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
