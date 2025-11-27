let edges = {}
let nodes = {}
let pad = 5
const prompts = document.getElementById("prompts")
const canv = document.getElementById("canv")
function SVG(element) {
    return document.createElementNS("http://www.w3.org/2000/svg", element)
}
function addBreak(element = prompts) {
    element.appendChild(document.createElement("br"))
}
function clearElement(element = prompts) {
    while (element.firstChild) {
        element.firstChild.remove()
    }
}
function newInput(id, placeholder = id, type = "number", parent = prompts) {
    const input = document.createElement("input")
    input.type = type
    input.id = id
    input.placeholder = placeholder
    parent.appendChild(input)
}
function newButton(intext, onclick, parent = prompts) {
    const button = document.createElement("button")
    button.innerText = intext
    button.onclick = onclick
    parent.appendChild(button)
}
function newNode() {
    clearElement()
    newInput("id", "Node ID", "string")
    newInput("x", "X coordinate")
    newInput("y", "Y coordinate")
    newInput("r", "Node radius")
    addBreak()
    newButton("Add node", () => {
        const x = IdVal("x")
        const y = IdVal("y")
        const id = IdVal("id", "str")
        const r = IdVal("r")
        if (!id) {
            alert("Node ID cannot be empty!!")
            return
        }
        nodes[id] = {
            "x": x,
            "y": y,
            "radius": r
        }
        clearElement()
        updateDisplay()
    })
}
function newEdge() {
    clearElement()
    newInput("id1", "Source ID", "text")
    newInput("id2", "Target ID", "text")
    newInput("weight", "Weight")
    newInput("id", "Edge ID", "text")
    newInput("dir", "Directed?", "checkbox")
    addBreak()
    newButton("Add edge", () => {
        const src = IdVal("id1", "txt")
        const trg = IdVal("id2", "str")
        let id = IdVal("id", "txt")
        const weight = IdVal("weight")
        const dir = document.getElementById("dir").checked
        if (!src || !trg) {
            alert("Node ID cannot be empty!!")
            return
        }
        if (!id) {
            id = `${src}${trg}`
        }
        edges[id] = {
            "directed": dir,
            "source": src,
            "target": trg,
            "width": weight
        }
        clearElement()
        updateDisplay()
    })
    newButton("Show nodes", () => {
        updateDisplay()
        document.getElementById(`node-${IdVal("id1", "txt")}`).setAttribute("fill", "#0f0")
        document.getElementById(`node-${IdVal("id2", "str")}`).setAttribute("fill", "#00f")
    })
}
function updateDisplay() {
    clearElement(canv)
    canv.innerHTML = '<defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="black" /></marker></defs>'
    let minx = 0
    let maxx = 0
    let miny = 0
    let maxy = 0
    var firstNode = nodes[Object.keys(nodes)[0]]
    if (firstNode == undefined) {
        firstNode = {
            "x": 0,
            "y": 0
        }
    }
    minx = firstNode.x - pad
    maxx = minx + pad * 2
    miny = firstNode.y - pad
    maxy = miny + pad * 2
    Object.keys(nodes).forEach(id => {
        const x = nodes[id]["x"]
        const y = nodes[id]["y"]
        if (x < minx) {
            minx = x - pad
        }
        if (x > maxx) {
            maxx = x + pad
        }
        if (y < miny) {
            miny = y - pad
        }
        if (y > maxy) {
            maxy = y + pad
        }
    })
    Object.keys(edges).forEach(id => {
        const p = SVG("line")
        const x1 = nodes[edges[id]["source"]]["x"]
        const y1 = nodes[edges[id]["source"]]["y"]
        const x2 = nodes[edges[id]["target"]]["x"]
        const y2 = nodes[edges[id]["target"]]["y"]
        const w = edges[id]["width"]
        const dir = edges[id]["directed"]
        p.setAttribute("x1", x1 - minx)
        p.setAttribute("y1", y1 - miny)
        p.setAttribute("x2", x2 - minx)
        p.setAttribute("y2", y2 - miny)
        p.setAttribute("stroke-width", w)
        p.setAttribute("stroke", "#000")
        if (dir) {p.setAttribute("marker-end", "url(#arrowhead)")}
        p.id = "edge-" + id
        canv.appendChild(p)
    })
    const width = maxx - minx
    const height = maxy - miny
    Object.keys(nodes).forEach(id => {
        const circ = SVG("circle")
        const x = nodes[id]["x"]
        const y = nodes[id]["y"]
        const r = nodes[id]["radius"]
        circ.setAttribute("cx", x - minx)
        circ.setAttribute("cy", y - miny)
        circ.setAttribute("r", r)
        circ.setAttribute("fill", "#f00")
        circ.id = "node-" + id
        const tooltip = SVG("title")
        tooltip.textContent = `Node ${id} at coords (${x}, ${y}) with radius ${r}`
        canv.appendChild(circ)
        circ.appendChild(tooltip)
    })
    canv.setAttribute("width", width)
    canv.setAttribute("height", height)
}
function deleteNode() {
    clearElement()
    newInput("id", "Node ID", "text")
    newButton("Delete", () => {
        delete nodes[IdVal("id")]
        clearElement()
        updateDisplay()
    })
}
function deleteEdge() {
    clearElement()
    newInput("id", "Edge ID", "text")
    newButton("Delete", () => {
        delete edges[IdVal("id")]
        clearElement()
        updateDisplay()
    })
}
function jsonify() {
    const input = document.createElement("textarea")
    input.type = "text"
    input.id = "str"
    input.placeholder = "JSON"
    input.setAttribute("rows", "5")
    input.setAttribute("cols", "64")
    prompts.appendChild(input)
    addBreak()
    newButton("... as Nodes", () => {
        alert(`Original nodes: ${JSON.stringify(nodes)}`)
        nodes = JSON.parse(IdVal("str", "txt"))
        updateDisplay()
    })
    newButton("... as Edges", () => {
        alert(`Original edges: ${JSON.stringify(edges)}`)
        edges = JSON.parse(IdVal("str", "txt"))
        updateDisplay()
    })
    newButton("Done", () => {
        clearElement()
    })

}
