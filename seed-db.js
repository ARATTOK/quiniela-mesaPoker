import { supabase } from './supabase-config.js';

/**
 * Ejecuta esta función para generar las tablas iniciales en Supabase.
 * Crea los 13 participantes y la estructura base de partidos.
 */
export async function initializeSupabase() {
    console.log("Iniciando generación de base de datos...");

    // 1. Crear los 13 participantes
    const users = [];
    for (let i = 1; i <= 13; i++) {
        users.push({
            id: `user${i}`,
            nombre: `Participante ${i}`,
            puntos: 0,
            exactos: 0,
            cercanos: 0,
            parciales: 0,
        });
    }
    await supabase.from('rankings').upsert(users);

    // 2. Crear un partido de ejemplo
    await supabase.from('partidos').upsert({
        id_partido: "ejemplo_1",
        equipo_a: "México",
        equipo_b: "Por Definir",
        fecha: new Date("2026-06-11T18:00:00Z").toISOString(),
        fase: "Fase de Grupos",
        resultado_a: null,
        resultado_b: null
    });

    alert("¡Base de datos generada! Ya puedes ver los 13 usuarios en la pestaña Rankings.");
}