import React from 'react'
import { useEffect, useState } from "react"
import index from "../../../back/index"

export default function Home() {

    user = [
        // {
        //     id: 1,
        //     nome: "joão",
        //     idade: 30,
        //     email: "joão@gmail.com"
        // },
        // {
        //     id: 1,
        //     nome: "joão",
        //     idade: 30,
        //     email: "joão@gmail.com"
        // },
    ];

    async function getUser() {
        usersFromApi = await index.get('/usuarios')

        users = usersFromApi.data
        console.log(users)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="container-home">
            <form onSubmit=''>
                <h1 className></h1>
                <input name="nome" type="text" />
                <input name="idade" type="number" />
                <input name="email" type="email" />

                <button type="button" onClick="submit">Cadastrar</button>
            </form>

            {user.map(user => {
                <div key={user.id} className="container">
                    <div>
                        <p>nome: {user.nome} </p>
                        <p>idade: {user.idade}</p>
                        <p>email: {user.email}</p>

                    </div>
                    <button>
                        <img src="" alt="" />
                    </button>
                </div>
            })}

        </div>
    )
}
