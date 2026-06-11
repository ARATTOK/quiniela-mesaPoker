import { supabase } from './supabase-config.js';
import { syncWorldCupMatches } from './sync-matches.js';
import { initializeSupabase } from './seed-db.js';

async function showTab(tab) {
    const content = document.getElementById('content');
    content.innerHTML = '<p>Cargando...</p>';
    
    // Actualizar estado activo en la navegación
    document.querySelectorAll('#main-nav button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`nav-${tab}`);
    if (activeBtn) activeBtn.classList.add('active');

    if (tab === 'rankings') {
        try {
            const { data: rankings, error } = await supabase.from('rankings').select('*').order('puntos', { ascending: false });
            if (error) throw error;
            
            let html = '<h2>Tabla de Posiciones</h2><button onclick="runSeed()" style="font-size:10px">Resetear DB</button><table class="ranking-table"><tr><th>Pos</th><th>Participante</th><th>Puntos</th></tr>';
            rankings.forEach((data, index) => {
                html += `<tr><td>${index + 1}</td><td>${data.nombre}</td><td><strong>${data.puntos}</strong></td></tr>`;
            });
            
            if (rankings.length === 0) {
                content.innerHTML = '<h2>Rankings</h2><p>Aún no hay puntos registrados.</p>';
            } else {
                content.innerHTML = html + '</table>';
            }
        } catch (e) {
            content.innerHTML = '<p>Error al cargar: ' + e.message + '</p>';
        }
    } 
    
    else if (tab === 'reglamento') {
        content.innerHTML = `
            <h2>Reglamento de la Quiniela</h2>
            <section class="rules">
                <h3>¿Cómo funciona?</h3>
                <p>Predice el marcador antes del inicio. Se toma el resultado de <strong>90' + alargue</strong>. Los penales no cuentan para el marcador principal.</p>
                
                <h3>Sistema de Puntos</h3>
                <table>
                    <tr><th>Resultado</th><th>Puntos</th></tr>
                    <tr><td>⚽ Marcador exacto</td><td>12 pts</td></tr>
                    <tr><td>📊 Ganador + misma diferencia</td><td>8 pts</td></tr>
                    <tr><td>📊 Empate correcto</td><td>8 pts</td></tr>
                    <tr><td>✅ Ganador correcto (sin diferencia)</td><td>5 pts</td></tr>
                    <tr><td>🔢 Goles exactos de un equipo</td><td>2 pts</td></tr>
                    <tr><td>❌ Incorrecto</td><td>0 pts</td></tr>
                </table>
                <p><small>* Solo se gana el puntaje mayor aplicable (no acumulables).</small></p>

                <h3>Bonus Fase Eliminatoria</h3>
                <p>Si el partido se define por penales, acertar quién clasifica suma <strong>+3 pts</strong> adicionales.</p>

                <h3>Podio Ideal (Final Soñada)</h3>
                <ul>
                    <li>🏆 Campeón: 20 pts</li>
                    <li>🥈 Subcampeón: 10 pts</li>
                    <li>🥉 Tercer puesto: 6 pts</li>
                </ul>

                <h3>Reglas de Desempate</h3>
                <ol>
                    <li>Más marcadores exactos (12 pts)</li>
                    <li>Más resultados cercanos (8 pts)</li>
                    <li>Aciertos de clasificación (+3)</li>
                    <li>Fecha/hora del primer pronóstico (el más antiguo gana)</li>
                </ol>
            </section>
        `;
    } 
    
    else if (tab === 'pronosticos') {
        try {
            const { data: partidos, error } = await supabase.from('partidos').select('*').order('fecha', { ascending: true });
            if (error) throw error;
            
            let html = `
                <h2>Mis Pronósticos</h2>
                <button class="sync-btn" onclick="runSync()">🔄 Actualizar Calendario Oficial</button>
                <select id="user-select" class="user-select" onchange="loadUserPredictions(this.value)">
                    <option value="">Selecciona tu nombre...</option>
                    ${Array.from({length: 13}, (_, i) => `<option value="user${i+1}">Participante ${i+1}</option>`).join('')}
                </select>
                <div class="matches-list">`;

            partidos.forEach((match) => {
                const matchDate = new Date(match.fecha);
                const now = new Date();
                const isLocked = now > new Date(matchDate.getTime() - 60000); // Bloquear 1 min antes

                html += `
                    <div class="match-card ${isLocked ? 'locked' : ''}">
                        <div class="match-header"><span>${match.fase}</span> <span>${matchDate.toLocaleString()}</span></div>
                        <div class="match-teams">
                            <span class="team-name">${match.equipo_a}</span>
                            <div class="match-inputs">
                                <input type="number" id="scoreA-${match.id_partido}" min="0" ${isLocked ? 'disabled' : ''}>
                                <span>-</span>
                                <input type="number" id="scoreB-${match.id_partido}" min="0" ${isLocked ? 'disabled' : ''}>
                            </div>
                            <span class="team-name">${match.equipo_b}</span>
                        </div>
                        ${!isLocked ? `<button class="save-btn" onclick="savePrediction('${match.id_partido}')">Guardar</button>` : '<span class="closed-label">Cerrado</span>'}
                    </div>`;
            });
            html += `</div>`;
            content.innerHTML = html;
        } catch (e) {
            content.innerHTML = '<p>Error al cargar partidos: ' + e.message + '</p>';
        }
    }
}

window.runSeed = () => initializeSupabase();

window.loadUserPredictions = async (userId) => {
    // Limpiar todos los inputs primero
    document.querySelectorAll('.match-inputs input').forEach(input => input.value = '');

    if (!userId) return;

    try {
        const { data: userPreds, error } = await supabase.from('predicciones').select('*').eq('user_id', userId);
        if (error) throw error;

        userPreds.forEach((data) => {
            const inputA = document.getElementById(`scoreA-${data.match_id}`);
            const inputB = document.getElementById(`scoreB-${data.match_id}`);
            
            if (inputA) inputA.value = data.goles_a;
            if (inputB) inputB.value = data.goles_b;
        });
    } catch (e) {
        console.error("Error cargando predicciones:", e);
    }
};

window.savePrediction = async (matchId) => {
    const user = document.getElementById('user-select').value;
    if (!user) return alert("Por favor, selecciona un participante.");

    const scoreA = document.getElementById(`scoreA-${matchId}`).value;
    const scoreB = document.getElementById(`scoreB-${matchId}`).value;

    if (scoreA === "" || scoreB === "") {
        return alert("Por favor, ingresa el marcador completo.");
    }

    const btn = event?.target || document.querySelector(`button[onclick*='${matchId}']`);
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "Guardando...";

    try {
        const { data: match, error: matchError } = await supabase.from('partidos').select('fecha').eq('id_partido', matchId).single();
        if (matchError) throw matchError;
        
        const matchDate = new Date(match.fecha);
        if (new Date() > new Date(matchDate.getTime() - 60000)) {
            return alert("Error: El tiempo para este pronóstico ha expirado");
        }

        const predictionId = `${user}_${matchId}`;
        const { error } = await supabase.from('predicciones').upsert({
            id: predictionId,
            user_id: user,
            match_id: matchId,
            goles_a: Number(scoreA),
            goles_b: Number(scoreB),
            fecha_prediccion: new Date().toISOString(),
            puntos_obtenidos: 0
        });

        if (error) throw error;

        alert("¡Pronóstico guardado exitosamente!");
        
    } catch (e) {
        console.error("Error al guardar:", e);
        alert("Error al guardar la predicción: " + e.message);
    } finally {
        btn.disabled = false;
        btn.innerText = originalText;
    }
};

window.runSync = async () => {
    const btn = document.querySelector('.sync-btn');
    btn.disabled = true;
    btn.innerText = "Sincronizando...";
    await syncWorldCupMatches();
    showTab('pronosticos');
};

window.showTab = showTab;
// Cargar por defecto el reglamento al iniciar
window.onload = () => showTab('reglamento');