import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";

import { user } from "./objets/user.js";
import { screen } from "./objets/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName))return
        getUserData(userName)
    }
});

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com um nome do usuário do Github')
    return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)
    console.log(getUserData)
    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
   
    user.setInfo(userResponse)
    user.setRopositories(repositoriesResponse)
    
    screen.renderUser(user)
}