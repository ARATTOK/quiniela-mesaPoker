import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabase = createClient('https://gvoadjrnrlzhgeqsdhyi.supabase.co', 'sb_publishable_XiqzVY4Sh3VTQsqGEu6eHA_akxwyJZK')

const flags = {
    'Argentina': '🇦🇷', 'Brasil': '🇧🇷', 'Uruguay': '🇺🇾', 'Colombia': '🇨🇴',
    'Chile': '🇨🇱', 'Perú': '🇵🇪', 'Ecuador': '🇪🇨', 'Paraguay': '🇵🇾',
    'Venezuela': '🇻🇪', 'Bolivia': '🇧🇴', 'México': '🇲🇽', 'USA': '🇺🇸',
    'Estados Unidos': '🇺🇸', 'EE. UU.': '🇺🇸', 'Canadá': '🇨🇦', 'España': '🇪🇸', 'Francia': '🇫🇷',
    'Alemania': '🇩🇪', 'Italia': '🇮🇹', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Portugal': '🇵🇹',
    'Holanda': '🇳🇱', 'Países Bajos': '🇳🇱', 'Bélgica': '🇧🇪', 'Croacia': '🇭🇷', 'Suiza': '🇨🇭',
    'Dinamarca': '🇩🇰', 'Serbia': '🇷🇸', 'Polonia': '🇵🇱', 'Escocia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Ucrania': '🇺🇦',
    'Turquía': '🇹🇷', 'Marruecos': '🇲🇦', 'Argelia': '🇩🇿', 'Egipto': '🇪🇬', 'Nigeria': '🇳🇬',
    'Camerún': '🇨🇲', 'Ghana': '🇬🇭', 'Costa de Marfil': '🇨🇮', 'Senegal': '🇸🇳', 'Japón': '🇯🇵',
    'Corea del Sur': '🇰🇷', 'República de Corea': '🇰🇷', 'Australia': '🇦🇺', 'Arabia Saudita': '🇸🇦', 
    'Arabia Saudí': '🇸🇦', 'Irán': '🇮🇷', 'RI de Irán': '🇮🇷', 'Qatar': '🇶🇦', 'Catar': '🇶🇦',
    'Costa Rica': '🇨🇷', 'Panamá': '🇵🇦', 'Jamaica': '🇯🇲', 'Sudáfrica': '🇿🇦',
    'Chequia': '🇨🇿', 'Bosnia y Herzegovina': '🇧🇦', 'Haití': '🇭🇹', 'Curazao': '🇨🇼',
    'Suecia': '🇸🇪', 'Túnez': '🇹🇳', 'Nueva Zelanda': '🇳🇿', 'Islas de Cabo Verde': '🇨🇻', 'Cabo Verde': '🇨🇻',
    'Irak': '🇮🇶', 'Noruega': '🇳🇴', 'Austria': '🇦🇹', 'Jordania': '🇯🇴', 'RD Congo': '🇨🇩',
    'RD del Congo': '🇨🇩',
    'Uzbekistán': '🇺🇿'
};

const getFlag = (team) => `${flags[team] || '🏳️'} ${team}`;

let allMatches = []; // Variable global para almacenar todos los partidos

async function cargarPartidos() {
    // Verificar si el usuario está logueado
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
        window.location.href = 'index.html'
        return
    }

    const userDisplay = document.getElementById('user-display');
    if (userDisplay) userDisplay.innerText = currentUser;

    const { data: matches, error } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: true })

    if (error) {
        console.error('Error cargando partidos:', error.message)
        return
    }

    allMatches = matches;

    // Configurar el filtro de fecha inicial (Hoy)
    const dateFilter = document.getElementById('match-date-filter');
    const hoy = new Date().toISOString().split('T')[0];
    dateFilter.value = hoy;

    // Escuchar cambios en la fecha
    dateFilter.onchange = (e) => renderizarPartidosPorFecha(e.target.value);

    renderizarPartidosPorFecha(hoy);
}

function renderizarPartidosPorFecha(fechaSeleccionada) {
    const container = document.getElementById('matches-container')
    container.innerHTML = '' // Limpiar contenedor
    
    // Filtrar partidos que coincidan con la fecha seleccionada (YYYY-MM-DD)
    const matchesFiltrados = allMatches.filter(m => m.match_date.startsWith(fechaSeleccionada));

    if (matchesFiltrados.length > 0) {
        // Crear encabezado de grupo por fecha
        const header = document.createElement('div');
        header.className = 'col-span-full mb-2';
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // Usamos T12:00:00 para evitar desfases de zona horaria al crear el objeto Date
        const fechaDisplay = new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-ES', opcionesFecha);
        
        header.innerHTML = `
            <div class="flex items-center gap-2 text-secondary italic opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span class="capitalize text-lg font-semibold">${fechaDisplay}</span>
            </div>
            <div class="divider mt-0 mb-4 opacity-20"></div>
        `;
        container.appendChild(header);
    } else {
        container.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center p-10 bg-base-100 rounded-box opacity-50 border-2 border-dashed border-base-300">
                <p class="text-xl font-bold italic">No hay partidos programados para este día</p>
                <p class="text-sm text-center">Prueba seleccionando otra fecha en el calendario.</p>
            </div>
        `
        return
    }

    matchesFiltrados.forEach((match, index) => {
        const div = document.createElement('div')
        // Diseño de tarjeta optimizado para responsividad
        div.className = 'card bg-base-100 shadow-xl animate-fade-in-up min-h-[200px] border border-base-300/50'
        div.style.animationDelay = `${index * 0.1}s`
        const isKnockout = ['Octavos', 'Cuartos', 'Semis', 'Final'].includes(match.stage)
        
        div.innerHTML = `
            <div class="card-body p-4 sm:p-5">
                <div class="flex justify-between items-center mb-4">
                    <span class="badge badge-primary badge-outline badge-sm text-[10px] sm:text-xs">${match.stage}</span>
                    <span class="text-[10px] sm:text-xs opacity-50 font-mono">${new Date(match.match_date).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</span>
                </div>
                <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-1 sm:gap-3 mb-6 text-center">
                    <div class="tooltip tooltip-top" data-tip="${match.home_team}">
                        <div class="font-bold text-xs sm:text-base md:text-lg whitespace-normal leading-tight">
                            ${getFlag(match.home_team)}
                        </div>
                    </div>
                    <div class="flex items-center gap-1">
                        <input type="number" id="home-${match.id}" class="input input-bordered input-sm w-9 sm:w-12 text-center px-1" placeholder="0">
                        <span class="opacity-30 text-[10px] font-bold">vs</span>
                        <input type="number" id="away-${match.id}" class="input input-bordered input-sm w-9 sm:w-12 text-center px-1" placeholder="0">
                    </div>
                    <div class="tooltip tooltip-top" data-tip="${match.away_team}">
                        <div class="font-bold text-xs sm:text-base md:text-lg whitespace-normal leading-tight">
                            ${getFlag(match.away_team)}
                        </div>
                    </div>
                </div>
                ${isKnockout ? `
                <select id="penalty-${match.id}" class="select select-bordered select-sm w-full mb-4">
                    <option value="">¿Quién clasifica?</option>
                    <option value="${match.home_team}">${getFlag(match.home_team)}</option>
                    <option value="${match.away_team}">${getFlag(match.away_team)}</option>
                </select>` : ''}
                <div class="card-actions">
                    <button class="btn btn-primary btn-block btn-sm" onclick="guardarPronostico(${match.id})">Guardar</button>
                </div>
            </div>
        `
        container.appendChild(div)
    })
}

window.resetFecha = () => {
    const dateFilter = document.getElementById('match-date-filter');
    const hoy = new Date().toISOString().split('T')[0];
    dateFilter.value = hoy;
    renderizarPartidosPorFecha(hoy);
};

window.guardarPronostico = async (matchId) => {
    const home = document.getElementById(`home-${matchId}`).value
    const away = document.getElementById(`away-${matchId}`).value
    const penalty = document.getElementById(`penalty-${matchId}`)?.value || null
    const currentUser = localStorage.getItem('currentUser')

    if (home === '' || away === '') return alert('Ingresa un resultado')

    const predictionData = { 
        match_id: matchId, 
        user_id: currentUser, 
        home_score_pred: parseInt(home), 
        away_score_pred: parseInt(away),
        penalty_winner_pred: penalty
    }

    const { error } = await supabase.from('predictions').upsert([predictionData], { onConflict: 'user_id, match_id' })
    
    if (error) {
        console.error('Error detallado de Supabase:', error);
        alert('No se pudo guardar: ' + error.message);
    } else {
        alert('¡Pronóstico guardado con éxito! 🤡');
    }
}

window.logout = async () => {
    await supabase.auth.signOut()
    localStorage.clear()
    window.location.href = 'index.html'
}

cargarPartidos()