## Problem

I am trying to generate a random pokemon that is triggered by a click event. I want to call a function that gets a random key to pass to the router. The chains of events be will a click event --> generate a random key --> send request, The pokemon id is retrieved from the params, so until now I have already known which id to send as a parameter then I fetch the data to render the component. With this feature I need to define the id before to the routing. Maybe a change to a data router would be benficial here

The process with which I fetch data for this application has changed at least three times now I was first using axios on the home component to fetch the pokemon. On first render, I set a get resuest to retrieve the list of pokemon then I sent another request to that pokemon's endpoint to grab details so I could display their type's color in their card. So I was sending two different synchronous requests since the pokemon type was dependent on the first request grabbing the pokemon name. To do this, I think I set up two different useEffects, one more the inital data that got the pokemon name and url and one for the pokemon type. I tried to simplify this in one custom hook, but still ended up needing to use axios.get if I wanted to grab something different than pokemon, say moves. So in the pokemon details page I was sending two request through axios as well. One for the details and one for the moves.

To have a more customized hook, I implemented the swr library for fetching. I could've kept the custom hook and I'm glad I wrote it since it laid out what the hook should be doing during the 'loading' and 'error' states, but swr did all that logic for me. All I needed to do was define a fetcher that could be used anywhere in the application using the SWRConfig provider. Using the `...args` parameter I could define a fetch function that I can modify throughout the application. The fetcher function was declared on the top level and passed down as a value that could be retrieved--similar to the Context API-- by using the useSwr hook. To maintain the same functionality I implemented another custom hook using useSwr. This `useFetcher` custom hook was much cleaner and more declaritive.