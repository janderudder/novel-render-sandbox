export class RenderOptionsUI
{
    private rules: object = {}

    constructor(ruleEntries: object, rootNode: HTMLElement) {
        this.#setupRules(ruleEntries)
        this.#setupForm(rootNode)
        window['renderOptionsUI'] = this // __DBG__
    }

    #setupRules(ruleEntries: object) {
        const ss = [...document.styleSheets].filter(s => s.title==='novel-render-style')[0]
        if (!ss) {
            throw new Error("could not find 'novel-render-style' titled stylesheet")
        }
        for (const [name, selector] of Object.entries(ruleEntries)) {
            const rule = [...ss.cssRules].filter(
                (rule) => rule instanceof CSSStyleRule
                       && rule.selectorText===selector)[0] as CSSStyleRule
            if (rule) {
                this.rules[name] = rule
            }
        }
    }

    #setupForm(rootNode: HTMLElement) {
        const setupNumberProperty = (rule, property, inputId) => {
            const input = rootNode.querySelector(inputId) as HTMLInputElement
            input.value = parseFloat(this.get(rule, property)) as any
            input.addEventListener('input', ev => this.set(
                rule, property, `${ev.target.value}pt`
            ))
        }
        setupNumberProperty('p', 'font-size', '#numFontSize')
        setupNumberProperty('p', 'line-height', '#numLineHeight')
        setupNumberProperty('p', 'text-indent', '#numIndent')
        setupNumberProperty('pSeq', 'margin-top', '#numParaMarginTop')
        setupNumberProperty('title', 'margin-top', '#numTitleMarginTop')
        setupNumberProperty('title', 'margin-bottom', '#numTitleMarginBottom')
        setupNumberProperty('title', 'font-size', '#numTitleFontSize')

        const setupSelectProperty = (rule, property, selectId, defaultValue?) => {
            const select = rootNode.querySelector(selectId) as HTMLSelectElement
            select.addEventListener('input', ev => this.set(
                rule, property, ev.target.value
            ))
            select.value = this.get(rule, property).toString()
            if (defaultValue && select.options.selectedIndex===(-1)) {
                this.set(rule, property, defaultValue)
                select.value = defaultValue
            }
        }

        setupSelectProperty('pageBody', 'font-family', '#selectFont', 'serif')


        const setPagesOrientation = value => {
            const pages = document.getElementsByClassName('page')
            for (const page of pages) {
                page.classList.remove('landscape', 'portrait')
                page.classList.add(value)
            }
        }

        setPagesOrientation('portrait') // set default value


        /**
         *  Here is a cleaner way of handling value changes over the whole
         *  form. We should extend it to all other options too, in a next
         *  iteration.
         */
        const form = document.forms['render-options']

        form.addEventListener('change', ({target}) => {
            const {name, value} = target;
            switch (name) {
                case 'pageOrientation':
                    setPagesOrientation(value)
            }
        })


        /*  If we add back #selectJustify (text-justify algorithm property),
            here is the code to handle this as of yet Firefox only feature. */
            if (this.rules['p'].style['text-justify']) {
                setupSelectProperty('p', 'text-justify', '#selectJustify', 'auto')
            }
    }

    set(rule, property, value) {
        this.rules[rule].style.setProperty(property, value)
    }

    get(rule, property) {
        return this.rules[rule].style.getPropertyValue(property)
    }
}
