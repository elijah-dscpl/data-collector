document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de la forma tradicional
    
    // Recoger los datos del formulario
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;
    const tags = document.getElementById('tags').value.split(',');

    // Crear un objeto con la información
    const newsData = {
        title: title,
        date: date,
        author: author || 'No especificado',
        category: category || 'No especificado',
        content: content,
        tags: tags
    };

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(newsData, null, 4);

    // Crear un archivo Blob con el JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Mostrar la sección de descarga y proporcionar el enlace al archivo
    const downloadSection = document.getElementById('downloadSection');
    downloadSection.classList.remove('hidden');

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title} + ${date}.json`;
        a.click();
    });
});
document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de la forma tradicional
    
    // Recoger los datos del formulario
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;
    const tags = document.getElementById('tags').value.split(',');
    const comments = document.getElementById('comments').value || 0;
    const sources = document.getElementById('sources').value.split(',');
    
    // Extraer palabras repetidas más de 5 veces (excluyendo pronombres)
    const repeatedWords = extractRepeatedWords(content);

    // Crear un objeto con la información
    const newsData = {
        title: title,
        date: date,
        author: author || 'No especificado',
        category: category || 'No especificado',
        content: content,
        tags: tags,
        comments: comments,
        sources: sources,
        repeatedWords: repeatedWords
    };

    // Mostrar las palabras repetidas en la interfaz
    displayRepeatedWords(repeatedWords);

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(newsData, null, 4);

    // Crear un archivo Blob con el JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Mostrar la sección de descarga y proporcionar el enlace al archivo
    const downloadSection = document.getElementById('downloadSection');
    downloadSection.classList.remove('hidden');

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title} + ${date}.json`;
        a.click();
    });
});

// Función para extraer las palabras repetidas más de 5 veces (excluyendo pronombres)
function extractRepeatedWords(text) {
    // Lista de pronombres comunes que se excluirán
    const pronouns = ['yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas', 'me', 'te', 'se', 'nos', 'os', 'le', 'les'];
    
    // Convertir el texto a minúsculas, quitar signos de puntuación y dividirlo en palabras
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    
    // Contar la frecuencia de cada palabra
    const wordCounts = {};
    words.forEach(word => {
        if (!pronouns.includes(word) && word.length > 1) { // Excluir pronombres y palabras de un solo carácter
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    });
    
    // Filtrar las palabras que se repiten más de 5 veces
    const repeatedWords = [];
    for (const word in wordCounts) {
        if (wordCounts[word] > 5) {
            repeatedWords.push(word);
        }
    }
    
    return repeatedWords;
}

// Función para mostrar las palabras repetidas en la interfaz
function displayRepeatedWords(repeatedWords) {
    const repeatedWordsList = document.getElementById('repeatedWordsList');
    repeatedWordsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas palabras
    
    if (repeatedWords.length === 0) {
        repeatedWordsList.innerHTML = '<li>No hay palabras repetidas más de 5 veces.</li>';
    } else {
        repeatedWords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            repeatedWordsList.appendChild(li);
        });
    }
}
