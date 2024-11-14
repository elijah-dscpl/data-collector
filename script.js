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
        repeatedWords: [] // Inicializamos el campo de palabras repetidas vacío
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

    // Mostrar el botón de "Extraer Palabras Repetidas" si el contenido está lleno
    if (content.trim() !== "") {
        document.getElementById('extractRepeatedWordsButton').classList.remove('hidden');
    }
});

// Cuando se hace clic en el botón de "Extraer Palabras Repetidas"
document.getElementById('extractRepeatedWordsButton').addEventListener('click', function() {
    const content = document.getElementById('content').value;
    
    // Extraer palabras repetidas
    const repeatedWords = extractRepeatedWords(content);
    
    // Mostrar las palabras repetidas en la interfaz
    displayRepeatedWords(repeatedWords);
    
    // Guardar las palabras repetidas en el objeto JSON
    const newsData = {
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        author: document.getElementById('author').value,
        category: document.getElementById('category').value,
        content: content,
        tags: document.getElementById('tags').value.split(','),
        comments: document.getElementById('comments').value || 0,
        sources: document.getElementById('sources').value.split(','),
        repeatedWords: repeatedWords
    };

    // Convertir nuevamente el objeto a JSON
    const jsonData = JSON.stringify(newsData, null, 4);
    
    // Crear un archivo Blob con el JSON actualizado
    const blob = new Blob([jso
