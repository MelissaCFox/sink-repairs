import { getRequests, getPlumbers, deleteRequest, saveCompletion, updateRequest, getCompletions } from "./dataAccess.js"


const requestItemListBuilder = (request) => {
    const plumbers = getPlumbers()
    let html = ``
    if (request.completed === false) {
        html += `
            <li class="service-item incomplete">
                <section class="service-info">
                    Request #${request.id}: ${request.description}
                </section>
                <select class="plumbers" id="plumbers">
                    <option value="">Choose</option>
                    ${
                        plumbers.map(
                            plumber => {
                                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                            }
                        ).join("")
                    }
                </select>`
    } else {
        const completions = getCompletions()
            const foundCompletion = completions.find(
                (completion) => {
                    return completion.requestId === request.id
                }
            )
            const completionPlumberId = foundCompletion.plumberId
            const foundPlumber = plumbers.find(
                (plumber) => {
                    return plumber.id === completionPlumberId
                }
            )
        html += `<li class="service-item completed">
                    <section class="service-info">
                        Request #${request.id} has been completed by ${foundPlumber.name}.
                    </section>`
    }

    html += `<button class="request__delete" id="request--${request.id}">
                Delete
            </button>
            </li>`

    return html
}


export const Requests = () => {
    const requests = getRequests()
    const sortedRequests = requests.sort(function(a,b){return a.completed-b.completed})

    let html = "<ul>"
    const listItems = sortedRequests.map(requestItemListBuilder)
    html += listItems.join("")
    html += "</ul>"

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completedService = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: new Date().toLocaleDateString()
            }
            
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completedService)
            //find request index that this event target 
            const requests = getRequests()
            const foundRequest = requests.find(
                (request) => {
                    return request.id === parseInt(requestId)
                }
            )
            updateRequest(foundRequest.id)

           
        }
    }
)

