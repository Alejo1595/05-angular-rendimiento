# Curso de rendimiento en angular

## Analizando el tamaño del bundle

### Bundle size

Este concepto significa cuanto pesa en bytes tu aplicación en angular. Por lo general cuando se compila en angular, generamos varios archivos Javascript: **main.js**, vendor.js, runtime.js y los archivos modularizables que se hayan creado por medio del lazy loading.

El navegador debe realizar una serie de procesos para poder cargar nuestro sitio web.primero lanza un request a nuestro index.html o a html raiz en donde leera linea a liena para ir descubriendo los recursos que debe ir descargando, recursos como imagenes, archivo de estilos y archivos javascript.

El en caso de javascript debe realizar 4 pasos:

- Descargarlo,
- Parsearlo,
- Compilarlo
- Ejecutarlo.

El paso que mas suele tardarse es la descargar ya que entre mas pesado sea el archivo mas lento sera la descarga.

### Tree skaking

Es una técnica en la cual removemos las librerías y código que no se utiliza en la app.

### Implementando webpack bundle Analyzer

Para instalarlo usamos el siguiente comando:

```txt
npm install webpack-bundle-analyzer --save-dev
```
Luego de instalarlo como dependencia de desarrollo, debemos generar un build de nuestra aplicación con el siguiente comando:

```txt
ng build --stats-json
```

Este comando nos va a genarar el build para producción de nuestra aplicación ademas de un archivo json llamado **stats.json** que será leido por nuestro webpack-bundle-analyzer.

Para leer el archivo **stats.json** con **webpack-bundle-analyzer** debemos utilizar el siguiente comando:

```txt
npx webpack-bundle-analyzer dist/project_name/stats.json
```

Estos nos va ejecutar **webpack-bundle-analyzer** y nos lanzara un navegador con las estadisticas de perso de nuestra aplicación.
### bundlephobia

Es una pagina web en la cual podemos ver cuando pesa una librería ademas de eso ver alternativas a la libreria buscada para conocer si existen opciones mas livianas pero sobre todo que cumplan con nuestros requerimientos.

```txt
https://bundlephobia.com/
```

### Performace budget calculetor

Es una herramienta en la cual podemos colocar el peso de nuestros archivos, html, css, js y nos indicara de carga del sitio.

```txt
https://perf-budget-calculator.firebaseapp.com/
```

Ademas de eso en el angular.json en la seccion configurations.production.budget podemos configurar el tamaño minimo y maximo que pueden pensar nuestas aplicaciones para que el mismo angular nos indique si hemos excedido ese peso.
