import { supabase } from './supabase-config.js';

export async function syncWorldCupMatches() {
    const API_TOKEN = '18771c99577949b8901dc8a8ce9c0d3f';
    const URL = 'https://api.football-data.org/v4/competitions/WC/matches';

    try {
        console.log("Iniciando sincronización con football-data.org...");
        const response = await fetch(URL, {
            headers: { 'X-Auth-Token': API_TOKEN }
        });

        if (!response.ok) throw new Error(`Error API: ${response.status}`);

        const data = await response.json();
        const matches = data.matches;

        if (!matches || matches.length === 0) {
            console.warn("No se encontraron partidos programados aún en la API.");
            return;
        }

        for (const match of matches) {
            const matchData = {
                id_partido: match.id.toString(),
                equipo_a: match.homeTeam.name || 'Por definir',
                equipo_b: match.awayTeam.name || 'Por definir',
                fecha: new Date(match.utcDate).toISOString(),
                fase: translateStage(match.stage),
                resultado_a: match.score.fullTime.home ?? null,
                resultado_b: match.score.fullTime.away ?? null,
            };

            await supabase.from('partidos').upsert(matchData);
        }

        console.log(`Sincronización exitosa: ${matches.length} partidos actualizados.`);
        alert(`¡Éxito! Se han sincronizado ${matches.length} partidos.`);
    } catch (error) {
        console.error("Error sincronizando partidos:", error);
    }
}

function translateStage(stage) {
    const stages = {
        'GROUP_STAGE': 'Fase de Grupos',
        'LAST_16': 'Octavos de Final',
        'QUARTER_FINALS': 'Cuartos de Final',
        'SEMI_FINALS': 'Semifinales',
        'FINAL': 'Final'
    };
    return stages[stage] || stage;
}