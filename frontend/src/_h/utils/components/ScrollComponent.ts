import {DataUtils} from '../DataUtils'
import {
  getAttributeValueByBreakpoint,
  getCSS,
  getViewPort,
  isVisibleElement,
  throttle,
} from '../DomUtils'
import {ElementStyleUtil} from '../ElementStyleUtil'
import {getObjectPropertyValueByKey, stringSnakeToCamel} from '../TypeUtils'
import {CookieUtils} from './CookieUtils'

export interface ScrollOptions {
  saveState?: boolean
}

const defaultScrollOptions: ScrollOptions = {
  saveState: true,
}

class ScrollComponent {
  element: HTMLElement
  options: ScrollOptions
  id: string

  constructor(_element: HTMLElement, options: ScrollOptions) {
    this.element = _element
    this.options = Object.assign(defaultScrollOptions, options)
    this.id = this.element.getAttribute('id') || ''
    this.update()
    DataUtils.set(this.element, 'scroll', this)
  }

  private getOption = (name: string) => {
    if (this.element.hasAttribute('data-h-scroll-' + name) === true) {
      const attr = this.element.getAttribute('data-h-scroll-' + name) || ''
      let value: string | JSON | boolean = getAttributeValueByBreakpoint(attr)
      if (value !== null && String(value) === 'true') {
        value = true
      } else if (value !== null && String(value) === 'false') {
        value = false
      }

      return value
    } else {
      const optionName = stringSnakeToCamel(name)
      const option = getObjectPropertyValueByKey(this.options, optionName)
      if (option) {
        return getAttributeValueByBreakpoint(option)
      } else {
        return null
      }
    }
  }

  private getHeightType = () => {
    if (this.getOption('height')) {
      return 'height'
    }
    if (this.getOption('min-height')) {
      return 'min-height'
    }
    if (this.getOption('max-height')) {
      return 'max-height'
    }
  }

  private getAutoHeight = () => {
    let height: number | string = getViewPort().height
    const dependencies = this.getOption('dependencies')
    const wrappers = this.getOption('wrappers')
    const offset = this.getOption('offset')

    if (dependencies !== null) {
      const elements = document.querySelectorAll(dependencies as string)
      if (elements && elements.length > 0) {
        for (let i = 0, len = elements.length; i < len; i++) {
          const element = elements[i] as HTMLElement
          if (isVisibleElement(element) === false) {
            continue
          }

          height = height - parseInt(getCSS(element, 'height'))
          height = height - parseInt(getCSS(element, 'margin-top'))
          height = height - parseInt(getCSS(element, 'margin-bottom'))

          const borderTop = getCSS(element, 'border-top')
          if (borderTop) {
            height = height - parseInt(borderTop)
          }

          const borderBottom = getCSS(element, 'border-bottom')
          if (borderBottom) {
            height = height - parseInt(borderBottom)
          }
        }
      }
    }

    if (wrappers !== null) {
      var elements = document.querySelectorAll(wrappers as string)
      if (elements && elements.length > 0) {
        for (let i = 0, len = elements.length; i < len; i++) {
          const element = elements[i] as HTMLElement

          if (!isVisibleElement(element)) {
            continue
          }

          height = height - parseInt(getCSS(element, 'margin-top'))
          height = height - parseInt(getCSS(element, 'margin-bottom'))
          height = height - parseInt(getCSS(element, 'padding-top'))
          height = height - parseInt(getCSS(element, 'padding-bottom'))

          const borderTop = getCSS(element, 'border-top')
          if (borderTop) {
            height = height - parseInt(borderTop)
          }

          const borderBottom = getCSS(element, 'border-bottom')
          if (borderBottom) {
            height = height - parseInt(borderBottom)
          }
        }
      }
    }

    if (offset !== null) {
      height = height - parseInt(offset as string)
    }

    height = height - parseInt(getCSS(this.element, 'margin-top'))
    height = height - parseInt(getCSS(this.element, 'margin-bottom'))

    const borderTop = getCSS(this.element, 'border-top')
    if (borderTop) {
      height = height - parseInt(borderTop)
    }

    const borderBottom = getCSS(this.element, 'border-bottom')
    if (borderBottom) {
      height = height - parseInt(borderBottom)
    }

    height = String(height) + 'px'

    return height
  }

  private setupHeight = () => {
    let height = this.getHeight()
    let heightType = this.getHeightType() as string

    if (height !== null && height.length > 0) {
      ElementStyleUtil.set(this.element, heightType, height)
    } else {
      ElementStyleUtil.set(this.element, heightType, '')
    }
  }

  private setupState = () => {
    if (this.getOption('save-state') === true && this.id) {
      const cookie = CookieUtils.get(this.id + 'st')
      if (cookie) {
        var pos = parseInt(cookie)

        if (pos > 0) {
          this.element.scrollTop = pos
        }
      }
    }
  }

  private setupScrollHandler = () => {
    if (this.getOption('save-state') === true && this.id) {
      this.element.addEventListener('scroll', this.scrollHandler)
    } else {
      this.element.removeEventListener('scroll', this.scrollHandler)
    }
  }

  private scrollHandler = () => {
    const cookieId = this.id + 'st'
    CookieUtils.set(cookieId, this.element.scrollTop, {})
  }

  private destroyScrollHandler = () => {
    this.element.removeEventListener('scroll', this.scrollHandler)
  }

  private resetHeight = () => {
    const heghtType = this.getHeightType()
    if (heghtType) {
      ElementStyleUtil.set(this.element, heghtType, '')
    }
  }

  public update = () => {
    if (
      this.getOption('activate') === true ||
      !this.element.hasAttribute('data-h-scroll-activate')
    ) {
      this.setupHeight()
      this.setupScrollHandler()
      this.setupState()
    } else {
      this.resetHeight()
      this.destroyScrollHandler()
    }
  }

  public getHeight = () => {
    const heightType = this.getHeightType()
    const height = this.getOption(heightType || '')
    if (height instanceof Function) {
      return height.call(height)
    } else if (height !== null && typeof height === 'string' && height.toLowerCase() === 'auto') {
      return this.getAutoHeight()
    } else {
      return height
    }
  }

  public getElement = () => {
    return this.element
  }

  public static hasInstace(element: HTMLElement) {
    return DataUtils.has(element, 'scroll')
  }

  public static getInstance(element: HTMLElement) {
    if (element !== null && ScrollComponent.hasInstace(element)) {
      return DataUtils.get(element, 'scroll')
    }
  }

  public static createInstances(selector: string) {
    const elements = document.body.querySelectorAll(selector)
    elements.forEach((element: Element) => {
      const item = element as HTMLElement
      let scroll = ScrollComponent.getInstance(item)
      if (!scroll) {
        scroll = new ScrollComponent(item, defaultScrollOptions)
      }
    })
  }

  public static destroyAll(attr: string = '[data-h-scroll="true"]') {}

  public static bootstrap(attr: string = '[data-h-scroll="true"]') {
    ScrollComponent.createInstances(attr)
    ScrollComponent.resize()
  }

  public static createInstance = (
    element: HTMLElement,
    options: ScrollOptions = defaultScrollOptions
  ): ScrollComponent | undefined => {
    let scroll = ScrollComponent.getInstance(element)
    if (!scroll) {
      scroll = new ScrollComponent(element, options)
    }
    return scroll
  }

  public static reinitialization(attr: string = '[data-h-scroll="true"]') {
    ScrollComponent.createInstances(attr)
  }

  public static updateAll() {
    const elements = document.body.querySelectorAll('[data-h-scroll="true"]')
    elements.forEach((element: Element) => {
      const instance = ScrollComponent.getInstance(element as HTMLElement)
      if (instance) {
        instance.update()
      }
    })
  }

  public static resize() {
    window.addEventListener('resize', function () {
      let timer
      throttle(
        timer,
        () => {
          ScrollComponent.updateAll()
        },
        200
      )
    })
  }
}

export {ScrollComponent, defaultScrollOptions}
