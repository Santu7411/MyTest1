import * as Realm from "realm-web";
function sampleData() {
  const getData = async () => {
    const app = new Realm.App({ id: "react_test-lgozx" });
    // Get the API key from the local environment
    const apiKey =
      "1y5k3beSRjSg9dlTMucCZfsFseg10SLCeryPHi8RaLjk5Qxg8py2J5kB2o6tTB7Q";
    if (!apiKey) {
      throw new Error("Could not find a Realm Server API Key.");
    }
    const credentials = Realm.Credentials.serverApiKey(apiKey);
    try {
      const user = await app.logIn(credentials);
      return await user.functions.getDataTesting();
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  return getData;
}

export default sampleData;
