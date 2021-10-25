import { getRequests, getPlumbers, deleteRequest, saveCompletion } from "./dataAccess.js"


const requestItemListBuilder = (request) => {
    const plumbers = getPlumbers()

    return `<li class="service-item">
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
        </select>

            <button class="request__delete" id="request--${request.id}">
                Delete
            </button>

        </li>`
}


export const Requests = () => {
    const requests = getRequests()

    let html = "<ul>"
    const listItems = requests.map(requestItemListBuilder)
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
            // deleteRequest(parseInt(completedService.requestId)) Can't completely delete because the completions api references the requests api for that info...

            const requests = getRequests()
            for (const request of requests) {
                if (parseInt(requestId) === request.id) {
                    request.completed = true
                }
                
            }
        }
    }
)

