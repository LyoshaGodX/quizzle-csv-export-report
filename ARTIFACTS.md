# Каталог артефактов и происхождение материалов

Исходный комплект перенесен из `docs/coursework/csv-export` личного форка [LyoshaGodX/Quizzle](https://github.com/LyoshaGodX/Quizzle/tree/4ead0c3/docs/coursework/csv-export), состояние после merge и итогового документационного коммита **4ead0c3**. Полный хеш источника записан в [source-manifest.json](evidence/source-manifest.json). Перенесены все 48 файлов первоначального комплекта.

Оригинальные снимки, выгрузки, JSON, фикстуры и протоколы не редактировались. Новый README дополнен, сайт и сценарий уточнены, копии скриптов адаптированы к отдельному репозиторию. Правила Git расширены для сохранения байтов всех оригинальных приложений на разных ОС. Оригиналы этих восьми измененных файлов сохранены в [source-artifacts](source-artifacts). Они являются историческими снимками; относительные ссылки и пути внутри них относятся к первоначальному расположению в Quizzle.

## Постановка и план

| Файл | Что подтверждает |
|---|---|
| [issue.md](issue.md), [issue.json](issue.json) | Первоначальный запрос функции, критерии и время создания до реализации |
| [plan.json](plan.json) | Исходные оценки и последовательность этапов |
| [stages.json](stages.json) | Созданные issues T1–T7, номера и первоначальные оценки |
| [pull-request.md](pull-request.md) | Сохраненное описание изменения для PR |

## Снимки интерфейса и GitHub

Все 11 снимков включены в основной [README](README.md) с нумерованными подписями.

| Файл | Этап и назначение |
|---|---|
| [before-desktop.jpg](screenshots/before-desktop.jpg) | До изменения: штатная кнопка Excel, набор NORM |
| [after-desktop.jpg](screenshots/after-desktop.jpg) | После изменения: CSV рядом с Excel, тот же NORM |
| [after-mobile.jpg](screenshots/after-mobile.jpg) | Экран 390×844, перенос кнопок |
| [empty-desktop.jpg](screenshots/empty-desktop.jpg) | Пустая выборка EMPT |
| [special-desktop.jpg](screenshots/special-desktop.jpg) | Кириллица, запятые, кавычки и другие специальные имена SPEC |
| [issue-before.jpg](screenshots/issue-before.jpg) | Реальная постановка задачи на GitHub |
| [projects-plan-before.jpg](screenshots/projects-plan-before.jpg) | Первоначальный план, до реализации; исторически частный проект |
| [projects-final.jpg](screenshots/projects-final.jpg) | Итоговые Done при сохраненных оценках |
| [commits.jpg](screenshots/commits.jpg) | История коммитов на этапе PR |
| [pull-request-open.jpg](screenshots/pull-request-open.jpg) | Открытый PR до окончательного merge |
| [pull-request-merged.jpg](screenshots/pull-request-merged.jpg) | Статус Merged и завершение изменения |

## Данные и выгрузки

| Файл | Происхождение и назначение |
|---|---|
| [attempts.json](fixtures/attempts.json) | Синтетические наборы NORM, EMPT, SPEC; не реальные учащиеся |
| [NORM.csv](samples/practice-results_NORM_2026-10-05.csv) | Реальное скачивание из локального интерфейса: 3 попытки, 211 байт |
| [EMPT.csv](samples/practice-results_EMPT_2026-10-05.csv) | Реальное скачивание пустой выборки: заголовок, 56 байт |
| [SPEC.csv](samples/practice-results_SPEC_2026-10-05.csv) | Реальное скачивание специальных имен: 5 попыток, 361 байт |
| [Исходный XLSX](samples/Übungsquiz_NORM_Analytics_20261005T144513.xlsx) | Регрессионная проверка прежней кнопки, 4 листа |
| [.gitattributes](.gitattributes) | Запрет нормализации CSV: сохранение BOM и CRLF |

Байты файлов из Downloads не изменялись. SHA-256 и проверка содержимого — в browser-downloads.json; полная проверка переноса — в source-manifest.json.

## Первоначальные протоколы и снимки состояния

| Файл | Назначение и предел доказательства |
|---|---|
| [unit-tests.txt](evidence/unit-tests.txt) | Вывод 18 успешных автоматических тестов |
| [build.txt](evidence/build.txt) | Успешная сборка с оставшимися исходными предупреждениями |
| [full-lint.txt](evidence/full-lint.txt) | Исходная несовместимость ESLint и конфигурации, не успешный полный lint |
| [scoped-lint.txt](evidence/scoped-lint.txt) | Ограниченная проверка трех файлов, не полный React/React Hooks lint |
| [browser-downloads.json](evidence/browser-downloads.json) | Размеры, SHA-256, сравнение строк с фикстурами, листы XLSX |
| [responsive.json](evidence/responsive.json) | Измерения ширины документа и кнопок на мобильном экране |
| [before-dom.txt](evidence/before-dom.txt), [after-dom.txt](evidence/after-dom.txt) | Сохраненные текстовые состояния страницы до и после |
| [empty-dom.txt](evidence/empty-dom.txt), [special-dom.txt](evidence/special-dom.txt) | Состояния страниц EMPT и SPEC |
| [projects-plan-before.txt](evidence/projects-plan-before.txt) | Текстовое состояние первоначальной таблицы Projects |
| [projects-final-dom.txt](evidence/projects-final-dom.txt) | Итоговые состояния карточек |
| [issue-final-dom.txt](evidence/issue-final-dom.txt) | Закрытая основная issue |
| [pull-request-created.json](evidence/pull-request-created.json) | Исходный ответ API при создании PR, не его итоговое состояние |
| [pull-request-merged-dom.txt](evidence/pull-request-merged-dom.txt) | Состояние PR после merge |
| [self-review.json](evidence/self-review.json) | Авторский комментарий ревью, не независимое APPROVED |
| [completion.json](evidence/completion.json) | Итоговая запись, основанная на Git и DOM, с merge-хешем |
| [timing.json](evidence/timing.json) | Календарный интервал до готовности основных материалов, не поэтапный трудоучет |
| [artifacts-check.json](evidence/artifacts-check.json) | Первоначальная проверка локальных ссылок, не визуальный тест сайта |

## Новая редакция и воспроизведение

| Файл | Назначение |
|---|---|
| [README.md](README.md) | Дополненный отчет и матрица соответствия заданию |
| [index.html](index.html) | Одностраничные основные результаты с настоящими снимками |
| [speech.md](speech.md) | Сценарий защиты и вопросы |
| [protocol-template.md](defense/protocol-template.md) | Незаполненный шаблон, не доказательство выступления |
| [PUBLICATION.md](PUBLICATION.md) | Разделение публикации отчета и истории кода, статус страницы |
| [source-manifest.json](evidence/source-manifest.json) | Полный перечень оригинальных файлов, отображение путей, размер и SHA-256 |
| [report-check.json](evidence/report-check.json) | Проверка ссылок и контрольных сумм нового комплекта |
| [report-downloads-check.json](evidence/report-downloads-check.json) | Повторное чтение неизмененных выгрузок после переноса |
| [report-scoped-lint.txt](evidence/report-scoped-lint.txt) | Повторная ограниченная проверка исходных файлов функции |
| [verify-artifacts.cjs](scripts/verify-artifacts.cjs) | Независимая от Quizzle проверка ссылок и SHA-256 |
| [verify-downloads.cjs](scripts/verify-downloads.cjs) | Чтение образцов через SheetJS из установленного Quizzle |
| [verify-lint.cjs](scripts/verify-lint.cjs) | Ограниченный lint исходного кода; путь к Quizzle передается аргументом |
| [seed-demo.cjs](scripts/seed-demo.cjs) | Подготовка синтетической локальной среды, не запускать на рабочем сервере |
| [record-source-manifest.cjs](scripts/record-source-manifest.cjs) | Однократная фиксация переноса, требует оригинальный клон Quizzle |
| [README оригинала](source-artifacts/README.md), [сайт оригинала](source-artifacts/index.html), [сценарий оригинала](source-artifacts/speech.md) | Нередактированные снимки прежних документов |
| [Исходные скрипты](source-artifacts/scripts), [MIT-лицензия Quizzle](source-artifacts/QUIZZLE-LICENSE) | Сохраненное происхождение и условия использования исходного проекта |

Манифест проверяет совпадение байтов, но не удостоверяет события сам по себе. Даты и последовательность дополнительно сверяются с исходными GitHub issue/PR и историей Git. Секреты доступа, реальные учетные записи учащихся и рабочие данные не включены.
