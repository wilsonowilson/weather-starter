<script>
  import { getHours } from '#lib/weather.js';

  const town = { name: 'Lagos', lat: 6.45, lon: 3.39 };

  async function getRainToday(lat, lon) {
    const hours = await getHours(lat, lon);
    const next = hours.find((hour) => hour.rainChance >= 50);
    // GAP 1: keep every hour with a rainChance of 50 or more, under the name rainy.
    const lines = rainy.map((hour) => `${hour.time}: ${hour.rainChance}% chance of rain`);
    return { next, lines };
  }

  let rain = $state(getRainToday(town.lat, town.lon));
</script>

<main class="mx-auto max-w-md p-4">
  <h1 class="text-2xl font-bold">Rain today in {town.name}</h1>

  {#await rain}
    <p>Loading the forecast…</p>
  {:then today}
    {#if today.next !== undefined}
      <p class="font-semibold">Next rain: {today.next.time}, {today.next.rainChance}% chance.</p>
    {/if}
    {#each today.lines as line}
      <p>{line}</p>
    <!-- GAP 2: the empty state -->
    {/each}
  <!-- GAP 3: the error state -->
  {/await}
</main>
