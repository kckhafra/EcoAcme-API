CREATE TABLE ecoacme_users(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    profession TEXT NOT NULL,
    profession_years INTEGER NOT NULL,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    images TEXT,
    about_me TEXT,
    college TEXT,
    degree TEXT
);

CREATE TABLE ecoacme_friends(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    friend_request_id INTEGER REFERENCES ecoacme_users(id),
    friend_receiver_id INTEGER REFERENCES ecoacme_users(id),
    UNIQUE (friend_request_id, friend_receiver_id),
    UNIQUE (friend_receiver_id,friend_request_id )
)

