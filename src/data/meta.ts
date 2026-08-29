export const siteUrl = 'https://opora.polchaninov.click'

export const pages = {
  home: {
    title: 'Опора — спина, їжа, сім’я',
    description:
      'Спокійний план для чоловіка 38 років: сколіоз, харчування, сім’я з малою дитиною. Без надриву.',
  },
  sogodni: {
    title: 'Сьогодні · Опора',
    description: 'База на 12–15 хвилин, хода і одна сімейна дія. Відмітки дня лишаються в телефоні.',
  },
  hrebets: {
    title: 'Хребет · Опора',
    description: 'Сколіоз, кіфоз, шия. Не випрямити назавжди — зробити день легшим.',
  },
  rukh: {
    title: 'Рух · Опора',
    description: 'Повільне входження і протокол турніка, який не б’є в шию.',
  },
  harchuvannya: {
    title: 'Харчування · Опора',
    description: 'Мінус десять кілограмів без окремої дієти від сім’ї.',
  },
  simya: {
    title: 'Сім’я · Опора',
    description: 'Баланс із малою дитиною. Здоров’я батька — інфраструктура дому.',
  },
  dlyaNyeyi: {
    title: 'Для партнерки · Опора',
    description: 'Що це за план, чого не робити і як допомогти без контролю ваги.',
  },
  plan: {
    title: '12 тижнів · Опора',
    description: 'Вхід, не фініш. Один фокус на тиждень, можна повторити.',
  },
} as const

export function pageMeta(key: keyof typeof pages) {
  const page = pages[key]
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website' as const,
      url: siteUrl,
      images: [`${siteUrl}/images/hero.jpg`],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: page.title,
      description: page.description,
    },
  }
}
