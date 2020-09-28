## Description

KostenrechnungVue is a tool for a specific company to calculate a cost accounting. The costs (Kosten) and incomes (Leistungen) can be added in the bottom and the result is displayed at the top.

There are the following costs (Kosten) and incomes (Leistungen):
- Wartungsverträge: fixed contracts which pay a fixed monthly amount.
- Extra Einnahmen: irregular incomes payed once.
- Personal: List of staff.
- Kalkulierte Kosten: Gemeinkosten, Serverkosten, Nebenkosten, Vertriebskosten have been calculated based on earlier years and are assumed to remain static.

## Feature Requests
- Graph which shows changes to enable review of progress over time. Possible because every change is already written to database.

## Issues
- 

## Project setup
Both for the the Node Backend and the Vue Frontend:
```
npm install
```
First add a few products, costs and incomes and the results will appear at the top of the page.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).