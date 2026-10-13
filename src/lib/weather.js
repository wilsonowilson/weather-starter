export async function getTemperature(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }
  const data = await response.json();
  return data.current.temperature_2m;
}

export function toHours(hourly) {
  const hours = [];
  let i = 0;
  for (const time of hourly.time) {
    hours.push({
      time: time,
      temp: hourly.temperature_2m[i],
      rainChance: hourly.precipitation_probability[i]
    });
    i++;
  }
  return hours;
}

export async function getHours(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability&forecast_days=1&timezone=Africa/Lagos`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }
  const data = await response.json();
  return toHours(data.hourly);
}
