const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())

/*

 - Query Params => meusite.com/users?nome=enzo&age=18 //FILTROS
 - Rout Params => /users/2       // BUSCAR,DELETAR OU ATUALIZAR ALGO ESPECIFICO 
 - Request Body => { "name": "Enzo, "Age": 18 }

 GET => buscar informação no back-end
 POST => criar informação no back-end
 PUT/PATCH => Alterar/Atualizar informação no back-end
 DELETE => deletar informação no back-end

*/

// Neste projeto guardaremos as informações dos users aqui para fins de simplificação, o correto seria em um Banco de dados
const users = []

app.get("/users", (request, response)=>{
    return response.json(users)
    // rota do tipo get que usaremos para ver todos os usuarios

})

app.post("/users", (request, response)=>{
    const {name, age} = request.body

    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put("/users/:id", (request, response)=>{
    const { id } = request.params
    const {name, age } = request.body

    const updatedUser = {id, name, age}

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message:"User not found" })
        
    }

    users[index] = updatedUser

    return response.json(updatedUser)

})










app.listen( port, ()=>{
    console.log(`Server Started on port ${port}👍`)
})