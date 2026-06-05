const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const calculatePriority = (notification) => {
  const weight = weights[notification.Type] || 0;

  const age =
    (Date.now() - new Date(notification.Timestamp).getTime()) / (1000 * 60);

  return weight * 1000 - age;
};
