function getPageData(data, dataKey, dataValue) {
    if (!data.length) return data

    data = data.find(e => e[dataKey] === dataValue)
    return data
}

function getTagTypeData(tag, data) {
    let result =  data
    for (let index = 0; index < tag.path.length; index++) {
        const path = tag.path[index];
        result = result[path]
    }

    return result
}

function getTagValue ({tag, structure, page, data, isGenerated, dataKey, dataValue}) {
    let result = tag.value

    if (isGenerated) {
        if (!page.generated?.metatags?.length) return result
        
        let genMeta = page.generated.metatags.find(e => e.name === tag.name)
        
        if (!genMeta) return result
        
        if (genMeta.value?.type === 'data') {
            data = getPageData(data, dataKey, dataValue)
            result = getTagTypeData(genMeta.value, data)
        }
    }

    return result
}

export default async function generator(payload, prod = false) {
    const {structure, page, data} = payload
    let result = ''

    let titleValue = structure.title
    let title = `<title>${titleValue}</title>\r\n`
    title += `\t\t<meta name="og:title" content="${titleValue}"/>\r\n`

    let tags = ''
    for (let index = 0; index < structure.metatags.length; index++) {
        const tag = structure.metatags[index];
        
        let name = tag.name
        let value = getTagValue({tag, ...payload})
        let ogTag = tag.ogTag

        tags += `\t\t<meta name="${name}" content="${value}"/>\r\n`
        if (ogTag) tags += `\t\t<meta name="og:${name}" content="${value}"/>\r\n`
    }

    let favicon = `<link rel="icon" type="image/x-icon" href="${prod ? `/assets/favicon.${structure.icon.extension}` : structure.icon.value}">`

    result += `${favicon}${title}${tags}`
    return result
}