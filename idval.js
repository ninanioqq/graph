function IdVal(id, type = "num") {
    const el = document.getElementById(id)
    switch (type) {
        default:
        case "text":
        case "string":
        case "str":
        case "txt":
            return el.value
        case "number":
        case "int":
        case "num":
            return el.valueAsNumber
        case "dat":
        case "date":
            return el.valueAsDate
        case "tim":
        case "tme":
        case "time":
            return el.valueAsTime
        case "bool":
        case "truth":
        case "boolean":
            switch (el.value.toLowercase().trim()) {
                case "true":
                case "1":
                case "yes":
                case "ye":
                case "tru":
                    return true
                case "false":
                case "0":
                case "no":
                case "ne":
                case "fls":
                case "fal":
                case "fse":
                    return false
                default:
                    return undefined
            }
    }
}
