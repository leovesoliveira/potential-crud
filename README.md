# PotentialCRUD

Projeto dividido em duas past:
- API: api/
- Frontend : frontend/

## **API**
Necessário: **Docker** instalado e atualizado.


Lista de comandos necessários para rodar a api:

```
cp .env.example .env
```

```
docker-compose up -d
```

```
docker-compose exec app composer install
```

```
docker-compose exec app php artisan key:generate
```

```
docker-compose exec app php artisan migrate
```

```
docker-compose exec app php artisan test
```

```
docker-compose exec app php artisan db:seed
```



## **Frontend**

Necessário: **node/npm** instalado e atualizado.

Lista de comandos necessários para rodar o frontend:

```
npm install
```

```
npm start
```
