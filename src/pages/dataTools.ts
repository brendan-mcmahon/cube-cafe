import { Game, PlaybackRound } from "../models/game";

export interface AverageActionRoundData {
  roundNumber: number;
  averageActionCount: number;
}

export function getAveragePointDistribution(
  games: Game[]
): { name: string; value: number }[] {
  let totalCustomerPoints = 0;
  let totalCarPoints = 0;
  let totalManagerPoints = 0;

  games.forEach((game) => {
    totalCustomerPoints += game.statistics.customerPoints || 0;
    totalCarPoints += game.statistics.carPoints || 0;
    totalManagerPoints += game.statistics.managerPoints || 0;
  });

  const totalPoints = totalCustomerPoints + totalCarPoints + totalManagerPoints;

  if (totalPoints === 0) {
    return [
      { name: "Customer", value: 0 },
      { name: "Car", value: 0 },
      { name: "Manager", value: 0 },
    ];
  }

  return [
    { name: "Customers", value: totalCustomerPoints / totalPoints },
    { name: "Cars", value: totalCarPoints / totalPoints },
    { name: "Manager", value: totalManagerPoints / totalPoints },
  ];
}

export function getActionPerTurnData(
  games: Game[],
  actionType: string | string[]
): AverageActionRoundData[] {
  const data = games
    .flatMap((g) =>
      g.playbackHistory?.rounds?.map((round, index) => ({
        roundNumber: index,
        actionCount: countActions(round, actionType),
      }))
    )
    .filter((item) => !!item && item.actionCount !== undefined);

  const groupedData: { [key: number]: { actionCount: number }[] } = {};
  data.forEach((item) => {
    if (!groupedData[item.roundNumber]) {
      groupedData[item.roundNumber] = [];
    }
    groupedData[item.roundNumber].push({ actionCount: item.actionCount });
  });

  return Object.entries(groupedData)
    .map(([roundNumber, items]) => {
      const totalActionCount = items.reduce(
        (sum, item) => sum + item.actionCount,
        0
      );
      return {
        roundNumber: parseInt(roundNumber),
        averageActionCount: totalActionCount / items.length,
      };
    })
    .sort((a, b) => a.roundNumber - b.roundNumber); // Ensure the data is sorted by roundNumber
}

function countActions(
  round: PlaybackRound,
  actionType: string | string[]
): number {
  if (Array.isArray(actionType)) {
    return round?.actions?.filter((action) => actionType.includes(action.type))
      .length;
  }
  return round?.actions?.filter((action) => action.type === actionType).length; // Assuming 'type' distinguishes different actions
}
