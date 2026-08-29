# Опора

Український гід для чоловіка 38 років: сколіоз і кіфоз, м’яке харчування, сім’я з малою дитиною.

Живий сайт: [https://opora.polchaninov.click](https://opora.polchaninov.click)

Next.js, статичний експорт. Кожна сторінка збирається в HTML.

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

Сайт відкриється на [http://localhost:3000](http://localhost:3000). Чекліст 12 тижнів зберігається в браузері.

## Deploy

Продакшн — S3 + CloudFront (`opora.polchaninov.click`). Збірка кладе файли в `out/`.

- Push у `main` збирає сайт і викладає його на AWS (workflow **Deploy to opora.polchaninov.click**).
- Pull request у `main` лінтить, тестує і збирає (workflow **CI**).

Потрібні секрети репозиторію: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (IAM user `opora-github-actions`).

Щоб `/sogodni/` і `/plan/` відкривались із холодного CloudFront, на дистрибуції має бути function з `infra/cloudfront-spa-function.js` на viewer-request: шлях без крапки віддає `…/index.html`.
