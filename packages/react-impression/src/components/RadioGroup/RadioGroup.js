import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import uniqueId from 'lodash.uniqueid'

export default class RadioGroup extends React.PureComponent {
  constructor(props) {
    super(props)

    // 是否木偶组件
    this.isPuppet = props.value !== undefined

    const initValue = {
      value: this.isPuppet ? undefined : props.defaultValue,
    }

    this.state = {
      ...initValue,
    }
  }

  static propTypes = {
    /**
     * 自定义样式
     */
    className: PropTypes.string,

    /**
     * 选中的值，设置即为木偶组件
     */
    value: PropTypes.any,

    /**
     * 默认值，木偶组件无效
     */
    defaultValue: PropTypes.any,

    /**
     * 状态变更回调，参数列表：value，event
     */
    onChange: PropTypes.func,

    /**
     * 是否禁用
     */
    disabled: PropTypes.bool,

    /**
     * 设置名称
     */
    name: PropTypes.string,

    /**
     * 排列方向
     */
    direction: PropTypes.oneOf(['row', 'column']),

    /**
     * 子组件
     */
    children: PropTypes.node,
  }

  static defaultProps = {
    disabled: false,
    direction: 'row',
  }

  id = uniqueId('radio-')

  getValue() {
    return this.isPuppet ? this.props.value : this.state.value
  }

  setValue(value) {
    if (!this.isPuppet) this.setState({ value })
  }

  onChangeHandle = (event, value) => {
    const { onChange } = this.props

    if (this.isPuppet) {
      onChange && onChange(value, event)
    } else {
      this.setState(
        {
          value,
        },
        () => {
          onChange && onChange(value, event)
        }
      )
    }
  }

  render() {
    const { className, name, direction, children, ...others } = this.props
    const originValue = this.isPuppet ? this.props.value : this.state.value
    const directionClass =
      direction === 'row' ? 'radio-inline' : 'radio-vertical'

    const _children = React.Children.map(children, (child, index) => {
      if (!child) {
        return child
      }

      let { value, disabled } = child.props

      let options = {
        name: name || this.id,
        key: index,
        onChange: this.onChangeHandle,
        disabled: disabled || this.props.disabled,
      }

      // 是否选中
      if (value !== undefined || originValue !== undefined) {
        options.checked = originValue === value
      }

      return React.cloneElement(child, options)
    })

    delete others.onChange

    return (
      <div {...others} className={classnames(directionClass, className)}>
        {_children}
      </div>
    )
  }
}

RadioGroup.getValue = ref => {
  if (!ref) return undefined

  return ref.getValue()
}

RadioGroup.setValue = (ref, value) => {
  if (!ref) return

  ref.setValue(value)
}
