import React from "react";
import { ResourceAction } from "../constants";
import { useGame } from "../gameContext";
import { Slice } from "./Slice";
import { GlowFilter } from "../icons/GlowFilter";

type ActionsProps = {
  hasDriveThru?: boolean;
}

function Actions(props: ActionsProps) {
  const { state } = useGame();

  return (
    <svg viewBox="0 0 210 210">
      <defs> <GlowFilter /> </defs>

      <circle cx="105" cy="105" r="100" fill="#fff" stroke="#000"></circle>

      {/* meeple */}
      <g>
        <path
          filter={actionAvailable(ResourceAction.SEAT_CUSTOMER) ? "url(#glow)" : ""}
          fillRule="evenodd"
          fill={actionAvailable(ResourceAction.SEAT_CUSTOMER) ? "#0C0" : "#999"}
          d="M12.023-1.678c.139-3.309-7.78-4.92-8.124-5.296-.171-.188.397-5.053-3.898-5.05-4.296-.003-3.728 4.862-3.899 5.05-.343.377-8.262 1.987-8.123 5.296.138 3.308 4.34 1.61 5.237 2.583.784.852-3.674 6.308-4.173 9.772-.163 1.129.155 1.348 1.252 1.348l5.64-.002c.79 0 1.072-.454 1.48-1.08C-1.683 9.557-.592 7.33 0 7.33c.593 0 1.684 2.227 2.586 3.613.408.626.69 1.08 1.48 1.08l5.64.001c1.097 0 1.415-.219 1.252-1.348-.499-3.464-4.957-8.92-4.173-9.771.896-.974 5.1.725 5.237-2.583z"
          transform={props.hasDriveThru ? "translate(125 25)" : "translate(105 25)"}
        ></path>
        <text fill="#fff" textAnchor="middle" transform={props.hasDriveThru ? "translate(125 30)" :"translate(105 30)"}>
          0
        </text>
      </g>

      {/* car */}
      { props.hasDriveThru && <g>
        <svg viewBox="0 0 322 222.5" x="0px" y="0px">
          <path
          filter={actionAvailable(ResourceAction.FEED_CAR) ? "url(#glow)" : ""}
          fill={actionAvailable(ResourceAction.FEED_CAR) ? "#0C0" : "#999"}
          transform="translate(105 60) translate(-12 -80)"
            d="M 2.6 12.8 L 5.6 12.8 L 10.2 2.6 C 10.8 1.4 11.4 -0 13 -0 L 40 -0 C 41.6 -0 42 1.4 42.8 2.6 L 47.4 12.8 L 56.2 12.8 C 60.6 12.8 64.4 16.4 64.4 21 L 64.4 26.6 C 64.4 28 63.2 29.2 61.8 29.2 L 55.2 29.2 C 54.2 20.2 41.2 20.2 40.2 29.2 L 22.2 29.2 C 21.2 20.2 8.2 20.2 7.2 29.2 L 2.6 29.2 C 1.2 29.2 0 28 0 26.6 L 0 15.2 C 0 13.8 1.2 12.8 2.6 12.8 Z M 14.8 24.4 C 17.8 24.4 20.2 26.8 20.2 30 C 20.2 33 17.8 35.6 14.8 35.6 C 11.6 35.6 9.2 33 9.2 30 C 9.2 26.8 11.6 24.4 14.8 24.4 Z M 47.6 24.4 C 50.8 24.4 53.2 26.8 53.2 30 C 53.2 33 50.8 35.6 47.6 35.6 C 44.6 35.6 42 33 42 30 C 42 26.8 44.6 24.4 47.6 24.4 Z" />
          <text fill="#fff" textAnchor="middle" transform="scale(1.7) translate(72 2.5)">
            0
          </text>
        </svg>
      </g> }

      {/* take order */}
      <g>
        <path
          filter={actionAvailable(ResourceAction.TAKE_ORDER) ? "url(#glow)" : ""}
          fill={actionAvailable(ResourceAction.TAKE_ORDER) ? "#0C0" : "#999"}
          fillRule="evenodd"
          d="M-13.817-.19a.632.632 0 00.17.574l.966.955-1.078 3.317a.628.628 0 00-.018.055.643.643 0 00.417.727L9.09 12.732c.31.1.682-.09.782-.398l5.365-16.51a.645.645 0 00-.4-.782l-22.448-7.294a.645.645 0 00-.783.398l-1.077 3.316-1.343.206a.633.633 0 00-.493.42L-13.8-.246a.628.628 0 00-.018.055zm1.316-.032l2.257-6.946.048-.148-2.353 7.242zm.115 4.672l.694-2.137.52.505c.3.298.898.155 1.03-.246l.478-1.475.48-1.474 1.532-4.717.48-1.474.478-1.474c.13-.401-.27-.87-.688-.805l-.717.104.694-2.138 21.268 6.91L8.88 11.36zm1.713-3.262l2.737-8.422-.248-.243-.17.525-.48 1.474-1.532 4.718-.48 1.474-.17.525z"
          transform="translate(105 105) rotate(72 55.055 40)"
        ></path>
        <text
          fill={actionAvailable(ResourceAction.TAKE_ORDER) ? "#0C0" : "#999"}
          filter={actionAvailable(ResourceAction.TAKE_ORDER) ? "url(#glow)" : ""}
          textAnchor="middle"
          transform="translate(105 105) rotate(72 55.055 40) rotate(-72 3.441 -2.5)"
        >
          1
        </text>
      </g>

      {/* cook */}
      <g>
        <path
          filter={actionAvailable(ResourceAction.COOK) ? "url(#glow)" : ""}
          fillRule="evenodd"
          fill={actionAvailable(ResourceAction.COOK) ? "#0C0" : "#999"}
          d="M-20.309-10.429L-6.426-.342-7.52 1.165c-.26.358-.21.882.147 1.141l23.564 17.12c.357.26.866.142 1.125-.216l2.104-2.895a1.775 1.775 0 00-.26-2.379l1.544-2.652.012-.015a3.606 3.606 0 00-1.042-4.64L3.72-4.96a3.608 3.608 0 00-4.736.442c-.004.005.002-.004-.003 0l-.71.79-15.348-11.15a2.75 2.75 0 10-3.233 4.45zM16.47 17.652L-5.778 1.488-4.123-.79a.176.176 0 01.246-.05L18.1 15.129a.171.171 0 01.024.246zM2.78-3.666l15.952 11.59a2.002 2.002 0 01.586 2.568l-1.446 2.493-19.64-14.269L.158-3.429a2.002 2.002 0 012.623-.237zm-5.842 1.435a1.795 1.795 0 00-2.356.501l-.067.093-6.796-4.937 1.352-1.861 8.126 5.904zm-14.954-11.353l5.792 4.209-1.352 1.86-5.792-4.208a1.15 1.15 0 111.352-1.861z"
          transform="translate(105 105) rotate(144 12.997 40)"
        ></path>
        <g fill="silver">
          <path
            filter={actionAvailable(ResourceAction.COOK) ? "url(#glow)" : ""}
            d="M-20.559-7.756l.866.5 1.178-2.04a1.68 1.68 0 00-.614-2.294l-1.02-.589a.68.68 0 01-.249-.927l1.179-2.041-.866-.5-1.179 2.041a1.68 1.68 0 00.615 2.293l1.02.59a.68.68 0 01.249.926zM-2.059-7.756l.866.5 1.178-2.04a1.68 1.68 0 00-.614-2.294l-1.02-.589a.68.68 0 01-.249-.927l1.179-2.041-.866-.5-1.179 2.041a1.68 1.68 0 00.615 2.293l1.02.59a.68.68 0 01.249.926z"
            transform="translate(105 105) rotate(144 12.997 40) rotate(-144)"
          ></path>
        </g>
        <text
          fill={actionAvailable(ResourceAction.COOK) ? "#0C0" : "#999"}
          textAnchor="middle"
          filter={actionAvailable(ResourceAction.COOK) ? "url(#glow)" : ""}
          transform="translate(105 104) rotate(144 12.997 40) rotate(-144 4.363 5.287)"
        >
          2
        </text>
      </g>

      {/* serve */}
      <g>
        <path
          filter={actionAvailable(ResourceAction.SERVE) ? "url(#glow)" : ""}
          d="M-9.325-4.917c-.48.35-.808.885-.9 1.47l-.861 5.467a1.634 1.634 0 001.588 1.886 1.64 1.64 0 001.585-1.151l1.02-3.31.007-.004c.517.28 1.17.263 1.675-.105l2.257-1.64 1.212-.048c.267-.01.523-.1.74-.257l2.422-1.76c.26-.19.445-.466.52-.78l.788-3.306.845.134a.45.45 0 00.515-.374l.597-3.772a.45.45 0 00-.374-.514l-8.171-1.295a.449.449 0 00-.515.374l-.597 3.772a.45.45 0 00.374.515l.813.128-.07.444a.447.447 0 01-.181.294l-5.287 3.83-.002.002zm5.769-8.4l7.282 1.154-.457 2.883-7.282-1.154.457-2.882zm.049 5.296a1.34 1.34 0 00.54-.881l.07-.444 4.733.75-.771 3.239a.455.455 0 01-.174.26l-2.422 1.76a.449.449 0 01-.247.085l-1.349.055a.453.453 0 00-.246.085l-2.367 1.72a.676.676 0 01-.942-.149l-.014-.024a.648.648 0 01-.055-.093c-.131-.286-.018-.655.265-.86l3.412-2.48-.53-.727-3.411 2.478-.047.034a1.564 1.564 0 00-.636 1.133v.013c-.007.08-.01.16-.004.242.002.037.01.074.015.112.007.052.012.104.025.156.017.07.043.14.07.208.01.022.014.045.024.067l.003.006c.011.025.023.048.036.072l-.013.01a.448.448 0 00-.166.231L-8.773 2.49a.731.731 0 01-1.424-.33l.861-5.467c.055-.35.252-.672.54-.882h.002l5.287-3.831v-.001zM-9.77 9.205c7.977 9.417 13.647 9.717 18.991 6.55l.843 1.16c.438.602 1.284.736 1.886.298l.728-.529a1.352 1.352 0 00.299-1.885l-.843-1.16c4.663-4.105 6.13-9.59-.36-20.086a.442.442 0 00-.059-.396l-1.058-1.456a.45.45 0 00-.628-.1L-11.087 6.942a.45.45 0 00-.1.629l1.059 1.456c.087.12.222.176.359.178zm21.213 5.013l.806 1.11a.45.45 0 01-.1.628l-.728.53a.45.45 0 01-.629-.1l-.805-1.11.05-.035c.231-.153.461-.31.69-.476s.45-.337.666-.509l.05-.038zm-.234-.973c-1.003.802-1.355 1.058-2.077 1.509-5.005 3.131-10.34 3.014-18.093-6.018l20.038-14.56c6.195 10.167 4.657 15.276.132 19.069zm-21.403-5.839L10.194-7.406l.529.728L-9.665 8.134l-.529-.728z"
          transform="translate(105 105) rotate(-144 -12.997 40)"
          fill={actionAvailable(ResourceAction.SERVE) ? "#0C0" : "#999"}
        ></path>
        <text
          fill={actionAvailable(ResourceAction.SERVE) ? "#0C0" : "#999"}
          textAnchor="middle"
          filter={actionAvailable(ResourceAction.SERVE) ? "url(#glow)" : ""}
          transform="translate(105 106) rotate(-144 -12.997 40) rotate(144 .812 2.5)"
        >
          3
        </text>
      </g>

      {/* refill */}
      <g>
        <path
          filter={actionAvailable(ResourceAction.REFILL) ? "url(#glow)" : ""}
          d="M17.446 3.838a.7.7 72 00-.203-.268l-5.601-4.746a.7.7 72 00-.47-.17l-1.522.058-3.356-10.33a.7.7 72 00-.955-.425l-21.646 9.69a.7.7 72 00-.377.858l3.833 11.796a.7.7 72 00.81.473L11.165 5.89a.7.7 72 00.522-.906L10.1.095l.85-.035 5.386 4.576a.7.7 72 001.13-.735.7.7 72 00-.02-.063zM5.202-10.446L8.194-1.24l-6.034.224c-.032-1.075-.134-2.257-.574-3.644C1.26-5.686.746-6.823-.06-8.093l5.261-2.353zM8.643.143l1.474 4.535-5.89 1.235C2.413 3.625 2.214 2.111 2.177.381L8.643.143z"
          transform="translate(105 105) rotate(-72 -55.055 40)"
          fill={actionAvailable(ResourceAction.REFILL) ? "#0C0" : "#999"}
        ></path>
        <text
          fill="#fff"
          textAnchor="middle"
          transform="translate(105 107) rotate(-72 -55.055 40) rotate(72 -6.882 -5)"
        >
          4
        </text>
      </g>


      <Slice action={ResourceAction.TAKE_ORDER} rotation={36} />
      <Slice action={ResourceAction.COOK} rotation={108} />
      <Slice action={ResourceAction.SERVE} rotation={180} />
      <Slice action={ResourceAction.REFILL} rotation={252} />
      { !props.hasDriveThru && <Slice action={ResourceAction.SEAT_CUSTOMER} rotation={324} /> }
      { props.hasDriveThru && <Slice  action={ResourceAction.FEED_CAR} rotation={324} size="half" /> }
      { props.hasDriveThru && <Slice action={ResourceAction.SEAT_CUSTOMER} rotation={0} size="half" /> }
    </svg>
  );

  function actionAvailable(action: ResourceAction): boolean {
    return state.availableActions.includes(action);
  }
}

export default Actions;
