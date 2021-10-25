import { SinkRepair } from "./SinkRepair.js"
import { fetchData } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchData().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)


// mainContainer.addEventListener("click", click => {
//     if (click.target.id.startsWith("request--")) {
//         const [,requestId] = click.target.id.split("--")
//         deleteRequest(parseInt(requestId))
//     }
// })