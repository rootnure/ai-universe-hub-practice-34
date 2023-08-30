const loadAll = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allTools = data.data.tools;
    displayTools(allTools);
}

const displayTools = tools => {
    const toolsContainer = document.getElementById('tools-container');
    tools.forEach(tool => {
        console.log(tool);
        const { image, features, name, published_in } = tool;
        const toolDiv = document.createElement('div');
        toolDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${image}" alt="${name}" class="rounded-xl" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ol class="list-decimal list-inside">
                ${features.map(feature => `<li>${feature}</li>`).join(" ")}
                </ol>
                <hr>
                <div class="flex justify-between">
                    <div>
                        <h2 class="text-lg font-bold">${name}</h2>
                        <div>📅 <date date=${published_in}>${published_in}</date></div>
                    </div>
                    <button class="rounded-full p-2 bg-red-100 text-red-400 font-black">→</button>
                </div>
            </div>
        </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });
    replaceUnavailableImages();
}

const replaceUnavailableImages = () => {
    var images = document.getElementsByTagName('img');

    for(const image of images) {
        image.addEventListener('error', function () {
        this.src = './images/loading.jpg';
    })};
}

loadAll();