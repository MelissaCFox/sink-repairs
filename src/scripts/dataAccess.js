const applicationState = {
    requests: [],
    plumbers: [

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

export const getSortedRequests = () => {
    return applicationState.requests.sort (
        (a,b) => {
            const completions = getCompletions()
            const foundACompletion = completions.find(
                (completion) => {
                    return (completion.requestId === a.id)
                }
            )
            let valueA = false
            if (foundACompletion) {
                valueA = true
            }
            
            const foundBCompletion = completions.find(
                (completion) => {
                    return (completion.requestId === b.id)
                }
            )
            let valueB = false
            if (foundBCompletion) {
                valueB = true
            }

            return valueA - valueB

        }
    )
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
    fetch(`${API}/completions`, fetchOptions)
    .then(completion => completion.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })    
} 

export const deleteCompletion = (id) => {
    return fetch(`${API}/completions/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

