import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const site = 'https://opora.polchaninov.click'

const pages: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Опора — спина, їжа, сім’я',
    description: 'Спокійний план для чоловіка 38 років: сколіоз, харчування, сім’я з малою дитиною. Без надриву.',
  },
  '/sogodni': {
    title: 'Сьогодні · Опора',
    description: 'База на 12–15 хвилин, хода і одна сімейна дія. Відмітки дня лишаються в телефоні.',
  },
  '/hrebets': {
    title: 'Хребет · Опора',
    description: 'Сколіоз, кіфоз, шия. Не випрямити назавжди — зробити день легшим.',
  },
  '/rukh': {
    title: 'Рух · Опора',
    description: 'Повільне входження і протокол турніка, який не б’є в шию.',
  },
  '/harchuvannya': {
    title: 'Харчування · Опора',
    description: 'Мінус десять кілограмів без окремої дієти від сім’ї.',
  },
  '/simya': {
    title: 'Сім’я · Опора',
    description: 'Баланс із малою дитиною. Здоров’я батька — інфраструктура дому.',
  },
  '/dlya-nyeyi': {
    title: 'Для партнерки · Опора',
    description: 'Що це за план, чого не робити і як допомогти без контролю ваги.',
  },
  '/plan': {
    title: '12 тижнів · Опора',
    description: 'Вхід, не фініш. Один фокус на тиждень, можна повторити.',
  },
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function PageMeta() {
  const { pathname } = useLocation()
  const page = pages[pathname] ?? pages['/']

  useEffect(() => {
    document.title = page.title
    setMeta('description', page.description)
    setMeta('og:title', page.title, 'property')
    setMeta('og:description', page.description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', `${site}${pathname}`, 'property')
    setMeta('og:image', `${site}/images/hero.jpg`, 'property')
    setMeta('twitter:card', 'summary_large_image')
  }, [pathname, page])

  return null
}
