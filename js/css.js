/** @type {import('tailwindcss').Config} */
import postcss from 'postcss'

const tailwindBase = `@tailwind base;
@tailwind components;
@tailwind utilities;`

export default async function generator(structure, page, prod = false) {
    let css = ''
    if (structure.css.tailwind) {
        const tailwind = await import('tailwindcss/lib/index')
        const cssnano = await import ('cssnano')
        const autoprefixer = await import('autoprefixer')
        
        const postcssOptions = {}
        const usedClasses = ``
        const cssString = `${tailwindBase} ${usedClasses}`

        const components = JSON.parse(
            JSON.stringify(
                page.components
            )
        )

        if (page.before) components.push(...page.before)
        if (page.after) components.push(...page.after)
        if (page.generated) components.push(...page.generated.components)

        const componentsStructure = JSON.parse(
            JSON.stringify(
                structure.components
                    .filter(e => components.some(component => component === e.name))
            )
        )
        
        for (let index = 0; index < componentsStructure.length; index++) {
            const component = componentsStructure[index];

            if (component.contextButton) {
                componentsStructure.push(
                    JSON.parse(
                        JSON.stringify(
                            structure.components.find(e => component.contextButton === e.name)
                        )
                    )
                )
            }

            if (component.children?.length) {
                const children = structure.components.filter(e => component.children.some(child => child === e.name))
                componentsStructure.push(
                    ...JSON.parse(
                        JSON.stringify(
                            children
                        )
                    )
                )
            }
        }

        const html = {
            extension: 'css',
            raw: ''
        }

        for (let index = 0; index < componentsStructure.length; index++) {
            const component = componentsStructure[index];

            if (!component.props?.class) continue


            if (component.props.class.value) html.raw += ` ${component.props.class.value}`
            
            for (const key in component.props.class) {
                if (Object.hasOwnProperty.call(component.props.class, key)) {
                    if (['value', 'type'].includes(key)) continue
                    const classItem = component.props.class[key];
                    if (classItem.result?.value) html.raw += ` ${classItem.result.value}`
                }
            }

            if (component.props.class?.type === 'context') {
                for (const key in component.context) {
                    if (Object.hasOwnProperty.call(component.context, key)) {
                        const context = component.context[key];
                        
                        if (!context.props?.class)continue
                        
                        const classProp = context.props.class

                        if (context.props.class.value) html.raw += ` ${context.props.class.value}`

                        for (const key in classProp) {
                            if (Object.hasOwnProperty.call(classProp, key)) {
                                const interpolateble = classProp[key];
                                if (!interpolateble.result) continue
                                html.raw += ` ${interpolateble.result.value}`
                            }
                        }
                    }
                }

                continue
            }


            html.raw += ` ${component.props.class}`
        }

        html.raw = html.raw.replace(/\{(.*?)\}/g, '')
        
        let tailwindConfig = {
            content: [
              html,
            ]
        }

        const plugins = [
            tailwind.default(tailwindConfig),
            autoprefixer.default,
        ]

        if (prod) plugins.push(cssnano.default({ preset: ['default', { cssDeclarationSorter: false }] }))

        const postCssResult = postcss(plugins).process(cssString, { ...postcssOptions, from: css })

        css = postCssResult.css
    }

    return css
}