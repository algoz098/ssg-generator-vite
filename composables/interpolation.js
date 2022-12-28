
export function interpolateData(target, dataResolved) {
    for (let index = 0; index < target.path.length; index++) {
        const path = target.path[index];

        if (!dataResolved[path]) {
          console.log(dataResoved, path)
          throw Error('Interpolation exception!')
        }

        dataResolved = dataResolved[path]
    }

    return dataResolved
}

export function interpolatePageNumber(target, pageNumber) {
    console.log('pageNumber', pageNumber)
    pageNumber = Number(pageNumber)
    if (target.action === 'add') pageNumber += 1
    if (target.action === 'minus') pageNumber -= 1
    return pageNumber
}

export function interpolateProp({isInvalid, name, key, data, prop, pageNumber}) {
    console.debug(`Interpolating for ${name} prop ${key} and has data: ${!data} and pageNumber: ${pageNumber}`)

    let result = prop.value
    let params = result.match(/\{(.*?)\}/g);
    let searchble = params.map((e) => e.replace('{', '').replace('}', ''));

    for (let index = 0; index < searchble.length; index++) {
        const search = searchble[index];
        const target = prop[search];

        let dataResolved = data

        if (target.origin === 'data') {
            dataResolved = interpolateData(target, dataResolved)
        } else if (target.origin === 'pageNumber') {
            dataResolved = interpolatePageNumber(target, pageNumber)
            if (dataResolved < 1) {
                isInvalid.value = true
            }
        }

        if (['number', 'string'].includes(typeof dataResolved)) {
            result = result.replaceAll(`{${search}}`, dataResolved)
        } else {
            console.error('ERROR!!! dataResolved has the type of:', typeof dataResolved)
        }
    }

    return result
}