# Gestor de Tareas
Este es un proyecto para la Tercera Pre-entrega del curso de Javascript de Coder.  
El proyecto es un simulador de un Gestor de Tareas que tendrá las siguientes características:

* El usuario podrá ingresar múltiples tareas con la ayuda de la clase Tarea, sus propiedades y métodos.
* Cada tarea constituirá un objeto, cuyas propiedades de descripción, lugar, fecha, hora, personas y 
  materiales, entre otras, serán ingresadas a través de un formulario.
* Las tareas serán almacenadas como objetos en un array, y objetos Date creados como propiedad en cada tarea.
* El usuario tendrá la opción también de realizar una búsqueda con criterios específicos entre
  las tareas almacenadas, para luego, una vez ordenadas cronológicamente con la ayuda de la función de segundo 
  orden sort(), mostrar aquellas que coinciden con estos criterios en la página del sitio.
* La comparación entre estos criterios específicos y la información de las tareas, guardada en
  las propiedades de los objetos, se realizará con la ayuda de la función de segundo orden filter().
* El despliegue de las tareas y los resultados de búsqueda se realizará a través de la manipulación del DOM, 
  con ayuda de funciones de JavaScript, así como del framework Bootstrap para un adecuado display responsive.
* El simulador podrá seguir funcionando "infinitamente" gracias a los event listeners actuando contantemente
  en segundo plano.

# Para ejecutar el proyecto

* Copiar el código en Visual Studio Code y usar la extensión Live Server para abrirlo en un navegador.
* Dirigirse a la sección de Deployments de la página principal del repositorio de Github y dar click
  en el enlace que allí aparece para abrirlo en el navegador.