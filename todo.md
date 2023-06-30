# TODO Items

In Progress: End Game Screen

## Game Functionality
* add drive-thru to the game
  * Add section to the ui
  * Add car to the dishwasher
  * Add "feed car" option to the player actions
  * Add drive-thru rewards settings (plus all the related workflows)
* setting to allow the wrong food / undercooked food to be served
  * Just add the grill items to the available food when serving (also -1 to the customer?) and make them clickable
* Add a way to change the dice in the settings
* Add recipe cards for the dishwasher (for points I guess?)
* Feature toggles?
* Add freezer
* Start the wheel at a random spot instead of always red on top
  
## UI Improvements
* hover over components to see why they're disabled?
* Maybe a button to confirm your dishwasher selections? It can just be a little jarring.
* Can we make the manager track look better? Like loop it through the tables? Probably not.
* Pick new colors (ChatGPT recommends Blue, Red, Green, Yellow, Black but maybe swap out Red or Green for colorblind people?)
* Fix the hit boxes on the action disk

## Data Collection Features
* What should the end game look like?
  * total points
  * total customers served
  * leftover customers
  * time / round
  * total time
  * total rotate actions taken
* Share button so you can send saved games to other people
  * Don't make this too complicated, Brendan. You just need to send the json, you don't need to create a lambda function that saves the state to a table and generates a link to another endpoint that pulls in those, but damn, it would be cool if we could save them all in one place and access them anywhere. Ugh.


## Bugs
* When there are only two tables, the player shouldn't be able to add a third customer
* The +1 dishwasher stuff puts people over 5
* Bugginess around the history and resources getting exhausted
* Load dishwasher shouldn't appear in the history

## Tech Debt
* We should use typescript. It would save a lot of headaches I think
* Add the other actions to the constants file