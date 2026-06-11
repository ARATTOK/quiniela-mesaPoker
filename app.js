import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabase = createClient('https://gvoadjrnrlzhgeqsdhyi.supabase.co', 'sb_publishable_XiqzVY4Sh3VTQsqGEu6eHA_akxwyJZK')

async function cargarPartidos() {
    // Verificar si el usuario está logueado
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
        window.location.href = 'index.html'
        return
    }

    const { data: matches } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: true })

    const container = document.getElementById('matches-container')
    
    matches.forEach(match => {
        const div = document.createElement('div')
        div.className = 'match-card'
        div.innerHTML = `
            <p>${match.home_team} vs ${match.away_team}</p>
            <input type="number" id="home-${match.id}" placeholder="0">
            <input type="number" id="away-${match.id}" placeholder="0">
            <button onclick="guardarPronostico(${match.id})">Guardar</button>
        `
        container.appendChild(div)
    })
}

window.guardarPronostico = async (matchId) => {
    const home = document.getElementById(`home-${matchId}`).value
    const away = document.getElementById(`away-${matchId}`).value
    const currentUser = localStorage.getItem('currentUser')

    if (home === '' || away === '') return alert('Ingresa un resultado')

    const { error } = await supabase.from('predictions').insert([
        { match_id: matchId, user_id: currentUser, home_score_pred: parseInt(home), away_score_pred: parseInt(away) }
    ])
    
    if (error) alert('Error: ' + error.message)
    else alert('Pronóstico guardado correctamente!')
}

window.logout = () => {
    localStorage.clear()
    window.location.href = 'index.html'
}

cargarPartidos()