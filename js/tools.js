const loadToolsData = async (isLoadAll) => {
    if (!isLoadAll) {
        toggleShowAllBtn(true);
    }
    else {
        toggleShowAllBtn(false);
    }
    toggleLoadingSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allTools = data.data.tools;
    displayTools(allTools, isLoadAll);
}

const displayTools = (tools, isLoadAll) => {
    const toolsContainer = document.getElementById('tools-container');

    toolsContainer.textContent = '';

    if (!isLoadAll) {
        tools = tools.slice(0, 6);
    }

    tools.forEach(tool => {
        // console.log(tool);
        const { id, image, features, name, published_in, links } = tool;
        const toolDiv = document.createElement('div');
        toolDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl"  title="Click to show details">
            <figure class="px-10 pt-10 h-[250px]">
                <img src="${image}" alt="${name}" class="rounded-md" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ol class="list-decimal list-inside max-h-12 overflow-auto">
                    ${features.map(feature => `<li>${feature}</li>`).join(" ")}
                </ol>
                <hr>
                <div class="flex justify-between mt-2">
                    <div class="flex flex-col gap-y-2">
                        <h2 onclick="openDetailsModal('${id}')" class="text-lg text-blue-600 hover:scale-105 duration-100 hover:cursor-pointer hover:underline font-bold">${name}</h2>
                        <div class="text-gray-400"><i class="fa-regular fa-calendar-days"></i> <date date=${published_in}>${published_in}</date></div>
                    </div>
                    <div class="flex items-center gap-x-2">
                        ${links.map(link => `<a href="${link.url ? link.url : 'https://www.google.com/search?q=' + name.split(" ").join("+")}" target="_blank" class="rounded-full text-sm p-2 bg-red-100 text-red-400 font-bold hover:scale-110 ease-in-out transition-all duration-100">${link.name ? link.name : name}</a>`).join(" ")}
                    </div>
                    </div>
            </div>
        </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });
    toggleLoadingSpinner(false);
    replaceUnavailableImages();
}

const replaceUnavailableImages = () => {
    var images = document.getElementsByTagName('img');

    for (const image of images) {
        image.addEventListener('error', function () {
            this.parentNode.innerHTML = `
            <p class="text-gray-400 text-4xl text-center font-semibold">Image Not available</p>
        `;
        })
    };
}

const showAllHandler = () => {
    loadToolsData(true);
}

const toggleShowAllBtn = isVisible => {
    const showAllBtn = document.getElementById("show-more");
    if (isVisible) {
        showAllBtn.classList.remove('hidden');
    }
    else {
        showAllBtn.classList.add('hidden');
    }
}

const toggleLoadingSpinner = isVisible => {
    const showLoadingSpinner = document.getElementById("loading-spinner");
    if (isVisible) {
        showLoadingSpinner.classList.remove('hidden');
    }
    else {
        showLoadingSpinner.classList.add('hidden');
    }
}

const openDetailsModal = async (toolsId) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${toolsId}`;
    const res = await fetch(url);
    const data = await res.json();
    const toolInfo = data.data;

    console.log(toolInfo);

    // data preprocessing and destructuring
    const { tool_name, description, pricing, features, integrations, image_link, input_output_examples:samples, accuracy } = toolInfo;
    const pricingIfMissing = [
        { plan: "Basic", price: "No Info" },
        { plan: "Pro", price: "No Info" },
        { plan: "Enterprise", price: "No Info" }
    ]
    const [pricing1, pricing2, pricing3] = pricing || pricingIfMissing;
    
    const featuresArray = [];
    for(const feature in features) {
        featuresArray.push(features[feature]);
    }
    console.log(features);
    console.log(featuresArray);

    // modal body here
    const modalCards = document.getElementById('modal-cards-container');
    modalCards.innerHTML = `
        <div class="bg-red-50 border rounded-xl border-red-400 p-4 flex flex-col gap-y-4">
            <h3 class="text-xl font-bold">${description}</h3>
            <div class="grid grid-cols-3 gap-x-3 text-center font-semibold">
                <p class="p-2 text-sm rounded-lg text-green-700 bg-white">${pricing1.price}<br>${pricing1.plan}</p>
                <p class="p-2 text-sm rounded-lg text-yellow-500 bg-white">${pricing2.price}<br>${pricing2.plan}</p>
                <p class="p-2 text-sm rounded-lg text-red-500 bg-white">${pricing3.price}<br>${pricing3.plan}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <h3 class="text-xl font-bold">Features</h3>
                    <ul class="list-disc list-inside text-sm">
                        ${featuresArray.length > 0 ? featuresArray.map(feature => `<li title="${feature.description}">${feature.feature_name}</li>`).join(" ") : 'No Data'}
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold">Integrations</h3>
                    <ul class="list-disc list-inside text-sm">
                        ${integrations ? integrations.map(integration => `<li>${integration}</li>`).join(' ') : '<li class="text-gray-400 italic">No Data</li>'}
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <div class="card border relative">
                ${accuracy ? `<p class="absolute px-2 py-1 top-3 right-5 rounded-md bg-red-500 text-white text-xs" title="${accuracy.description}">${accuracy.score ? accuracy.score*100+"%" : 'Hover for '} accuracy</p>` : ''}
                <figure class="p-4 h-[200px]">
                    <img src="${image_link[0]}" alt="${tool_name}" class="rounded-xl object-contain w-full" />
                </figure>
                <div class="card-body items-center text-center max-h-48 overflow-auto">
                    ${samples ? samples.map(sample => `<h2 class="card-title">${sample.input}</h2><p class="text-sm">${sample.output}</p>`).join(" ") : '<h2 class="card-title">No Data</h2>'}
                </div>
            </div>
        </div>
    `;

    my_modal_2.showModal();
    replaceUnavailableImages();
}

loadToolsData(false);