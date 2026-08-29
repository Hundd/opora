import { Today } from '../../views/Today'
import { pageMeta } from '../../data/meta'

export const metadata = pageMeta('sogodni')

export default function Page() {
  return <Today />
}
