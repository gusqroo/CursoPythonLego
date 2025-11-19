import { Module } from './types';

export const COURSE_CONTENT: Module[] = [
  {
    id: 'mod1',
    title: 'Módulo 1: Despegue Python',
    description: 'Inicia tu viaje: Del texto a la magia.',
    icon: 'python',
    lessons: [
      {
        id: 'l1-1',
        title: 'Bloques vs. Python',
        content: `
### ¡Bienvenido, Futuro Ingeniero! 🚀

Quizás hayas usado "Bloques de Palabras" antes. Funcionan como piezas de rompecabezas. Python es diferente: es un **lenguaje basado en texto**.

**¿Por qué aprender Python?**
1.  **Es Real:** ¡La NASA, Google y los científicos de datos usan Python!
2.  **Es Rápido:** Escribir suele ser más rápido que arrastrar bloques una vez que practicas.
3.  **Es Potente:** Te da un control total sobre tu robot SPIKE Prime.

Imagina que los Bloques son como ladrillos *Duplo* (fáciles, grandes), y Python son piezas *Technic* (precisas, potentes).
        `,
        quiz: [
          {
            question: "¿Por qué es diferente Python de los Bloques de Palabras?",
            options: [
              "Usa piezas de rompecabezas coloridas.",
              "Es un lenguaje de programación basado en texto.",
              "Solo funciona los lunes.",
              "Es más difícil de usar que C++."
            ],
            correctIndex: 1,
            explanation: "¡Exacto! Python usa texto (palabras y símbolos) en lugar de bloques de arrastrar y soltar."
          }
        ]
      },
      {
        id: 'l1-2',
        title: 'Variables: La Caja Mágica',
        content: `
### Guardando Información 📦

En Python, una **variable** es como una caja etiquetada donde guardas cosas para usarlas después.

*   **Enteros (Integers):** Números completos (ej. \`velocidad = 50\`)
*   **Texto (Strings):** Texto entre comillas (ej. \`nombre_robot = "Spike"\`)
*   **Booleanos:** Verdadero o Falso (ej. \`encendido = True\`)

Para crear una variable, solo le das un nombre y usas el signo \`=\`.
        `,
        codeSnippet: `mi_velocidad = 75
nombre_robot = "Rex"
print(nombre_robot)`,
        challenge: {
          description: "Crea una variable llamada 'energia' y asígnale el valor 100.",
          initialCode: "# Crea tu variable abajo\n",
          expectedKeywords: ["energia", "=", "100"],
          successMessage: "¡Gran trabajo! Acabas de guardar energía en la memoria de tu programa."
        },
        quiz: [
          {
            question: "¿Qué símbolo usamos para asignar un valor a una variable?",
            options: [
              ":",
              "->",
              "=",
              "=="
            ],
            correctIndex: 2,
            explanation: "El signo igual '=' se usa para ASIGNAR valor. (Ej: puntos = 10)."
          }
        ]
      }
    ]
  },
  {
    id: 'mod2',
    title: 'Módulo 2: El Cerebro Digital',
    description: 'Enseñando a tu robot a pensar y decidir.',
    icon: 'logic',
    lessons: [
      {
        id: 'l2-1',
        title: 'Comparando el Mundo',
        content: `
### ¿Es Mayor o Menor? ⚖️

Para que un robot tome decisiones, necesita comparar cosas. Usamos **Operadores de Comparación**:

*   \`<\` (Menor que): ¿Es la distancia menor que 10?
*   \`>\` (Mayor que): ¿Es la velocidad mayor que 50?
*   \`==\` (Igual a): ¿Es el color igual a "Rojo"? (¡Nota el doble igual!)

El resultado de una comparación siempre es **True** (Verdadero) o **False** (Falso).
        `,
        codeSnippet: `distancia = 15
es_seguro = distancia > 10
print(es_seguro) # Imprimirá True`,
        quiz: [
          {
            question: "Si tienes `puntos = 5`, ¿qué resultado da `puntos == 10`?",
            options: ["True", "False", "5", "Error"],
            correctIndex: 1,
            explanation: "Es Falso, porque 5 no es igual a 10. Recuerda usar '==' para preguntar si son iguales."
          }
        ]
      },
      {
        id: 'l2-2',
        title: 'Decisiones (Si / Si no)',
        content: `
### Caminos Separados 🔀

Ahora que sabemos comparar, usemos \`if\` (si) y \`else\` (si no).

"**SI (if)** veo una pared, detente. **SI NO (else)**, avanza."

⚠️ **Regla de Oro:** ¡La indentación (espacios al inicio) es vital! Todo lo que pasa DENTRO del if debe estar empujado a la derecha.
        `,
        codeSnippet: `distancia = 8

if distancia < 10:
    print("¡Peligro! ¡Frena!")
else:
    print("Todo despejado")`,
        challenge: {
          description: "Escribe un if que imprima 'Ganaste' si la variable 'puntos' es mayor que 50.",
          initialCode: "puntos = 60\n# Escribe tu if abajo\n",
          expectedKeywords: ["if", "puntos", ">", "50", "print", "Ganaste"],
          successMessage: "¡Lógica perfecta! Tu robot sabe reconocer la victoria."
        },
        quiz: [
          {
            question: "¿Qué indica qué código pertenece al 'if'?",
            options: ["Paréntesis ()", "Llaves {}", "Indentación (espacios)", "Corchetes []"],
            correctIndex: 2,
            explanation: "En Python, los espacios al inicio de la línea (sangría) definen los bloques de código."
          }
        ]
      }
    ]
  },
  {
    id: 'mod3',
    title: 'Módulo 3: Estación de Configuración',
    description: 'Preparando tu SPIKE Prime para la acción.',
    icon: 'setup',
    lessons: [
      {
        id: 'l3-1',
        title: 'Conectando el Hub',
        content: `
### El Corazón del Robot 💛

El **Hub** es el ladrillo amarillo. Antes de programar, debemos conectarlo.

1.  Abre la App LEGO Education SPIKE.
2.  Crea un proyecto nuevo y selecciona **Python**.
3.  Conecta tu Hub vía **Cable USB** (mejor para empezar) o **Bluetooth**.
4.  ¡Busca el icono verde de "Conectado"!

**Consejo Pro:** Si el Hub hace cosas raras, busca "Actualización de Firmware" en la app.
        `,
        quiz: [
          {
            question: "¿Por qué usar cable USB la primera vez?",
            options: ["Es más bonito", "Es necesario para actualizaciones de firmware seguras", "Carga más rápido", "El Bluetooth no funciona en martes"],
            correctIndex: 1,
            explanation: "El USB es la conexión más estable y segura para configurar y actualizar el cerebro de tu robot."
          }
        ]
      }
    ]
  },
  {
    id: 'mod4',
    title: 'Módulo 4: Motores en Marcha',
    description: '¡A rodar! Controlando el movimiento físico.',
    icon: 'motor',
    lessons: [
      {
        id: 'l4-1',
        title: 'La Librería SPIKE',
        content: `
### Invocando Herramientas 🛠️

Python tiene muchas funciones, pero no sabe de robots por defecto. Necesitamos **importar** la librería de SPIKE.

Siempre empieza tu código con:
\`\`\`python
from spike import PrimeHub, Motor
\`\`\`

Esto le dice a Python: "Voy a usar el Hub y los Motores".
        `,
        quiz: [
          {
            question: "¿Qué palabra clave usamos para traer herramientas externas?",
            options: ["load", "get", "import", "require"],
            correctIndex: 2,
            explanation: "Usamos 'import' para cargar librerías como 'spike'."
          }
        ]
      },
      {
        id: 'l4-2',
        title: 'Moviendo un Motor',
        content: `
### ¡Gira esa Rueda! ⚙️

Digamos que tienes un motor en el **Puerto A**.

1.  **Inicializar:** \`motor_a = Motor('A')\`
2.  **Acción:** \`motor_a.run_for_rotations(2, 75)\`

*(Rotaciones, Velocidad)*. Velocidad negativa (-75) hace que gire hacia atrás.
        `,
        challenge: {
          description: "Configura un motor en el Puerto 'B' y hazlo girar 10 rotaciones.",
          initialCode: "from spike import Motor\n\n# Inicializa Motor B\n# Corre por 10 rotaciones",
          expectedKeywords: ["Motor('B')", "run_for_rotations", "10"],
          successMessage: "¡Se mueve! Has traducido código en movimiento real."
        },
        quiz: [
          {
            question: "¿Cómo harías que el motor gire hacia atrás?",
            options: ["Gritándole '¡Atrás!'", "Usando una velocidad negativa (ej. -50)", "Girando el Hub", "No se puede"],
            correctIndex: 1,
            explanation: "Los números negativos en la velocidad invierten la dirección del motor."
          }
        ]
      }
    ]
  },
  {
    id: 'mod5',
    title: 'Módulo 5: Sentidos Robóticos',
    description: 'Usando sensores para ver y tocar el mundo.',
    icon: 'sensor',
    lessons: [
      {
        id: 'l5-1',
        title: 'El Sensor de Distancia',
        content: `
### Ojos Ultrasónicos 👀

El Sensor de Distancia usa sonido (como los murciélagos) para medir lejanía.

\`\`\`python
from spike import DistanceSensor
ojos = DistanceSensor('C')

distancia = ojos.get_distance_cm()
print(distancia)
\`\`\`
        `,
        quiz: [
          {
            question: "¿Qué pasa si el sensor no ve nada?",
            options: ["Devuelve 'None'", "Explota", "Devuelve 0", "Devuelve 1000"],
            correctIndex: 0,
            explanation: "En la librería de SPIKE, suele devolver 'None' si no puede leer un rebote claro de sonido."
          }
        ]
      },
      {
        id: 'l5-2',
        title: 'Sensor de Color',
        content: `
### Viendo Colores 🎨

El sensor de color puede detectar... ¡colores! O la intensidad de luz reflejada (para seguir líneas).

\`\`\`python
from spike import ColorSensor
ojo_color = ColorSensor('D')

color = ojo_color.get_color()
if color == 'red':
    print("¡Veo Rojo!")
\`\`\`
        `,
        challenge: {
          description: "Simula: Si el color es 'blue' (azul), imprime 'Agua'.",
          initialCode: "color_detectado = 'blue'\n# Escribe tu if abajo\n",
          expectedKeywords: ["if", "color_detectado", "==", "'blue'", "print", "Agua"],
          successMessage: "¡Excelente! Tu robot ahora puede distinguir elementos."
        },
        quiz: [
          {
            question: "¿Para qué sirve el sensor de color en una competencia?",
            options: ["Para ver Netflix", "Para seguir líneas en el suelo", "Para medir temperatura", "Para escuchar sonidos"],
            correctIndex: 1,
            explanation: "Es muy común usarlo para seguir líneas negras sobre fondo blanco midiendo la luz reflejada."
          }
        ]
      }
    ]
  },
  {
    id: 'mod6',
    title: 'Módulo 6: El Poder de la Repetición',
    description: 'Bucles: Haciendo tareas aburridas divertidas.',
    icon: 'loop',
    lessons: [
      {
        id: 'l6-1',
        title: 'El Bucle FOR',
        content: `
### Repetir Contando 🔢

¿Quieres moverte en un cuadrado? Avanzar y girar... ¡4 veces! En lugar de escribir 8 líneas, usamos un bucle \`for\`.

\`\`\`python
for x in range(4):
    motor.run_for_seconds(1, 50) # Avanza
    motor.run_for_degrees(90, 30) # Gira
\`\`\`

\`range(4)\` crea una secuencia: 0, 1, 2, 3. El código dentro se repite para cada uno.
        `,
        challenge: {
          description: "Escribe un bucle for que se repita 3 veces e imprima 'Hola'.",
          initialCode: "# Bucle for abajo\n",
          expectedKeywords: ["for", "in", "range(3)", "print", "Hola"],
          successMessage: "¡Genial! Te has ahorrado escribir 'print' tres veces. ¡Eso es eficiencia!"
        },
        quiz: [
          {
            question: "¿Cuántas veces se ejecuta `range(5)`?",
            options: ["4 veces", "5 veces", "10 veces", "Infinitas veces"],
            correctIndex: 1,
            explanation: "Se ejecuta 5 veces (contando 0, 1, 2, 3, 4)."
          }
        ]
      },
      {
        id: 'l6-2',
        title: 'El Bucle WHILE',
        content: `
### Repetir Hasta Que... ⏳

El bucle \`while\` (mientras) es perfecto para sensores. "Sigue avanzando **MIENTRAS** no haya pared".

\`\`\`python
while sensor.get_distance_cm() > 10:
    motor.start(50)

motor.stop()
\`\`\`

El robot revisa la condición constantemente. En cuanto sea Falsa (distancia menor a 10), el bucle se rompe y el robot para.
        `,
        quiz: [
          {
            question: "¿Qué pasa si la condición del 'while' nunca se vuelve Falsa?",
            options: ["El programa termina", "El robot se apaga", "Bucle Infinito (nunca para)", "Da un error"],
            correctIndex: 2,
            explanation: "¡Cuidado! Un bucle infinito hará que tu programa se quede atascado para siempre (o hasta que lo detengas manualmente)."
          }
        ]
      }
    ]
  },
  {
    id: 'mod7',
    title: 'Módulo 7: Mis Propios Bloques',
    description: 'Creando Funciones para organizar tu mente.',
    icon: 'function',
    lessons: [
      {
        id: 'l7-1',
        title: 'Definiendo Funciones',
        content: `
### Tus Propios Comandos 🪄

¿Cansado de escribir el mismo código para "Girar y Pitar"? ¡Crea una función! Es como hacer tu propio bloque en SPIKE.

\`\`\`python
def girar_y_pitar():
    motor.run_for_degrees(180)
    hub.speaker.beep()

# ¡Ahora úsala!
girar_y_pitar()
girar_y_pitar()
\`\`\`

Usamos \`def\` para definirla.
        `,
        challenge: {
          description: "Define una función llamada 'saludar' que imprima 'Hola Robot'.",
          initialCode: "# Define tu funcion aqui\n",
          expectedKeywords: ["def", "saludar():", "print", "Hola Robot"],
          successMessage: "¡Has creado magia! Ahora puedes 'saludar' cuando quieras con una sola línea."
        },
        quiz: [
          {
            question: "¿Qué palabra clave crea una función?",
            options: ["func", "create", "def", "new"],
            correctIndex: 2,
            explanation: "'def' es la abreviatura de 'definir' en Python."
          }
        ]
      }
    ]
  },
  {
    id: 'mod8',
    title: 'Módulo 8: Misión Final',
    description: 'El Gran Desafío: Robot Explorador Autónomo.',
    icon: 'project',
    lessons: [
      {
        id: 'l8-1',
        title: 'El Robot Esquiva-Obstáculos',
        content: `
### El Reto Final 🏆

Vamos a combinar todo: **Motores + Sensores + Bucles + If/Else**.

**Tu Misión:**
Programar un robot que conduzca hacia adelante indefinidamente. Si ve un obstáculo a menos de 15cm, debe detenerse, retroceder un poco, girar a la derecha y seguir explorando.

\`\`\`python
while True:
    dist = sensor.get_distance_cm()
    if dist is not None and dist < 15:
        motor.stop()
        motor.run_for_seconds(0.5, -30) # Atrás
        motor.run_for_degrees(90, 50)   # Girar
    else:
        motor.start(30) # Avanzar
\`\`\`
        `,
        challenge: {
          description: "Escribe la lógica: Si distancia < 10, imprimir 'Obstaculo', si no, imprimir 'Avanzando'. Todo en un bucle while True.",
          initialCode: "distancia = 20\nwhile True:\n    # Tu codigo aqui\n    break # Break para probar una vez",
          expectedKeywords: ["if", "distancia", "<", "10", "print", "Obstaculo", "else", "Avanzando"],
          successMessage: "¡FELICIDADES! 🎉 Has completado el curso. Eres oficialmente un Programador de SPIKE Prime en Python."
        },
        quiz: [
          {
            question: "¿Qué significa 'Autónomo'?",
            options: ["Que necesita control remoto", "Que toma decisiones por sí mismo", "Que tiene ruedas", "Que usa pilas"],
            correctIndex: 1,
            explanation: "Un robot autónomo usa sus sensores y su código (cerebro) para reaccionar al mundo sin ayuda humana constante."
          }
        ]
      }
    ]
  }
];