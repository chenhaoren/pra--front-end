const imgs = document.getElementsByTagName('img')

function lazyLaod () {
    const observer = new IntersectionObserver(res => {
        console.log(res)
        for (let i = 0; i < res.length; i ++) {
            const currentChange = res[i]
            const { target } = currentChange
            const dataSrc = target.getAttribute('data-src')
            if (!currentChange.isIntersecting) continue
            if (!dataSrc) {
                observer.unobserve(target)
                continue
            }
            target.src = dataSrc
            target.removeAttribute('data-src')
            observer.unobserve(target)
        }
    });

    for (let i = 0; i < imgs.length; i ++) {
        observer.observe(imgs[i])
    }
}

lazyLaod()