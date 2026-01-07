const races = [
  {
    id: '50m-free',
    name: '50m Freestyle',
    description: 'Sprint race - Pure speed!',
    difficulty: 'Easy',
    time: '~25 seconds'
  },
  {
    id: '100m-free',
    name: '100m Freestyle',
    description: 'Classic Olympic event',
    difficulty: 'Medium',
    time: '~50 seconds'
  },
  {
    id: '200m-free',
    name: '200m Freestyle',
    description: 'Endurance challenge',
    difficulty: 'Hard',
    time: '~2 minutes'
  }
];

function createRaceSelector(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Select Your Event';
  title.style.color = 'white';
  title.style.textAlign = 'center';

  container.appendChild(title);

  races.forEach(race => {
    const card = document.createElement('div');
    card.style.background = '#1e293b';
    card.style.border = '1px solid #334155';
    card.style.borderRadius = '12px';
    card.style.padding = '16px';
    card.style.margin = '12px';
    card.style.cursor = 'pointer';
    card.style.color = 'white';

    const name = document.createElement('h3');
    name.textContent = race.name;

    const desc = document.createElement('p');
    desc.textContent = race.description;
    desc.style.color = '#cbd5e1';

    const meta = document.createElement('div');
    meta.textContent = `${race.time} • ${race.difficulty}`;
    meta.style.fontSize = '12px';
    meta.style.color = '#94a3b8';

    const button = document.createElement('button');
    button.textContent = 'Start Race';
    button.style.marginTop = '10px';
    button.onclick = () => {
      alert(`Starting ${race.name}`);
    };

    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(meta);
    card.appendChild(button);

    container.appendChild(card);
  });
}
