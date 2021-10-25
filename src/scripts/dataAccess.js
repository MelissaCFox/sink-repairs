const applicationState = {
    requests: [],
    plumbers: [
        // {
        //     id: 1,
        //     name: "Maude",
        // },
        // {
        //     id: 2,
        //     name: "Merle"
        // }
    ],
    completions: []

}

const API = "http://localhost:8088"

export const fetchData = () => {
    fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
    fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceCompletions) => {
                // Store the external state in application state
                applicationState.completions = serviceCompletions
            }
        )
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbers) => {
                // Store the external state in application state
                applicationState.plumbers = plumbers
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}


export const getPlumbers = () => {
    return applicationState.plumbers.map
    (plumber => ({...plumber}))
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}



const mainContainer = document.querySelector("#container")

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


export const saveCompletion = (completedService) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },    
        body: JSON.stringify(completedService)
    }    
    return fetch(`${API}/completions`, fetchOptions)
    .then(completion => completion.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })    
}    


export const updateRequest = () => {
    const fetchOptions = {
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(updatedRequest)
    }
    return fetch(`${API}/requests`, fetchOptions)
    .then(request => request.json())
    .then(() => {
        mainContainer.container.dispatchEvent(new CustomEvent("stateChanged"))
    })


}
