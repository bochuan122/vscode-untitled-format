// @ts-nocheck
const validator = require('validator')
const vkbeautify = require("vkbeautify")

const formatStyles = ["pretty", "minmum"]

class JFormatter {

    constructor() {
    }

    verify(data) {
        let content = data?.trim() || ''
        // @ts-ignore
        if (validator.isJSON(content)) {
            return [true, content]
        }

        content = content.replace(/^(\s|,)+|(\s|,)+$/gm, '')
        content = content.replace(/^(\s|")+|(\s|")+$/gm, '')

        if ((!(content.startsWith('{') || content.startsWith('['))) ||
            (!(content.endsWith('}') || content.endsWith(']')))) {
            return [false, data]
        }

        let content_1 = content.replaceAll("'", '"')
        if (validator.isJSON(content_1)) {
            return [true, content_1]
        }

        let content_2 = content.replaceAll('\\"', '"')
        if (validator.isJSON(content_2)) {
            return [true, content_2]
        }

        return [false, data]
    }

    format(data) {
        this.data = data?.trim()?.replaceAll('\r\n', '\n') || ''
        this.suitable = false   // 默认格式化器无效
        this.lastData = this.lastData || '' // 上次文本内容
        this.lastType = this.lastType || '' // 上次格式样式
        let that = this

        // 适用检查
        let context = this.verify(this.data)
        if (!context.shift()) {
            this.lastData = null
            this.lastType = null
            return data
        }

        // console.log('>>>>> L >>', that.lastData.split())
        // console.log('>>>>> C >>', that.data)
        // console.log('>>>>> P >>', JSON.parse(context))

        // 解析当前格式化样式
        let style = formatStyles.filter((value) => {
            return !(value === that.lastType && that.data === that.lastData)
        }).shift()

        // Math.pow(2,53) = 9007199254740992, 长整型数据失真
        let lnumExp = new RegExp('\\d{9,}', "gm")
        let lnumSym = 'placeholder@long'

        let text = context.shift()
        let lnumRes = lnumExp[Symbol.match](text) || []
        let result = (style === 'pretty') ? vkbeautify.json(text) : vkbeautify.jsonmin(text)

        result = lnumExp[Symbol.replace](result, lnumSym)
        lnumRes.forEach((value) => result = result.replace(lnumSym, value))

        // console.log(style, style === 'pretty', result)
        this.lastData = result
        this.lastType = style
        return result
    }
}

module.exports = JFormatter