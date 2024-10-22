#PARA FRONTEND
-Instalar NODE LTS al momento de escribir esto es: 20.18.0 
-Acceder a la ruta raiz de frontend y instalar dependencias con: 
```bash
cd frontend-club-de-leones
npm install
```
-Corrrer en modo developing:
```bash
npm run dev
```
-Hacer build
```bash
npm run build
```
#PARA BACKEND
-Instalar php 8.3.2 y composer 2.8.1
-Acceder a la ruta raiz de la api y instalar dependencias con: 
```bash
cd api-club-de-leones
composer install
```
-Usa .env.example para crear un archivo llamado .env, donde colocaras tus variables de entorno para tu db y mail service
-Para iniciar tu ambiente, y cada vez que haya cambios en migraciones recuerda correr.
```bash
php artisan migrate
```
-La primera vez que clones esta repo deberas genera una key que sirve para la autenticacion por tokens.
```bash
php artisan key:generate
```
-Para correr tu api:
```bash
php artisan serve
```
