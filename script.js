document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de la forma tradicional
    
    // Recoger los datos del formulario
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;
    const tags = document.getElementById('tags').value.split(',').filter(tag => tag.trim() !== ''); // Filtrar etiquetas vacías
    const comments = document.getElementById('comments').value || 0;
    const sources = document.getElementById('sources').value.split(',').filter(source => source.trim() !== ''); // Filtrar fuentes vacías

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

    // Mostrar la sección de descarga
    const downloadSection = document.getElementById('downloadSection');
    downloadSection.classList.remove('hidden');

    // Agregar el evento al botón de descarga
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
        downloadJSON(`${title}_${date}.json`, jsonData);
    });
});

// Función para descargar el archivo JSON
function downloadJSON(filename, jsonData) {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

// Función para extraer las palabras repetidas más de 4 veces (excluyendo pronombres y otras palabras comunes)
function extractRepeatedWords(text) {
    // Lista de palabras excluidas
    const excludedWords = ['yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas', 'me', 'te', 'se', 'nos', 'os', 'le', 'les', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'de', 'en', 'por', 'para', 'con'];

    // Convertir el texto a minúsculas, quitar signos de puntuación y dividirlo en palabras
    const words = text.toLowerCase().replace(/[^a-záéíóúüñ\s]/gi, '').split(/\s+/);

    // Contar la frecuencia de cada palabra
    const wordCounts = {};
    words.forEach(word => {
        if (word.length > 1 && !excludedWords.includes(word)) { // Excluir palabras de un solo carácter y las palabras excluidas
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    });

    // Filtrar las palabras que se repiten más de 4 veces
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
