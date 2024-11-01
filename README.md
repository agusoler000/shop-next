#Descripción


## Correr en dev
1. Clonar Repositiorio
2. Crear archivo .env (tomando como ejemplo .env.template)
3. Instalar depedencias ```npm install```
4. Levantaer BBDD  ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar Seed ```npm run seed```
6. Correr aplicacion ```npm run dev```
