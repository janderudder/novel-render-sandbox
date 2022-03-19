import { RenderOptionsUI } from './RenderOptionsUI'

document.addEventListener('DOMContentLoaded', () =>
{
    const renderOptNode = document.getElementById('render-options')
    if (renderOptNode) {
        new RenderOptionsUI({
            p: '.page-body p',
            title: '.page-body h2',
            pSeq: '.page-body p + p',
            pageBody: '.page-body'
        }, renderOptNode)
    }
})
