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
        const {image, features} = tool;
        const toolDiv = document.createElement('div');
        toolDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ol class="list-decimal list-inside">
                    ${features.map(feature => `<li>${feature}</li>`).join(" ")}
                </ol>
                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });
}

loadAll();