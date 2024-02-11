## Inspiration

The transition from a high school student passionate about politics to a college freshman preoccupied with academics highlighted a significant issue for me: the lack of accessible, engaging political education for young people. Traditional methods, such as lengthy articles, often failed to effectively convey the nuances of candidates' policies, leading to a disconnection from political engagement.

## What it does

HOCUS POTUS is an interactive platform that gamifies the learning process about political policies and candidates, aiming to make young voters more informed and engaged through quizzes, hints, and feedback mechanisms. Users can explore policies, match them to candidates, and submit feedback. 

## How we built it

The platform is built on web technologies—HTML, CSS for styling, JavaScript for interactivity, and Flask for the backend. The policies were web-scraped from the news organization using Selenium and the dataset was optimized to find the exact policies using Large Language Model. We fed the data to the model to prompt generate the specific policies for the policy area. Using OpenAI API we prompt engineered the chatbot so that user can ask questions related to policies, candidates and election. When the user complete the game, they are prompted a feedback form which will be sent to the candidates campaign team. We used MongoDB to store the form responses and connected the backend with the frondend with Express.JS. **All the UI/UX designs were digitally hand drawn with Procreate.** 

Frontend: HTML, CSS, JavaScript, Bootstrap
Backend: Flask (Python), Express.js
AI Model: OpenAI, Bing Search API
Database: MongoDB Atlas
Version Control: Git, GitHub

## Challenges we ran into

We encountered challenges in presenting complex political content in an unbiased, engaging way and in the technical implementation of interactive elements and feedback collection. The biggest challenge was to webscrape the data from news organization and have the prompt present in the specified policy. We fixed the problem using data processing method. Another challenge was to connect the Express server with the root html file. After hundreds of documentations reading, we finally solved it.

## Accomplishments that we're proud of

Successfully creating an engaging educational tool that teaches the political process for teenagers and increases their willingness to participate in voting is our key achievement. We are really happy to see whatever we planned initially came out perfectly.

## What we learned

This project deepened our understanding of web development, user experience design, and the importance of accessible political education. It highlighted the need for engaging, informative content to foster informed decision-making.

## What's next for HOCUS POTUS

The next steps include expanding the platform's policy areas, incorporating more candidates which includes local election, and enhancing the feedback mechanism to provide more detailed insights into user understanding and engagement. 
