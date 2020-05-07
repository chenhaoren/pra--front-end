const imgs = document.getElementsByTagName('img')
let count = 0 // 计数器，表示当前更新了几个，也可以作为下一个要更新元素的下标
const noop = () => {} // 空函数
let lazyLaodWhtiThrottle = noop // 带有节流功能的懒加载，初始化

const lazyLaod = () => {
    if (count >= imgs.length) {
        window.removeEventListener('scroll', lazyLaodWhtiThrottle)
    }
    for (let i = count; i < imgs.length; i ++) {
        const img = imgs[i]
        const dataSrc = img.getAttribute('data-src')

        // 获取相对于视图窗口顶部的距离
        const { top } = img.getBoundingClientRect()

        // 如果大于可视区域高度，说明在视图窗口之下，跳出
        if (top > document.documentElement.clientHeight) {
            break
        }
        // 不参与懒加载的元素， count + 1，进入下一个循环
        if (!dataSrc) {
            count ++
            continue
        }
        img.removeAttribute('data-src')
        img.src = dataSrc
        count ++
    }
}
lazyLaodWhtiThrottle = _.throttle(lazyLaod, 200)
window.addEventListener('scroll', lazyLaodWhtiThrottle)
lazyLaod()
