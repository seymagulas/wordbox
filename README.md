# wordbox
## App Details

**Project name:**
WordBox

**App Description:**
Word memorization app for English language learners

**Project description:**
WordBox will be a word memorization app that will transform the way you learn and retain vocabulary. With WordBox, you will be able to effortlessly save and organize your favorite words, building a personalized word bank for future reference. WordBox will create custom quizzes based on your saved words to challenge and reinforce your memory.

**MVP:**
To get started, users can easily register and create an account. Once registered, they gain access to a powerful word memorization tool. With the ability to save words along with their definitions, users can effortlessly build their own personal word library. Additionally, they can track their progress by their trophies. They will automatically win a trophy every time they answer a word correctly in the quiz. They can also remove the words.

When it's time to test their knowledge, users can take advantage of the interactive quizzes generated from their saved words. The app intelligently tracks their progress, ensuring that once a word is correctly identified at least five times, it is intelligently filtered out from future quizzes. This adaptive feature helps users focus on the words that require further practice, maximizing the efficiency of their learning journey.

## Tech stack

**Authentication:**
- JWT

**Front End:**
- React
- TypeScript
- Bootstrap
- Axios
- Yup
- Font Awesome

**Back End:**
- Express.js
- Sequelize
- Postgres
- TypeScript

**Data sources:**
- API for getting the meanings of the words: https://dictionaryapi.dev

## Generating the DB schema

You can run the following queries to create the DB in Postgres:

**DB:**
```sql
-- Database: word_box
-- DROP DATABASE IF EXISTS word_box;
CREATE DATABASE word_box
    WITH
    OWNER = root
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```

**Users table:**
```sql
-- Table: public.Users
-- DROP TABLE IF EXISTS public."Users";
CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."Users"
    OWNER to root;
```

**Words table:**
```sql
-- Table: public.Words
-- DROP TABLE IF EXISTS public."Words";
CREATE TABLE IF NOT EXISTS public."Words"
(
    id integer NOT NULL DEFAULT nextval('"Words_id_seq"'::regclass),
    user_id integer NOT NULL,
    word character varying(255) COLLATE pg_catalog."default" NOT NULL,
    meaning text COLLATE pg_catalog."default" NOT NULL,
    correct_count integer NOT NULL DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Words_pkey" PRIMARY KEY (id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."Words"
    OWNER to root;
```

**Quizzes table:**
```sql
-- Table: public.Quizzes

-- DROP TABLE IF EXISTS public."Quizzes";

CREATE TABLE IF NOT EXISTS public."Quizzes"
(
    id integer NOT NULL DEFAULT nextval('"Quizzes_id_seq"'::regclass),
    user_id integer NOT NULL,
    correct_count integer NOT NULL DEFAULT 0,
    wrong_count integer NOT NULL DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Quizzes_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Quizzes"
    OWNER to root;
```

**Questions table:**
```sql
-- Table: public.Questions

-- DROP TABLE IF EXISTS public."Questions";

CREATE TABLE IF NOT EXISTS public."Questions"
(
    id integer NOT NULL DEFAULT nextval('"Questions_id_seq"'::regclass),
    quiz_id integer NOT NULL,
    user_id integer NOT NULL,
    answer character varying(255) COLLATE pg_catalog."default" NOT NULL,
    question text COLLATE pg_catalog."default" NOT NULL,
    is_correct boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Questions_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Questions"
    OWNER to root;
```