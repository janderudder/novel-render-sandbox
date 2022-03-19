export class RenderOptionsUI
{
    root: HTMLElement
    rules: object = {}

    constructor(root: HTMLElement, ...ruleEntries)
    {
        this.root = root;

        const ss = [...document.styleSheets].filter(s => s.title==='novel-render-style')[0]
        if (!ss) {
            throw new Error("could not find 'novel-render-style' titled stylesheet")
        }
        for (const [name, selector] of ruleEntries) {
            const rule = [...ss.cssRules].filter(
                (rule) => rule instanceof CSSStyleRule
                    && rule.selectorText===selector)[0] as CSSStyleRule
            if (rule) {
                this.rules[name] = rule
            }
        }
    }
}
