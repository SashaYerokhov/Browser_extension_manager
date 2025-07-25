const buttonSun = document.querySelector(".btn-sun");
const buttonMoon = document.querySelector(".btn-moon");

buttonMoon.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    theme = "light";
    buttonMoon.classList.remove("active");
    buttonSun.classList.add("active");
  } else {
    light = "dark";
  }
});
buttonSun.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    theme = "light";
  } else {
    light = "dark";
    buttonSun.classList.remove("active");
    buttonMoon.classList.add("active");
  }
});


const extensionsBlock = document.querySelector(".extensions__block");

extensionsBlock.addEventListener("click", (event) => {

  if (event.target.classList.contains("remove-btn")) {

    const content = event.target.closest(".extensions__content");

    if (content) {

      content.style.opacity = "0";
      setTimeout(() => content.remove(), 300); // удаление после анимации


    }
  }


});


extensionsBlock.addEventListener("change", (event) => {
  if (event.target.classList.contains("toggle-switch")) {
    const card = event.target.closest(".extensions__item");
    const itemName = card.dataset.name;

    if (event.target.checked) {
      console.log(`Toggle for ${itemName} is ON`);
  
    } else {
      console.log(`Toggle for ${itemName} is OFF`);
   
    }
  }
});


      const filterCards = (filterType) => {
        const cards = document.querySelectorAll('.extensions__content');
        
        cards.forEach(card => {
          const toggle = card.querySelector('.toggle-switch');
          const isActive = toggle.checked;
          
          switch(filterType) {
            case 'all':
              card.style.display = '';
              break;
            case 'active':
              card.style.display = isActive ? '' : 'none';
              break;
            case 'inactive':
              card.style.display = isActive ? 'none' : '';
              break;
          }
        });
      };


      document.querySelector('.all-btn').addEventListener('click', () => {
        updateActiveButton('all');
        filterCards('all');
      });

      document.querySelector('.active-btn').addEventListener('click', () => {
        updateActiveButton('active');
        filterCards('active');
      });

      document.querySelector('.inactive-btn').addEventListener('click', () => {
        updateActiveButton('inactive');
        filterCards('inactive');
      });


      const updateActiveButton = (activeType) => {
        document.querySelector('.all-btn').classList.remove('active');
        document.querySelector('.active-btn').classList.remove('active');
        document.querySelector('.inactive-btn').classList.remove('active');
        
        document.querySelector(`.${activeType}-btn`).classList.add('active');
      };

async function loadJson(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error loading JSON ${error.message}`);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadJson("data.json")
    .then((data) => {
      // console.log("JSON data loaded:", data);
      const extensionsBlock = document.querySelector(".extensions__block");
      data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("extensions__content");

        div.innerHTML = `
                      <div class="extensions__item">
              <div class="extensions__item-up">
                <img src="${item.logo}" alt="${item.name}" />
                <div class="extensions__item-content">
                  <h4>${item.name}</h4>
                  <p>
                    ${item.description}
                  </p>
                </div>
              </div>
              <div class="extensions__item-down">
                <button class="remove-btn">Remove</button>
    <label class="switch" tabindex="0">
            <input type="checkbox" class="toggle-switch">
    <span class="move"></span>
    </label>
              </div>
            </div>
          `;
        extensionsBlock.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error loadind data:", error);
    });
});
