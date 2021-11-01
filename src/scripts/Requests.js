import { getRequests, getPlumbers, deleteRequest, saveCompletion, getCompletions, getSortedRequests } from "./dataAccess.js"


const requestItemListBuilder = (request) => {
    const plumbers = getPlumbers()
    
    const completions = getCompletions()
    const foundCompletion = completions.find(
        (completion) => {
            return completion.requestId === request.id
        }
    )

    let html = ""
    if (foundCompletion) {
        const foundCompletionPlumberId = foundCompletion.plumberId
        const foundPlumber = plumbers.find(
            (plumber) => {
                return plumber.id === foundCompletionPlumberId
            }
        )

        html += `<li class="service-item completed">
                    <section class="service-info">
                    Request #${request.id} was completed by ${foundPlumber.name}.
                    </section>`
    } else {
        html += `
            <li class="service-item incomplete">
                <section class="service-info">
                    Request #${request.id}: ${request.description}
                </section>
                <select class="plumbers" id="plumbers">
                    <option value="">Choose</option>
                    ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
            }
                </select>`
    }

    html += `<button class="request__delete" id="request--${request.id}">
                Delete
            </button>
            </li>`

    return html

}


export const Requests = () => {

    const sortedRequests = getSortedRequests()

    let html = "<ul>"

    const sortedListItems = sortedRequests.map(requestItemListBuilder)

    html += sortedListItems.join("")

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
                //stringified date for readability
                date_completed: new Date().toLocaleDateString()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completedService)
            

        }
    }
)

