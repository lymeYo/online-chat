import { useMemo } from 'react'
import Item from './Item'

import styles from '../style.module.css'

type SkeletonsRowProps = {
  length: number
}

const SkeletonsRow = ({ length }: SkeletonsRowProps) => {
  const skeletons = useMemo(() => {
    const items = []
    for (let i = 0; i < length; i++)
      items.push(
        <li key={i}>
          <Item />
        </li>
      )
    return items
  }, [length])

  return <ul className={styles.list}>{skeletons}</ul>
}
export default SkeletonsRow
