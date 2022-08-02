# The UI Lab

## Team Members
Sneha Mehra

Jiasheng Ye

Weihang Chen

## Video Presentation Link
https://youtu.be/8z0poZjyZX0

## Description
**The UI Lab** is a **Prototype Creator Application** that allows users to collaborate with each other to create UI for their own applications. Users can create multiple UI for their own applications and connect them to one another in the flow that they want. Our application offers its users **asynchronous and synchronous collaboration** with the option of **voice calling**. Users can **add UI elements** to their prototypes and **add their desired behaviours to elements** such as buttons, icons and can also navigate between different UI frames. Once the prototype has been created, it can be exported as an image or pdf document, with each frame as a different image or a page in the document.

## 3+ concepts used for the challenge factor, and how each concept will be applied
The concepts we are planning to use for challenge factors include:

- OAuth 2.0 Client

For our project, we are going to incorporate Google as an OAuth2.0 client allowing users of our application to create an account/sign in with their google accounts.

- Real Time Interaction

Since our application is a prototype maker application, we are going to integrate real time interaction in our application where users can collaborate together while making their prototypes. We are also creating a service that allows the users to create a call with the users that are on their current collab page.

- Workers

Once a user creates an account, an automatic email is sent to them confirming their registration with The UI Lab. 

A user might be collaborating with other users on a project and can add other users. When a user adds another user to a project an email will be sent to the user using a worker. 

- Scalability and Security

To provide scalability and security to our application, once the application has been created, it will be deployed in a docker container to allow for easy set up of the application.


## Key features that would be completed by the beta version
- Sign in/sign up: Users can create an account using email and password or sign in with other OAuth 2.0 providers.
- Create a new project: users can create new UI prototypes projects using the instructional buttons on the website.
- Add users to document: users working on a certain project can add users to their project and give them the access to view only or to edit the prototype. 
- Design UI: Users can add UI elements and frames onto the page. 
- Edit mode: users are automatically on edit mode when they create new projects and they can enter presentation mode to see how their UI interacts. 
- Presentation mode: Users can click on a presentation to enter presentation mode where the certain UI element on their prototype and navigate to another UI frame.
- Real time collaboration: users working on the same project can see each other’s edits in real time.
- Email service 1: when a user registers, an automatic email will be sent to the user. 
- Email Service 2: Emails are also automatically sent to the users who are added to a project by another user.
- Docker: the application will be contained inside a docker container.
- Websocket: Used as a fast communication protocol.

## Additional features that would be completed by the final version
- Animations: Users can see animation of loading 
- Notes: users can add notes on chosen frames and UI elements for everyone working on the project to see.
- Exporting: users can export their UI prototype as PDFs or images.

## Tech stack
- Frontend: React
- Backend: Expressjs
- Database: MongoDB Atlas

## Method of deployment
We will build a docker image of the application. Then we will deploy the docker image on AWS virtual machine.
