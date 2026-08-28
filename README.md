# Опора

Український гід для чоловіка 38 років: сколіоз і кіфоз, м’яке харчування, сім’я з малою дитиною.

Живий сайт: [https://opora.polchaninov.click](https://opora.polchaninov.click)

```bash
npm install
npm run dev
```

Сайт відкриється на [http://localhost:5173](http://localhost:5173). Чекліст 12 тижнів зберігається в браузері.

## Deploy

Продакшн — S3 + CloudFront (`opora.polchaninov.click`).

- Push у `main` збирає сайт і викладає його на AWS (workflow **Deploy to opora.polchaninov.click**).
- Pull request у `main` лише лінтить і збирає (workflow **CI**).
- Ручний запуск — Actions → відповідний workflow → **Run workflow**.

Потрібні секрети репозиторію: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (IAM user `opora-github-actions`).

Сайт — SPA. Щоб прямі посилання (`/sogodni`, `/plan`) відкривались із холодного CloudFront, на дистрибуції `E136E23RX990B9` мають бути Custom error responses:

- HTTP 403 → `/index.html`, response 200
- HTTP 404 → `/index.html`, response 200

Або CloudFront Function з `infra/cloudfront-spa-function.js` на viewer-request. Деплой також кладе `404.html` (копія індексу) у бакет.
