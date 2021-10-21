import { getRequests, deleteRequest } from "./dataAccess.js"


const requestItemListBuilder = (request) => {
    return `<li>
        Request #${request.id} is for ${request.description} at ${request.address}, with a budget of $${request.budget}, to be completed by the following date: ${request.neededBy}
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