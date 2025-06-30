import axios from 'axios';

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTFiOWNhYzQzMjE3ZjA1MDM4NzUzNjUwNGI1MTM4ZiIsIm5iZiI6MTc1MTI5NjAyMC45NTksInN1YiI6IjY4NjJhODE0YTEwNmZmNDIxYmZkY2UwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3jEobELOZrBjOFa4e3BjiOIUAMG1MMcEcA9uxibTEZM',
    'Content-Type': 'application/json;charset=utf-8',
  },
}); 