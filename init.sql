CREATE TYPE states AS ENUM ('male', 'female');

CREATE TYPE roles AS ENUM ('admin', 'user');

CREATE TABLE
    profiles (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        state states NOT NULL
    );

CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        role roles NOT NULL,
        dateCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        profileId INT,
        FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE
        SET NULL ON UPDATE CASCADE
    );

INSERT INTO
    profiles (id, firstName, lastName, state)
VALUES (1, 'Boris', 'Britva', 'male'), (2, 'Alina', 'May', 'female'), (3, 'Ivan', 'Hupalo', 'male'), (
        4,
        'Halyna',
        'Stankevichus',
        'female'
    ), (
        5,
        'Maksym',
        'Zaliznyak',
        'male'
    );

INSERT INTO
    users (
        id,
        username,
        email,
        role,
        profileId
    )
VALUES (
        1,
        'Boris',
        'boris@mail.com',
        'admin',
        1
    ), (
        2,
        'Alina',
        'alina@mail.com',
        'user',
        2
    ), (
        3,
        'Ivan',
        'ivan@mail.com',
        'user',
        3
    ), (
        4,
        'Halyna',
        'halyna@mail.com',
        'admin',
        4
    ), (
        5,
        'Maksym',
        'maksym@mail.com',
        'user',
        5
    );