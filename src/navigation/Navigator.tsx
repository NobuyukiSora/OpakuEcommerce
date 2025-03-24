import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

const navigation = createNavigationContainerRef()

const navigate = (navigate: any, params?: any) => {
  if (navigation.isReady()) {
    navigation.dispatch(
      CommonActions.navigate({
        name: navigate,
        params
      })
    )
  }
}

const reset = (navigate: string, params?: any) => {
  if (navigation.isReady()) {
    if (navigate === "Home") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home", params }],
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Home" }, { name: navigate, params }],
        })
      );
    }
  }
}

const pureReset = (navigate: string, params?: any) => {
  console.log('navigate', navigate)
  if (navigation.isReady()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: navigate, params }],
        })
      );
    }
}

const goBack = () => {
  if (navigation.isReady()) {
    navigation.dispatch(
      CommonActions.goBack(),
    )
  }
}

export default { navigate, reset, goBack, pureReset, navigationRef: navigation }
