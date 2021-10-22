import { getRequests, getPlumbers, deleteRequest, saveCompletion} from "./dataAccess.js"

const plumbers = getPlumbers()

const requestItemListBuilder = (request) => {
    return `<li>
        Request #${request.id}: ${request.description}
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
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        </li>`
}


export const Requests = () => {
    const requests = getRequests()

    // let html = `
    //     <ul>
    //         ${
    //             requests.map(requestItemBuilder())
    //         }
    //     </ul>
    // `
    let html = "<ul>"
    const listItems = requests.map(requestItemListBuilder)
    html += listItems.join("")
    html += "</ul>"

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
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
                requestId: requestId,
                plumberId: plumberId,
                date_created: new Date().toLocaleDateString()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
                saveCompletion(completedService)
                // deleteRequest(parseInt(completedService.requestId)) Can't completely delete because the completions api references the requests api for that info...

        }
    }
)