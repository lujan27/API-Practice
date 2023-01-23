let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 100){
        pagina += 1;
        loadMovies();
    }
    
});

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        loadMovies();
    }
    
})

const loadMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b612512dd166de8825ed179047ca2fe0&language=es-MX&page=${pagina}`);

        console.log(response);

        if(response.status === 200){
            const data = await response.json();

            let movies = '';
            data.results.forEach(movie => {
                movies += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                </div>
                <h3 class="titulo">${movie.title}</h3>
                `;
            })

            document.getElementById('container').innerHTML = movies;
        } else if(response.status === 401){
            console.log('Something went wrong...');
        } else if(response.status === 404){
            console.log('The movie doesnt exists');
        }

        
    } catch (error){
        console.log(error);
    }
}

loadMovies();