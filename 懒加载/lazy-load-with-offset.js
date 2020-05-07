
const imgs = document.getElementsByTagName('img')
const viewHeight = document.documentElement.clientHeight // 视图高度
let count = 0 // 计数器，表示当前更新了几个，也可以作为下一个要更新元素的下标
const noop = () => {} // 空函数

let lazyLaodWhtiThrottle = noop // 带有节流功能的懒加载，初始化

// 懒加载
const lazyLaod = () => {  
    if (count >= imgs.length) { // 加载完，移除事件
        window.removeEventListener('scroll', lazyLaodWhtiThrottle)
    }
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动距离

    // 判断每个图片是否在视图内
    // 是的话则加载真正的图片，count 加 1
    // 遍历超出视图底部的元素则跳出循环，没有必要再找下去
    // 如果图片没有 data-src， 则跳过，count 加 1
    for (let i = count; i < imgs.length; i ++) {
        const img = imgs[i]
        const dataSrc = img.getAttribute('data-src')
        // 视图以下元素在当前不再遍历
        if (img.offsetTop > scrollTop + viewHeight) {
            break
        }
        // 没有 data-src，不参与懒加载，程序应该跳过
        if (!dataSrc) {
            count ++
            continue
        }
        img.removeAttribute('data-src')
        img.src = dataSrc
        count ++
    }
}

// 使用节流
lazyLaodWhtiThrottle =  _.throttle(lazyLaod, 200)
window.addEventListener('scroll',lazyLaodWhtiThrottle)

lazyLaod() // 初始