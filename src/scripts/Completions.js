import { getCompletions, getPlumbers, deleteCompletion } from "./dataAccess.js";

const completionItemListBuilder = (completion) => {
    const plumbers = getPlumbers()
    const foundPlumber = plumbers.find(
        (plumber) => {
            return plumber.id ===completion.plumberId
        }
    )
  
    return `
        <li class="service-item">
            <section class="service-info">
            Request #${completion.requestId}: was completed by ${foundPlumber.name}
            </section>
 
            <button class="completion__delete" id="completion--${completion.id}">
                Delete
            </button>

        </li>`
}


export const Completions = () => {

    const completions = getCompletions()

    let html = "<ul>"
    const listItems = completions.map(completionItemListBuilder)
    html += listItems.join("")
    html += "</ul>"

    return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("completion--")) {
        const [, requestId] = click.target.id.split("--")
        deleteCompletion(parseInt(requestId))
    }
})




