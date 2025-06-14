--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Ubuntu 17.5-1.pgdg22.04+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: add_user_history(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_user_history() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO uesr_history (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.add_user_history() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: email_otps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email_otps (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    otp_code character varying(6) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.email_otps OWNER TO postgres;

--
-- Name: email_otps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.email_otps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.email_otps_id_seq OWNER TO postgres;

--
-- Name: email_otps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.email_otps_id_seq OWNED BY public.email_otps.id;


--
-- Name: movie_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_reviews (
    review_id integer NOT NULL,
    review text NOT NULL,
    movie_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.movie_reviews OWNER TO postgres;

--
-- Name: movie_reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movie_reviews_review_id_seq OWNER TO postgres;

--
-- Name: movie_reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_reviews_review_id_seq OWNED BY public.movie_reviews.review_id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    genres text[] NOT NULL,
    director character varying(255) NOT NULL,
    actors text[] NOT NULL,
    release_date date,
    languages text[] NOT NULL,
    rating numeric(3,1),
    image_url text NOT NULL,
    video_url text,
    duration integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    views integer DEFAULT 0,
    likes integer DEFAULT 0,
    CONSTRAINT movies_rating_check CHECK (((rating >= (0)::numeric) AND (rating <= (10)::numeric)))
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movies_id_seq OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: uesr_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uesr_history (
    id integer NOT NULL,
    user_id integer NOT NULL,
    history integer[]
);


ALTER TABLE public.uesr_history OWNER TO postgres;

--
-- Name: uesr_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uesr_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.uesr_history_id_seq OWNER TO postgres;

--
-- Name: uesr_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uesr_history_id_seq OWNED BY public.uesr_history.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    gender character varying(10),
    dob date,
    language character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    liked integer[]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: email_otps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_otps ALTER COLUMN id SET DEFAULT nextval('public.email_otps_id_seq'::regclass);


--
-- Name: movie_reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_reviews ALTER COLUMN review_id SET DEFAULT nextval('public.movie_reviews_review_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: uesr_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uesr_history ALTER COLUMN id SET DEFAULT nextval('public.uesr_history_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: email_otps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email_otps (id, email, otp_code, expires_at, created_at) FROM stdin;
1	kishoreky02@gmail.com	671234	2025-05-22 01:01:19.258	2025-05-22 00:56:19.25867
2	kishoreky02@gmail.com	852999	2025-05-22 01:11:53.422	2025-05-22 01:06:53.423384
4	kishoreky02@gmail.com	497930	2025-05-29 08:35:54.197	2025-05-29 08:30:54.197711
5	kishoreky02@gmail.com	457223	2025-05-31 01:18:43.596	2025-05-31 01:13:43.597533
6	kishoreky02@gmail.com	840575	2025-05-31 23:56:02.875	2025-05-31 23:51:02.875847
7	kishoreky02@gmail.com	645263	2025-06-01 00:04:02.559	2025-05-31 23:59:02.559761
8	kishoreky02@gmail.com	470577	2025-06-01 00:10:06.858	2025-06-01 00:05:06.85935
9	kishoreky02@gmail.com	791176	2025-06-01 00:17:45.473	2025-06-01 00:12:45.475727
10	kishoreky02@gmail.com	596656	2025-06-01 00:34:06.063	2025-06-01 00:29:06.063979
11	kishoreky02@gmail.com	360309	2025-06-01 00:43:10.559	2025-06-01 00:38:10.559138
12	kishoreky02@gmail.com	525080	2025-06-01 01:02:18.439	2025-06-01 00:57:18.4399
13	kishoreky02@gmail.com	201980	2025-06-01 01:06:51.3	2025-06-01 01:01:51.301086
14	kishoreky02@gmail.com	951105	2025-06-02 01:25:15.539	2025-06-02 01:20:15.539473
15	kishoreky02@gmail.com	789187	2025-06-04 17:32:21.759	2025-06-04 17:27:21.759837
16	kishoreky02@gmail.com	131725	2025-06-06 12:12:17.219	2025-06-06 12:07:17.220456
17	kishoreky02@gmail.com	272563	2025-06-08 00:27:50.001	2025-06-08 00:22:50.001798
18	kishoreky02@gmail.com	878075	2025-06-09 17:23:31.017	2025-06-09 17:18:31.019036
19	krishnaharini.satti@gmail.com	692147	2025-06-09 19:28:39.237	2025-06-09 19:23:39.238926
20	kishoreky02@gmail.com	372239	2025-06-09 23:27:19.401	2025-06-09 23:22:19.402717
21	krishnaharini.satti@gmail.com	399165	2025-06-10 23:26:55.547	2025-06-10 23:21:55.548228
22	kishoreky02@gmail.com	130303	2025-06-12 00:17:12.373	2025-06-12 00:12:12.374551
23	kishoreky02@gmail.com	241960	2025-06-13 20:36:10.297	2025-06-13 20:31:10.298239
\.


--
-- Data for Name: movie_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_reviews (review_id, review, movie_id, user_id) FROM stdin;
2	This is a film that can entertain anyone young or old, I usually do not care for animated movies but this film is the real deal, this is one of disney`s best animated movies. The animation is top notch and flawless. This film also features superb work from the vocal cast James Earl Jones, Jeremy Irons, Whoopi Goldberg. This is a standout.	30	2
10	This is a super movie to watch for today's generation	28	2
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, description, genres, director, actors, release_date, languages, rating, image_url, video_url, duration, created_at, views, likes) FROM stdin;
1	Inception	A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.	{Sci-Fi,Action,Thriller}	Christopher Nolan	{"Leonardo DiCaprio","Joseph Gordon-Levitt","Elliot Page"}	2010-07-16	{English}	8.8	https://example.com/images/inception.jpg	https://example.com/videos/inception.mp4	148	2025-06-02 23:17:01.297579	\N	\N
2	Parasite	A poor family schemes to become employed by a wealthy family by infiltrating their household.	{Drama,Thriller}	Bong Joon-ho	{"Song Kang-ho","Lee Sun-kyun","Cho Yeo-jeong"}	2019-05-30	{Korean}	8.6	https://example.com/images/parasite.jpg	https://example.com/videos/parasite.mp4	132	2025-06-02 23:17:01.297579	\N	\N
3	The Dark Knight	Batman raises the stakes in his war on crime as the Joker emerges as a new threat.	{Action,Crime,Drama}	Christopher Nolan	{"Christian Bale","Heath Ledger","Aaron Eckhart"}	2008-07-18	{English}	9.0	https://example.com/images/dark_knight.jpg	https://example.com/videos/dark_knight.mp4	152	2025-06-02 23:17:01.297579	\N	\N
4	3 Idiots	Two friends search for their long-lost companion while recalling their college days and how he inspired them.	{Comedy,Drama}	Rajkumar Hirani	{"Aamir Khan","R. Madhavan","Sharman Joshi"}	2009-12-25	{Hindi}	8.4	https://example.com/images/3idiots.jpg	https://example.com/videos/3idiots.mp4	170	2025-06-02 23:17:01.297579	\N	\N
5	Spirited Away	During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, spirits, and witches.	{Animation,Fantasy,Adventure}	Hayao Miyazaki	{"Rumi Hiiragi","Miyu Irino","Mari Natsuki"}	2001-07-20	{Japanese}	8.6	https://example.com/images/spirited_away.jpg	https://example.com/videos/spirited_away.mp4	125	2025-06-02 23:17:01.297579	\N	\N
6	Silent Horizon	A mysterious object crashes on Earth, triggering a series of global events that threaten humanity.	{Sci-Fi,Thriller}	Christopher Nolan	{"Leonardo DiCaprio","Natalie Portman","Keanu Reeves"}	2018-06-14	{English}	8.2	https://example.com/images/silent_horizon.jpg	https://example.com/videos/silent_horizon.mp4	132	2025-06-02 23:17:01.297579	\N	\N
7	Dreams Unfold	Two childhood friends reunite after a decade, facing the consequences of their past decisions.	{Drama}	Zoya Akhtar	{"Alia Bhatt","Ranveer Singh","Tom Hanks"}	2020-09-21	{Hindi}	7.9	https://example.com/images/dreams_unfold.jpg	https://example.com/videos/dreams_unfold.mp4	145	2025-06-02 23:17:01.297579	\N	\N
8	Galactic Drift	A rogue spaceship crew discovers an ancient alien artifact that changes the course of history.	{Action,Sci-Fi}	James Cameron	{"Chris Evans","Scarlett Johansson","Robert Downey Jr."}	2015-11-11	{English}	8.5	https://example.com/images/galactic_drift.jpg	https://example.com/videos/galactic_drift.mp4	158	2025-06-02 23:17:01.297579	\N	\N
9	Echoes of Truth	A whistleblower risks everything to reveal secrets about a powerful global syndicate.	{Crime,Drama}	Steven Spielberg	{"Brad Pitt","Keanu Reeves","Deepika Padukone"}	2021-02-28	{English}	8.0	https://example.com/images/echoes_of_truth.jpg	https://example.com/videos/echoes_of_truth.mp4	138	2025-06-02 23:17:01.297579	\N	\N
10	Love Algorithm	In a world driven by AI matchmaking, two people resist the system to find love the old-fashioned way.	{Romance,Comedy}	Rajkumar Hirani	{"Aamir Khan","Alia Bhatt","Scarlett Johansson"}	2017-04-04	{Hindi}	7.6	https://example.com/images/love_algorithm.jpg	https://example.com/videos/love_algorithm.mp4	125	2025-06-02 23:17:01.297579	\N	\N
11	Whispers in the Wind	A poet in a quiet mountain town uncovers ancient secrets hidden in the landscape.	{Mystery,Fantasy}	Bong Joon-ho	{"Song Kang-ho","Natalie Portman","R. Madhavan"}	2016-08-18	{Korean}	8.1	https://example.com/images/whispers_in_the_wind.jpg	https://example.com/videos/whispers_in_the_wind.mp4	112	2025-06-02 23:17:01.297579	\N	\N
12	Digital Shadows	Hackers try to expose the truth behind a government AI surveillance program.	{Thriller,Drama}	Quentin Tarantino	{"Christian Bale","Leonardo DiCaprio","Keanu Reeves"}	2019-03-12	{English}	8.4	https://example.com/images/digital_shadows.jpg	https://example.com/videos/digital_shadows.mp4	141	2025-06-02 23:17:01.297579	\N	\N
13	Lost in Saffron	A culinary journey across India turns into a quest of self-discovery.	{Drama,Adventure}	S.S. Rajamouli	{"Aamir Khan","Deepika Padukone","Ranveer Singh"}	2018-12-01	{Hindi}	7.8	https://example.com/images/lost_in_saffron.jpg	https://example.com/videos/lost_in_saffron.mp4	135	2025-06-02 23:17:01.297579	\N	\N
14	Crimson Verdict	A wrongfully accused man seeks justice against the corrupt system that betrayed him.	{Crime,Action}	Christopher Nolan	{"Robert Downey Jr.","Chris Evans","Tom Hanks"}	2022-06-10	{English}	8.7	https://example.com/images/crimson_verdict.jpg	https://example.com/videos/crimson_verdict.mp4	150	2025-06-02 23:17:01.297579	\N	\N
15	Harmony	Music heals a divided village in the aftermath of political unrest.	{Drama,Musical}	Zoya Akhtar	{"Alia Bhatt","Natalie Portman","Leonardo DiCaprio"}	2023-01-05	{English}	7.5	https://example.com/images/harmony.jpg	https://example.com/videos/harmony.mp4	128	2025-06-02 23:17:01.297579	\N	\N
16	La Vida Brillante	A drama film in Spanish showcasing global storytelling with themes of adventure and identity.	{Drama}	James Cameron	{"Natalie Portman","Brad Pitt","Tom Hanks"}	2014-05-14	{Spanish}	7.8	https://example.com/images/la_vida_brilhante.jpg	https://example.com/videos/la_vida_brilhante.mp4	120	2025-06-02 23:17:01.297579	\N	\N
17	Le Dernier Voyage	A sci-fi film in French showcasing global storytelling with themes of adventure and identity.	{Sci-Fi,Adventure}	Christopher Nolan	{"Leonardo DiCaprio","Scarlett Johansson","Chris Evans"}	2015-09-28	{French}	8.1	https://example.com/images/le_dernier_voyage.jpg	https://example.com/videos/le_dernier_voyage.mp4	142	2025-06-02 23:17:01.297579	\N	\N
18	Tokyo Mirage	A mystery film in Japanese showcasing global storytelling with themes of adventure and identity.	{Mystery,Thriller}	Bong Joon-ho	{"Song Kang-ho","Keanu Reeves","Natalie Portman"}	2016-12-10	{Japanese}	8.4	https://example.com/images/tokyo_mirage.jpg	https://example.com/videos/tokyo_mirage.mp4	115	2025-06-02 23:17:01.297579	\N	\N
19	Echoes of Freedom	A drama film in English showcasing global storytelling with themes of adventure and identity.	{Drama}	Steven Spielberg	{"Robert Downey Jr.","Alia Bhatt","Brad Pitt"}	2017-03-15	{English}	8.0	https://example.com/images/echoes_of_freedom.jpg	https://example.com/videos/echoes_of_freedom.mp4	133	2025-06-02 23:17:01.297579	\N	\N
20	Réflexions	A fantasy film in French showcasing global storytelling with themes of adventure and identity.	{Fantasy,Animation}	Zoya Akhtar	{"Aamir Khan","Deepika Padukone","Tom Hanks"}	2018-06-22	{French,English}	7.9	https://example.com/images/reflexions.jpg	https://example.com/videos/reflexions.mp4	110	2025-06-02 23:17:01.297579	\N	\N
21	Astitva	A cultural drama in Hindi exploring gender, identity, and personal freedom.	{Drama}	Rajkumar Hirani	{"Ranveer Singh","Natalie Portman","Aamir Khan"}	2019-10-04	{Hindi}	8.3	https://example.com/images/astitva.jpg	https://example.com/videos/astitva.mp4	125	2025-06-02 23:17:01.297579	\N	\N
22	Sangam	An epic romance in Hindi and English that transcends language and culture.	{Romance,Drama}	S.S. Rajamouli	{"Deepika Padukone","Leonardo DiCaprio","Alia Bhatt"}	2020-01-12	{Hindi,English}	8.5	https://example.com/images/sangam.jpg	https://example.com/videos/sangam.mp4	150	2025-06-02 23:17:01.297579	\N	\N
23	Cybernetic Love	A comedy in English about relationships in a futuristic digital society.	{Comedy,Sci-Fi}	Quentin Tarantino	{"Chris Evans","Scarlett Johansson","Brad Pitt"}	2021-07-19	{English}	7.7	https://example.com/images/cybernetic_love.jpg	https://example.com/videos/cybernetic_love.mp4	105	2025-06-02 23:17:01.297579	\N	\N
24	Cielo Oscuro	A thriller in Spanish exploring psychological suspense and moral ambiguity.	{Thriller,Mystery}	Bong Joon-ho	{"Song Kang-ho","Natalie Portman","Keanu Reeves"}	2022-02-25	{Spanish}	8.6	https://example.com/images/cielo_oscuro.jpg	https://example.com/videos/cielo_oscuro.mp4	118	2025-06-02 23:17:01.297579	\N	\N
25	Kōri no Yume	A poetic drama in Japanese about dreams, destiny, and the burden of choice.	{Drama,Fantasy}	James Cameron	{"Tom Hanks","Leonardo DiCaprio","Alia Bhatt"}	2023-11-03	{Japanese}	8.2	https://example.com/images/kori_no_yume.jpg	https://example.com/videos/kori_no_yume.mp4	122	2025-06-02 23:17:01.297579	\N	\N
27	The Grand Illusion	A historical drama set during World War II, exploring themes of friendship and sacrifice.	{Drama,War}	Steven Spielberg	{"Robert Downey Jr.","Chris Evans","Scarlett Johansson"}	2024-05-15	{English}	8.9	https://example.com/images/grand_illusion.jpg	https://example.com/videos/grand_illusion.mp4	160	2025-06-02 23:24:34.905455	\N	\N
26	I, Robot	In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity.	{Action,Sci-Fi,Mystery}	Alex Proyas	{"Will Smith","Bridget Moynahan","Alan Tudyk"}	2004-07-16	{English}	7.1	https://lh4.googleusercontent.com/proxy/1_3I95hu8ZdT_3c6w7UNngly3lJrf3bKJVT7wturWG2XDSoVdxQEko5McOvnG9IiMiJMkVCJmRkWNvw5-OlWpWlv5huL6GOsMA	https://example.com/videos/i_robot.mp4	115	2025-06-02 23:24:34.905455	11	5
29	Robot (Enthiran)	A brilliant scientist constructs a sophisticated humanoid robot, but complications arise when the robot begins to feel human emotions.	{Action,Sci-Fi,Thriller}	S. Shankar	{Rajinikanth,"Aishwarya Rai Bachchan","Danny Denzongpa"}	2010-10-01	{Tamil,Hindi}	7.1	https://example.com/images/robot_enthiran.jpg	https://example.com/videos/robot_enthiran.mp4	155	2025-06-02 23:24:34.905455	10	4
30	The Lion King	Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.	{Animation,Adventure,Drama}	Roger Allers, Rob Minkoff	{"Matthew Broderick","Jeremy Irons","James Earl Jones"}	1994-06-24	{English}	8.5	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqsPvZkmmeqVQsk6udlnP6vhWHx8QF_0EI5A&s	https://example.com/videos/the_lion_king.mp4	88	2025-06-02 23:24:34.905455	15	9
28	Avengers: Infinity War	The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation puts an end to the universe.	{Action,Adventure,Sci-Fi}	Anthony Russo, Joe Russo	{"Robert Downey Jr.","Chris Evans","Scarlett Johansson"}	2018-04-27	{English}	8.4	https://c8.alamy.com/comp/RR5MCX/avengers-infinity-war-2018-directed-by-anthony-russo-and-joe-russo-and-starring-robert-downey-jr-chris-evans-mark-ruffalo-chris-hemsworth-and-scarlett-johansson-the-avengers-team-up-with-heroes-across-the-marvel-universe-to-stop-thanos-collecting-the-remaining-infinity-stones-and-destroying-earth-RR5MCX.jpg	https://example.com/videos/avengers_infinity_war.mp4	149	2025-06-02 23:24:34.905455	20	12
\.


--
-- Data for Name: uesr_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uesr_history (id, user_id, history) FROM stdin;
1	21	\N
2	2	{28,30}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, name, gender, dob, language, created_at, liked) FROM stdin;
21	krishnaharini.satti@gmail.com	krishna harini	Female	2009-04-23	English	2025-06-09 19:24:04.338977	{28}
2	kishoreky02@gmail.com	Satti Surya Krishna Kishore	Male	2006-05-17	Telugu	2025-05-31 01:14:33.977765	{28}
\.


--
-- Name: email_otps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.email_otps_id_seq', 23, true);


--
-- Name: movie_reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_reviews_review_id_seq', 10, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 30, true);


--
-- Name: uesr_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uesr_history_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 25, true);


--
-- Name: email_otps email_otps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_otps
    ADD CONSTRAINT email_otps_pkey PRIMARY KEY (id);


--
-- Name: movie_reviews movie_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_reviews
    ADD CONSTRAINT movie_reviews_pkey PRIMARY KEY (review_id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: uesr_history uesr_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uesr_history
    ADD CONSTRAINT uesr_history_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users user_history_after_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER user_history_after_insert AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.add_user_history();


--
-- Name: movie_reviews fk_movies; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_reviews
    ADD CONSTRAINT fk_movies FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON DELETE CASCADE;


--
-- Name: movie_reviews fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_reviews
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: uesr_history fky_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uesr_history
    ADD CONSTRAINT fky_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

