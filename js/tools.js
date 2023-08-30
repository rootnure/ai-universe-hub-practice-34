const loadAll = async (isLoadAll) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allTools = data.data.tools;
    displayTools(allTools, isLoadAll);
}

const displayTools = (tools, isLoadAll) => {
    const toolsContainer = document.getElementById('tools-container');

    if(!isLoadAll){
        tools = tools.slice(0, 6);
    }

    tools.forEach(tool => {
        console.log(tool);
        const { image, features, name, published_in } = tool;
        const toolDiv = document.createElement('div');
        toolDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10 min-h-[250px] max-h-[250px]">
                <img src="${image}" alt="${name}" class="rounded-lg" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ol class="list-decimal list-inside max-h-12 overflow-auto">
                ${features.map(feature => `<li>${feature}</li>`).join(" ")}
                </ol>
                <hr>
                <div class="flex justify-between mt-2">
                    <div class="flex flex-col gap-y-2">
                        <h2 class="text-lg font-bold">${name}</h2>
                        <div class="text-gray-400"><i class="fa-regular fa-calendar-days"></i> <date date=${published_in}>${published_in}</date></div>
                    </div>
                    <div class="flex items-center">
                        <button class="rounded-full text-lg px-3 py-2 bg-red-100 text-red-400 font-black hover:scale-110"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
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

loadAll(false);