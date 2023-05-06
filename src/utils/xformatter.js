// @ts-ignore
const { XMLValidator } = require('fast-xml-parser')
const vkbeautify = require("vkbeautify")

const formatStyles = ["pretty", "minmum"]

class XFormatter {

    constructor() {
    }

    verify(data) {
        let content = data?.trim() || ''
        let valid = XMLValidator.validate(content, {
            allowBooleanAttributes: true
        })
        return [valid === true, content]
    }

    format(data) {
        this.data = data?.trim()?.replaceAll('\r\n', '\n') || ''
        this.suitable = false   // 默认格式化器无效
        this.lastData = this.lastData || '' // 上次文本内容
        this.lastType = this.lastType || '' // 上次格式样式
        let that = this

        // 适用检查
        let context = this.verify(this.data)
        console.log(context)

        if (!context.shift()) {
            this.lastData = null
            this.lastType = null
            return data
        }

        // 解析当前格式化样式
        let style = formatStyles.filter((value) => {
            return !(value === that.lastType && that.data === that.lastData)
        }).shift()

        let text = context.shift()
        let result = (style === 'pretty') ? vkbeautify.xml(text) : vkbeautify.xmlmin(text)

        console.log(style, style === 'pretty', result)
        this.lastData = result
        this.lastType = style
        return result
    }

}

module.exports = XFormatter