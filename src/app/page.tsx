import { Home } from '../views/Home'
import { pageMeta } from '../data/meta'

export const metadata = pageMeta('home')

export default function Page() {
  return <Home />
}
