import React, { FormEvent } from "react";
import { Modal } from "../Modal";
import "./styles/RulesModal.scss";
import { IModalProps } from "./IModalProps";
import Meeple from "../icons/Meeple";

export default function RulesModal(props: IModalProps) {

  return (
    <Modal title="Rules" show={props.show} setShow={props.setShow}>
      <div id="RulesModal">

        <p>
          Meeples spend their days tilling fields, collecting resources, constructing buildings, and blocking action locations. When it’s time to relax, these professional “workers” need a place to wind down and enjoy their favorite food… cubes! You run a restaurant in the heart of Meeple City. From your delicious Cube Casserole (your mother’s recipe) to your famous Cube’n Sandwich, meeples come from all over to feast on your culinary cubes. But rival restaurants have just entered the market. Do you have what it takes to face the fierce competition and prove you have the best restaurant in town? It’s time to get to work and… feed your people!
        </p>

        <h2>Gameplay</h2>
        <p>A game of Cube Café is played over the course of 8 rounds.</p>
        <p>Your goal is to provide the most efficient and pleasant service to your customers in that time.</p>
        <p>
          Take a look at the resources in your tableau. You should have a variety of colors. You'll use these to perform the corresponding actions on the "action wheel" (the big circle with colors and pictures on it).
          You can spend a resource to perform an action by clicking on the resource, and then the action (the available actions for each resource will be highlighted in green).
          Each Meeple requires the same set of actions be taken in order to get them through your restaurant and to score points:
          <span className="centered">Seat 🡪 Order 🡪 Cook 🡪 Serve</span>
          Plus, for an improved score, you can also carry out the optional Refill action at any time after a customer is seated (but only once per round).

          You may notice that there are arrows on the sides of the action wheel. Instead of using your resources to perform the corresponding action, you may <i>also</i> use them to rotate the wheel one step in either direction.
        </p>

        <h3>Actions</h3>
        <h4>On the Action Wheel</h4>
        <ul className="action-wheel">
          <li className="description">
            <Meeple number={0} /><h5>Seat</h5>
            <p>
              A new customer arrives and is seated at the first available table. The number on the meeple indicates their satisfaction level and will correlate to the points you recieve after the meeple leaves. <span className="note">A table is available if it is empty of other customers or dirty plates</span>
            </p>
          </li>
          <li>Order: Choose a table whose order you'd like to take. A random plate is drawn to represent the customer's order (which is just a color! Meeples have simple tastes.)</li>
          <li>Cook: Throw a cube on the grill to cook it up! Move <em>the resource you spent</em> to the grill. This means if you spend a Red resource, you will be cooking a red resource. Don't, for instance, use a Blue resource to cook for a customer who ordered Red!</li>
          <li>Serve: Choose a table you'd like to serve, and then choose the food item from your countertop that you'd like to serve them. In some cases, you'll have more than one cube/food that applies to a table. If you manage to serve the customer while the food is hot and fresh (ie. on the left side of the countertop), your customer will jump up 1 point in satisfaction! If you let the food sit there too long (more than 2 rounds), it becomes inedible and must be thrown away.</li>
          <li>Refill: Choose a table you'd like to provide with exemplary customer service. Their drink will be refilled and their satisfaction will jump up by one point! <span className="note">You can only do this once per round</span></li>
          <li>Serve the Drive-Thru: After the 4th round, your drive-thru opens up and starts taking in cars! You'll get one car per turn. If you manage to serve the car in the first (leftmost) position, you'll be rewarded with 3 points. The second position gives you 2 points. Serving a car work similarly to cooking in that you'll need to use the resource that corresponds to the car's color to be able to serve them. If you don't serve a car after two rounds, it just leaves, probably pretty annoyed.</li>
        </ul>
        <h4>Other actions you can take</h4>
        <ul>
          <li>Rotate that action wheel: Just click an arrow to rotate the inner color wheel one space either direction</li>
          <li>Move the manager: Any good restaurant will have a roaming manager, making patrons feel uncomfortable. You can find yours at the bottom, underneath the tables. You may have noticed that each action on the action wheel also contains a number. These numbers correspond to how many spaces you can move the manager by spending the corresponding resource. For example, if Red is at the third position on the wheel (corresponding to the "Cook" action), you can choose to move the manager two spaces on his track instead of cooking! Once the manager reaches the end of his track, you have the option to recieve a cube of any color or a free point! The manager moves like Pacman, so if you overshoot the bonus space, you still get the reward and he starts over at the beginning.</li>
          <li>Clear a table: As a free action, at any time, you can clear a table. After Meeples leave the restaurant, they leave their garbage behind. You can't seat a customer at a dirty table, so you'll need to clear it before you're able to seat someone. After clearing, you need to put the plate in the dishwasher, which is great news! Each spot in the dishwasher provides a bonus (but can only be used once per game). To do this, just click on a table that has a plate but no meeple, and then click on whatever space on the dishwasher you'd like to get the bonus!</li>
        </ul>

        <h4>Dishwasher bonuses</h4>
        <ul>
          <li>Manager: Selecting this will move the manager three spaces on his track</li>
          <li>Copy Cube: Select this and then select a cube you already have (spent or not spent) and you will get a copy of it</li>
          <li>Cube of any color: Select this and just get a cube of that color!</li>
          <li>Refill: Select this and then select a table you'd like to refill.</li>
        </ul>
      </div>
    </Modal>
  );
}
