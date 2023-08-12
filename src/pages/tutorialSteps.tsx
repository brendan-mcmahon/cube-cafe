import { Step as JoyrideStep } from 'react-joyride';


export const tutorialSteps: JoyrideStep[] = [
    {
        content: "Okay, let's get started!",
        placement: 'center',
        target: 'body',
    },
    {
        content: "Select this purple resource",
        target: '#Resources button:first-of-type',
        spotlightClicks: true
    },
    {
        target: '#ActionDisk .disk',
        disableBeacon: true,
        spotlightClicks: true,
        content: "Now look at the action disk again. You can see what actions are available with your purple resource! Go ahead and click on the Seat action",
    },
    {
        target: '#Tables button:first-of-type',
        disableBeacon: true,
        content: "Now you can see the meeple you just sat! Right now, his satisfaction level is at a 3, and his drink is empty. We also don't know what he wants to eat yet!"
    },
    {
        content: "Select this red resource",
        target: '#Resources button:nth-of-type(2)',
        spotlightClicks: true
    },
    {
        target: '#ActionDisk .disk',
        disableBeacon: true,
        spotlightClicks: true,
        content: "Great! Now you can see that the Take Order action is highlighted. You can select that now",
    },
    {
        target: '#Tables',
        disableBeacon: true,
        content: "All of the tables who are eligible to have their orders taken will now be highlighted."
    },
    {
        content: "In our case, it's just this one, so you can click on that to confirm that's whose order you want to take!",
        target: '#Tables button:first-of-type',
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        target: '#Tables button:first-of-type',
        disableBeacon: true,
        content: "Check it out! Now your meeple has a plate whose color corresponds to the meeple's order. To serve this customer, you'll need to cook a yellow food"
    },
    {
        content: "Back to our resources, find and select the one that corresponds to the cook action on the action wheel.",
        target: '#Tableau',
        disableBeacon: true,
        spotlightClicks: true
    },

    {
        content: "Great! Hopefully you picked yellow. Now select the cook action!",
        target: '#Tableau',
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        target: '#Kitchen .grill .burner:first-of-type',
        disableBeacon: true,
        content: "That moves the resource you selected to the grill! This is important: When you take the Cook action, the resource you used will be the one that makes its way to the grill. Don't use a blue resource to cook for someone who ordered yellow!"
    },
    {
        content: "Alright, that food will take 1 round to cook, so you've got some free time. You've got some empty tables you could try to fill with the seat action, or you could give your existing customer a refill. For demonstration, let's take a look at the drive thru",
        placement: 'center',
        target: 'body',
    },
    {
        target: '#DriveThru',
        disableBeacon: true,
        content: "We have a red car waiting in position 1 of our drive thru. That means if we can serve him a red food, we'll get 3 points!"
    },
    {
        content: "We've got a problem though, our red resource is currently aligned with the Take Order action!",
        target: '.disk .slice:first-of-type',
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "To remedy this, we can pick another resource (the color doesn't matter! For this demonstration, choose the yellow one.)",
        target: '#Tableau',
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now we can select one of these rotation arrows! Clicking the one on the right will rotate the inner color disk counter-clockwise. Try it out!",
        target: '#ActionDisk .arrow:nth-of-type(2)',
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now check it out! Our red resource is in line with the Seat and Serve Car actions! Select your remaining red resource and click that car and see what happens!",
        target: '#Tableau',
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "All of the cars that can accept a red food are now highlighted! (Which for us is just the one). Go ahead and select it.",
        target: "#DriveThru .car",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now this car has its red food and...",
        target: "#DriveThru .car",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "We have our first 3 points!",
        target: "#Console .info .star",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Let's have a look at our resources. We only have one left and it's purple. Lucky for us, that rotation just happened to slot the purple color in line with the refill action! Let's do that! Select your resource and the Refill Action.",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Our eligible tables are once again highlighted. Select the one with the meeple and no drink!",
        target: "#Tables .customer:first-of-type",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "And just like that, our meeple's satisfaction level goes up by one!",
        target: "#Tables .customer:first-of-type",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now all of our resources have been exhausted. What should we do?!",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Time for the next round! Click this button to continue",
        target: "#Console .instructions",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Let's take a second to see what's happened here.",
        disableBeacon: true,
        placement: 'center',
        target: 'body'
    },
    {
        content: "Even though our customer was at a 4 last turn, waiting around this long has dropped his satisfaction back down to a 3. Plus, he drank all of his drink!",
        target: "#Tables",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "But good news! His food is done cooking and it's on the counter ready to be picked up by a server. While it's still hot (this round), we should try to get that to the customer because it will provide a +1 satsifaction.",
        target: ".hot-counter",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Let's get back into it. First, let's go ahead and serve our customer who is patiently waiting. Select the blue resource and then the serve action",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Back down here, you guessed it, select the table you want to serve.",
        target: "#Tables .customer:first-of-type",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now you can choose which food to serve that customer. In this case, we only have one option, but that might not always be true.",
        target: ".counter",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "With that customer mostly satisfied (at a 4), let's get another customer in here. Use a red resource to seat another customer",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now let's take that customer's order with a yellow resource",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Select this customer, great work!",
        target: "#Tables",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Okay, this customer wants a blue. Let's go look at our resources to see what we can do about that.",
        target: "#Tables .customer:nth-of-type(2)",
        disableBeacon: true,
    },
    {
        content: "Oh no! We don't have a blue! What can we do about that?",
        target: "#Tableau #Resources",
        disableBeacon: true,
    },
    {
        content: "No worries, we have another trick up our sleeves. Did you wonder what those numbers on each action were all about? Those correspond to the number of spaces your manager can move around the dining room.",
        target: "#Tableau",
        disableBeacon: true,
    },
    {
        content: "That probably doesn't make any sense. For now, just trust me. Select your green resource but don't click an action just yet.",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Instead, look down here. Your manager is on a track moving around the dining room, making customers feel a little uncomfortable or whatever managers do. When you choose a resource, you have the option to use its numerical value instead of the corresponding action to move this guy that number of spaces.",
        target: ".manager-track",
        disableBeacon: true,
    },
    {
        content: "If the manager passes this spot, you get to choose a cube of any color or a straight up point! After that, the manager starts back a the beginning of the track (think pac-man)",
        target: ".manager-track .stop-container:nth-of-type(9)",
        disableBeacon: true,
    },
    {
        content: "So, go ahead and click the manager. He should move 2 spaces since your green resource was in line with the action worth 2 movements.",
        target: ".manager-track",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Great! He moved a little closer to our bonus. In fact, he's two spaces away, so we need to use another resource that's worth at least 2 movements. Let's check out our resources again.",
        target: ".manager-track .stop-container:nth-of-type(5)",
        disableBeacon: true,
    },
    {
        content: "Well, the red resource gives us 0, which isn't super helpful, but we do have another green. And as we just saw, that moves our manager 2 spaces. Let's use that. Go ahead and click on it.",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "And click on this guy again...",
        target: ".manager-track",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Boom! Look at all these choices! The cubes do what you'd expect, they grant you a cube of that color to your resources. The star represents 1 point. Pick the blue cube (remember our customer's order?)",
        target: ".modal .modal-content",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now we have a blue again! Only, it's not on the cook action! We need to rotate it into position. I think you know what to do at this point. Go ahead and cook that blue!",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Just like that, we're out of resources again. Time to move to the next round!",
        target: "#Console .instructions",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "We've got another customer to serve, so let's do that with one of our purple resources.",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "And click the customer...",
        target: "#Tables",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "And the food",
        target: "#Kitchen",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Okay, now let's go ahead and seat another customer! Grab the yellow and hit that seat button",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Let's see what they want to eat with the green resource",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "And click that customer...",
        target: "#Tables .customer:nth-of-type(3)",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Yellow again. Alright, let's see if we have that",
        target: "#Tables .customer:nth-of-type(3)",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Nope! We already used our yellow! Luckily we know a couple ways to handle that. Before we spend any resources to make a yellow resource, let's make sure we can get red into position to cook. Spend your two blues to rotate clockwise twice.",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Well shoot. Now we only have one resource left, and it's worth zero movement for our manager. Certainly not enough to get him back around the track again. We'll have to do something a little different.",
        target: "#Tableau",
        disableBeacon: true,
    },
    {
        content: "You've got one person here eating and one person waiting for food, but that first table...",
        target: "#Tables",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "You need to clean it off! Cleaning it will allow you to seat another customer, but there's a bonus as well. Go ahead and click on the dirty plate.",
        target: "#Tables .customer:first-of-type",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now you can place that dish somewhere in the dishwasher. Let's go over your options",
        target: "#Dishwasher",
        disableBeacon: true,
    },
    {
        content: "Selecting the manager will move the manager three spaces",
        target: "#Dishwasher .cells .square:first-of-type",
        disableBeacon: true,
    },
    {
        content: "Selecting a cube of any color will add a cube of that color to your resources",
        target: "#Dishwasher .cells .square:nth-of-type(2)",
        disableBeacon: true,
    },
    {
        content: "Selecting the copy button will let you duplicate any resource you have this round (whether or not you've used it). Since we already had a yellow, let's try that one out!",
        target: "#Dishwasher .cells .square:nth-of-type(3)",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Click the yellow resource again",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now you've got another yellow! Let's go ahead and cook it.",
        target: "#Tableau .resource:nth-of-type(7)",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "Now that you've placed your plate here, you won't be able to use that action again for the rest of the game! So be careful how you choose when you're using these bonuses!",
        target: "#Dishwasher",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "We only have one resource left for real this time. Now that you've cleared that table, you can seat someone. Go for it!",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "And now let's end the round (one last time, promise!)",
        target: "#Console .instructions",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "That's more or less everything! You can continue to finish this game, or you can quit and start your own game. I'll leave you with a couple more tips and then let you do whatever you want!",
        disableBeacon: true,
        placement: 'center',
        target: 'body'
    },
    {
        content: "This is an undo button. It's perfectly fine to use it whenever it's available! It becomes disabled whenever you start a new turn and immediately after you take a customer's order. I encourage you to make liberal use of it. Try out different approaches to each round and see how you can maximize your resource usage.",
        target: "#Console .undo",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "This is a wild cube. You can use it how you'd expect. Click on it and see what your options are!",
        target: "#Tableau .resource:nth-of-type(6)",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "See? It's (almost) anything! You still can't seat someone because there aren't any free tables! If you cook a wild, it can be served to anyone, which makes it pretty powerful.",
        target: "#Tableau",
        disableBeacon: true,
        spotlightClicks: true
    },
    {
        content: "And that's it! Thanks for playing! Enjoy the game!",
        disableBeacon: true,
        placement: 'center',
        target: 'body'
    },
];
