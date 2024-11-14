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

    // Extraer las palabras repetidas
    const repeatedWords = extractRepeatedWords(content);
    
    // Mostrar las palabras repetidas o el mensaje "Ninguna"
    displayRepeatedWords(repeatedWords);
    
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
        repeatedWords: repeatedWords // Guardamos las palabras repetidas
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

// Función para extraer las palabras repetidas más de 4 veces (excluyendo pronombres)
function extractRepeatedWords(text) {
    const pronouns = ['yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas', 'me', 'te', 'se', 'nos', 'os', 'le', 'les'];
    const words = text.toLowerCase().replace(/[^a-záéíóúüñ\s]/gi, '').split(/\s+/);

    const wordCounts = {};
    words.forEach(word => {
        if (word.length > 1 && !pronouns.includes(word)) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    });

    const repeatedWords = [];
    for (const word in wordCounts) {
        if (wordCounts[word] > 4) {
            repeatedWords.push(word);
        }
    }

    return repeatedWords;
}

// Función para mostrar las palabras repetidas en la interfaz
function displayRepeatedWords(repeatedWords) {
    const repeatedWordsList = document.getElementById('repeatedWordsList');
    if (repeatedWords.length === 0) {
        repeatedWordsList.textContent = 'Ninguna';
    } else {
        repeatedWordsList.textContent = repeatedWords.join(', ');
    }
}
