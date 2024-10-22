# PARA FRONTEND
- Instalar NODE LTS al momento de escribir esto es: [20.18.0](https://nodejs-org.translate.goog/en/download/package-manager?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es-419&_x_tr_pto=sc&_x_tr_hist=true)
- Acceder a la ruta raiz de frontend y instalar dependencias con: 
```bash
cd frontend-club-de-leones
npm install
```
- Corrrer en modo developing:
```bash
npm run dev
```
- Hacer build
```bash
npm run build
```
# PARA BACKEND
- Instalar [php 8.3.2](https://www.php.net/releases/8_3_2.php) y [composer 2.8.1](https://getcomposer.org/download/)
  + Recuerda modificar tu php.ini para poder usar mysql, postgress, etc o cambiar otras propiedades.
- Acceder a la ruta raiz de la api y instalar dependencias con: 
```bash
cd api-club-de-leones
composer install
```
- Usa .env.example para crear un archivo llamado .env, donde colocarás tus variables de entorno para tu db y mail service
- Para iniciar tu ambiente, y cada vez que haya cambios en migraciones recuerda correr.
  + Si hay un error de conexión con tu db, puede ser un error en tus variables de entorno, credenciales o faltas de drivers en php.ini.
```bash
php artisan migrate
```
- La primera vez, deberás generar una key que sirve para la autenticacion por tokens.
```bash
php artisan key:generate
```
- Para correr tu api:
```bash
php artisan serve
```
