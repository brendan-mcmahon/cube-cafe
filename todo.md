# TODO Items

In Progress:

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
* Have a Statistics modal that shows the stats for the game (use Endgame or refactor)
  * Maybe not a modal, but something hidable that shows up on the side

## Data Collection Features
* Statistic Ideas:
    * Cooking without an order
    * Dishwasher slots selected
* Share button so you can send saved games to other people
  * Don't make this too complicated, Brendan. You just need to send the json, you don't need to create a lambda function that saves the state to a table and generates a link to another endpoint that pulls in those, but damn, it would be cool if we could save them all in one place and access them anywhere. Ugh.
* We're not using the file we're "auto-saving" on its own. We only allow you to load manually saved files. This would allow a "continue last game?" button.

## Bugs

## Tech Debt