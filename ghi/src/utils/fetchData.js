//revisit during stretch goals, reassigned to workouts
export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  },
};
// still need to mess with youtube api stuff when we get to strech goals
export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
