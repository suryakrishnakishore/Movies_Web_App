CREATE TABLE email_otps (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  dob DATE NOT NULL,
  language VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  genres TEXT[] NOT NULL,
  director VARCHAR(255) NOT NULL,
  actors TEXT[] NOT NULL,
  release_date DATE,
  language TEXT[] NOT NULL,
  rating DECIMAL(3, 1) CHECK (rating >= 0 AND rating <= 10),
  image_url VARCHAR(255) NOT NULL,
  video_url VARCHAR(255),
  duration INT NOT NULL, -- Duration in minutes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO movies (
  title, description, genres, director, actors, release_date, language, rating,
  image_url, video_url, duration
) VALUES
(
  'Inception',
  'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
  ARRAY['Sci-Fi', 'Action', 'Thriller'],
  'Christopher Nolan',
  ARRAY['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
  '2010-07-16',
  ARRAY['English'],
  8.8,
  'https://example.com/images/inception.jpg',
  'https://example.com/videos/inception.mp4',
  148
),
(
  'Parasite',
  'A poor family schemes to become employed by a wealthy family by infiltrating their household.',
  ARRAY['Drama', 'Thriller'],
  'Bong Joon-ho',
  ARRAY['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
  '2019-05-30',
  ARRAY['Korean'],
  8.6,
  'https://example.com/images/parasite.jpg',
  'https://example.com/videos/parasite.mp4',
  132
),
(
  'The Dark Knight',
  'Batman raises the stakes in his war on crime as the Joker emerges as a new threat.',
  ARRAY['Action', 'Crime', 'Drama'],
  'Christopher Nolan',
  ARRAY['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
  '2008-07-18',
  ARRAY['English'],
  9.0,
  'https://example.com/images/dark_knight.jpg',
  'https://example.com/videos/dark_knight.mp4',
  152
),
(
  '3 Idiots',
  'Two friends search for their long-lost companion while recalling their college days and how he inspired them.',
  ARRAY['Comedy', 'Drama'],
  'Rajkumar Hirani',
  ARRAY['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
  '2009-12-25',
  ARRAY['Hindi'],
  8.4,
  'https://example.com/images/3idiots.jpg',
  'https://example.com/videos/3idiots.mp4',
  170
),
(
  'Spirited Away',
  'During her family''s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, spirits, and witches.',
  ARRAY['Animation', 'Fantasy', 'Adventure'],
  'Hayao Miyazaki',
  ARRAY['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
  '2001-07-20',
  ARRAY['Japanese'],
  8.6,
  'https://example.com/images/spirited_away.jpg',
  'https://example.com/videos/spirited_away.mp4',
  125
),
(
  'Silent Horizon',
  'A mysterious object crashes on Earth, triggering a series of global events that threaten humanity.',
  ARRAY['Sci-Fi', 'Thriller'],
  'Christopher Nolan',
  ARRAY['Leonardo DiCaprio', 'Natalie Portman', 'Keanu Reeves'],
  '2018-06-14',
  ARRAY['English'],
  8.2,
  'https://example.com/images/silent_horizon.jpg',
  'https://example.com/videos/silent_horizon.mp4',
  132
),
(
  'Dreams Unfold',
  'Two childhood friends reunite after a decade, facing the consequences of their past decisions.',
  ARRAY['Drama'],
  'Zoya Akhtar',
  ARRAY['Alia Bhatt', 'Ranveer Singh', 'Tom Hanks'],
  '2020-09-21',
  ARRAY['Hindi'],
  7.9,
  'https://example.com/images/dreams_unfold.jpg',
  'https://example.com/videos/dreams_unfold.mp4',
  145
),
(
  'Galactic Drift',
  'A rogue spaceship crew discovers an ancient alien artifact that changes the course of history.',
  ARRAY['Action', 'Sci-Fi'],
  'James Cameron',
  ARRAY['Chris Evans', 'Scarlett Johansson', 'Robert Downey Jr.'],
  '2015-11-11',
  ARRAY['English'],
  8.5,
  'https://example.com/images/galactic_drift.jpg',
  'https://example.com/videos/galactic_drift.mp4',
  158
),
(
  'Echoes of Truth',
  'A whistleblower risks everything to reveal secrets about a powerful global syndicate.',
  ARRAY['Crime', 'Drama'],
  'Steven Spielberg',
  ARRAY['Brad Pitt', 'Keanu Reeves', 'Deepika Padukone'],
  '2021-02-28',
  ARRAY['English'],
  8.0,
  'https://example.com/images/echoes_of_truth.jpg',
  'https://example.com/videos/echoes_of_truth.mp4',
  138
),
(
  'Love Algorithm',
  'In a world driven by AI matchmaking, two people resist the system to find love the old-fashioned way.',
  ARRAY['Romance', 'Comedy'],
  'Rajkumar Hirani',
  ARRAY['Aamir Khan', 'Alia Bhatt', 'Scarlett Johansson'],
  '2017-04-04',
  ARRAY['Hindi'],
  7.6,
  'https://example.com/images/love_algorithm.jpg',
  'https://example.com/videos/love_algorithm.mp4',
  125
),
(
  'Whispers in the Wind',
  'A poet in a quiet mountain town uncovers ancient secrets hidden in the landscape.',
  ARRAY['Mystery', 'Fantasy'],
  'Bong Joon-ho',
  ARRAY['Song Kang-ho', 'Natalie Portman', 'R. Madhavan'],
  '2016-08-18',
  ARRAY['Korean'],
  8.1,
  'https://example.com/images/whispers_in_the_wind.jpg',
  'https://example.com/videos/whispers_in_the_wind.mp4',
  112
),
(
  'Digital Shadows',
  'Hackers try to expose the truth behind a government AI surveillance program.',
  ARRAY['Thriller', 'Drama'],
  'Quentin Tarantino',
  ARRAY['Christian Bale', 'Leonardo DiCaprio', 'Keanu Reeves'],
  '2019-03-12',
  ARRAY['English'],
  8.4,
  'https://example.com/images/digital_shadows.jpg',
  'https://example.com/videos/digital_shadows.mp4',
  141
),
(
  'Lost in Saffron',
  'A culinary journey across India turns into a quest of self-discovery.',
  ARRAY['Drama', 'Adventure'],
  'S.S. Rajamouli',
  ARRAY['Aamir Khan', 'Deepika Padukone', 'Ranveer Singh'],
  '2018-12-01',
  ARRAY['Hindi'],
  7.8,
  'https://example.com/images/lost_in_saffron.jpg',
  'https://example.com/videos/lost_in_saffron.mp4',
  135
),
(
  'Crimson Verdict',
  'A wrongfully accused man seeks justice against the corrupt system that betrayed him.',
  ARRAY['Crime', 'Action'],
  'Christopher Nolan',
  ARRAY['Robert Downey Jr.', 'Chris Evans', 'Tom Hanks'],
  '2022-06-10',
  ARRAY['English'],
  8.7,
  'https://example.com/images/crimson_verdict.jpg',
  'https://example.com/videos/crimson_verdict.mp4',
  150
),
(
  'Harmony',
  'Music heals a divided village in the aftermath of political unrest.',
  ARRAY['Drama', 'Musical'],
  'Zoya Akhtar',
  ARRAY['Alia Bhatt', 'Natalie Portman', 'Leonardo DiCaprio'],
  '2023-01-05',
  ARRAY['English'],
  7.5,
  'https://example.com/images/harmony.jpg',
  'https://example.com/videos/harmony.mp4',
  128
),
(
  'La Vida Brillante',
  'A drama film in Spanish showcasing global storytelling with themes of adventure and identity.',
  ARRAY['Drama'],
  'James Cameron',
  ARRAY['Natalie Portman', 'Brad Pitt', 'Tom Hanks'],
  '2014-05-14',
  ARRAY['Spanish'],
  7.8,
  'https://example.com/images/la_vida_brilhante.jpg',
  'https://example.com/videos/la_vida_brilhante.mp4',
  120
),
(
  'Le Dernier Voyage',
  'A sci-fi film in French showcasing global storytelling with themes of adventure and identity.',
  ARRAY['Sci-Fi', 'Adventure'],
  'Christopher Nolan',
  ARRAY['Leonardo DiCaprio', 'Scarlett Johansson', 'Chris Evans'],
  '2015-09-28',
  ARRAY['French'],
  8.1,
  'https://example.com/images/le_dernier_voyage.jpg',
  'https://example.com/videos/le_dernier_voyage.mp4',
  142
),
(
  'Tokyo Mirage',
  'A mystery film in Japanese showcasing global storytelling with themes of adventure and identity.',
  ARRAY['Mystery', 'Thriller'],
  'Bong Joon-ho',
  ARRAY['Song Kang-ho', 'Keanu Reeves', 'Natalie Portman'],
  '2016-12-10',
  ARRAY['Japanese'],
  8.4,
  'https://example.com/images/tokyo_mirage.jpg',
  'https://example.com/videos/tokyo_mirage.mp4',
  115
),
(
  'Echoes of Freedom',
  'A drama film in English showcasing global storytelling with themes of adventure and identity.',
  ARRAY['Drama'],
  'Steven Spielberg',
  ARRAY['Robert Downey Jr.', 'Alia Bhatt', 'Brad Pitt'],
  '2017-03-15',
  ARRAY['English'],
  8.0,
  'https://example.com/images/echoes_of_freedom.jpg',
  'https://example.com/videos/echoes_of_freedom.mp4',
  133
),
(
  'Réflexions',
  'A fantasy film in French showcasing global storytelling with themes of adventure and identity.',
  ARRAY['Fantasy', 'Animation'],
  'Zoya Akhtar',
  ARRAY['Aamir Khan', 'Deepika Padukone', 'Tom Hanks'],
  '2018-06-22',
  ARRAY['French', 'English'],
  7.9,
  'https://example.com/images/reflexions.jpg',
  'https://example.com/videos/reflexions.mp4',
  110
),
(
  'Astitva',
  'A cultural drama in Hindi exploring gender, identity, and personal freedom.',
  ARRAY['Drama'],
  'Rajkumar Hirani',
  ARRAY['Ranveer Singh', 'Natalie Portman', 'Aamir Khan'],
  '2019-10-04',
  ARRAY['Hindi'],
  8.3,
  'https://example.com/images/astitva.jpg',
  'https://example.com/videos/astitva.mp4',
  125
),
(
  'Sangam',
  'An epic romance in Hindi and English that transcends language and culture.',
  ARRAY['Romance', 'Drama'],
  'S.S. Rajamouli',
  ARRAY['Deepika Padukone', 'Leonardo DiCaprio', 'Alia Bhatt'],
  '2020-01-12',
  ARRAY['Hindi', 'English'],
  8.5,
  'https://example.com/images/sangam.jpg',
  'https://example.com/videos/sangam.mp4',
  150
),
(
  'Cybernetic Love',
  'A comedy in English about relationships in a futuristic digital society.',
  ARRAY['Comedy', 'Sci-Fi'],
  'Quentin Tarantino',
  ARRAY['Chris Evans', 'Scarlett Johansson', 'Brad Pitt'],
  '2021-07-19',
  ARRAY['English'],
  7.7,
  'https://example.com/images/cybernetic_love.jpg',
  'https://example.com/videos/cybernetic_love.mp4',
  105
),
(
  'Cielo Oscuro',
  'A thriller in Spanish exploring psychological suspense and moral ambiguity.',
  ARRAY['Thriller', 'Mystery'],
  'Bong Joon-ho',
  ARRAY['Song Kang-ho', 'Natalie Portman', 'Keanu Reeves'],
  '2022-02-25',
  ARRAY['Spanish'],
  8.6,
  'https://example.com/images/cielo_oscuro.jpg',
  'https://example.com/videos/cielo_oscuro.mp4',
  118
),
(
  'Kōri no Yume',
  'A poetic drama in Japanese about dreams, destiny, and the burden of choice.',
  ARRAY['Drama', 'Fantasy'],
  'James Cameron',
  ARRAY['Tom Hanks', 'Leonardo DiCaprio', 'Alia Bhatt'],
  '2023-11-03',
  ARRAY['Japanese'],
  8.2,
  'https://example.com/images/kori_no_yume.jpg',
  'https://example.com/videos/kori_no_yume.mp4',
  122
),
(
  'The Grand Illusion',
  'A historical drama set during World War II, exploring themes of friendship and sacrifice.',
  ARRAY['Drama', 'War'],
  'Steven Spielberg',
  ARRAY['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
  '2024-05-15',
  ARRAY['English'],
  8.9,
  'https://example.com/images/grand_illusion.jpg',
  'https://example.com/videos/grand_illusion.mp4',
  160
)
(
  'Avengers: Infinity War',
  'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation puts an end to the universe.',
  ARRAY['Action', 'Adventure', 'Sci-Fi'],
  'Anthony Russo, Joe Russo',
  ARRAY['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
  '2018-04-27',
  ARRAY['English'],
  8.4,
  'https://example.com/images/avengers_infinity_war.jpg',
  'https://example.com/videos/avengers_infinity_war.mp4',
  149
),
(
  'Robot (Enthiran)',
  'A brilliant scientist constructs a sophisticated humanoid robot, but complications arise when the robot begins to feel human emotions.',
  ARRAY['Action', 'Sci-Fi', 'Thriller'],
  'S. Shankar',
  ARRAY['Rajinikanth', 'Aishwarya Rai Bachchan', 'Danny Denzongpa'],
  '2010-10-01',
  ARRAY['Tamil', 'Hindi'],
  7.1,
  'https://example.com/images/robot_enthiran.jpg',
  'https://example.com/videos/robot_enthiran.mp4',
  155
),
(
  'The Lion King',
  'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
  ARRAY['Animation', 'Adventure', 'Drama'],
  'Roger Allers, Rob Minkoff',
  ARRAY['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'],
  '1994-06-24',
  ARRAY['English'],
  8.5,
  'https://example.com/images/the_lion_king.jpg',
  'https://example.com/videos/the_lion_king.mp4',
  88
);


CREATE TABLE movie_reviews (
	review_id SERIAL PRIMARY KEY,
	review TEXT NOT NULL,
	movie_id INT NOT NULL,
	CONSTRAINT fk_movies FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
  user_id INT NOT NULL,
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO movie_reviews (review, movie_id, user_id) VALUES 
(
	'With so many characters to cover, directors Anthony and Joe Russo have no time to develop any of them, and the action set pieces are all by the numbers.',
	28,
	2
),
(
	'This is a film that can entertain anyone young or old, I usually don't care for animated movies but this film is the real deal, this is one of disney's best animated movies. The animation is top notch and flawless. This film also features superb work from the vocal cast James Earl Jones, Jeremy Irons, Whoopi Goldberg. This is a standout.',
	30,
	2
);

SELECT U.name AS user_name, M.title AS movie_name, R.review
  FROM movie_reviews R 
  JOIN movies M ON R.movie_id = M.id
  JOIN users U ON R.user_id = U.id;

CREATE TABLE liked_movies (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  CONSTRAINT fky_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  liked INT[]
); 

CREATE TABLE uesr_history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  history INT[],
  CONSTRAINT fky_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION add_user_history()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO uesr_history (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_history_after_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION add_user_history();