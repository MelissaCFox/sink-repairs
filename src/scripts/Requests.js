import { getRequests, getPlumbers, deleteRequest, saveCompletion, getCompletions} from "./dataAccess.js"

const plumbers = getPlumbers()

const requestItemListBuilder = (request) => {
    
    //====My attempt to make the complete select element disappear after using...
    // const completions = getCompletions()
    // let itemHTML = `<div><li>Request #${request.id}: ${request.description}`
    
    // //if the requestID exists in compeletions => continue, else ===
    // for (const completion of completions) {
    //     if (!completion.requestId === request.id) {
    //         itemHTML += `<button class="request__delete"
    //                      id="request--${request.id}">
    //                     Delete
    //                 </button>
    //             </li>`
    //     } else {
    //         itemHTML += `<select class="plumbers" id="plumbers">
    //                     <option value="">Choose</option>
    //                     ${
    //                         plumbers.map(
    //                             plumber => {
    //                                 return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
    //                                 }
    //                             ).join("")
    //                     }
    //                 </select>
        
    //                 </li>
    //                 <button class="request__delete"
    //                     id="request--${request.id}">
    //                     Delete
    //                  </button>
    //             </div>`
    //     }
    // }
    // itemHTML += `  <button class="request__delete"
    //                 id="request--${request.id}">
    //                 Delete
    //             </button>
    //             </li>`
    // return itemHTML

    //====Original setup for complete selector and delete button
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