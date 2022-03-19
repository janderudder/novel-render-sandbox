import { RenderOptionsUI } from './RenderOptionsUI'

document.addEventListener('DOMContentLoaded', () =>
{
    const renderOptNode = document.getElementById('render-options')
    if (renderOptNode) {
        new RenderOptionsUI(renderOptNode,
            ['p', '.page-body p'],
            ['h1', '.page-body h1'],
            ['pSeq', '.page-body p + p'],
            ['pageBody', '.page-body']
        )
    }
})
