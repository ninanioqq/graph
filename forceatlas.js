function forceAtlas(iterations = 1, attraction = 0.1, repulsion = 2000) {
    const nodeKeys = Object.keys(nodes)
    for (let iter = 0; iter < iterations; iter++) {
        const forces = {}
        nodeKeys.forEach(k => forces[k] = { fx: 0, fy: 0 })
        for (let i = 0; i < nodeKeys.length; i++) {
            for (let j = 0; j < nodeKeys.length; j++) {
                const a = nodes[nodeKeys[i]]
                const b = nodes[nodeKeys[j]]
                let dx = b.x - a.x
                let dy = b.y - a.y
                let dist2 = dx*dx + dy*dy || 0.01
                let dist = Math.sqrt(dist2)
                let force = repulsion / dist2
                let fx = force * dx / dist
                let fy = force * dy / dist
                forces[nodeKeys[i]].fx -= fx
                forces[nodeKeys[j]].fx += fx
                forces[nodeKeys[i]].fy -= fy
                forces[nodeKeys[j]].fy += fy
            }
        }
        for (const eKey in edges) {
            const edge = edges[eKey]
            const source = nodes[edge.source]
            const target = nodes[edge.target]
            let dx = target.x - source.x
            let dy = target.y - source.y
            let dist = Math.sqrt(dx * dx + dy * dy) || 0.01
            let force = attraction * edge.width
            let fx = force * dx
            let fy = force * dy
            forces[edge.source].fx += fx
            forces[edge.source].fy += fy
            forces[edge.target].fx -= fx
            forces[edge.target].fy -= fy
        }
        let loss = 0
        nodeKeys.forEach(k => {
            nodes[k].x += forces[k].fx
            nodes[k].y += forces[k].fy
            loss += Math.sqrt(forces[k].fx * forces[k].fx + forces[k].fy * forces[k].fy)
        })
        console.log(`Loss: ${loss}`)
    }
    updateDisplay()
}
function iterForceAtlas(attraction = 0.2, repulsion = 2000, iter = 5000) {
    const nodeKeys = Object.keys(nodes)
    let loss = 10000
    let i = 0
    while (loss > 0.000001 && i < iter) {
        const forces = {}
        nodeKeys.forEach(k => forces[k] = { fx: 0, fy: 0 })
        for (let i = 0; i < nodeKeys.length; i++) {
            for (let j = 0; j < nodeKeys.length; j++) {
                const a = nodes[nodeKeys[i]]
                const b = nodes[nodeKeys[j]]
                let dx = b.x - a.x
                let dy = b.y - a.y
                let dist2 = dx*dx + dy*dy || 0.01
                let dist = Math.sqrt(dist2)
                let force = repulsion / dist2
                let fx = force * dx / dist
                let fy = force * dy / dist
                forces[nodeKeys[i]].fx -= fx
                forces[nodeKeys[j]].fx += fx
                forces[nodeKeys[i]].fy -= fy
                forces[nodeKeys[j]].fy += fy
            }
        }
        for (const eKey in edges) {
            const edge = edges[eKey]
            const source = nodes[edge.source]
            const target = nodes[edge.target]
            let dx = target.x - source.x
            let dy = target.y - source.y
            let dist = Math.sqrt(dx * dx + dy * dy) || 0.01
            let force = attraction * edge.width
            let fx = force * dx
            let fy = force * dy
            forces[edge.source].fx += fx
            forces[edge.source].fy += fy
            forces[edge.target].fx -= fx
            forces[edge.target].fy -= fy
        }
        loss = 0
        nodeKeys.forEach(k => {
            nodes[k].x += forces[k].fx
            nodes[k].y += forces[k].fy
            loss += Math.sqrt(forces[k].fx * forces[k].fx + forces[k].fy * forces[k].fy)
        })
        i++
        console.log(`Loss: ${loss}\nIteration: ${i}`)
    }
    updateDisplay()
}}
