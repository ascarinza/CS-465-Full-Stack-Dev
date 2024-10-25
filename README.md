# CS-465-Full-Stack-Dev

**Architecture**

•	Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

The client-side front-end interface utilized Express HTML and JavaScript to create an intuitive and responsive user experience. The Express application used Handlebars, a dynamic HTML tool to pull live data from a connected database as opposed to static HTML files. Using Express and an MVC-type structure led to modular and efficient development. Express loaded a new view and respective controller to add functionality to each visited route. Using JavaScript allowed functionality such as buttons and login processes to be added. The Angular SPA for the admin page was created with simplicity and efficiency in mind. While the SPA may take longer to load initially, all components and changes to the page are made without reloading, making it very fast for many changes.

•	Why did the backend use a NoSQL MongoDB database?

MongoDB was chosen due to its flexibility and easily scalable nature. The ability to quickly change schemas and store unstructured data is important in quick development processes. The similarity in the stored format of the data in documents makes pulling data into a web application via JSON easier, which was another important factor in choosing a NoSQL database such as MongoDB over other SQL databases.

**Functionality**

•	How is JSON different from JavaScript and how does JSON tie together the frontend and backend development pieces?

JavaScript is a language for back and front-end applications whereas JSON is a data format used to transfer data between a front and back end. JSON uses a simple key-value pair format to store information. A server will collect JSON-formatted data from a database and send it to the front end to be dissected and displayed.  
•	Provide instances in the full stack process when you refactored code to improve functionality and efficiencies and name the benefits that come from reusable user interface (UI) components.

The biggest refactor change was going from using static HTML pages for each route to using dynamic HTML to pull data and create live pages with the existing data. The first iteration of the application is called a file with all the data written and formatted into an HTML file. After using Handlebars and adding a trip data file with all the data in JSON format, I could then write a single HTML block and dynamically iterate over the information in the data file to load the trips. This one change eliminated the most redundant HTML code and static files.  

**Testing**

•	Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full-stack application.

The testing of endpoints was made simpler by using Postman to send POST, PUT, GET, and DELETE methods. Through carefully placed error catches, I was able to see the types of errors, and where they occurred when something went wrong. At first, with no security, it was quite simple to change and update the existing information. After the JWT token layer was added, Postman made sure the token was added before changes could be made. Manually testing similar functions on the live website confirmed what Postman was showing. The error codes in Postman were much easier to break down and read when compared to the long error codes given in the browser. 

**Reflection**

•	How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

I have learned how to incorporate MongoDB into web applications and how to test API interaction with the database through third-party testing tools. I have learned to use Node.js, Express.js, and Angular to create the front and back end of an application. This application taught me the importance of mapping out routes and how to format HTML pages based on client wireframes. The ability to create and understand how full-stack web applications function is important in today’s software engineering field and can be a simple way to test one's understanding of security, architecture, and design. 


