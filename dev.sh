#!/bin/bash

# --- Cargar variables desde .env ---
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "Error: Archivo .env no encontrado."
    exit 1
fi

# --- Configuración (ahora usa las variables de .env) ---
PORT=$port  # Usa la variable 'port' del .env
HOST="$host"  # Usa la variable 'host' del .env (las comillas manejan espacios/URLs)
ELECTRON_PID=""
NG_PID=""
TSC_PID=""

# --- Resto del script (igual pero usando $HOST y $PORT) ---
cleanup() {
    echo "Cerrando procesos..."
    kill -9 $NG_PID $TSC_PID $ELECTRON_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# 1. Compilar TypeScript de Electron
echo "Compilando archivos de Electron..."
tsc -p tsconfig.electron.json

# 2. Iniciar TypeScript en watch mode
echo "Iniciando watch de TypeScript..."
tsc -p tsconfig.electron.json --watch &
TSC_PID=$!

# 3. Iniciar Angular (usando $HOST y $PORT de .env)
echo "Iniciando servidor de Angular..."
ng serve --host $HOST --port $PORT &
NG_PID=$!

# 4. Esperar a que Angular esté listo (usando $HOST y $PORT)
echo "Esperando a que Angular esté disponible..."
until curl -s "$HOST:$PORT" >/dev/null; do
    sleep 1
done

# 5. Iniciar Electron
echo "Iniciando Electron..."
electron . &
ELECTRON_PID=$!

wait $ELECTRON_PID
cleanup
