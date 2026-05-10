# StockSmart - Sistema de Gestión de Inventario

## Descripción
StockSmart es una aplicación web desarrollada para la gestión integral de inventarios de productos. Permite a los usuarios administrar productos, categorías, movimientos de stock y generar reportes estadísticos. Este proyecto fue creado como parte de la asignatura de Programación en JavaScript, con el objetivo de demostrar el dominio de los conceptos fundamentales del lenguaje.

La aplicación incluye una interfaz de usuario intuitiva y responsiva, diseñada para facilitar la administración de inventarios en entornos comerciales pequeños o medianos.

## Instalación
Para ejecutar este proyecto localmente, asegúrese de tener Node.js instalado (versión 16 o superior).
### Pasos de instalación:
1. **Clonar el repositorio:**
   ```
   git clone <url-del-repositorio>
   cd stockSmart
   ```
2. **Instalar dependencias:**
   ```
   npm install
   ```
3. **Ejecutar la aplicación:**
   ```
   npm run dev
   ```
La aplicación estará disponible en `http://localhost:3000`.

## Uso
Una vez ejecutada, la aplicación ofrece las siguientes secciones principales:
- **Dashboard:** Vista general con estadísticas clave del inventario.
- **Inventario:** Gestión completa de productos (agregar, editar, eliminar, buscar).
- **Categorías:** Organización de productos por categorías.
- **Estadísticas:** Visualización de datos mediante gráficos y reportes.
- **Configuración:** Ajustes personalizables como tasas de cambio y métodos de cálculo.

## Características
- Gestión completa de productos con validaciones de entrada.
- Sistema de categorías para organización.
- Seguimiento de movimientos de inventario (entradas y salidas).
- Estadísticas en tiempo real con gráficos interactivos.
- Soporte para múltiples monedas (USD y CUP).
- Interfaz responsiva en modo oscuro.
- Soporte para idiomas (español e inglés).

## Tecnologías Utilizadas
- **React 19.0.1:** Framework para la construcción de la interfaz de usuario.
- **Vite 6.2.3:** Herramienta de desarrollo y bundling.
- **Tailwind CSS 4.2.4:** Framework de estilos CSS.
- **Recharts:** Librería para gráficos y visualizaciones.
- **Lucide React:** Conjunto de íconos vectoriales.
- **Otras dependencias:** date-fns, clsx, tailwind-merge, entre otras.

## Acerca del Proyecto

Este proyecto fue desarrollado como estudiante de la asignatura Optativa I : JavaScript. Representa un esfuerzo por aplicar los cuatro temas principales de la materia:
- **Tema 1:** Variables, tipos de datos, estructuras de control y funciones básicas.
- **Tema 2:** Objetos y programación orientada a objetos.
- **Tema 3:** Manejo de datos con métodos de arrays (map, filter, reduce) y closures.
- **Tema 4:** Modelo de ejecución y asincronía (callbacks, Promises, async/await).

Durante el desarrollo, enfrenté desafíos como la gestión de estado en React y la implementación de validaciones, lo que me permitió profundizar en estos conceptos. El proyecto no solo cumple con los requisitos académicos, sino que también resulta funcional para usos prácticos.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar el proyecto o reportar problemas, por favor:
1. Haz un fork del repositorio.
2. Crea una rama para tus cambios.
3. Envía un pull request con una descripción detallada.

