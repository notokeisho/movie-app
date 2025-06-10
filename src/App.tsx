import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const defaultMovieList = [
    {
      id: 1,
      name: "君の名は。",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg",
      overview:
        "新海誠監督によるアニメーション映画。東京と田舎町を舞台に、男女の入れ替わりを描く。",
      releaseDate: "2016-08-26",
      rating: 8.9,
      genres: ["アニメ", "ドラマ", "ファンタジー"],
    },
    {
      id: 2,
      name: "ハウルの動く城",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/v0K2e1t6ocUNnkZ9BeiFdcOT9LG.jpg",
      overview:
        "宮崎駿監督によるスタジオジブリのアニメーション映画。魔女に呪われた少女と、動く城の魔法使いの物語。",
      releaseDate: "2004-11-20",
      rating: 8.6,
      genres: ["アニメ", "ファンタジー", "冒険"],
    },
    {
      id: 3,
      name: "もののけ姫",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/mVdz3vlmioKWZaHTGfu99zIuayZ.jpg",
      overview:
        "宮崎駿監督によるスタジオジブリのアニメーション映画。人間と自然の共存を描いた壮大な物語。",
      releaseDate: "1997-07-12",
      rating: 8.4,
      genres: ["アニメ", "ファンタジー", "アクション"],
    },
    {
      id: 4,
      name: "バック・トゥ・ザ・フューチャー",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/oHaxzQXWSvIsctZfAYSW0tn54gQ.jpg",
      overview:
        "ロバート・ゼメキス監督によるSFコメディ映画。タイムトラベルをテーマにした冒険物語。",
      releaseDate: "1985-07-03",
      rating: 8.5,
      genres: ["SF", "コメディ", "アドベンチャー"],
    },
  ];

  const fetchMovieList = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    console.log(data.results);
    setMovieList(data.results);
  };

  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <div>
      <div>{keyword}</div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)} />
      {movieList
        .filter((movie) => movie.original_title.includes(keyword))
        .map((movie) => (
          <div key={movie.id}>
            <h2>{movie.original_title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
            <p>{movie.overview}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
