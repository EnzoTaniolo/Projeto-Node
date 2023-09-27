const express = require("express")
const uuid = require("uuid")
const cors = require('cors')

const port = 3001
const app = express()
app.use(express.json())
app.use(cors())

/*

 - Query Params => meusite.com/users?nome=enzo&age=18 //FILTROS
 - Rout Params => /users/2       // BUSCAR,DELETAR OU ATUALIZAR ALGO ESPECIFICO 
 - Request Body => { "name": "Enzo, "Age": 18 }

 GET => buscar informação no back-end
 POST => criar informação no back-end
 PUT/PATCH => Alterar/Atualizar informação no back-end
 DELETE => deletar informação no back-end

 - Middleware => INTERCEPTADOR => tem o poder de parar ou alterar dados da requisição

*/

// Neste projeto guardaremos as informações dos users nesse array para fins de simplificação, o correto seria em um Banco de dados

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })

    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get("/users", (request, response) => {
    return response.json(users)

})

app.post("/users", (request, response) => {

    try {
        const { name, age } = request.body

        if(age < 18) throw new Error("Only Allowed Users Over 18 Years Old")

        const user = { id: uuid.v4(), name, age }

        users.push(user)

        return response.status(201).json(user)
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
    finally{
        //o finally sempre será chamado após o try e/ou o catch serem feitos.
        console.log("Terminou Tudo")
    }
})

app.put("/users/:id", checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)


})

app.delete("/users/:id", checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()

})

app.listen(port, () => {
    console.log(`Server Started on port ${port}👍`)
})