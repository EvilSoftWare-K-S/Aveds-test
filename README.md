# Aveds-test

## Инструкция по установке и запуску

📦Скопируйте этот репозиторий. Вам понадобятся "node" и "yarn", установленные глобально на вашем компьютере.  
Для установки node: посетите https://nodejs.org/en и скачайте установочный файл под свою OS  
Для установки yarn: введите в свой терминал `npm install -g yarn`

```bash
$ git clone git@github.com:EvilSoftWare-K-S/Aveds-test.git
$ cd Aveds-test
$ yarn install
$ yarn dev
```

Открой http://localhost:5173/ в своём браузере.

## gitflow

Ветки называются по номеру задачи.
FAT-X, где X номер задачи.

Коммиты оставляются по принципу:
'<feat>' - новый функционал/компонент/стиль
'<fix>' - исправлен баг
'<refactor>' - исправлен баг

## gitflow пример

git commit -m '<feat>:<Добавлен Header>'

To Run Linter:

```bash
yarn lint
```

To Build Project:

```bash
yarn build
```
