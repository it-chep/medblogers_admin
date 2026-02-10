

env: 

REACT_APP_SERVER_URL_API
REACT_APP_USE_AUTH


### server url
REACT_APP_SERVER_URL_API=host/api

### use auth
либо 'false', либо любое другое знач ('')
например, REACT_APP_USE_AUTH=false

### use mocks
REACT_APP_USE_MOCK="true"


### Установка зависимостей
npm install

### Запуск в режиме разработки
npm start

### Сборка
npm run build

### будет создана папка /build 
### это папку можно раздавать с помощью serve:
npm install -g serve
serve -s build -l 3000
