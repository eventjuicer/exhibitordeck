import {MainStackNavigator, MainScreenNavigator} from '../../scenes/Navigation';

const navReducer = (state, action) => {
  const newState = MainStackNavigator.router.getStateForAction(action, state);
  return (newState ? newState : state)
};

export default navReducer;
