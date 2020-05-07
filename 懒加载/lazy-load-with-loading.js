const imgs = document.getElementsByTagName('img')



function lazyLaod () {  
    if ('loading' in HTMLImageElement.prototype) {
        for (let i = 0; i < imgs.length; i ++) {
            const img = imgs[i]
            const dataSrc = img.getAttribute('data-src')
            if (!dataSrc) continue
            img.loading = 'lazy'
            img.src = dataSrc
            img.removeAttribute('data-src')
        }
    }
}

lazyLaod()