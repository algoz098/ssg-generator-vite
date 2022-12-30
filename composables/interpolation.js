
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

// TODO - add more conditions and data origins
export function interpolateCondition(data) {
    const {search, target, pageNumber, context} = data
    let result  = ''
    
    let from = data.target.from.origin === 'fixed' ? data.target.from.value : data[data.target.from.origin]
    let to = data.target.to.origin === 'fixed' ? data.target.to.value : data[data.target.to.origin]
    let resultInterpolated = data.target.result.origin === 'fixed' ? data.target.result.value : data[data.target.result.origin]
    

    if (target.action === 'eq' && from === to) result = resultInterpolated

    return result
}

export function interpolatePageNumber(target, pageNumber, contextData) {
    pageNumber = Number(pageNumber)
    if (target.action === 'add') pageNumber += 1
    if (target.action === 'minus') pageNumber -= 1

    return pageNumber
}

export function interpolateInvalid(component, pageNumber, hasNextPage) {
    let result = false
  
    const props = JSON.parse(JSON.stringify(component.value?.props ?? {}))
  
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const prop = props[key];
        
        if (
          typeof prop === 'object' &&
          !Array.isArray(prop) &&
          prop !== null
        ) {
            if (prop.type === 'data') {
                // TODO - check if needed a validation here
            }

            if (prop.type === 'interpolate') {
                let params = prop.value.match(/\{(.*?)\}/g);
                let searchble = params.map((e) => e.replace('{', '').replace('}', ''));
    
                for (let index = 0; index < searchble.length; index++) {
                    const search = searchble[index];
                    const target = prop[search];
    
                    if (target.origin === 'pageNumber') {
                        if(target.action === 'add' && !hasNextPage) result = true 
                        else if (target.action === 'minus' && pageNumber === 1) result = true
                    }
                }
            }
        }
      }
    }
  
    return result
}

export function interpolateProp({name, key, data, prop, pageNumber}) {
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
        } else if (target.origin === 'condition') {
            dataResolved = interpolateCondition({search, target, pageNumber, context: null})
        }

        if (['number', 'string'].includes(typeof dataResolved)) {
            result = result.replaceAll(`{${search}}`, dataResolved)
        } else {
            console.error('ERROR!!! dataResolved has the type of:', typeof dataResolved)
        }
    }

    return result
}

export function interpolateContext({context, name, key, data,  pageNumber, component, contextData}) {
    const prop = component.context[context].props[key]
    let result = prop

    if (
        typeof prop === 'object' &&
        !Array.isArray(prop) &&
        prop !== null
    ) {
        result = prop.value
        let params = result.match(/\{(.*?)\}/g);
        let searchble = params.map((e) => e.replace('{', '').replace('}', ''));

        for (let index = 0; index < searchble.length; index++) {
            const search = searchble[index];
            const target = prop[search];

            let dataResolved = data

            if (contextData && target.action === 'context') dataResolved = contextData
            else if (target.origin === 'data') {
                dataResolved = interpolateData(target, dataResolved)
            } else if (target.origin === 'pageNumber') {
                dataResolved = interpolatePageNumber(target, pageNumber, contextData)
            }else if (target.origin === 'condition') {
                dataResolved = interpolateCondition({search, target, pageNumber, context: contextData})

            }

            if (['number', 'string'].includes(typeof dataResolved)) {
                result = result.replaceAll(`{${search}}`, dataResolved)
            } else {
                console.error('ERROR!!! dataResolved has the type of:', typeof dataResolved)
            }
        }
    }

    if (component.props[key]?.value) result = `${component.props[key].value} ${result}`

    return result
}

export function interpolateDataProp({name, key, data, prop, pageNumber}) {
    let result = data
    let paths = prop.path;

    for (let index = 0; index < paths.length; index++) {
        const path = paths[index];

        result = result[path]
    }
    if (!['string', 'number'].includes(typeof result)) return ''
    return result
}