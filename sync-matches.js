import { supabase } from './supabase-config.js';

/**
 * Sincroniza el calendario desde una fuente local (JSON extraído del Excel)
 * Esto evita depender de una API externa y asegura que los datos coincidan
 * con tu archivo WCup_2026_4.2.7_en.xlsx
 */
export async function syncWorldCupMatches() {
    try {
        console.log("Cargando calendario desde el archivo de origen...");
        
        // Asumimos que conviertes el Excel a un archivo data/calendario.json
        const response = await fetch('./data/calendario.json');
        if (!response.ok) throw new Error("No se encontró el archivo de calendario JSON.");
        
        const matches = await response.json();

        if (!matches || matches.length === 0) {
            console.warn("El archivo de calendario está vacío.");
            return;
        }

        for (const match of matches) {
            const matchData = {
                id_partido: match.id_partido.toString(),
                equipo_a: match.equipo_a,
                equipo_b: match.equipo_b,
                fecha: new Date(match.fecha).toISOString(),
                fase: match.fase,
                resultado_a: match.resultado_a ?? null,
                resultado_b: match.resultado_b ?? null,
            };

            await supabase.from('partidos').upsert(matchData);
        }

        console.log(`Sincronización exitosa: ${matches.length} partidos actualizados.`);
        alert(`¡Éxito! Calendario importado correctamente.`);
    } catch (error) {
        console.error("Error sincronizando partidos:", error);
    }
}