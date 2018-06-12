import React from 'react'
import Card from '@/site/components/Card'
import Size from './Size'
import Overflow from './Overflow'
import { Breadcrumb } from 'react-impression'
import Wrapper from '../../components/ExampleWrapper'
import MarkdownPreview from '../../components/MarkdownPreview/index'
import { transfer } from '../../utils/transferApiTable'

const modalAttr = [
  ['size', '设置模态框大小，可选值为 sm、lg', 'string', ''],
  ['className', '自定义样式', 'string', ''],
]

const modalChildrenAttr = [['className', '自定义样式', 'string', '']]

const modalAttrTable = transfer(modalAttr)
const modalChildrenAttrTable = transfer(modalChildrenAttr)

export default ({ routes, params }) => {
  return [
    <Breadcrumb routes={routes} params={params} />,
    <Wrapper title='Modal对话框' desc='模态对话框'>
      <Card component={Size} />
      <Card component={Overflow} />
      <MarkdownPreview markdown={modalAttrTable} name='Modal API' />
      <MarkdownPreview
        markdown={modalChildrenAttrTable}
        name='Modal.Header/Modal.Footer/Modal.Body API'
      />
    </Wrapper>,
  ]
}
