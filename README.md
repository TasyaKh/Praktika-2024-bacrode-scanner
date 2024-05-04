# Сканнер штрихкодов

## Описание

Приложение предназначено для сканирования штрихкодов с помощью телефона, используется mlkit библиотека (подробнее https://developers.google.com/ml-kit/vision/barcode-scanning/android).

**Возможности**:

Документы, Сканнер, Переименовать документ, Сканированный код, Отправка CSV с кодами на почту, Редактировать почту куда отправить файл

![image](https://github.com/TasyaKh/bacrode-csanner/assets/91024491/74fbf854-66a2-4446-a5a5-e0fac42e2ec3)

## Сборка build apk

1)  go to android folder ```cd ./android```
2)  then write```./gradlew assembleRelease```
3) result apk will be placed in android/app/build/outputs/apk/release/app-release.apk

## Запуск проекта

1) подсоединить телефон для отладки, либо скачать с использованием AndroidStudio виртуальное устройство
2) в папке ```cd ./barcode-csanner``` в терминале в среде разработки написать ```npm start```
3) далее в зависимости от платформы в появившемся окне/меню выбрать режим отладки приложения на android/ios

## Дополнительно

Сброс кэша приложения

```npm start -- --reset-cache```







