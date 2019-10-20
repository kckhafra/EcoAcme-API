# EcoAcme
- Returns json data about all post, comments, users and friends
- Returns json data and post data for a specific comment, user, post and friend. 
- Returns data that has been edited


## URL
- /api/login
- /api/post
- /api/friends
- /api/messages
- /api/users
- - /api/comments

## Method:
- GET
- POST
- DELETE
- PATCH

## Data Params
#### Login Credentials Payload
- {username: "kckhafra", password: "studyhard"}
#### Post Payload
- { date_created: "2019-10-16T23:25:26.178Z",
first_name: "Kuntcheramen",
id: 1,
images: "https://raw.githubusercontent.com/kckhafra/KC-Portfolio/master/Pictures/IMG-KC-headshot.JPG",
last_name: "Khafra",
post: "Health festival is on its way. Lets get it",
post_images: "http://4.bp.blogspot.com/-_p7dg6EquBg/VMqUrn-pEiI/AAAAAAAAlUc/xOGYMsRqbJo/s1600/health%2Bfest%2Bposter.jpg",
profession: "Teacher",
user_id: 1}

## Success Response: 
- Code: 200
- Content: {  date_created: "2019-10-16T23:25:26.178Z",
first_name: "Kuntcheramen",
id: 1,
images: "https://raw.githubusercontent.com/kckhafra/KC-Portfolio/master/Pictures/IMG-KC-headshot.JPG",
last_name: "Khafra",
post: "Health festival is on its way. Lets get it",
post_images: "http://4.bp.blogspot.com/-_p7dg6EquBg/VMqUrn-pEiI/AAAAAAAAlUc/xOGYMsRqbJo/s1600/health%2Bfest%2Bposter.jpg",
profession: "Teacher",
user_id: 1}

## Error Response
- Code: 404 NOT FOUND
Content {error: "Wrong user name or password"}
OR
- Code: 401 UNAUTHORIZED
Content: {error: "unauthorized to make request"}


