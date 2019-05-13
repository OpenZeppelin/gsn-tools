const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

const getSorting = (order, orderBy) => {
    if (order === 'desc') {
        return (a, b) => desc(a, b, orderBy)
    }
    return (a, b) => -desc(a, b, orderBy)
}

const desc = (a, b, orderBy) => {
    if (b.get(orderBy) < a.get(orderBy)) {
        return -1
    }
    if (b.get(orderBy) > a.get(orderBy)) {
        return 1
    }
    return 0
}

export {
    getSorting,
    stableSort,
}
