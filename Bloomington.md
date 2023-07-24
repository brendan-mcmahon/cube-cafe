# Bloomington

## Decisions Made:
- ⭐ Drive Thru:
    - ~~Drive thru is turned on with dishwasher~~
    - Two drive thru slots
    - Serving the car in the first slot gives you a >x points (3?)
    - Serving a car in the second slot gives you a <x points (2?)
    - The car ticks down per turn, after the second turn it goes away forever

Just kidding, this decision was not made
- Manager Track:
  - Instead of a wild, you move the manager up a track to earn upgrades
  - Upgrades:
    - Drive Thru - allow cars to start coming in
    - Freezer - hold a resource between turns
    - Nicer Table / Free Bread - Customers start +1 at a table / All tables
    - Chef - Food counts as +2 instead of +1
    - ~~Recommendations - Pull two plates and choose one of them~~ <- moved to a VIP character
    - Heat Lamp - Food doesn't decrease in value
    - ~~Sous Chef - no longer wait for food to cook~~ <- too powerful especially when combined with the other upgrades
    - ~~Buffet - Customers don't have to wait for food to be served~~ <- too powerful and not well defined
    - 


## Things to test:
- Customers eat immediately (or at the end of the round before "tick down"), giving you a plate to stick in the dishwasher. The dishwasher squares give you an extra resource to use BEFORE the tick down. This means you can use the dishwasher to get a resource to use on the same turn.
- Spend 1 cube to rotate once or twice
- Using the mirror color (in a 6-color game)
- ⭐ VIPs
- Cooler manager track

## Things to figure out
- Figure out what to put in the dishwasher to balance it
  - Start customers at a 4 instead of a 3
  - Hire a Chef
    - The chef would give +1 to either certain color foods or all foods
    - Or maybe people just come in at a 4 instead of a 3 and that's how we justify that one
  - Add a drive-thru
  - Add a manager
  - Choose from 2 plates
- VIPS??
  - Suffle deck of 8 cards
  - Flip over the card
  - The first person you seat that round will be whichever VIP
  - We'll need some kind of way to mark the VIP characters. We could have colored VIP tokens that you grab at random when a VIP comes out and you place it on the VIP card. Then you use the corresponding color of mini for that VIP on your board.
  - VIP Characters:
    - The Karen:
      - If she hits a two, she throws a tantrum and everyone loses a mood point
    - The Usual: Skip the Take Order step
    - The Crying Baby: Lowers everyone's mood by 1
      - Maybe shouldn't have this and the Karen at the same time
    - Celebrator: Buys everyone a drink (+1)
      - If you get him to a 5, then he buys a round of drinks?
    - Indecisive: Takes 2 turns to order
    - Dufresne: 
      - If spend any resources before seating them (other than turning), they leave.
    - The Cartwrights:
      - You have to seat them second in the round, but you can seat them at a 5?
    - Food Blogger:
      - Get double the star points when they finish eating (this feels too powerful? Or maybe it's fine because everyone gets that one)
    - Vegetarian / Diet / Someone who likes salads
      - Don't need to wait to cook their food
    - Gordon Ramsey (PROMO):
      - If he gives you a low star rating, he also gives you a free upgrade or something like that
    - Time Traveller (PROMO):
      - Do everything backwards? Or just out of order? Feels hard to do mechanically
    - The Rock (PROMO):
      - What's he cooking?
    - Marriage Proposal (PROMO but maybe not?):
      - Everyone goes up one? When you serve (the ring in a glass)
      - You have to give them their drinks (refill) first?
      - Flip a coin to see if she says yes or no: yes, everyone goes up 1, no everyone goes down
    - Oscar the Grouch (PROMO)
      - You have to let the food sit for a while before you give it to him. It has to go from +1, then +0, then instead of going out of the game, it just goes to his table (no need to serve)
    - 

### Random thoughts:
- Have a token to put on top of the dice to remind you to tick down at the end of the round
- Distinction between random and wild: Random is a single color chosen in the moment, wild is a specific resource that can be used in the place of any color.

### Playtesting 3:45
1 2 3 4
* Brendan
  * Refills: 2
  * Manager mvmt spaces: | 0 | 4 3 |
  * Rotations: ? | ? | ? | 1 | 
  * Upgrades
    * Drive thru:
* Caleb
  * Refills: 0
  * Manager mvmt spaces: 4 4 3 | 3 4 4 4 | 4 3 2 4 4 |
                         11    | 15      | 17        | 18 | 16 | 
  * Rotations: 1 | 1 | 1 |
  * Upgrades
    * Drive thru: Round 1
    * others Round 2
    * Sous Chef: Round 3
* Takeaways:
  * Sous Chef is too powerful - remove from the game
  * Freezer - Might be not super useful, should we remove? Could be good to get more data
  * Drive-thru - Probably works fine
  * How should we use the dishwasher?
    * Option 1:
      * Customer eats and immediately scores. The dish goes straight to the dishwasher and you get the bonus to use immediately
        * Problem: There are too many things to do in the moment (score the customer, place the plate). You're just sticking the food on the plate and immediately picking it up which is weird.
    * Option 2:
      * Customer eats at the end of the round. The plate stays on the table until the players clears it with some free action to get the reward in the dishwasher the next round
        * Problem: The free action is novel to the game and would create some weird rules. It just feels a little icky.
    * Option 3:
      * Customer east at the end of the round. The plate goes straight into the dishwasher and the player gets to use the bonus in that moment between rounds.
        * Problem: Weird phase that some people do and some people don't.


### Playtesting 8:45
* Questions:
  * Is it too much to be able to get a wild from the drive-thru, and then cook it no matter what position the wheel is in and then serve it to anyone? It's a lot of skipping maybe?
* Playtesting Rules:
  * mgmt, wild every five times
  * no upgrades
  * no VIPs
  * dishwasher Option 2 rules
    * one of each color
    * 2 copy cubes
    * 2 mgmt moves x2
  * drive-thru opens round 4
  * 3 tables
  * Mgmt track wild is actually choose-a-cube
  * Customers leave if they get lower than a 1 and give you -2
  * You can cook a wild and then serve it to anyone
* Brendan
  * Rotations:  | 1   | 2 | 2 | 2 | 2 | 2   | 2 | 2
  * Cars Served | 0   | 0 | 0 | 1 | 1 | 1   | 1 | 1
  * Mgmt moves  | 4 2 | 4 | 0 | 0 | 0 | 2 1 | 0 | 0
* Caleb
  * Rotations | 2 | 1 | 3 |
  * Cars Served 
  * Mgmt moves
* Takeaways:
  * Could the dishwasher also have actions instead of the mgmt or copy or whatever or in addition to?
  * Should we increase the size of the dishwasher since we aren't doing the tic-tac-toe thing anymore anyway?
  * We haven't totally solved the last round being weird
    * We should try adding +X points to the manager track and playtest to see how easily that's abused
  * We should play test individually and time ourselves to see how long it takes to play a game without talking
  * Try the drive-thru with just points instead of wilds
  * Should we just use money instead of stars?
    * Pros:
      * Could have the VP tokens match the actually
      * Might make more sense for the drive-thru to give you some money instead of a star
      * Potential to have upgrades that take the customers over 5
      * Possible upgrades to generate money that make sense in a way that generating stars
      * Not having to reconcile two different types of points (stars and points) into one final score
    * Cons:
      * Losing the "gimmick" of not caring about money and only caring about ratings
      * The dollar amounts are weird for what they're getting. Has to be tips, you don't get to pay less for your food if you didn't like it as much. Tips make sense more inside, but less so in the drive-thru?

# Playtest 9:30
* Playtesting
  * Manager gives a point or a wild
  * Drive-thru gives 2 / 1
* Brendan
  * Rotations   | 2 | 1 | 1 | 2     | 2    | 0   | 2   | 1
  * Cars Served | 0 | 0 | 0 | 0     | 0    | 0   | 0   | 1
  * Mgmt Moves  | 0 | 0 | 0 | 0     | 3 2  | 3 3 | 3 1 | 4
* Caleb
  * Rotations   | 2 | 2 | 0 | 0     | 0    | 1   | 2   | 1
  * Cars Served | 0 | 0 | 0 | 0     | 0    | 1   | 0   | 0
  * Mgmt Moves  | 0 | 0 | 0 | 4 3 3 | 3    | 0   | 3 3 | 4
* Takeaways:
  * Should the food fall away eventually if you don't serve it? We should playtest using the strategy of cooking as much as possible early on and having a big stock of +0 food
  * ⭐ Should we only allow one refill/customer/round? It feels like maybe the person who refills the most is going to win
    * We're not going to break the game by removing this kind of strategy, so we should just remove the strategy.
  * Need a round tracking mechanism
  * I'm feeling more like we should be able to save a game's rolls and draws to be able to replay it in the app
  * Finalize penalty for people leaving the restaurant
  * Should use the backs of the stars? <- not if the stars are going away
    * Could have rewards like resources or something
  * Playtest turning twice for one resource
  * Car die to roll the color of the car
    * Should it be a d6 with a blank? Or a wild?
  * The extra spot on the dice could be a number instead of a wild and the player gets the corresponding color on their disk
  * ⭐ The drive thru needs something
    * Adjust the points up
    * Penalize not serving drive-thru
      * Maybe the most drive-thru cars served gets a bonus
      * Maybe the most drive-thru cars not served gets a penalty
      * If we use wrench, needs to be higher. Can't be too high though!
        * Giving up 3 "any cubes" to get the drive thru, so it needs to be worth it?
        * We could move the VP/Cube/Wrench 
  * Brendan got 6 5s, 2 2s, 1 1.
    * 1 2 from a car, 1 1 from manager
  * Caleb got 3 5s, 4 4s, 2 2s, plus he forgot to grab a token but we don't know what it is
  * Should you have to serve the first car before the one behind it? Thematically 
    * Pros:
      * Theme
    * Con:
      * Disincentivizing something we're already not doing a lot of there are only 4 chances to do it
      * It wouldn't be worth rotating twice to get the stronger one

* In the rules, you could have the Drive-Thru and the VIPs be separate modules
* The manager  track gives you a VP or a wild, it could also give you a wrench you use to open the drive-thru
  * It's hard for me not to want to add more upgrade options with that