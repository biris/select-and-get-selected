# select-and-get-selected
App that let's users select other users and see who picked them 

Toolings
=======

Based on the experience and the feedback I’ve had in the first part of the project, I’ve realized that I haven’t invested much work on the front end, at the end of the day it was a string of html representing a form that get sent from the server every time the user submits a request. All the logic was handled in the backend. In this second part, by using meteor and his support for mongoDB, I started looking at the fronted end land. Meteor officially supports three frameworks for front end development, Blaze rendering engine, Angular, React. I picked the latter for it’s use of functional programming ideas and it’s elegancy. While I was starting out, Meteor 1.3 came out and there was support for NPM modules, which gives the ability to integrate packages from the wider Javascript ecosystem. Hence, for routing I’ve used react-router which integrates well with React, and allows me to specify the routes in a declarative way (more like the functional style). To make my app more useful, I’ve made use of Github API for authentication and fetching users information. 
The only major complaint I’ve had with meteor is the gap in the feedback loop when developing, I have a somewhat old machine and it takes a long time to see the result of changes which hinders experimentation and exploration. In the very first beginning, I was running my code to a simple node server without meteor for ease of prototyping. 

The structure
============
I’ve devised the app into components that builds on top of other smaller components. Depending on the route, the the three high level components are `Main` (the root path component, always gets rendered), `Home` (the default component), `TopView` (the one the user interact with), `More` component to show user details. and those components in turn are devised into other smaller ones, like lego pieces.  There are two types of components, state-full ones, that changes it’s views  over time (due to external events), and stateless one, pure functions that takes data and return a view, doesn’t change over time, which makes them easy to reason about. By using React as my rendering engine, and it’s use of virtual DOM, which means unlike jQuery where we have to imperatively modify the DOM tree, we let react diff the DOM output between the different calls to our UI functions or components and make the minimum necessary changes to the DOM in a batch mode which results in more performance since Javascript nowadays are highly optimized nowadays, and updating the native browser DOM is costly.  For data binding, I’ve used the one way model where data flow from the top component down to it’s children, when to the data from top changes, it causes a re-rendering. And to allow the components down the hierarchy to change  data as a  response to the user interactivity, I’ve made use of callbacks and made sure those changes happen at a reasonable higher level of the component tree hierarchy of the app. The state of the  app is mainly found in the UserRow component, where it was manually managed to make REST calls to Github and update the component and it’s children when the data comes as JSON, or for example when the user filter the list, where the `TextFilter` through a call back passes the search string to it’s sibling component `(SelectChoices)` using parent component `(TopView)` as a medium. 


```
- TopView 
	- MainContainer
		-TextFilter 
			-TextField
		-SelectChoices
			-SelectableList
				-UserRow
					-ListItem
						-…..
		-SelectedResults
			-List
				-UserRowResult
					-ListItem
							- ….
- Main 
	-NavMenu
		-LoginMenu
			-LoggedInMenuItem  |  
			-LoggedOutMenuItem | one of them is rendered, depending on state
			-logginMenuItem    |
	- (Children, depending on route)

- Home 
	-div     <— our building block components 
	-p       
	-Link 

- More 
	-MainContainer
		-UserDetailsWrapper
			-UserDetails 
```
Meteor role 
============
Meteor serves as the glue, or the middle layer between our components (the view), and data stored in the mongoDB. I’ve made use of meteor remote methods, meteor’s replacement to REST calls using it’s DDP protocol, to store or remove data from the server db as the user interacts with the app. As for the database, there are two collections, the students collections and users, I kept them in sync as new users login through Github, using hooks meteor provides us with, especially the onCreateUser and onLogin functions in the Accounts package. Since meteor uses the publish and subscribe model to reactively keep track of the changes on the database and to inform my React components of those changes, to re-render, I have used two approaches, one by composing react component with meteor container which reactively passes the data fetched from the server to the stateless component as props. And the other using meteor mixins in react components, a less idiomatic approach than the previous one, used to keep track of the user if logged in. Both methods makes use of meteor tracker package to provide the functional reactive programming capabilities.  I’ve also made use of the low level API meteor offers for managing login using services like Github (OAuth), and since I’ve wrote the login button as a react component from scratch. 

Thoughts
========
With Meteor as currently it is makes the fronted tightly coupled with the backed as the data flows between the two parts and there is no obvious way on how to aggregate the data fetching part for the components, but the meteor team is working on integrating a common query language called GraphQL invented by Facebook to act as a unified language to decouple the client from the server as both have a common language, which makes  the technology use on both sides less of a matter in determining  the overall architecture of the app, making things more straightforward. 


Demo 
==== 
For the purpose of the demo I've created a github account to test the app but it works with any github account, and whenver someone logs in for the first time, he gets added automatically. Currently it's deployed on  my computer, and have setup dns name to point to it. The link to it: www.biris.xyz:8080 



