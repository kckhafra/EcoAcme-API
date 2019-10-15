Begin;

TRUNCATE
    ecoacme_users,
    ecoacme_messages,
    ecoacme_comments,
    ecoacme_posts,
    ecoacme_friends
    RESTART IDENTITY CASCADE;

    INSERT INTO ecoacme_users (first_name, last_name, email, profession, profession_years, user_name, password, about_me, college, degree, images)
    VALUES
    (
        'Kuntcheramen', 
        'Khafra', 
        'kckhafra@hotmail.com',
        'Teacher', 
        8, 
        'kckhafra',
        '$2a$12$STAgfpqzWHKe4npTXyvnceCmbuL6WOq0TR4RENC.icDIep4hWvAYm', 
        'I am an Ap English Teacher. I have been working with the youth for 8 years. I educate the youth on financial literacy, health, mental wellness and emotional stability',
        'Temple University', 
        'Bachelors in Psychology',
        'https://raw.githubusercontent.com/kckhafra/KC-Portfolio/master/Pictures/IMG-KC-headshot.JPG'
    ),
    (
        'LaDonia',
         'Wicks', 
        'lawicks@gmail.com',
        'Owner of non-profit', 
        10,
        'lawicks', 
        '$2a$04$nintx4KTPBOMvBi3hVlu1eXEFBubqJzKVTcygjqgxzQEyq2xCq21W', 
        'I sale products that strengthen body and mind.', 
        'North Carolina A&T', 
        'Computer Science',
        'data:image/jpeg;base64,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'
    ),
    (
        'Jon',
        'Love', 
        'jlove@gmail.com', 
        'counselor', 
        5, 
        'jlove',
        '$2a$04$2eMYJ8hrj/z1D1p5awX/De3Nfx2lTZKqA.f/hl3Y9FXci2SVr1CVO',
        'I counsel juvenile delinquents.', 
        'Howard University', 
        'Psychology',
        'data:image/jpeg;base64,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'
    ),
     (
        'Bon',
        'Bove', 
        'Blove@gmail.com', 
        'Doctor', 
        5, 
        'Blove',
        '$2a$04$2eMYJ8hrj/z1D1p5awX/De3Nfx2lTZKqA.f/hl3Y9FXci2SVr1CVO',
        'I treat heart disease.', 
        'Howard University', 
        'Medical degree',
        'data:image/jpeg;base64,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'
    ),
    (
        'Eric', 
        'Powell', 
        'epowella@hotmail.com',
        'Counselor', 
        8, 
        'epowell',
        '$2a$12$STAgfpqzWHKe4npTXyvnceCmbuL6WOq0TR4RENC.icDIep4hWvAYm', 
        'I am an Ap English Teacher. I have been working with the youth for 8 years. I educate the youth on financial literacy, health, mental wellness and emotional stability',
        'Temple University', 
        'Bachelors in Psychology',
        'https://image.shutterstock.com/image-photo/isolated-shot-young-handsome-male-260nw-762790210.jpg'
    );

    INSERT INTO ecoacme_posts(user_id, post, post_images)
    VALUES
    (1,'Health festival is on its way. Lets get it', 'http://4.bp.blogspot.com/-_p7dg6EquBg/VMqUrn-pEiI/AAAAAAAAlUc/xOGYMsRqbJo/s1600/health%2Bfest%2Bposter.jpg'),
    (1, 'Workout this Wednesday.',null),
    (2, 'Healthy cookout. Teaching people how to cookout vegan style',null),
    (2, 'I love my life',null),
    (1, 'today is a great day',null);
    

    INSERT INTO ecoacme_comments(user_id, post_id, comments)
    VALUES
    (1,1,'Cant wait for the festival'),
    (2,1,'I know. I will be there'),
    (1,1,'see you there'),
    (2,2,'I want to workout with you. send details'),
    (1,2,'I got you');

    -- INSERT INTO ecoacme_messages(sender_id, receiver_id, messages, date_created)
    -- VALUES
    -- (1,2,'What are you doing today','2019-10-04 05:58:19'),
    -- (2,1,'about to work out','2019-10-04 06:58:19'),
    -- (1,2,'cool. I am trying to come','2019-10-04 07:58:19'),
    -- (2,1,'alright','2019-10-04 08:58:19'),
    -- (1,2,'see you soon','2019-10-04 09:58:19'),
    -- (3,1,'hey','2019-10-04 10:58:19'),
    -- (3,2,'Whats up?','2019-10-04 11:58:19');

    INSERT INTO ecoacme_friends(friend_request_id, friend_receiver_id)
    VALUES
    (1,2),
    (3,1),
    (2,3);
    
    COMMIT;