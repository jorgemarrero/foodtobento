import analytics from "@react-native-firebase/analytics"
import { utils } from "@react-native-firebase/app"
import crashlytics from "@react-native-firebase/crashlytics"

export async function bootstrapCollections() {
  if (utils().isRunningInTestLab) {
    await analytics().setAnalyticsCollectionEnabled(false)
    await crashlytics().setCrashlyticsCollectionEnabled(false)
  }
}
