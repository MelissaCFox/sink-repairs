import { getCompletions, getPlumbers } from "./dataAccess.js";

const completionItemListBuilder = (completion) => {
    const plumbers = getPlumbers()
    const foundPlumber = plumbers.find(
        (plumber) => {
            return plumber.id ===completion.plumberId
        }
    )
  
    return `<li>
    Request #${completion.requestId} was completed by ${foundPlumber.name}
    
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




