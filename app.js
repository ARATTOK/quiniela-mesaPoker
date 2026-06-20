import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Lógica de Tema Global
// Función auxiliar para parsear la fecha como hora local
const parseMatchDate = (isoString) => {
    if (!isoString) return new Date();
    
    // Forzamos que sea String y extraemos solo los números
    const m = String(isoString).match(/\d+/g);
    if (!m || m.length < 3) return new Date(isoString);

    const date = new Date(
        parseInt(m[0]),       // Año
        parseInt(m[1]) - 1,   // Mes (0-11)
        parseInt(m[2]),       // Día
        parseInt(m[3] || 0),  // Hora
        parseInt(m[4] || 0),  // Minuto
        parseInt(m[5] || 0)   // Segundo
    );

    // LOG DE DEPURACIÓN PARA GITHUB PAGES
    // Si ves este log en la consola, significa que el código nuevo YA se cargó.
    // console.log(`[DEBUG] DB: ${isoString} -> Interpretada Local: ${date.getHours()}:${date.getMinutes()}`);
    
    return date;
};

const initTheme = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        themeToggle.checked = currentTheme === 'light';
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
};
initTheme();

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

const userConfig = {
    'admin': { emoji: '🤡', color: 'ring-primary' },
    'aaron': { emoji: '🥳', color: 'ring-secondary' },
    'alam': { emoji: '🤪', color: 'ring-accent' },
    'bennett': { emoji: '🤹', img: 'images/perfilbennet.png', color: 'ring-info' },
    'dennis': { emoji: '🎭', color: 'ring-success' },
    'jorge': { emoji: '🃏', color: 'ring-warning' },
    'kevin': { emoji: '🤩', color: 'ring-error' },
    'luisito': { emoji: '🤠', color: 'ring-primary' },
    'pedro': { emoji: '🧐', color: 'ring-secondary' },
    'takashi': { emoji: '👽', color: 'ring-accent' },
    'rodrigo': { emoji: '👾', color: 'ring-info' },
    'chamba': { emoji: '👹', color: 'ring-success' },
    'dario': { emoji: '👺', color: 'ring-warning' },
    'andrea': { emoji: '💃', color: 'ring-secondary' },
    'merino': { emoji: '🐑', color: 'ring-primary' },
    'pati': { emoji: '💅', color: 'ring-secondary' },
    'reynaldo': { emoji: '👑', color: 'ring-warning' },
    'oscar': { emoji: '🎪', color: 'ring-accent' },
    'gato': { emoji: '🐱', color: 'ring-error' }
};

const avatarHtml = (c, w = 'w-6', t = 'text-[10px]') => c.img
  ? `<div class="avatar"><div class="${w} rounded-full ring ${c.color} ring-offset-base-100 ring-offset-1"><img src="${c.img}" class="rounded-full object-cover w-full h-full" alt="" /></div></div>`
  : `<div class="avatar placeholder"><div class="bg-neutral text-neutral-content rounded-full ${w} ring ${c.color} ring-offset-base-100 ring-offset-1"><span class="${t}">${c.emoji}</span></div></div>`;

let allMatches = []; // Variable global para almacenar todos los partidos
let userPredictions = []; // Variable global para almacenar los pronósticos del usuario
let globalRanking = []; // Nueva variable para comparativas
let countdownInterval = null;

async function cargarPartidos() {
    // Verificar si el usuario está logueado
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
        window.location.href = 'index.html'
        return
    }

    const userDisplay = document.getElementById('user-display');
    if (userDisplay) {
        const config = userConfig[currentUser] || { emoji: '👤', color: 'ring-primary' };
        userDisplay.innerHTML = `<div class="flex items-center gap-2">${avatarHtml(config)}</div>`;
        const dropdownInfo = document.getElementById('user-dropdown-info');
        if (dropdownInfo) dropdownInfo.innerHTML = `${avatarHtml(config)} <span class="capitalize">${currentUser}</span>`;
        // Limpiar estilos antiguos del botón padre
        userDisplay.parentElement.classList.remove('italic', 'opacity-70', 'lowercase');
    }

    // User dropdown toggle
    const userDropdown = document.getElementById('user-dropdown')
    const userDropdownTrigger = document.getElementById('user-dropdown-trigger')
    if (userDropdown && userDropdownTrigger) {
        userDropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation()
            const content = userDropdown.querySelector('.dropdown-content')
                if (content) {
                    content.hidden = !content.hidden
                    userDropdown.classList.toggle('dropdown-open')
                }
        })
        document.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target)) {
                const content = userDropdown.querySelector('.dropdown-content')
                if (content) {
                    content.hidden = true
                    userDropdown.classList.remove('dropdown-open')
                }
            }
        })
    }

    const { data: matches, error } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: true })

    if (error) {
        console.error('Error cargando partidos:', error.message)
        return
    }

    allMatches = matches;

    // Obtener los pronósticos del usuario actual
    const { data: predictions, error: predError } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', currentUser); // Filtrar por el usuario actual

    if (predError) {
        console.error('Error cargando pronósticos del usuario:', predError.message);
    } else {
        userPredictions = predictions; // Almacenar los pronósticos del usuario
    }

    // Obtener ranking global para comparativas
    const { data: rankingData } = await supabase
        .from('ranking_view')
        .select('*');
    
    globalRanking = rankingData || [];

    // Configurar el filtro de fecha inicial (Hoy)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const dateFilter = document.getElementById('match-date-filter');
    const hoy = `${year}-${month}-${day}`; // Get local date string

    if (dateFilter) {
        dateFilter.value = hoy;
        // Escuchar cambios en la fecha
        dateFilter.onchange = (e) => {
            renderizarPartidosPorFecha(e.target.value);
            renderDatePills(e.target.value);
            startCountdowns(); // Restart countdowns for new set of matches
        };
    }

    // Abrir modal de ayuda para Bennet si el usuario actual es 'bennett'
    const bennetModal = document.getElementById('help_modal_bennet');
    if (currentUser === 'bennett' && bennetModal) {
        bennetModal.showModal();
    }

    cargarPodio(); // Inicializar Podio Ideal antes de renderizar partidos
    renderizarPartidosPorFecha(hoy);
    actualizarGraficoPuntos();
    renderDatePills(hoy);
    startCountdowns(); // Start countdowns on initial load
}

async function cargarPodio() {
    const currentUser = localStorage.getItem('currentUser');
    const container = document.getElementById('podium-container');
    if (!currentUser || !container) return;

    // 1. Cargar equipos desde Supabase para llenar los selectores
    const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select('name')
        .order('name', { ascending: true });

    if (teamsError) return console.error('Error cargando equipos:', teamsError.message);

    // 2. Poblar los selects con los países y sus banderas
    ['1', '2', '3'].forEach(pos => {
        const select = document.getElementById(`podium-${pos}`);
        if (select) {
            select.innerHTML = '<option value="" disabled selected>Seleccionar equipo...</option>';
            teams.forEach(t => {
                const option = document.createElement('option');
                option.value = t.name;
                option.textContent = getFlag(t.name);
                select.appendChild(option);
            });
        }
    });

    // 3. Cargar predicción previa del usuario si existe
    const { data: savedPodium } = await supabase
        .from('podium_predictions')
        .select('*')
        .eq('user_id', currentUser)
        .maybeSingle();

    if (savedPodium) {
        document.getElementById('podium-1').value = savedPodium.champion || '';
        document.getElementById('podium-2').value = savedPodium.runner_up || '';
        document.getElementById('podium-3').value = savedPodium.third_place || '';
        
        const saveBtn = document.getElementById('save-podium');
        if (saveBtn) {
            saveBtn.innerHTML = '<span>🔄 Actualizar Podio</span>';
            saveBtn.classList.remove('btn-warning');
            saveBtn.classList.add('btn-outline', 'btn-secondary');
        }
    }

    // Lógica de Fecha Límite y Contador para el Podio: Finaliza el martes 16 de Junio a las 23:59:59
    const deadline = new Date(2026, 5, 18, 23, 59, 59); // Nueva fecha límite: Jueves 18 de Junio 23:59:59
    const updatePodiumCountdown = () => {
        const now = new Date();
        const timeRemaining = deadline - now;
        const timerDisplay = document.getElementById('podium-timer');
        const saveBtn = document.getElementById('save-podium');
        const deadlineAlert = document.getElementById('podium-deadline-alert');

        if (timeRemaining <= 0) {
            document.querySelectorAll('#podium-container select').forEach(el => el.disabled = true);
            if (saveBtn) saveBtn.remove(); // Quitar botón de actualización definitivamente
            if (deadlineAlert) {
                deadlineAlert.classList.remove('animate-pulse', 'alert-warning');
                deadlineAlert.classList.add('alert-error');
                deadlineAlert.querySelector('span').textContent = 'El plazo para el podio ha finalizado. Solo lectura.';
                if (timerDisplay) timerDisplay.remove();
            }
            return true;
        }

        if (timerDisplay) {
            const d = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const h = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Cambiar a color rojo y animar si faltan menos de 24 horas (86,400,000 ms)
            if (timeRemaining < 86400000) {
                timerDisplay.classList.remove('badge-neutral');
                timerDisplay.classList.add('badge-error', 'animate-pulse');
            }

            timerDisplay.textContent = `Faltan: ${d}d ${h}h ${m}m ${s}s`;
        }
        return false;
    };

    setInterval(updatePodiumCountdown, 1000);
    updatePodiumCountdown();

    container.classList.remove('hidden');

    // 4. Manejador de guardado con validación de duplicados
    const savePodiumBtn = document.getElementById('save-podium');
    if (savePodiumBtn) {
        savePodiumBtn.onclick = async () => {
            // Doble verificación de seguridad por tiempo
            if (new Date() >= deadline) {
                alert('¡Demasiado tarde! El plazo ha vencido.');
                location.reload();
                return;
            }
            const champion = document.getElementById('podium-1').value;
            const runner_up = document.getElementById('podium-2').value;
            const third_place = document.getElementById('podium-3').value;

            if (!champion || !runner_up || !third_place) return alert('Por favor, completa los tres lugares del podio.');
            if (new Set([champion, runner_up, third_place]).size !== 3) return alert('No puedes seleccionar el mismo equipo en varias posiciones.');

            const { error } = await supabase
                .from('podium_predictions')
                .upsert({ user_id: currentUser, champion, runner_up, third_place }, { onConflict: 'user_id' });

            if (error) alert('Error al guardar podio: ' + error.message);
            else {
                supabase.from('prediction_log').insert({ user_id: currentUser, prediction_type: 'podium', data: { champion, runner_up, third_place } });
                alert('¡Podio Ideal guardado exitosamente! 🤡🏆');
            }
        };
    }
}

function actualizarGraficoPuntos() {
    const ctx = document.getElementById('puntosChart');
    if (!ctx || !allMatches.length || !userPredictions.length) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#A6ADBB' : '#1f2937';
    const accentColor = '#3b82f6';
    const secondaryColor = '#d926a9';
    const successColor = '#00ff9f';

    // --- 1. GRÁFICO DE EVOLUCIÓN (EXISTENTE MEJORADO) ---
    const pointsByDate = {};
    
    // Filtrar predicciones de partidos finalizados y ordenar por fecha
    const finishedPreds = userPredictions
        .map(p => ({ pred: p, match: allMatches.find(m => m.id === p.match_id) }))
        .filter(item => item.match && item.match.status === 'finished')
        .sort((a, b) => parseMatchDate(a.match.match_date) - parseMatchDate(b.match.match_date));

    finishedPreds.forEach(item => {
        const d = parseMatchDate(item.match.match_date);
        const dateLabel = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase();
        pointsByDate[dateLabel] = (pointsByDate[dateLabel] || 0) + (item.pred.points || 0);
    });

    const labels = Object.keys(pointsByDate);
    const data = Object.values(pointsByDate);

    if (window.chartEvolucion) window.chartEvolucion.destroy();
    window.chartEvolucion = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Puntos logrados',
                data: data,
                backgroundColor: accentColor,
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                y: { beginAtZero: true, ticks: { color: textColor } },
                x: { ticks: { color: textColor } }
            }
        }
    });

    // --- 2. GRÁFICO DE DISTRIBUCIÓN DE EFECTIVIDAD (PIE) ---
    const ctxPie = document.getElementById('efectividadChart');
    if (ctxPie) {
        const distribucion = { 'Exacto (12)': 0, 'Diferencia (8)': 0, 'Ganador (5)': 0, 'Goles (2)': 0, 'Cero': 0 };
        finishedPreds.forEach(item => {
            const p = item.pred.points;
            if (p >= 12) distribucion['Exacto (12)']++;
            else if (p === 8) distribucion['Diferencia (8)']++;
            else if (p === 5) distribucion['Ganador (5)']++;
            else if (p === 2) distribucion['Goles (2)']++;
            else distribucion['Cero']++;
        });

        if (window.chartPie) window.chartPie.destroy();
        window.chartPie = new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: Object.keys(distribucion),
                datasets: [{
                    data: Object.values(distribucion),
                    backgroundColor: ['#00ff9f', '#3b82f6', '#f5d142', '#a855f7', '#ff4d4d'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: textColor, font: { size: 10 } } } }
            }
        });
    }

    // --- 3. COMPARATIVA VS GRUPO (HORIZONTAL BAR) ---
    const ctxComp = document.getElementById('comparativaChart');
    if (ctxComp && globalRanking.length > 0) {
        const currentUser = localStorage.getItem('currentUser');
        const myData = globalRanking.find(u => u.username === currentUser) || { total_points: 0 };
        const avgPoints = globalRanking.reduce((acc, curr) => acc + curr.total_points, 0) / globalRanking.length;
        const topPoints = globalRanking[0].total_points;

        if (window.chartComp) window.chartComp.destroy();
        window.chartComp = new Chart(ctxComp, {
            type: 'bar',
            data: {
                labels: ['Tú', 'Promedio', 'Líder'],
                datasets: [{
                    data: [myData.total_points, avgPoints, topPoints],
                    backgroundColor: [secondaryColor, '#94a3b8', successColor],
                    borderRadius: 10
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    x: { beginAtZero: true, ticks: { color: textColor } },
                    y: { ticks: { color: textColor, font: { weight: 'bold' } } }
                }
            }
        });
    }
}

function renderizarPartidosPorFecha(fechaSeleccionada) {
    const container = document.getElementById('matches-container')
    if (!container) return; // Robustez para páginas sin contenedor de partidos
    container.innerHTML = '' // Limpiar contenedor
    
    // Filtrado robusto comparando año-mes-día localmente
    const matchesFiltrados = allMatches.filter(m => { // This filter still uses local date components for display grouping
        const d = parseMatchDate(m.match_date);
        const mYear = d.getFullYear();
        const mMonth = String(d.getMonth() + 1).padStart(2, '0');
        const mDay = String(d.getDate()).padStart(2, '0');
        return `${mYear}-${mMonth}-${mDay}` === fechaSeleccionada;
    });

    if (matchesFiltrados.length > 0) {
        const header = document.createElement('div');
        header.className = 'col-span-full mb-2';
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // Usamos T12:00:00 para evitar desfases de zona horaria al crear el objeto Date para el display
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

    const now = new Date();
    matchesFiltrados.forEach((match, index) => {
        const matchTime = parseMatchDate(match.match_date);
        const hasStarted = now >= matchTime || match.status === 'finished';

        const existingPrediction = userPredictions.find(p => p.match_id === match.id);

        const homePred = existingPrediction?.home_score_pred ?? '';
        const awayPred = existingPrediction?.away_score_pred ?? '';
        const penaltyPred = existingPrediction ? existingPrediction.penalty_winner_pred : '';
        const pointsEarned = existingPrediction?.points ?? 0;
        const isFinished = match.status === 'finished';

        const noPrediction = isFinished && !existingPrediction;
        const pointsColor = noPrediction ? 'ghost' :
                           pointsEarned >= 12 ? 'warning' :
                           pointsEarned >= 8 ? 'info' :
                           pointsEarned >= 5 ? 'success' :
                           pointsEarned >= 2 ? 'accent' : 'error';

        const isDisabled = hasStarted ? 'disabled' : '';
        const div = document.createElement('div');
        const isExact = pointsEarned >= 12;

        div.className = `card bg-base-100 shadow-xl animate-fade-in-up min-h-[200px] relative overflow-hidden ${isFinished ? (noPrediction ? 'ring-1 ring-base-300' : `ring-1 ring-${pointsColor}/30`) : ''}`;
        div.setAttribute('data-status', match.status);
        div.style.animationDelay = `${index * 0.1}s`;
        div.setAttribute('data-match-id', match.id);
        div.setAttribute('data-match-date', match.match_date);
        const isKnockout = ['Octavos', 'Cuartos', 'Semis', 'Final'].includes(match.stage)
        const matchTimeFormatted = parseMatchDate(match.match_date).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });

        let buttonText = existingPrediction ? 'Actualizar' : 'Guardar';
        let buttonClass = 'btn-primary';

        if (hasStarted) {
            buttonText = 'Partido Cerrado';
            buttonClass = 'btn-disabled';
        } else if (existingPrediction) {
            buttonClass = 'btn-secondary';
        }

        const predDiff = isFinished && existingPrediction
            ? `(tu pronóstico: ${homePred} - ${awayPred})`
            : '';

        div.innerHTML = `
            ${isFinished ? `<div class="absolute top-0 left-0 right-0 h-1.5 ${noPrediction ? 'bg-base-300' : `bg-${pointsColor}`}"></div>` : ''}
            <div class="card-body p-4 sm:p-5 ${isFinished ? (noPrediction ? 'bg-base-200' : `bg-${pointsColor}/5`) : ''}">
                <!-- Header -->
                <div class="flex justify-between items-center mb-3">
                    <span class="badge badge-${isFinished ? (noPrediction ? 'ghost' : pointsColor) : 'primary'} ${!noPrediction ? 'badge-outline' : ''} badge-sm text-[10px] sm:text-xs">${match.stage}</span>
                    <span class="text-[10px] sm:text-xs opacity-50 font-mono flex items-center gap-1">
                        ${!hasStarted ? `<span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span></span>` : ''}
                        ${matchTimeFormatted}
                    </span>
                </div>

                <!-- Teams -->
                <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-4">
                    <div class="text-center">
                        <div class="text-3xl sm:text-4xl mb-1">${flags[match.home_team] || '🏳️'}</div>
                        <div class="text-[11px] sm:text-sm font-bold opacity-80 truncate max-w-[90px] sm:max-w-[140px] mx-auto leading-tight">${match.home_team}</div>
                        <input type="number" id="home-${match.id}" class="input input-bordered input-sm w-12 sm:w-14 text-center font-bold mt-2 text-base" value="${homePred}" ${isDisabled}>
                    </div>

                    <div class="flex flex-col items-center min-w-[40px]">
                        <span class="text-xs font-black opacity-20 uppercase tracking-widest">vs</span>
                        ${isFinished ? `
                        <div class="text-center mt-1">
                            <span class="text-lg sm:text-2xl font-black ${noPrediction ? 'opacity-30' : `text-${pointsColor}`}">${match.home_score ?? '?'}</span>
                            <span class="text-lg sm:text-2xl font-black ${noPrediction ? 'opacity-30' : `text-${pointsColor}`} mx-0.5">-</span>
                            <span class="text-lg sm:text-2xl font-black ${noPrediction ? 'opacity-30' : `text-${pointsColor}`}">${match.away_score ?? '?'}</span>
                            ${predDiff ? `<div class="text-[9px] sm:text-[10px] opacity-50 italic mt-0.5">${predDiff}</div>` : ''}
                        </div>
                        ` : ''}
                    </div>

                    <div class="text-center">
                        <div class="text-3xl sm:text-4xl mb-1">${flags[match.away_team] || '🏳️'}</div>
                        <div class="text-[11px] sm:text-sm font-bold opacity-80 truncate max-w-[90px] sm:max-w-[140px] mx-auto leading-tight">${match.away_team}</div>
                        <input type="number" id="away-${match.id}" class="input input-bordered input-sm w-12 sm:w-14 text-center font-bold mt-2 text-base" value="${awayPred}" ${isDisabled}>
                    </div>
                </div>

                ${isKnockout ? `
                <div class="mb-3">
                    <select id="penalty-${match.id}" class="select select-bordered select-sm w-full text-xs" ${isDisabled}>
                        <option value="">⚖️ ¿Quién clasifica?</option>
                        <option value="${match.home_team}" ${penaltyPred === match.home_team ? 'selected' : ''}>${flags[match.home_team] || '🏳️'} ${match.home_team}</option>
                        <option value="${match.away_team}" ${penaltyPred === match.away_team ? 'selected' : ''}>${flags[match.away_team] || '🏳️'} ${match.away_team}</option>
                    </select>
                </div>` : ''}

                ${isFinished ? `
                <div class="flex justify-center items-center my-2">
                    <div class="inline-flex items-center gap-2 ${noPrediction ? 'bg-base-300' : `bg-${pointsColor}/10 border border-${pointsColor}/20`} rounded-2xl px-5 py-3 shadow-lg ${isExact ? 'animate-bounce' : ''}">
                        <span class="text-2xl sm:text-3xl font-black ${noPrediction ? 'opacity-30' : `text-${pointsColor}`}">${pointsEarned}</span>
                        <div class="flex flex-col items-start">
                            <span class="text-[9px] uppercase font-black ${noPrediction ? 'opacity-30' : `text-${pointsColor}`} tracking-widest leading-none">${noPrediction ? 'Sin pronóstico' : 'Puntos'}</span>
                            ${isExact ? '<span class="text-[8px] text-warning font-bold leading-none mt-0.5">🎯 EXACTO</span>' : ''}
                            ${noPrediction ? '<span class="text-[8px] opacity-30 font-bold leading-none mt-0.5">🙈 No pronosticaste</span>' : ''}
                        </div>
                    </div>
                </div>
                ` : ''}

                <div class="card-actions mt-1">
                    <div id="countdown-${match.id}" class="text-xs font-bold text-center w-full mb-1 opacity-60"></div>
                    <button class="btn ${buttonClass} btn-block btn-sm gap-1.5" onclick="guardarPronostico(${match.id})" ${isDisabled}>
                        ${hasStarted ? '🔒' : '💾'} ${buttonText}
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);

        // Efecto de Confeti Dorado para resultados exactos (se dispara al renderizar si es exacto)
        if (match.status === 'finished' && isExact) {
            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    spread: 70,
                    origin: { y: 0.8 },
                    colors: ['#FFD700', '#FFA500', '#ffffff'],
                    disableForReducedMotion: true
                });
            }, 500 + (index * 150));
        }
    })

    // Añadir listeners para pausar el pulso de la tarjeta al interactuar con los inputs/botones
    matchesFiltrados.forEach(match => {
        const cardElement = document.querySelector(`.card[data-match-id="${match.id}"]`);
        if (!cardElement) return;

        const homeInput = cardElement.querySelector(`#home-${match.id}`);
        const awayInput = cardElement.querySelector(`#away-${match.id}`);
        const penaltySelect = cardElement.querySelector(`#penalty-${match.id}`);
        const saveButton = cardElement.querySelector(`button[onclick="guardarPronostico(${match.id})"]`);

        const interactiveElements = [homeInput, awayInput, penaltySelect, saveButton].filter(Boolean);

        interactiveElements.forEach(el => {
            el.addEventListener('focus', () => {
                cardElement.dataset.isFocused = 'true'; // Marcar la tarjeta como enfocada
            });
            el.addEventListener('blur', () => {
                delete cardElement.dataset.isFocused; // Desmarcar la tarjeta
            });
        });
    });
}

function renderDatePills(fechaSeleccionada) {
    const container = document.getElementById('date-pills-container');
    if (!container) return;

    // Extraer fechas únicas que tienen partidos programados
    const uniqueDates = [...new Set(allMatches.map(m => {
        const d = parseMatchDate(m.match_date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }))].sort();

    container.innerHTML = '';
    
    uniqueDates.forEach(dateStr => {
        const dateObj = new Date(dateStr + 'T12:00:00');
        const isActive = dateStr === fechaSeleccionada;
        
        const btn = document.createElement('button');
        // Diseño minimalista y moderno para las "pills"
        btn.className = `flex-shrink-0 btn h-16 w-14 flex flex-col items-center justify-center gap-0.5 border-none transition-all duration-300 ${
            isActive 
            ? 'btn-primary shadow-lg scale-110 z-10' 
            : 'bg-base-100 hover:bg-base-300 opacity-60 hover:opacity-100'
        }`;
        
        const dayName = dateObj.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase().replace('.', '');
        const dayNum = dateObj.getDate();
        const monthName = dateObj.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');

        btn.innerHTML = `
            <span class="text-[9px] font-bold tracking-tighter">${dayName}</span>
            <span class="text-xl font-black leading-none">${dayNum}</span>
            <span class="text-[9px] font-bold opacity-70">${monthName}</span>
        `;
        
        btn.onclick = () => {
            document.getElementById('match-date-filter').value = dateStr;
            renderizarPartidosPorFecha(dateStr);
            renderDatePills(dateStr);
            startCountdowns();
        };
        
        container.appendChild(btn);
        if (isActive) setTimeout(() => btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }), 50);
    });
}

function formatTime(ms) {
    if (ms <= 0) return "00:00:00";
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    parts.push(`${String(hours).padStart(2, '0')}h`);
    parts.push(`${String(minutes).padStart(2, '0')}m`);
    parts.push(`${String(seconds).padStart(2, '0')}s`);
    return parts.join(' ');
}

function startCountdowns() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    updateCountdowns(); // Initial update
    countdownInterval = setInterval(updateCountdowns, 1000);
}

function updateCountdowns() {
    const now = new Date();
    let allMatchesClosed = true; // Flag to check if all matches on screen are closed

    document.querySelectorAll('.card[data-match-id]').forEach(cardElement => {
        const matchId = cardElement.getAttribute('data-match-id');
        const matchDateStr = cardElement.getAttribute('data-match-date');
        const matchStatus = cardElement.getAttribute('data-status');
        const matchTime = parseMatchDate(matchDateStr);
        const countdownElement = cardElement.querySelector(`#countdown-${matchId}`);
        
        if (!countdownElement) return;

        // Limpiar clases antes de aplicar el nuevo estado
        cardElement.classList.remove('border-primary', 'border-warning', 'border-accent', 'border-error', 'animate-pulse');
        countdownElement.classList.remove('text-primary', 'text-warning', 'text-accent', 'text-error', 'text-success');

        // Si el partido ya finalizó, detenemos la lógica de bordes de countdown para no sobreescribir los de puntos
        if (matchStatus === 'finished') {
            if (countdownElement.textContent !== 'Partido Finalizado') {
                countdownElement.textContent = 'Partido Finalizado';
                countdownElement.classList.add('text-success');
            }
            return;
        }

        const homeInput = cardElement.querySelector(`#home-${matchId}`);
        const awayInput = cardElement.querySelector(`#away-${matchId}`);

        // Limpiar clases de resaltado de los inputs
        if (homeInput) homeInput.classList.remove('input-error', 'animate-pulse', 'border-2');
        if (awayInput) awayInput.classList.remove('input-error', 'animate-pulse', 'border-2');

        const penaltySelect = cardElement.querySelector(`#penalty-${matchId}`);
        const saveButton = cardElement.querySelector(`button[onclick="guardarPronostico(${matchId})"]`);

        const timeRemaining = matchTime.getTime() - now.getTime();
        const isCardFocused = cardElement.dataset.isFocused === 'true';

        if (timeRemaining <= 0) {
            if (countdownElement.textContent !== 'Partido Cerrado') { 
                countdownElement.textContent = 'Partido Cerrado';
                cardElement.classList.add('border-error');
                countdownElement.classList.add('text-error');
                
                // Bloqueo total de inputs y botones
                if (homeInput) homeInput.disabled = true;
                if (awayInput) awayInput.disabled = true;
                if (penaltySelect) penaltySelect.disabled = true;
                if (saveButton) {
                    if (!saveButton.disabled) { // Only update if not already disabled
                        saveButton.disabled = true;
                        saveButton.textContent = 'Partido Cerrado';
                        saveButton.classList.remove('btn-primary', 'btn-secondary');
                        saveButton.classList.add('btn-disabled');
                    }
                }
            }
        } else if (timeRemaining <= 300000) { // Menos de 5 minutos (5 * 60 * 1000 ms)
            allMatchesClosed = false;
            countdownElement.textContent = `¡CIERRE INMINENTE!: ${formatTime(timeRemaining)}`;
            cardElement.classList.add('border-error', 'animate-pulse');
            countdownElement.classList.add('text-error');
            if (homeInput) homeInput.classList.add('input-error', 'border-2', 'animate-pulse'); // Inputs siguen pulsando
            if (awayInput) awayInput.classList.add('input-error', 'border-2', 'animate-pulse'); // Inputs siguen pulsando
            if (!isCardFocused) { // Solo pulsa la tarjeta si no hay un input enfocado
                cardElement.classList.add('animate-pulse');
            }
        } else if (timeRemaining <= 1800000) { // Less than 30 minutes (30 * 60 * 1000 ms)
            allMatchesClosed = false;
            countdownElement.textContent = `Cierre Inminente: ${formatTime(timeRemaining)}`;
            cardElement.classList.add('border-accent');
            countdownElement.classList.add('text-accent');
            if (!isCardFocused) { // Solo pulsa la tarjeta si no hay un input enfocado
                cardElement.classList.add('animate-pulse');
            }
        } else if (timeRemaining < 3600000) { // Less than 1 hour (60 * 60 * 1000 ms)
            allMatchesClosed = false;
            countdownElement.textContent = `Cierra en: ${formatTime(timeRemaining)}`;
            cardElement.classList.add('border-warning');
            countdownElement.classList.add('text-warning');
        } else {
            allMatchesClosed = false; // At least one match is still open
            countdownElement.textContent = `Cierra en: ${formatTime(timeRemaining)}`;
            cardElement.classList.add('border-primary'); // Default border for open matches
            countdownElement.classList.add('text-success');
        }
    });

    if (allMatchesClosed && countdownInterval) {
        clearInterval(countdownInterval); // Stop interval if all matches on screen are closed
        countdownInterval = null;
    }
}

window.resetFecha = () => {
    const dateFilter = document.getElementById('match-date-filter');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hoy = `${year}-${month}-${day}`; // Get local date string
    dateFilter.value = hoy;
    renderizarPartidosPorFecha(hoy);
    renderDatePills(hoy);
    startCountdowns(); // Restart countdowns for the "Hoy" view
};

window.guardarPronostico = async (matchId) => {
    const home = document.getElementById(`home-${matchId}`).value
    const away = document.getElementById(`away-${matchId}`).value
    const penalty = document.getElementById(`penalty-${matchId}`)?.value || null
    const currentUser = localStorage.getItem('currentUser')

    if (home === '' || away === '') return alert('Ingresa un resultado')

    // Verificación de seguridad en tiempo real: 
    // Consultamos la DB directamente para evitar que datos locales desactualizados permitan guardar.
    const { data: matchStatus, error: matchError } = await supabase
        .from('matches')
        .select('match_date, status')
        .eq('id', matchId)
        .single();

    if (matchError || !matchStatus) return alert('Error al verificar el estado del partido.');

    const hasStarted = new Date() >= parseMatchDate(matchStatus.match_date) || matchStatus.status === 'finished';
    if (hasStarted) {
        alert('El partido ya comenzó o terminó. No puedes modificar tu pronóstico.');
        location.reload(); // Recargar para bloquear la interfaz visualmente
        return;
    }

    const btn = document.querySelector(`button[onclick="guardarPronostico(${matchId})"]`);
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }

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
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    } else {
        supabase.from('prediction_log').insert({ user_id: currentUser, prediction_type: 'match', match_id: matchId, data: predictionData });
        alert('¡Pronóstico guardado con éxito! 🤡');
        
        // Actualizar localmente el array de pronósticos para persistencia sin recargar
        const index = userPredictions.findIndex(p => p.match_id === matchId);
        if (index !== -1) {
            userPredictions[index] = { ...userPredictions[index], ...predictionData };
        } else {
            userPredictions.push(predictionData);
        }

        // Actualizar visualmente el botón sin refrescar la página
        if (btn) {
            btn.classList.remove('loading', 'btn-primary');
            btn.classList.add('btn-secondary');
            btn.disabled = false;
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Actualizar
            `;
        }
    }
}

window.logout = async () => {
    await supabase.auth.signOut()
    localStorage.clear()
    window.location.href = 'index.html'
}

const circusSounds = [
    'https://assets.mixkit.co/active_storage/sfx/611/611-preview.mp3',
    'https://assets.mixkit.co/active_storage/sfx/607/607-preview.mp3',
    'https://assets.mixkit.co/active_storage/sfx/608/608-preview.mp3'
].map(src => {
    const audio = new Audio(src);
    audio.load();
    return audio;
});

window.playHorn = () => {
    const randomHorn = circusSounds[Math.floor(Math.random() * circusSounds.length)];
    randomHorn.currentTime = 0;
    randomHorn.playbackRate = 0.8 + Math.random() * 0.7;
    randomHorn.play();

    // Efecto de Confeti de Circo
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.1, y: 0.1 }, // Sale desde la esquina superior izquierda
            colors: ['#ef4444', '#f5d142', '#3b82f6', '#10b981', '#a855f7']
        });
    }
}

cargarPartidos()

function formatBody(body) {
    if (!body) return ''
    if (/<[a-z][\s\S]*>/i.test(body)) return body
    return body.replace(/\n/g, '<br>')
}

// Gato Escapado - Cargar noticias desde la BD
const categoryStyles = {
    'Internacional': { badge: 'badge-accent', title: 'text-accent' },
    'Polémica': { badge: 'badge-warning', title: 'text-warning' },
    'Felicitaciones': { badge: 'badge-primary', title: 'text-primary' },
    'Bebé en Camino': { badge: 'badge-secondary', title: 'text-secondary' },
};
const categoryRings = {
    'Felicitaciones': 'ring-1 ring-primary/30',
    'Bebé en Camino': 'ring-1 ring-secondary/30',
};

window.cargarNoticias = async () => {
    const container = document.getElementById('gato-news-container');
    if (!container) return;
    const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/El_Salvador' });
    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .eq('visible', true)
        .eq('date', hoy)
        .order('date', { ascending: false })
        .order('id', { ascending: false });
    if (error) {
        container.innerHTML = '<div class="flex justify-center py-8 opacity-40 text-xs">Error al cargar noticias</div>';
        return;
    }
    if (!news || news.length === 0) {
        container.innerHTML = '<div class="flex justify-center py-8 opacity-40 text-xs">No hay noticias disponibles</div>';
        return;
    }

    // Fetch reactions
    const newsIds = news.map(n => n.id);
    const { data: reactions } = await supabase
        .from('news_reactions')
        .select('news_id, reaction')
        .in('news_id', newsIds);
    const reactionsMap = {};
    if (reactions) {
        for (const r of reactions) {
            if (!reactionsMap[r.news_id]) reactionsMap[r.news_id] = { likes: 0, dislikes: 0 };
            if (r.reaction === 'like') reactionsMap[r.news_id].likes++;
            if (r.reaction === 'dislike') reactionsMap[r.news_id].dislikes++;
        }
    }

    container.innerHTML = news.map(n => {
        const cs = categoryStyles[n.category] || { badge: 'badge-ghost', title: 'text-base-content' };
        const ring = categoryRings[n.category] || '';
        const d = new Date(n.date + 'T12:00:00');
        const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
        const rx = reactionsMap[n.id] || { likes: 0, dislikes: 0 };
        return `<div class="flex items-start gap-4 p-3 rounded-2xl bg-base-200/60 hover:bg-base-200 transition-colors ${ring}">
            <span class="text-2xl shrink-0 mt-1">${n.emoji}</span>
            <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold uppercase text-[9px] tracking-wider opacity-70 badge badge-xs badge-outline ${cs.badge}">${n.category}</span>
                    <span class="text-[10px] opacity-40">• ${dateStr}</span>
                </div>
                <p class="leading-relaxed opacity-85 mt-1"><strong class="${cs.title}">${n.title}</strong> — ${formatBody(n.body)}</p>
                <div class="flex items-center gap-3 mt-1.5 text-[10px] opacity-40">
                    ${rx.likes > 0 || rx.dislikes > 0 ? `<span>👍 ${rx.likes}</span><span>👎 ${rx.dislikes}</span>` : ''}
                </div>
            </div>
        </div>`;
    }).join('');
};

// Cargar noticias en segundo plano
cargarNoticias()
